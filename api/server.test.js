const server = require("./server");
const request = require("supertest");
const db = require("../data/dbConfig");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async () => {
  await db("legends").truncate();
  await db.seed.run();
});
afterAll(async () => {
  await db.destroy();
});

it('process.env.DB_ENV is in "testing" mode', () => {
  expect(process.env.DB_ENV).toBe("testing");
});

describe("Legends Endpoints", () => {
  describe("[POST] /legends", () => {
    it("updates the database with the new legend", async () => {
      await request(server).post("/legends").send({ name: "aphelios" });
      expect(await db("legends")).toHaveLength(4);
    });
    it("responds with the new legend", async () => {
      const res = await request(server)
        .post("/legends")
        .send({ name: "aphelios" });
      expect(res.body).toMatchObject({ id: 4, name: "aphelios" });
    });
  });

  describe("[DELETE] /legends/:id", () => {
    it("deletes a legend from the db", async () => {
      await request(server).delete("/legends/3");
      expect(await db("legends")).toHaveLength(2);
    });
    it("responds with a success message", async () => {
      const res = await request(server).delete("/legends/3");
      expect(res.body).toMatchObject({ message: "legend deleted" });
    });
  });
});
