const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const {
  JWT_SECRET
} = require("../../config/keys");

signToken = user => {
  return jwt.sign({
      id: user.id,
      email: user.email
    },
    JWT_SECRET
  );
};

//user login
//no async/await
router.post("/signin", (req, res, next) => {
  passport.authenticate(
    "local", {
      session: false
    },
    function (err, user, info) {
      if (err) {
        return next(err); // 500 error
      }

      if (!user) {
        return res.status(401).json({
          error: "Invalid credentials"
        });
      }
      req.login(
        user, {
          session: false
        },
        loginErr => {
          if (loginErr) {
            return next(loginErr);
          }
          const token = signToken(req.user);
          return res.status(200).json({

            user: user,
            token,
            message: "Login successful"
          });
        }
      );
    }
  )(req, res, next);
});

// user registration
//async testing
router.post("/signup", async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    password
  } = req.body;
  // Check if this user already exisits
  const findUser = await User.findOne({
    email
  });
  // If user exists -> error
  if (findUser) {
    return res.status(403).json({
      error: "Email already in use"
    });
  }
  //create a new user
  const newUser = new User({
    firstname,
    lastname,
    email,
    password
  });

  // hash password
  const salt = 10;
  bcrypt.hash(newUser.password, salt, (err, hash) => {
    if (err) {
      console.log(err);
    }
    newUser.password = hash;
    newUser.save(err => {
      if (err) {
        console.log(err);
        return;
      }
    });
  });
  //token
  const token = signToken(newUser);

  // repsond token
  res.status(200).json({
    token,
    message: "success"
  });
});

// token route
router.get(
  "/secret",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {

    res.json({
      id: req.user.id,
      email: req.user.email
    });
  }
);
module.exports = router;