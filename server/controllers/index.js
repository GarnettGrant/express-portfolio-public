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