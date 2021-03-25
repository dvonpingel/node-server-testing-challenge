const db = require("../../data/dbConfig");

function getAll() {
  return db("legends");
}

function getById(id) {
  return db("legends").where("id", id).first();
}

async function insert(legend) {
  const [id] = await db("legends").insert(legend);
  return getById(id);
}

function remove(id) {
  return db("legends").where({ id }).del();
}

module.exports = { getAll, getById, insert, remove };
