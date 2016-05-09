require('dotenv').load()
var express = require('express');
var router = express.Router();
var knex = require('../db/knex.js');

var moment = require('moment');
var jwt = require('jwt-simple');
var queries = require('../db/queries.js');

router.post('/register', function(req, res, next) {
// ensure user does not already exist
    Promise.all([
        queries.CheckUsername(req.body.username),
        queries.CheckEmail(req.body.email)
    ])
    .then(function (response) {
        if (response.some(el => el.length)) {
            return res.status(409).json({
                status: 'fail',
                message: 'Username or email in use'
            });
        }
        // create new user
        queries.NewUser(req.body)
        .then(function(newUser) {
            newUser = newUser[0]
            var token = generateToken(newUser);
            res.status(200).json({
                status: 'success',
                data: {
                    token: token,
                    id: newUser.id,
                    user: newUser.username
                }
            });
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })
    })
});

//
//     });
//   })
//   .catch(function (err) {
//     return next(err);
//   });
// });


// // ** helpers ** //

// generate a token
function generateToken(user) {
  var payload = {
    exp: moment().add(14, 'days').unix(),
    iat: moment().unix(),
    sub: user.id
  };
  return jwt.encode(payload, process.env.TOKEN_SECRET);
}

// // ensure authenticated
// function ensureAuthenticated(req, res, next) {
//   // check headers for the presence of an auth object
//   if(!(req.headers && req.headers.authorization)) {
//     return res.status(400).json({
//       status: 'fail',
//       message: 'No header present or no authorization header.'
//     });
//   }
//   // decode the token
//   var header = req.headers.authorization.split(' ');
//   var token = header[1];
//   var payload = jwt.decode(token, process.env.TOKEN_SECRET);
//   var now = moment().unix();
//   // ensure that it is valid
//   if(now > payload.exp || payload.iat > now) {
//     return res.status(401).json({
//       status: 'fail',
//       message: 'Token is invalid'
//     });
//   }
//   // ensure user is still in the database
//   User.findById(payload.sub, function(err, user){
//     if(err) {
//       return next(err);
//     }
//     if(!user) {
//       return res.status(400).json({
//         status: 'fail',
//         message: 'User does not exist'
//       });
//     }
//     // attach user to request object
//     req.user = user;
//     // call next middleware function
//     next();
//   });
// }



module.exports = router;