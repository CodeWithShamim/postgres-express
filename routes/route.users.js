const express = require("express");
const client = require("../utils/db");
const router = express.Router();

// get all users
router.get("/", (req, res) => {
  const query = "select * from users ORDER BY title ASC";
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
router.get("/:id", (req, res) => {
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
  values(${title}, ${id}, ${pro}, ${des}) returning id`;

  client.query(insertQuery, (err, result) => {
    if (!err) {
      res.send(result.rows[0].id);
    } else {
      res.send(err);
    }
  });
  client.end;
});

// update a user
router.put("/", (req, res) => {
  const { title, des, id } = req.body;
  const insertQuery = `update users set title='${title}', des='${des}' where id='${id}' returning *`;

  client.query(insertQuery, (err, result) => {
    if (!err) {
      res.send(result.rows[0]);
    } else {
      res.send(err);
    }
  });
});

// delete all user
router.delete("/deleteAll", (req, res) => {
  const insertQuery = `delete from users`;

  client.query(insertQuery, (err, result) => {
    if (!err) {
      res.send(result);
    } else {
      res.send(err);
    }
  });
});

// delete a user
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const insertQuery = `delete  from users where id='${id}' returning *`;

  client.query(insertQuery, (err, result) => {
    if (!err) {
      if (result?.rows[0]?.id) {
        res.send(result?.rows[0]?.id);
      } else {
        res.send(`Not Found this ${id} for deleted`);
      }
    } else {
      res.send(err);
    }
  });
});

module.exports = router;
