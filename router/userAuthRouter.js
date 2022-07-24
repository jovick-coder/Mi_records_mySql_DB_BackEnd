const express = require("express");
const userAuthRouter = express.Router();
const db = require("../databaseConnection");
const { signupValidation, loginValidation } = require("../validation");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
userAuthRouter.get("/", (req, res) => {
  db.query(`SELECT * from users`, (err, result) => {
    res.send(result);
  });
});

userAuthRouter.post("/login", loginValidation, async (req, res, next) => {
  db.query(
    `SELECT * FROM users WHERE email = ${db.escape(req.body.email)};`,
    (err, result) => {
      // user does not exists
      if (err) {
        // throw err
        return res.status(400).send({
          msg: err,
        });
      }
      if (!result.length) {
        return res.status(401).send({
          msg: "Email or password is incorrect!",
        });
      }
      // check password

      bcrypt.compare(
        req.body.password,
        result[0]["password"],
        (bErr, bResult) => {
          // wrong password
          if (bErr) {
            // throw bErr;
            return res.status(401).send({
              msg: "Email or password is incorrect!",
            });
          }
          if (bResult) {
            const token = jwt.sign(
              { id: result[0].id },
              process.env.BCRYPT_SECRETE,
              { expiresIn: "1h" }
            );
            db.query(
              `UPDATE users SET lastLogin = now() WHERE id = '${result[0].id}'`
            );
            return res.status(200).send({
              msg: "Logged in!",
              token,
              user: result[0],
            });
          }
          return res.status(401).send({
            msg: "Username or password is incorrect!",
          });
        }
      );
    }
  );
});

module.exports = userAuthRouter;

userAuthRouter.post("/register", signupValidation, (req, res, next) => {
  const { email, password, phoneNumber, fullName } = req.body;
  db.query(
    `SELECT * FROM users WHERE LOWER(email) = LOWER(${db.escape(email)});`,
    (err, result) => {
      if (result.length) {
        return res.status(409).send({
          msg: "This email is already in use!",
        });
      } else {
        // username is available
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            return res.status(500).send({
              msg: err,
            });
          } else {
            // has hashed pw => add to database
            db.query(
              `INSERT INTO users (email, PhoneNumber, fullName, password) VALUES ( ${db.escape(
                email
              )},${phoneNumber},'${fullName}', ${db.escape(hash)})`,
              (err, result) => {
                if (err) {
                  // throw err;
                  return res.status(400).send({
                    msg: err,
                  });
                }
                return res.status(201).send({
                  msg: "The user has been registered with us!",
                });
              }
            );
          }
        });
      }
    }
  );
});
module.exports = userAuthRouter;
