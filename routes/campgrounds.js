var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');
var middleware = require('../middleware');
var User = require('../models/user');

//INDEX
router.get('/', function(req, res){
    //Get all campgrounds from Database
    Campground.find({}, function(err, campgrounds){
       if(err){
           console.log(err);
       } else{
            res.render("campgrounds/index", {campgrounds: campgrounds});
       }
    });
});

//CREATE
router.post('/', middleware.isLoggedIn, function(req, res){
    User.findById(req.user._id, function(err, user){
        if(err){
            req.flash('error', 'Something went wrong');
            res.redirect('/campgrounds');
        } else {
            //get data from form and add to campgrounds array
            var name = req.body.name;
            var image = req.body.image;
            var desc = req.body.desc;
            var author = {
               id: req.user._id,
               username: req.user.username
            };
            var newCampground = {name: name, image: image, description: desc, author: author};
            //create a new campground and save to database
            Campground.create(newCampground, function(err, newlyCreated){
               if(err){
                   console.log(err);
               } else {
                   //add campground to user profile
                   user.campgrounds.push(newlyCreated);
                   console.log(user);
                   //redirect back to campgrounds page.
                   res.redirect('/campgrounds');
               }
           });
        }
    });
   
});

//NEW
router.get('/new', middleware.isLoggedIn, function(req, res){
   res.render("campgrounds/new"); 
});

//SHOW - shows more info about one campground
router.get('/:id', function(req, res){
    //find the campground with provided id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err || !foundCampground){
            req.flash("error", "Campground not found");
            res.redirect("/campgrounds");
        } else {
            //render show template with that campground
            res.render('campgrounds/show', {campground: foundCampground});
        }
    });
});

//EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground}); 
    });
    
    
    
});
//UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    //find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updateCampground){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});
//DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        } else {
            req.flash("success", "Campground deleted");
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;