// import modules express body-parser cors mongodb

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
let mongodb = require("mongodb");

// create the rest services

let app = express();

// where "app" is the rest object
// with the help of app object we create GET, POST, PUT, DELETE

// MIME Type

app.use(bodyParser.json());

// parse the json
app.use(bodyParser.urlencoded({ extended: false }));

// enable cors policy
app.use(cors());

// Create the reference variable to connect to mongodb database
let ashoIT = mongodb.MongoClient;

// create the rest api
app.post("/login", (req, res) => {
  ashoIT.connect(
    "mongodb+srv://admin:admin@cluster0.5eva0.mongodb.net/workshop?retryWrites=true&w=majority",
    (err, connection) => {
      if (err) throw err;
      else {
        let db = connection.db("workshop");
        db.collection("login_details")
          .find({
            uname: req.body.uname,
            upwd: req.body.upwd,
          })
          .toArray((err, my_array) => {
            if (err) throw err;
            else {
              if (my_array.length > 0) {
                res.status(200).json({ login: "success" });
              } else {
                res.status(400).json({ login: "fail" });
              }
            }
          });
      }
    }
  );
});

// assign custom port number

let port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("server started successfully !!!");
});
