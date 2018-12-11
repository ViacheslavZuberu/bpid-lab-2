var PORT = process.env.PORT || 5000;

const express = require("express");
const bodyPaeser = require("body-parser");
const NodeRSA = require("node-rsa");

var app = express();
var key = new NodeRSA({ b: 1024 });

var data = [];

app.use(bodyPaeser.json());
app.use(bodyPaeser.urlencoded({ extended: true }));

var publicKey = key.exportKey("pkcs8-public-pem");

app.get("/", function(req, res) {
    var result = "";

    for (var i = data.length - 1; i >= 0; i--) {
        result += data[i] + "<br>";
    }

    res.send("Data Protection Lab #2 v0.5<br>" + result);
});

app.get("/regen_key", function(req, res) {
    try {
        key = new NodeRSA({ b: 1024 });
        publicKey = key.exportKey("pkcs8-public-pem");
    } catch (err) {
        res.send({
            result: "Error",
            error: err
        });
    }
    res.send({
        result: "OK"
    });
});

app.get("/public_key", function(req, res) {
    res.send({
        public_key: publicKey
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
    data.push(new Date().toISOString() + " " + message);
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
