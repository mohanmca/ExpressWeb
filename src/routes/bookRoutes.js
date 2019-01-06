/* eslint-disable prefer-destructuring */

const fs = require('fs');
const express = require('express');
const path = require('path');
const mysql = require('mysql');
const debug = require('debug')('app:bookRoutes');
const { MongoClient, ObjectId } = require('mongodb');

const sampleBooks = JSON.parse(fs.readFileSync(path.join(__dirname, '../views/books.json')));
//console.log(sampleBooks);

function router(nav) {
  const bookRouter = express.Router();
  bookRouter.use((req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.redirect('/');
    }
  });
  bookRouter.route('/')
    .get((req, res) => {
      debug('Mongodb Connection would be established!');
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';
      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          const db = client.db(dbName);
          debug('Mongodb Connected!');
          const col = await db.collection('books');
          const books = await col.find().toArray();

          res.render('booksListView', {
            nav,
            books,
            title: 'My Library from variable'
          });

        } catch (err) {
          debug(err.stack);
        }
        client.close();
      }());
    });

  bookRouter.route('/:id')
    .all((req, res, next) => {
      const { id } = req.params;
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';
      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          const db = client.db(dbName);
          const books = await db.collection('books');
          console.log('Mongodb Connected!');
          req.book = await books.findOne({ _id: new ObjectId(id) });
          console.log('Bookd retrieved!' + JSON.stringify(req.book));
        } catch (err) {
          debug(err.stack);
        }
        client.close();
        next();
      }());
    })
    .get((req, res) => {
      res.render('bookView', {
        nav,
        book: req.book,
        title: 'My Library from variable'
      });
    });


  return bookRouter;
}


module.exports = router;
