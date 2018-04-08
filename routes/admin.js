var express = require('express');
var router = express.Router();
var User = require('../models/user');
var middleware = require('../middleware');
var passport = require('passport');

//INDEX
router.get('/', middleware.checkAdmin, function(req, res){
    User.find({}, function (err, users){
        if(err){
            console.log(err);
            res.redirect('back');
        } else {
            var admins = [];
            users.forEach(function(user){
                if(user.isAdmin){
                    admins.push(user);
                }
            });
            res.render('admin/index', {admins: admins});
        }
    });
});

//ADMIN REGISTER NEW ROUTE
router.get('/register', middleware.checkAdmin, function(req, res){
    res.render('admin/register');
});

//ADMIN REGISTER POST ROUTE
router.post('/register', function(req, res){
    User.register(new User({username: req.body.username, isAdmin: true}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            req.flash('error', err.message);
            res.redirect('/admin/register');
        } else {
            req.flash('success', 'New admin registered');
            res.redirect('/admin');
        }
    });
});

//SHOW THE PROMOTION PAGE
router.get('/promote', middleware.checkAdmin, function(req, res){
    User.find({}, function(err, users){
        if(err){
            console.log(err);
            res.redirect('back');
        } else {
            res.render('admin/promote', {users: users});
        }
    });
});

//PROMOTE USER TO ADMIN
router.put('/:admin_id', middleware.checkAdmin, function (req, res) {
    User.findByIdAndUpdate(req.params.admin_id, {$set: { isAdmin: true }}, function(err, updatedAdmin){
        if(err){
            console.log(err);
            req.flash('error', 'Something went wrong');
        } else {
            res.redirect('admin/promote');
        }
    });
});

//ADMIN DELETION, REMOVE ADMIN STATUS FROM AN ACCOUNT
router.delete('/:admin_id', middleware.checkAdmin, function(req, res){
    User.findByIdAndUpdate(req.params.admin_id, { $set: { isAdmin: false }}, function(err, updatedAdmin){
        if(err){
            console.log(err);
            req.flash('error', 'Something went wrong');
            res.redirect('back');
        } else {
            res.redirect('/admin')
        }
    });
});

module.exports = router;