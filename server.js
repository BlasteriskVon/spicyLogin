var express = require("express");
var app = express();
var passport = require("passport"); //<---- handles authentication
var session = require("express-session"); // <--- see above
var bodyParser = require("body-parser"); // <-- extracts a body and presents it in a readable format
var env = require("dotenv").config(); //using this instead of load because load deprecated
var exphbs = require("express-handlebars");

//for bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//for Passport
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true})); //session secret
app.use(passport.initialize());
app.use(passport.session()); //persistent login sessions

//for handlebars
app.set("views", "./app/views");
app.engine("hbs", exphbs({
    extname: ".hbs",
    defaultLayout: false //added this to avoid it looking for the main.handlebars
}));
app.set("view engine", ".hbs");



app.get("/", function(req, res){
    res.send("Welcome to the Spicy Login!");
});

//Models
var models = require("./app/models");

//Routes
var authRoute = require("./app/routes/auth.js")(app, passport);

//load passport strategies
require("./app/config/passport/passport.js")(passport, models.user);

//Sync Database
models.sequelize.sync().then(function() {
    console.log("Database looking spicy!");
}).catch(function(err){
    console.log(err, "Something went wrong with the Database Update!");
})

//app listening on port 5000
app.listen(5000, function(err){
    if(!err){
        console.log("The site is up!");
    } else {
        console.log(err);
    }
})