const express = require("express");
const postRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    },
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    cb(null, allowedFileTypes.includes(file.mimetype));
}

let upload = multer({ storage, fileFilter });

postRoutes.route("/post").get((req, res) => {
    let db_connect = dbo.getDb("forum");
    db_connect
        .collection("posts")
        .find({})
        .toArray((err, result) => {
            if (err) throw err;
            res.json(result);
        });
});

postRoutes.route("/post/:id").get((req, res) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params['id']) };
    db_connect
        .collection("posts")
        .findOne(myquery, (err, result) => {
            if (err) throw err;
            res.json(result);
        });
});

postRoutes.route("/post/:id/comments").get((req, res) => {
    let db_connect = dbo.getDb();
    db_connect
        .collection("comments")
        .find({})
        .toArray((err, result) => {
            if (err) throw err;
            res.json(result);
         });
});

postRoutes.route("/post/:id/new_comment").post((req, res) => {
    let db_connect = dbo.getDb();
    let myobj = {
        post_id: ObjectId(req.params['id']),
        name: req.body.name,
        comment: req.body.comment,
    };
    db_connect
        .collection("comments")
        .insertOne(myobj, (err, result) => {
            if (err) throw err;
            res.json(result);
        });
});

postRoutes.route("/post/add").post(upload.single('image'), (req, res) => {
    let db_connect = dbo.getDb();
    let myobj = {
        name: req.body.name,
        subject: req.body.subject,
        post: req.body.post,
        image: req.file.filename,
    };
    db_connect.collection("posts").insertOne(myobj, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

postRoutes.route("/update/:id").post((req, res) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params['id']) };
    let newvalues = {
        $set: {
            name: req.body.name,
            subject: req.body.subject,
            post: req.body.post,
        },
    };
    db_connect
        .collection("posts")
        .updateOne(myquery, newvalues, (err, result) => {
            if (err) throw err;
            console.log(`POST ${myquery._id} UPDATED`);
            res.json(result);
        });
});

postRoutes.route("/:id").delete((req, res) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params['id']) };
    db_connect.collection("posts").deleteOne(myquery, (err, obj) => {
        if (err) throw err;
        console.log(`POST ${myquery._id} DELETED`);
    });
});

module.exports = postRoutes;
