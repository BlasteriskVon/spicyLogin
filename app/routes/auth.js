const { authorize } = require("passport"); //i didnt add this this was auto added!
var authController = require("../controllers/authcontroller.js");

module.exports = function(app, passport){
    app.get("/signup", authController.signup);
    app.get("/signin", authController.signin);
    app.post("/signup", passport.authenticate("local-signup", {
        successRedirect: "/dashboard",

        failureRedirect: "/signup"
        }
    ));
    app.get("/dashboard", isLoggedIn, authController.dashboard);
    app.get("/logout", authController.logout);
    app.post("/signin", passport.authenticate("local-signin", { //note to self, test to see if i can do this on my own via javascript in the page
        successRedirect: "/dashboard",

        failureRedirect: "/signin"
    }));
    app.get("/gimme", getUser);

    function isLoggedIn(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        res.redirect("/signin");
    }

    function getUser(req, res){
        if(req.isAuthenticated()){
            return res.json(req.user);
        }
    }
}