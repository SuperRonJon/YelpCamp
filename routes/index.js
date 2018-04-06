var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');

router.get('/', function(req, res){
   res.render("landing"); 
});

//AUTH ROUTES

//Show register form
router.get("/register", function(req, res){
    res.render("register"); 
});
//Do register logic
router.post("/register", function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            req.flash("error", err.message);
            res.redirect("/register");
        } else {
            passport.authenticate("local")(req, res, function(){
                req.flash("success", "Successfully signed up!");
                res.redirect('/campgrounds'); 
            });
        }
    });
});

//Show login form
router.get("/login", function(req, res){
    res.render("login"); 
});

//login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/register"
    }), function(req, res){
     
});

router.get("/logout", function(req, res){
    req.logout(); 
    req.flash("success", "Successfully logged out");
    res.redirect("/")
});

module.exports = router;