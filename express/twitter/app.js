var express = require("express");

var app = express();
var tweets = [];

app.listen(8000);

app.configure(function() {
    app.set("views", __dirname + "/views");
    app.set("view engine", "ejs");
});

function acceptsHtml(header) {
    var accepts = header.split(",");
    console.log(accepts);
    for (var i = 0; i < accepts.length; i++) {
        if (accepts[i] == "text/html") {
            return true;
        }
    }
    return false;
}


app.get("/", function(req, res) {
    var title = "Chirpie",
        header = "Welcome to Chirpie";
    res.render("index", {
        locals: {
            "title": title,
            "header": header,
            "tweets": tweets,
            stylesheets: ["/public/style.css"]
        }
    });
});

app.post("/send", express.bodyParser(), function(req, res) {
    if (req.body && req.body.tweet) {
        tweets.push(req.body.tweet);
        if (acceptsHtml(req.headers["accept"])) {
            res.redirect("/", 302);
        } else {
            res.send({"status": "ok", "message": "Tweet received"});
        }
    } else {
        res.send({"status": "nok", "message": "No tweet received!"});
    }
});

app.get("/tweets", function(req, res) {
    res.send(tweets);
});


