var express = require('express');
var router = express.Router();
var Book = require("../models").Book;

/* GET (show) book list. */
router.get('/', function(req, res, next) {
  Book.findAll({order: [["createdAt", "DESC"]]}).then(function(books){
    res.render("index", {books: books, title: "Books" });
  }).catch(function(error){
    next(error);
   });
});

/* GET (show) new book form. */
router.get("/new", function(req, res, next){
  res.render("new-book", {book: Book.build()}); 
});

/* POST (create) new book. */
router.post("/new", function(req, res, next){
  Book.create(req.body).then(function(book){
    res.redirect('/books/');
  }).catch(function(error) {
    if(error.name === "SequelizeValidationError") {
      res.render("new-book", {book: Book.build(req.body), errors: error.errors, title: "New Book"})
    } else {
      next(error);
    }
  }).catch(function(error){
    next(error);
  });
});

/* GET (show) individual book. */
router.get("/:id", function(req, res, next){
  Book.findByPk(req.params.id).then(function(book){
    if(book) {
      res.render("update-book", {book: book});  
    } else {
      err = new Error()
      err.status = 404
      err.message = "Couldn't find book with id: " + req.params.id;
      next(err);
    }
  }).catch(function(error){
    next(error);
   });
});

/* POST (update) individual book. */
router.post("/:id", function(req, res, next){
  Book.findByPk(req.params.id).then(function(book){
    if(book) {
      return book.update(req.body);
    } else {
      err = new Error()
      err.status = 404
      err.message = "Couldn't find book with id: " + req.params.id;
      next(err);
    }
  }).then(function(book) {
    res.redirect('/books/');
  }).catch(function(error) {
    if(error.name === "SequelizeValidationError") {
      res.render("update-book", {book: Book.build(req.body), errors: error.errors})
    } else {
      next(error);
    }
  }).catch(function(error){
    next(error);
  });
});

/* POST (delete) individual book. */
router.post("/:id/delete", function(req, res, next){
  Book.findByPk(req.params.id).then(function(book){  
    if(book) {
      return book.destroy();
    } else {
      err = new Error()
      err.status = 404
      err.message = "Couldn't find book with id: " + req.params.id;
      next(err);
    }
  }).then(function(){
    res.redirect("/books/");    
  }).catch(function(error){
    next(error);
   });
});

module.exports = router;