const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const {
    ExtractJwt
} = require('passport-jwt');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const config = require('./keys');


// LOCAL STRATEGY

passport.use(new LocalStrategy({
    usernameField: "email"
}, async (email, password, done) => {
    const user = await User.findOne({
        email
    });

    if (!user) {
        return done(null, false);
    }
    bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
            return done(null, user);
        } else {
            return done(null, false);
        }

    });
}));

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.JWT_SECRET
}, async (payload, done) => {
    try {
        // Find the user specified in token
        const user = await User.findById(payload.sub);


        // If user doesn't exists, handle it
        if (!user) {
            return done(null, false);
        }

        // Otherwise, return the user
        done(null, user);
    } catch (error) {
        done(error, false);
    }
}));







// module.exports = passport => {
//       passport.use(new LocalStrategy({ usernameField: "email" },async (email, password, done) =>   {
//         await User.findOne({ email }, (err, user ) => {
//             if(err) throw err;
//             if(!user) {
//                 return done (null,false, {message: 'missing credentials'});
//             }
//             bcrypt.compare(password, user.password, (err , isMatch) => {
//                 if(err) throw err;
//                 if(isMatch) {
//                     return done(null,user);
//                 }  else {
//                     return done(null,false);
//                 }

//             });
//         });
//     }));
//      passport.serializeUser(function(user, done) {
//         done(null, user.id);
//       });

//     passport.deserializeUser(function(id, done) {
//         User.findById(id, function(err, user) {
//           done(err, user);
//         });
//       });
// }
// module.exports = function(passport){
//     // Local Strategy
//     passport.use(new LocalStrategy({usernameField: 'email'}, async function(username, password, done){
//       // Match Username

//     await User.findOne({email:email}, function(err, user){
//         if(err) throw err;
//         if(!user){
//           return done(null, false, {message: 'No user found'});
//         }

//         // Match Password
//         bcrypt.compare(password, user.password, function(err, isMatch){
//           if(err) throw err;
//           if(isMatch){
//             return done(null, user);
//           } else {
//             return done(null, false, {message: 'Wrong password'});
//           }
//         });
//       });
//     }));