var express = require('express');
var router = express.Router();
var Users = require('../models/user');
var middleware = require('../middleware');

router.get('/', middleware.checkAdmin, function(req, res){
    Users.find({}, function (err, users){
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

router.delete('/:admin_id', middleware.checkAdmin, function(req, res){
    Users.findByIdAndUpdate(req.params.admin_id, { $set: { isAdmin: false }}, function(err, updatedAdmin){
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