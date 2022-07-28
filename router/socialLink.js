const express = require("express");
const socialLinks = express.Router();
const db = require("../lib/databaseConnection");
socialLinks.get("/:id", (req, res) => {
  const { id } = req.params;
  db.query(
    `SELECT * from socialLinks WHERE
  userId = ${id}`,
    (err, result) => {
      if (err) {
        // throw err
        return res.status(400).send({
          msg: err,
        });
      }
      res.status(200).send({ data: result });
    }
  );
});

socialLinks.post("/", async (req, res) => {
  const { linkId, name, icon, link, userId } = req.body;

  if (userId === "") return res.status(401).send({ err: "userId is required" });
  if (linkId === "") return res.status(400).send({ err: "id is required" });
  if (name === "") return res.status(400).send({ err: "name is required" });
  if (link === "") return res.status(400).send({ err: "link is required" });
  db.query(
    `  INSERT INTO socialLinks (linkId, name, link, userId)
VALUES  ('${linkId}','${name}','${link}', '${userId}');`,
    (err, result) => {
      // user does not exists
      if (err) {
        // throw err;
        return res.status(400).send({
          msg: err,
        });
      }
      return res.status(201).send({
        ok: true,
        check: result,
      });
    }
  );
});

socialLinks.put("/:id", (req, res) => {
  const { name, link, userId } = req.body;
  const { id } = req.params;

  if (id === "") return res.status(401).send({ err: "linkId is required" });
  if (userId === "") return res.status(401).send({ err: "userId is required" });
  db.query(
    `UPDATE socialLinks SET name = '${name}', link = '${link}' WHERE linkId = ${id};`,
    (err, result) => {
      // user does not exists
      if (err) {
        // throw err;
        return res.status(400).send({
          msg: err,
        });
      }
      return res.status(201).send({
        ok: true,
        check: result,
      });
    }
  );
});

socialLinks.delete("/:id", (req, res) => {
  const { name, link, userId } = req.body;
  const { id } = req.params;

  if (userId === "") return res.status(401).send({ err: "userId is required" });
  console.log(id);
  db.query(`DELETE FROM socialLinks WHERE linkId='${id}';`, (err, result) => {
    // user does not exists
    if (err) {
      // throw err;
      return res.status(400).send({
        msg: err,
      });
    }
    return res.status(201).send({
      ok: true,
      check: result,
    });
  });
});

module.exports = socialLinks;
