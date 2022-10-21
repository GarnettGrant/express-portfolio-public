let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

//user model instance
let userModel = require("../models/users");
let User = userModel.user;

module.exports.displayHomePage = (req, res, next) => {
    res.render('index', { title: 'Home' });
}
module.exports.displayAboutMePage = (req, res, next) => {
    res.render('aboutme', { title: 'About Me' });
}
module.exports.displayProjectsPage = (req, res, next) => {
    res.render('projects', { title: 'Projects' });
}
module.exports.displayServicesPage = (req, res, next) => {
    res.render('services', { title: 'Services' });
}
module.exports.displayContactMePage = (req, res, next) => {
    res.render('contact', { title: 'Contact Me' });
}


// process the display login page
module.exports.displayLoginPage = (req, res, next) => {
    // check if user is already logged in
    if (!req.user) {

        res.render('auth/login', {
            title: 'Login',
            message: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName : '', // by default display name is empty 
            loggedIn: req.isAuthenticated()
        })
    }
    else {
        return res.redirect('/');
    }
}

module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        // server err?
        if (err) {
            return next(err);
        }
        // userlogin err?
        if (!user) {
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }
        req.login(user, (err) => {
            // server err?
            if (err) {
                return next(err);
            }
            return res.redirect('/contactList');
        });
    })(req, res, next);
}

module.exports.displayRegisterPage = (req, res, next) =>{
    // check if user is logged in 
    if (!req.user){
        res.render('auth/register',
        {
            title: 'Register',
            message: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName: '',
            loggedIn: req.isAuthenticated()
        });
    }
    else{
        return res.redirect('/');
    }
    // check if credentials exist already 
}

module.exports.processRegisterPage = (req, res, next) =>{
    //instantiate a user object
    let newUser = new User({
        username: req.body.username, 
        // password: req.body.password
        email: req.body.email,
        displayName: req.body.displayName
    });
    User.register(newUser, req.body.password, (err) =>{
        if(err){
            console.log("Error:inserting New User");
            if(err.name == "UserExistsError"){
                req.flash(
                    'registerMessage',
                    'Registration Error: user Already Exists'
                )
                console.log('Error: User Already Exists!')   
            }
            return res.render('auth/register',
            {
                title: 'Register',
                message:req.flash('registerMessage'),
                displayName:''
            });
        }
        else{
            // if no error exists then the registeration is succesful
            //redirect the user and authenticate them 
            return passport.authenticate('local')(req, res, ()=>{
                res.redirect('/contactList')
            })
        }

    })
}

module.exports.performLogout = (req, res, next)=>{
    req.logout(function(err){
        if (err){
            return next(err);
        }
        res.redirect('/')
    });

}