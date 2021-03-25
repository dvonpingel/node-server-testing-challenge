const express = require("express");

const Legends = require("./legends/legends-model");

const server = express();

server.use(express.json());

server.get("/legends", (req, res) => {});

server.post("/legends", (req, res) => {
  Legends.insert(req.body)
    .then((legend) => {
      res.status(201).json(legend);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

server.delete("/legends/:id", (req, res) => {
  Legends.remove(req.params.id)
    .then(() => {
      res.status(200).json({ message: "legend deleted" });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = server;
