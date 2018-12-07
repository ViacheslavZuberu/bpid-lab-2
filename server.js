var PORT = process.env.PORT || 5000;

const express = require("express");
const bodyPaeser = require("body-parser");
const NodeRSA = require("node-rsa");

var app = express();
var key = new NodeRSA({ b: 512 });

app.use(bodyPaeser.json());
app.use(bodyPaeser.urlencoded({ extended: true }));

var public = key.exportKey("components-public");

app.get("/", function(req, res) {
  res.send("Data Protection Lab #2");
});

app.get("/public_key", function(req, res) {
  res.send({
    public_key: public
  });
});

app.get("/test", function(req, res) {
  var message = req.body.message;
  res.send({
    encrypted_message: key.encrypt(message, "base64")
  });
});

app.post("/message", function(req, res) {
  var message = key.decrypt(req.body.encrypted_message, "utf8");
  res.send({
    message_count_letter: message.length,
    message_count_words: message.split(" ").length,
    message_decrypted: message,
    server_time: new Date().toISOString()
  });
});

app.listen(PORT, function() {
  console.log("API is started on port " + PORT);
});
