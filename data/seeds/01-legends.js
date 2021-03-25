exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("legends")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("legends").insert([
        { name: "garen" },
        { name: "lux" },
        { name: "morgana" },
      ]);
    });
};
