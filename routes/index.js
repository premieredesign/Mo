const express = require('express');
const router = express.Router();
const multer = require('multer');
const passport = require('passport');
const createdUser = require('../models/user');
const login = require('../models/login');
const mid = require('../middleware');





//==================== For Facebook login Users ========================

//GET /auth/login/facebook
router.get('/login/facebook',
  passport.authenticate('facebook', {scope: ["email"]}));

router.get('/return',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect to the profile page.
    return res.render('facebook-profile', { title: 'Profile', name: req.user.name, photo: req.user.photo });
  });


//==================== End of Facebook login =======================================





//==================== For Reqistering Users ========================
router.get('/register', (req, res, next) => {
  return res.render('register', { title: 'Sign Up'});
});

// Send the registered user to MongoDB for storing
router.post('/register', (req, res, next) => {
  // Check that all fields are required from the register form
  if (req.body.email && req.body.name && req.body.favoriteApparel && req.body.password && req.body.confirmPassword) {
    // Check passwords too!
    if (req.body.password !== req.body.confirmPassword) {
      let err = new Error("Passwords do not match");
      err.status = 400;
      return next(err);
    }
    // Create the data/model object that will be sent and stored in Mongo from user input
    const userInputInfo = {
      email: req.body.email,
      name: req.body.name,
      favoriteApparel: req.body.favoriteApparel,
      password: req.body.password
    };
    // Now use that to create a schema model that wil be sent to Mongo documents
    createdUser.create(userInputInfo, (error, userInputInfo) => {
      if (error) {
        return next(error);
      } else {
        // create a session id and redirect to profile page
        req.session.userId = userInputInfo._id;
        return res.redirect('/profile');
      } // delete ); after uncommenting
    });
  } else {
    let err = new Error('All fields are required!');
    err.status = 400;
    return next(err);
  }
});

//==================== End of Registering =======================================


//===================  Profile ================================
// Get the profile of authenticated users
router.get('/profile', (req, res, next) => {
  // First check to see if authorized user
  // add mid.requiresLogin next to '/profile', mid.requiresLogin, ()
  if (!res.locals.currentUser) {
    let err = new Error('You are not authorized to view this page. Please login!');
    err.status = 403; // means forbidden
    return next(err);
  }
  if (req.session.loginId) {
    login.findById(req.session.loginId)
      .exec(function (error, loginInputInfo) {
        if (error) {
          return next(error);
        } else {
          //return res.render('registered-profile', { title: 'Registered User', name: loginInputInfo.name });
          return res.render('facebook-profile', { title: 'Facebook User', name: loginInputInfo.name, photo: loginInputInfo.photo });
        }
      });
  } else if (req.session.userId) {
    // Find the user logged in by ID tag
    createdUser.findById(req.session.userId)
      .exec(function (error, userInputInfo) {
        if (error) {
          return next(error);
        } else {
          return res.render('profile', { title: 'Profile', name: userInputInfo.name, favorite: userInputInfo.favoriteApparel});
          //return res.render('profile', { title: 'Profile', name: req.user.name, photo: req.user.photo });
        }
      });
  } else {
    let err = new Error("Please try again!");
    err.status = 403;
    return next(err);
  }
});

//===================== End of Profile ========================



//===================  Signed-In Users Profile ================================
// Get the profile of authenticated users
router.get('/registered/profile', (req, res, next) => {
  // First check to see if authorized user
  // add mid.requiresLogin next to '/profile', mid.requiresLogin, ()
  if (!req.session.loginId) {
    let err = new Error('You are not authorized to view this page. Please login!');
    err.status = 403; // means forbidden
    return next(err);
  }
  // Find the user logged in by ID tag
  login.findById(req.session.loginId)
    .exec(function (error, loginInputInfo) {
      if (error) {
        return next(error);
      } else {
        return res.render('registered-profile', { title: 'Registered User', name: loginInputInfo.name });
        //return res.render('profile', { title: 'Profile', name: req.user.name, photo: req.user.photo });
      }
    });
});

//===================== End of Signed-In Users Profile ========================



//===================  Signed-In Users Profile ================================
// Get the profile of authenticated users
router.get('/facebook/profile', (req, res, next) => {
  // First check to see if authorized user
  // add mid.requiresLogin next to '/profile', mid.requiresLogin, ()
  if (!req.session.loginId) {
    let err = new Error('You are not authorized to view this page. Please login!');
    err.status = 403; // means forbidden
    return next(err);
  }
  // Find the user logged in by ID tag
  login.findById(req.session.loginId)
    .exec(function (error, loginInputInfo) {
      if (error) {
        return next(error);
      } else {
        //return res.render('registered-profile', { title: 'Registered User', name: loginInputInfo.name });
        return res.render('facebook-profile', { title: 'Facebook User', name: loginInputInfo.name, photo: loginId.photo });
      }
    });
});

//===================== End of Signed-In Users Profile ========================
//==================== Login ==================================
router.get('/login', (req, res, next) => {
  return res.render('login', { title: 'Log In'});
});

// send authentication to login after getting page
router.post('/login', (req, res, next) => {
  // Check to see if the request sent has email and password for login
  if(req.body.email && req.body.password) {
    const loginInputInfo = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    };
    // Now use that to create a schema model that wil be sent to Mongo documents
    login.create(loginInputInfo, (error, loginInputInfo) => {
      if (error) {
        return next(error);
      } else {
        // create a session id and redirect to profile page
        req.session.loginId = loginInputInfo._id;
        return res.redirect('/profile');
      } // delete ); after uncommenting
    });

  } else {
    let err = new Error("Email and password are required");
    err.status = 401;
    return next(err);
  }
});


//==================== End of Login ==================================

//==================== LogOUt==================================
router.get('/logout', (req, res, next) => {
  if(req.session) {
    req.session.destroy((err) => {
      if(err) {
        return (next);
      } else {
        return res.redirect('/');
      }
    });
  }
});



//==================== For uploading images on Shop page ==================================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img/')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '_' + Date.now() + '.jpg')
  }
});

const upload = multer({ storage: storage }).array('photos', 34);

router.post('/shop', (req, res) => {
  upload(req, res, (err) => {
    if (err) {

    }
    res.json({
      success: true,
      message: "Files uploaded!"
    });
  })
});

//=================== Set up pages routing =====================================
// Home route
router.get('/mofit', (req, res, next) => {
  res.render('Hello');
});

// About route
router.get('/about', (req, res, next) => {
  res.render('about', { title: 'About'});
});

// Contact route
router.get('/contact', (req, res, next) => {
  res.render('contact', { title: 'Contact'});
});

// Shop route
router.get('/shop', (req, res, next) => {
  res.render('shop', { title: 'Apparel'});
});

module.exports = router;
