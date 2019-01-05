/* eslint-disable prefer-destructuring */

const fs = require('fs');
const express = require('express');
const path = require('path');

function router(nav) {
  const bookRouter = express.Router();

  const books = JSON.parse(fs.readFileSync(path.join(__dirname, '../views/books.json')));

  bookRouter.route('/')
    .get((req, res) => {
      res.render('booksListView', {
        nav,
        books,
        title: 'My Library from variable'
      });
    });

  bookRouter.route('/:id')
    .get((req, res) => {
      const { id } = req.params;
      res.render('bookView', {
        nav,
        book: books[id],
      });
    });
  return bookRouter;
}


module.exports = router;
