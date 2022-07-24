require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

const userAuthRouter = require("./router/userAuthRouter");

const mysql = require("mysql2");
// const connection = mysql.createConnection(process.env.DATABASE_URL);
const connection = mysql.createConnection(
  'mysql://lakv6t4chujr:pscale_pw_atcbIbewLyKNOEWuwOydN93TPFtBrEKLOIsrA-HD3FQ@xabn9a2r0bkb.us-east-2.psdb.cloud/mi_records?ssl={"rejectUnauthorized":true}'
);

connection.connect();

app.get("/", (req, res) => {
  connection.query("SELECT * FROM users", function (err, rows, fields) {
    if (err) throw err;
    res.send(rows);
  });
  // res.send({
  //   name: "victor",
  //   number: 08137297150,
  //   date: new Date().toLocaleDateString(),
  // });
  //   SELECT categories.name, products.name
  // FROM categories
  // INNER JOIN products ON products.category_id =categories.id;
  /*
  
  // create table
  CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `email` varchar(255) NOT NULL,
  `number` int NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(255),
  `last_name` varchar(255)
);

CREATE TABLE users (
    id int(11) NOT NULL AUTO_INCREMENT,
    fullName varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
    phoneNumber BIGINT(50) COLLATE utf8mb4_unicode_ci NOT NULL,
    email varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
    password varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY email (email)
   ) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
   
   

// insect data into table

INSERT INTO `users` (email, PhoneNumber, fullName, password)
VALUES  ('victorjosiahm3@gmail.com','08137297150', 'Josiah Victor',"0704");

// update data

UPDATE employees 
SET 
    address = '1300 Carter St',
    city = 'San Jose',
    postalcode = 95125,
    region = 'CA'
WHERE
    employeeID = 3;

  */
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
app.use(express.json());
app.use("/api/account", userAuthRouter);
