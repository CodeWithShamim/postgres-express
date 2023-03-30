const express = require("express");
const client = require("../utils/db");
const router = express.Router();

// get all users
router.get("/users", (req, res) => {
  const query = "select * from users";
  // const query = "select des from users";

  client.query(query, (err, result) => {
    if (!err) {
      res.send(result.rows);
    } else {
      console.log(err);
      res.send(err);
    }
  });
  client.end;
});

// get single user
router.get("/user/:id", (req, res) => {
  const query = `select * from users where id='${req.params.id}'`;

  client.query(query, (err, result) => {
    if (!err) {
      res.send(result.rows);
    } else {
      console.log(err);
      res.send(err);
    }
  });
  client.end;
});

// add new user
router.post("/addUser", (req, res) => {
  const { title, des, pro } = req.body;
  const id = `${Math.floor(Math.random() * 10000)}`;

  const insertQuery = `insert into users(title, id, pro, des) 
  values(${title}, ${id}, ${pro}, ${des})`;

  client.query(insertQuery, (err, result) => {
    if (!err) {
      res.send(result);
    } else {
      res.send(err);
    }
  });
  client.end;
});

module.exports = router;
