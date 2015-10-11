'use strict';
console.log('TOP OF FILE=============================');
// Module dependencies.
var http = require('http'),
  https = require('https'),
  express = require('express'),
  compression = require('compression'),
  path = require('path'),
  fs = require('fs'),
  glob = require('glob'),
  expressValidator = require('express-validator'),
  methodOverride = require('method-override'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  favicon = require('serve-favicon'),
  errorhandler = require('errorhandler'),
  helmet = require('helmet'),
  cors = require('cors');

var env = process.env.NODE_ENV || 'development';
var srcPath = __dirname + '/src';

var app = module.exports = exports.app = express();

app.set('showStackError', true);

// Should be placed before express.static
// To ensure that all assets and data are compressed (utilize bandwidth)
app.use(compression({
  filter: function(req, res) {
    return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
  },
  // Levels are specified in a range of 0 to 9, where-as 0 is
  // no compression and 9 is best compression, but slowest
  level: 4
}));

// Bootstrap models
var modelsPath = path.join(srcPath, 'models');
var models = glob.sync(modelsPath + '/*/**/*.js');
models.forEach(function (file) {
  require(file)();
});


if ('development' == env) {
  app.use(morgan('dev'));
  app.use(errorhandler({
    dumpExceptions: true,
    showStack: true
  }));
  app.set('view options', {
    pretty: true
  });
}

if ('test' == env) {
  app.use(morgan('dev'));
  app.set('view options', {
    pretty: true
  });
  app.use(errorhandler({
    dumpExceptions: true,
    showStack: true
  }));
}

if ('production' == env) {
  app.use(morgan());
  app.use(errorhandler({
    dumpExceptions: false,
    showStack: false
  }));
}

// Prevent clickjacking
app.use(helmet.frameguard());

// Implement X-XSS-Protection
app.use(helmet.xssFilter());

// Implement X-Frame: Deny
app.use(helmet.xframe());

// Keep clients from sniffing the MIME type
app.use(helmet.noSniff());

// Implement Strict-Transport-Security
app.use(helmet.hsts({
  maxAge: 7776000000,
  includeSubdomains: true
}));

// Hide X-Powered-By
app.use(helmet.hidePoweredBy());

//CSP protection
app.use(helmet.contentSecurityPolicy({
  defaultSrc: ["'self'", 'crowdfunding.com'],
  reportOnly: false, // set to true if you only want to report errors
  setAllHeaders: false, // set to true if you want to set all headers
  disableAndroid: false, // set to true if you want to disable Android (browsers can vary and be buggy)
  safari5: false // set to true if you want to force buggy CSP in Safari 5
}));


// Connect to mongo db using mongoose driver
var mongoose = require(path.join(srcPath, '/config/mongoose'));
app.use(cors());
app.use(methodOverride());
app.use(bodyParser.json());
app.use(expressValidator());
app.use(bodyParser.urlencoded({extended: true}));


// Bootstrap routes/api
var routesPath = path.join(srcPath, '/routes');
var route = glob.sync(routesPath + '/**/*.js');
route.forEach(function (file) {
  require(file)(app);
});

app.use(function(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({message: 'User is not authorized access'});
  } else if (/SyntaxError:/gi.test(err)) {
    res.status(500).json({message: 'Syntax Error', errors: [{
      message: 'Failed to supply valid JSON'
    }]});
  } else if(err) {
    res.status(500).json({message: 'Generic Error', errors: [{
      message: env === 'test' ? err + '' : 'Unknown error'
    }]});
  } else {
    next();
  }
});

app.all('*', function(req, res) {
  if (/\/api/.test(req.url)) {
    console.error('End point not found...');
    return res.status(404).json({message: 'Endpoint was not found'});
  }
  return res.status(404).end();
});

// Start server
var port = {
  http: process.env.PORT || 3010,
  https: 443
};

if (false && 'production' == env) {
  var options = {
    key: fs.readFileSync(path.join(srcPath, '.tmp/ssl/chandlerfoodbank.org/private.key')),
    cert: fs.readFileSync(path.join(srcPath, '.tmp/ssl/chandlerfoodbank.org/ssl.pem'))
  };

  var httpsServer = https.createServer(options, app);

  httpsServer.listen(port.https, function() {
    console.log('HTTPS listening on port %d in %s mode', port.https, app.get('env'));
  });
}

app.listen(port.http, function() {
  console.log('HTTP listening on port %d in %s mode', port.http, app.get('env'));
});
