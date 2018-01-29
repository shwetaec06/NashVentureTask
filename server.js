// server.js

    // set up ========================
    var express  = require('express');
    var app      = express();                               // create our app w/ express
  //  var mongoose = require('mongoose');                     // mongoose for mongodb
    //var morgan = require('morgan');             // log requests to the console (express4)
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    //var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

    // configuration =================

//    mongoose.connect('mongodb://node:nodeuser@mongo.onmodulus.net:27017/uwO3mypu');     // connect to mongoDB database on modulus.io

    //app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    //app.use(morgan('dev'));                                         // log every request to the console
    //app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    //app.use(bodyParser.json());                                     // parse application/json
    //app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    //app.use(methodOverride());

    // listen (start app with node server.js) ======================================
    app.listen(8080);
    console.log("App listening on port 8080");


    // application -------------------------------------------------------------
    app.get('*', function(req, res) {
        res.sendfile('index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

    app.post('/api/images', function(req, res, next) {
    var cope = req.body;
    console.log('request received:', req.body);
   var query = connection.query('insert into cope set ?', cope, function (err,     result) {
    if (err) {
        console.error(err);
        return res.send(err);
    } else {
        return res.send('Ok');
    }
    });
    //res.send('received the data.');

///------------------- To fetch images from google using phantom.js-------------------------//////


    var path = require('path');
    var spawn = require('child_process').spawn;
    var phantomjs = require('phantomjs');
    var Promise = require('bluebird');

    function getImageUrls(url, callback) {
      var phantomArgs = [
        path.join(__dirname, 'lib', 'phantom_script.js'),
        url
      ];

      return new Promise(function(resolve, reject) {
        var phantom = spawn(phantomjs.path, phantomArgs);
        var images = null;
        var error = null;

        phantom.stdout.on('data', function(data) {
          data = "" + data;
          if (data.indexOf('Error') == 0) {
            error = data;
          }
          else {
            try {
              images = JSON.parse(data);
            }
            catch(e) {
              console.log('Error', data)
              error = e;
              images = null;
            }
          }
        });

        phantom.stderr.on('data', function(data) {
          error = data;
        });

        phantom.on('close', function(code) {
          if (!images && !error) {
            error = new Error('no images found');
          }

          if (error) {
            reject(error);
            if (callback) callback(error, null);
          }
          else {
            resolve(images)
            if (callback) callback(null, images);
          }
        });
      })
    }

    module.exports = getImageUrls;


    });
