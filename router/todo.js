const express = require("express");
const userTodo = express.Router();
const db = require("../lib/databaseConnection");
userTodo.get("/:id", (req, res) => {
  const { id } = req.params;
  db.query(
    `SELECT * from userTodos WHERE
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

userTodo.post("/", async (req, res) => {
  const { todoId, todo, done, userId } = req.body;

  if (todoId === "") return res.status(401).send({ err: "todoId is required" });
  if (todoId === "") return res.status(400).send({ err: "id is required" });
  if (todo === "") return res.status(400).send({ err: "todo is required" });
  db.query(
    `  INSERT INTO userTodos (todoId, todo, done, userId)
VALUES  ('${todoId}','${todo}',${done}, '${userId}');`,
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

userTodo.put("/:id", (req, res) => {
  const { id } = req.params;

  if (id === "") return res.status(401).send({ err: "todoId is required" });
  db.query(
    `UPDATE userTodos SET done = !done WHERE todoId = '${id}';`,
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

userTodo.delete("/:id", (req, res) => {
  const { id } = req.params;

  if (id === "") return res.status(401).send({ err: "todoId is required" });
  // console.log(id);
  db.query(`DELETE FROM userTodos WHERE todoId='${id}';`, (err, result) => {
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

module.exports = userTodo;
