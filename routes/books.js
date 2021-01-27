var express = require('express');
var router = express.Router();
var Book = require("../models").Book;

/* GET (show) book list. */
router.get('/', function(req, res, next) {
  Book.findAll({order: [["createdAt", "DESC"]]}).then(function(books){
    res.render("books/book-list", {books: books, title: "Books" });
  }).catch(function(error){
      console.error(error);
      res.render('error');
   });
});

/* GET (show) new book form. */
router.get("/new", function(req, res, next){
  res.render("books/book-new", {book: Book.build()}); 
});

/* POST (create) new book. */
router.post("/new", function(req, res, next){
  Book.create(req.body).then(function(book){
    res.redirect('/books/');
  }).catch(function(error) {
    if(error.name === "SequelizeValidationError") {
      res.render("books/book-new", {book: Book.build(req.body), errors: error.errors, title: "New Book"})
    } else {
      throw error;
    }
  }).catch(function(error){
    console.error(error);
    res.render('error');
  });
});

/* GET (show) individual book. */
router.get("/:id", function(req, res, next){
  Book.findByPk(req.params.id).then(function(book){
    if(book) {
      res.render("books/book-update", {book: book});  
    } else {
      console.error("Couldn't find book with id: " + req.params.id);
      res.render('books/book-not-found');
    }
  }).catch(function(error){
      console.error(error);
      res.render('books/book-not-found');
   });
});

/* POST (update) individual book. */
router.post("/:id", function(req, res, next){
  Book.findByPk(req.params.id).then(function(book){
    if(book) {
      return book.update(req.body);
    } else {
      console.error("Couldn't find book with id: " + req.body.id);
      res.render('error');
    }
  }).then(function(book) {
    res.redirect('/books/');
  }).catch(function(error) {
    if(error.name === "SequelizeValidationError") {
      res.render("books/book-update", {book: Book.build(req.body), errors: error.errors})
    } else {
      throw error;
    }
  }).catch(function(error){
      console.error(error);
      res.render('error');
  });
});

/* POST (delete) individual book. */
router.post("/:id/delete", function(req, res, next){
  Book.findByPk(req.params.id).then(function(book){  
    if(book) {
      return book.destroy();
    } else {
      console.error("Couldn't find book with id: " + req.params.id);
      res.render('error');
    }
  }).then(function(){
    res.redirect("/books");    
  }).catch(function(error){
      console.error(error);
      res.render('error');
   });
});

module.exports = router;