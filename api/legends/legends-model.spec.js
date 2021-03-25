const Legend = require("./legends-model");
const db = require("../../data/dbConfig");

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

describe("Legend Model", () => {
  it("functions", () => {
    expect(true).toBe(true);
  });
  describe("getAll", () => {
    let legends;
    beforeEach(async () => {
      legends = await Legend.getAll();
    });
    it("gets the legends", async () => {
      expect(legends).toHaveLength(3);
    });
    it("has the right legend properties", async () => {
      expect(legends[0]).toMatchObject({ id: 1, name: "garen" });
    });
  });
  describe("insert", () => {
    it("can insert a legend into the db", async () => {
      const aphelios = { name: "aphelios" };
      await Legend.insert(aphelios);
      expect(await db("legends")).toHaveLength(4);
      const aphel2 = await db("legends").where({ id: 4 }).first();
      expect(aphel2).toMatchObject({ id: 4, name: "aphelios" });
    });
    it("resolves to the new legend", async () => {
      const aphelios = { name: "aphelios" };
      const result = await Legend.insert(aphelios);
      expect(result).toMatchObject({ id: 4, name: "aphelios" });
    });
  });
  describe("remove", () => {
    it("can remove a legend from the db", async () => {
      await Legend.remove(4);
      expect(await db("legends")).toHaveLength(3);
    });
  });
});
