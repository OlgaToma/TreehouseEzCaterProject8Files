var express = require('express');
var path = require('path');
var routes = require('./routes/index');
var books = require('./routes/books');
var bodyParser = require('body-parser');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);
app.use('/books', books);

// catch 404 and send a friendly error page
app.use(function(req, res, next) {
  res.render('page-not-found');
});

// use a global error handler to catch errors (e.g. "book not found")
app.use((err, req, res, next) => {
  
  if(err.status == 404) {
    res.render('book-not-found', {err});
  } else {
    err.message = err.message || "Oops, there was an error on the server";
    res.status(err.status || 500).render('error', { err });
  }

});

module.exports = app;
