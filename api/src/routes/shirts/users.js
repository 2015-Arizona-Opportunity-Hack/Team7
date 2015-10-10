'use strict';

module.exports = function(app) {
  // Module dependencies.
  var mongoose = require('mongoose'),
  Users = mongoose.models.Users,
  extend = require('extend'),
  jwt = require('jsonwebtoken'),
  secret = require('../../config/secret'),
  auth = require('../../config/auth'),
  routeHelper = require('../../route-helper'),
  api = {};

  var tokenizeUser = function(user) {
    return {
      id: user._id,
      email: user.email,
      role: user.role
    };
  };

  // ALL
  api.users = function(req, res) {

    Users.find()
      .populate('designs')
      .exec(function(err, users) {
        if (err) {
          res.status(500).json(err);
        } else {
          res.json({data: users});
        }
      });
  };

  // GET
  api.user = function(req, res) {
    var id = req.params.userId;
    Users.findOne({_id: id}, function(err, user) {
      if (user) {
        if (err) {
          res.status(404).json(err);
        } else {
          res.json({data: user});
        }
      } else {
        res.status(404).end();
      }
    });
  };

  // POST
  api.addUser = function(req, res) {
    if (typeof req.body.data === 'undefined') {
      res.status(500);
      return res.json({message: 'user is undefined'});
    }

    var user = new Users(req.body.data);
    user.save(function(err) {
      if (!err) {
        return res.status(201).json({
          data: user
        });
      } else {
        return res.status(500).json(err);
      }
    });
  };

  // POST - REGISTER
  api.registerUser = function(req, res) {
    try {
      if (typeof req.body.data === 'undefined') {
        res.status(500);
        return res.json({message: 'user is undefined'});
      }

      var user = new Users(req.body.data);
      user.save(function(err) {
        if (!err) {
          return res.status(201).json({
            data: user.toJSON(),
            meta: {
              jwt: jwt.sign(tokenizeUser(user), secret.secretToken, {expiresInMinutes: 60 * 24})
            }
          });
        } else {
          return res.status(500).json(err);
        }
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({message: err});
    }
  };

  // PUT
  api.editUser = function(req, res) {
    var id = req.params.userId;

    if (typeof req.body.data === 'undefined') {
      res.status(500);
      return res.json({message: 'user is undefined'});
    }

    if (!routeHelper.isAdmin(req.user) && !(routeHelper.idMatches(req.body.data, id) && routeHelper.isUser(req.user, id))) {
      return res.status(401).end();
    }

    Users.findOne({_id: id}, function(err, user) {
      if (err) {
        return res.status(500).json(err);
      }

      req.body.data._id = req.body.data.id; // Manually set the _id for now...
      if (!user) {
        if(!routeHelper.isAdmin(req.user)){
          return res.status(401).end();
        }
        return api.addUser(req, res);
      }

      extend(true, user, req.body.data);

      return user.save(function(err) {
        if (!err) {
          return res.status(200).json({data: user});
        } else {
          return res.status(500).json(err);
        }
      });
    });
  };

  // DELETE
  api.deleteUser = function(req, res) {
    var id = req.params.userId;
    return Users.findOne({_id: id}, function(err, user) {
      return user.remove(function(err) {
        if (!err) {
          return res.send(204);
        } else {
          return res.status(500).json(err);
        }
      });
    });
  };


  api.login = function(req, res) {
    if (!(req.body && req.body.data)) {
      return res.status(401).json({message: 'User login failed'});
    }

    var email = req.body.data.email || '';
    var password = req.body.data.password || '';

    if (email === '' || password === '') {
      return res.status(401).json({message: 'User login failed'});
    }

    Users.findOne({'email': email})
      .exec(function(err, user) {
        if (err || !user) {
          return res.status(401).json({message: 'User login failed'});
        }

        if (user.authenticate(password)) {
          var token = jwt.sign(tokenizeUser(user), secret.secretToken, {expiresInMinutes: 60 * 24});
          return res.status(201).send({
            data: user,
            meta: {
              jwt: token
            }
          });
        } else {
          return res.status(401).json({message: 'User login failed'});
        }
      });
  };

  app
    .get('/api/users', auth.jwtCheck, auth.isAdmin, api.users)
    .get('/api/users/:userId', auth.jwtCheck, auth.isMongoId, api.user)
    .post('/api/users', auth.jwtCheck, api.addUser)
    .put('/api/users/:userId', auth.jwtCheck, auth.isMongoId, api.editUser)
    .delete('/api/users/:userId', auth.jwtCheck, auth.isMongoId, api.deleteUser);

  app
    .post('/api/register', api.registerUser);

  app
    .post('/api/login', api.login);

};
