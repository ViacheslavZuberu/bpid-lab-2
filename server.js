const express = require("express");
const bodyPaeser = require("body-parser");
const random = require("random-number");

const PORT = process.env.PORT || 5000;

let randomOptions = {
    min: 25,
    max: 500,
    integer: true
};

let localDatabase = {
    g: random(randomOptions),
    p: random(randomOptions),
    users: [],
    messages: [],
    archived_messages: []
};

app = express();

app.use(bodyPaeser.json());
app.use(bodyPaeser.urlencoded({ extended: true }));

app.post("/reg", (req, res, next) => {
    let user = {
        username: req.body.username,
        number: random(randomOptions)
    };
    localDatabase.users.push(user);
    res.status(201).json({
        my_number: user.number,
        g: localDatabase.g,
        p: localDatabase.p
    });
});

app.listen(PORT, function() {
    console.log("API is started on port " + PORT);
    console.info("Local Database: ", localDatabase);
});
