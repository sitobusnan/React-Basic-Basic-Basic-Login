const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


router.get("/userData", (req,res)=>{ 
  let user = req.user
  res.json(user)
})

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {
    if (err) { res.status(500).json({ message: 'Something went wrong authenticating user' }); return; }
    // "failureDetails" contains the error messages from our logic in "LocalStrategy" { message: '...' }.
    if (!theUser) { res.status(401).json(failureDetails); return; }
    // save user in session
    req.login(theUser, (err) => {
      if (err) { res.status(500).json({ message: 'Session save went bad.' }); return; }
      // We are now logged in (that's why we can also send req.user)
      res.status(200).json(theUser);
    });
  })(req, res, next);
});

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username === "" || password === "") {
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass
    });

    newUser.save()
    .then(() => {
    })
    .catch(err => {
    })
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.json({loggedOut: true, timestamp: new Date()})
});

module.exports = router;
