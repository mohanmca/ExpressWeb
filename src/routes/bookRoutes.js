/* eslint-disable prefer-destructuring */

const fs = require('fs');
const express = require('express');
const path = require('path');

const bookRouter = express.Router();

const books = JSON.parse(fs.readFileSync(path.join(__dirname, '../views/books.json')));

bookRouter.route('/')
  .get((req, res) => {
    res.render('books', {
      nav: [
        { link: '/books', title: 'Books' },
        { link: '/authors', title: 'Authors' }],
      list: ['item-1', 'item-2'],
      title: 'My Library from variable',
      books
    });
  });

bookRouter.route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    res.render('book', {
      nav: [
        { link: '/books', title: 'Books' },
        { link: '/authors', title: 'Authors' }],
      list: ['item-1', 'item-2'],
      title: 'My Library from variable',
      book: books[id]
    });
  });

module.exports = bookRouter;
