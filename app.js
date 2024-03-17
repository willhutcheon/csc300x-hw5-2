"use strict";
const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true })); // built-in middleware
// for application/json
app.use(express.json()); // built-in middleware
const multer = require("multer");
// for multipart/form-data (required with FormData)
app.use(multer().none()); // requires the "multer" module
app.get("/", function (req, res) {
    res.send("Hello, World from Express!");
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log('Example app listening on port: ' + PORT + "!");
});