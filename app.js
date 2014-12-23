// Module dependencies
var express = require('express'),
    app = express(),
    consolidate = require('consolidate'),
    http = require('http').Server(app);

// Middleware
app.engine('html', consolidate.jade);
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'jade');

// Routers
app.get('/', function (req, res) {
  res.render("index");
});
app.get('/callback.html', function (req, res) {
  res.render("callback");
});

// Listen for requests
var server = http.listen(process.env.PORT || 3000, function () {});
