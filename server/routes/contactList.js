let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let ejsLint = require('ejs-lint');
let passport = require('passport');
let LocalStrategy = require('passport-local')
// connect to contacts model
let Contacts = require('../models/business_contacts');
// connect to users model
let Users = require('../models/users');

let loggedIn = false;

//GET ROUTE for the business contacts page, Redirect to login URL - READ OPERATION
router.get('/', (req, res, next) => {
    Contacts.find((err, contactList) => {
        if (err) {
            return console.error(err);
        }
        else if(loggedIn == false){
            res.redirect('contactList/login')
        }
        else {
            res.render('secure/business_contacts_list',{title : "Business Contacts List", Contacts: contactList})
        }
    });
});
//GET ROUTE for displaying the business contacts login page - READ OPERATION
/* GET /login
 *
 * This route prompts the user to log in.
 *
 * The 'login' view renders an HTML form, into which the user enters their
 * username and password.  When the user submits the form, a request will be
 * sent to the `POST /login/password` route.
 */
router.get('/login', (req, res, next) => {
    res.render('secure/login', {title : "Login"})
});

passport.use(new LocalStrategy(
    function (username, password, done) {
        Users.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            if (!user.verifyPassword(password)) { return done(null, false); }
            return done(null, user);
        });
    }
));
/* POST /login/password
 *
 * This route authenticates the user by verifying a username and password.
 *
 * A username and password are submitted to this route via an HTML form, which
 * was rendered by the `GET /login` route.  The username and password is
 * authenticated using the `local` strategy.  The strategy will parse the
 * username and password from the request and call the `verify` function.
 *
 * Upon successful authentication, a login session will be established.  As the
 * user interacts with the app, by clicking links and submitting forms, the
 * subsequent requests will be authenticated by verifying the session.
 *
 * When authentication fails, the user will be re-prompted to login and shown
 * a message informing them of what went wrong.
 */
router.post('/login/password', passport.authenticate('local', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/contactList/login',
    failureMessage: true
  }));

// GET ROUTE for displaying the Add Page - CREATE OPERATION
// router.get('/add', (req, res, next) => {
//     res.render('secure/add', { title: 'Add Contact' });
// })
// POST ROUTE for processing the Add Page - CREATE OPERATION
// router.post('/add', (req, res, next) => {
//     let newContact = Contacts({
//         "name": req.body.name,
//         "number": req.body.number,
//         "email": req.body.email
//     });
//     Contacts.create(newContact, (err, Contact) => {
//         if (err) {
//             console.log(err);
//             res.end(err);
//         }
//         else {
//             res.redirect('/contactList')
//         }
//     })


// })

// GET ROUTE for displaying the Update Page - UPDATE OPERATION
router.get('/update/:id', (req, res, next) => {
    let id = req.params.id;
    Contacts.findById(id, (err, contactToUpdate) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('secure/update', { title: 'Edit Contact', contact: contactToUpdate });
        }
    });
});

// POST ROUTE for processing the Update page - UPDATE OPERATION
router.post('/update/:id', (req, res, next) => {
    let id = req.params.id;
    let updatedContact = Contacts({
        "_id": id,
        "name": req.body.name,
        "author": req.body.author,
        // "published":req.body.published,
        "description": req.body.description,
        "price": req.body.price
    });
    Contacts.updateOne({ _id: id }, updatedContact, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/contactList');
        }
    })
});

//GET ROUTE to perform Deletion - DELETE OPERATION
router.get('/delete/:id', (req, res, next) => {
    let id = req.params.id;
    Contacts.remove({ _id: id }, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/contactList');
        }
    });
});
module.exports = router;