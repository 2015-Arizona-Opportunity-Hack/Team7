'use strict';

module.exports = function(app) {
  // Module dependencies.
  var extend = require('extend'),
  mongoose = require('mongoose'),
  Events = mongoose.models.Events,
  auth = require('../../config/auth'),
  api = {};

  // ALL
  api.events = function(req, res) {
    Events.find(function(err, events) {
      if (err) {
        res.status(500).json(err);
      } else {
        res.json({data: events});
      }
    });
  };

  // GET
  api.event = function(req, res) {
    var id = req.params.eventId;

    Events.findOne({_id: id}, function(err, event) {
      if (event) {
        if (err) {
          res.status(404).json(err);
        } else {
          res.json({data: event});
        }
      } else {
        res.status(404).end();
      }
    });
  };

  // POST
  api.addEvent = function(req, res) {
    if (typeof req.body.data === 'undefined') {
      res.status(500);
      return res.json({message: 'event is undefined'});
    }

    var event = new Events(req.body.data);
    event.save(function(err) {
      if (!err) {
        return res.status(201).json({
          data: event.toObject()
        });
      } else {
        return res.status(500).json(err);
      }
    });
  };

  // PUT
  api.editEvent = function(req, res) {
    var id = req.params.eventId;

    Events.findOne({_id: id}, function(err, event) {
      if (err) {
        return res.status(500).json(err);
      }

      if (!event) {
        return api.addEvent(req, res);
      }

      extend(true, event, req.body.data);

      return event.save(function(err) {
        if (!err) {
          return res.status(200).json({data: event});
        } else {
          return res.status(500).json(err);
        }
      });
    });
  };

  // DELETE
  api.deleteEvent = function(req, res) {
    var id = req.params.eventId;

    return Events.findOne({_id: id}, function(err, event) {
      return event.remove(function(err) {
        if (!err) {
          return res.send(204);
        } else {
          return res.status(500).json(err);
        }
      });
    });
  };


  app.get('/api/events', api.events);
  app.get('/api/events/:eventId', api.event);
  app.post('/api/events', auth.jwtCheck, api.addEvent);
  app.put('/api/events/:eventId', auth.jwtCheck, api.editEvent);
  app.delete('/api/events/:eventId', auth.jwtCheck, api.deleteEvent);
};
