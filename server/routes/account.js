const express = require("express");
const accountRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

accountRoutes.route("/account").get(function (req, res) {
 let db_connect = dbo.getDb("forum");
 db_connect
   .collection("accounts")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
accountRoutes.route("/account/:id").get(function (req, res) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect
   .collection("accounts")
   .findOne(myquery, function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
accountRoutes.route("/account/add").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myobj = {
   username: req.body.username,
   password: req.body.password,
   email: req.body.email,
 };
 db_connect.collection("accounts").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
 });
});
 
accountRoutes.route("/account/update/:id").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 let newvalues = {
   $set: {
     username: req.body.username,
     password: req.body.password,
     email: req.body.email,
   },
 };
 db_connect
   .collection("accounts")
   .updateOne(myquery, newvalues, function (err, res) {
     if (err) throw err;
     console.log("1 document updated");
     response.json(res);
   });
});
 
accountRoutes.route("/account/delete/:id").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect.collection("records").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("1 document deleted");
   response.json(obj);
 });
});

module.exports = accountRoutes;
