const express = require("express");
const NodeRSA = require("node-rsa");

var app = express();
var key = new NodeRSA({ b: 512 });
const public = key.exportKey("pkcs8-public-der");
var message = "Hello, my name is Viacheslav!";

var encrypted = app.get("/", function(req, res) {
  res.send("Hello, API!");
});

app.get("/getPublicKey", function(req, res) {
  res.send(public.toJSON());
});

app.get("/message", function(req, res) {
  encrypted = key.encryptPrivate(message, "base64");
  res.send(encrypted);
});

app.get("/decrypt", function(req, res) {
  res.send(key.decryptPublic(encrypted, "utf8"));
});

app.listen(3012, function() {
  console.log("API is started!");
});
