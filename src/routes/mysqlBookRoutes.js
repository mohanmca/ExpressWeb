/* eslint-disable prefer-destructuring */

const fs = require('fs');
const express = require('express');
const path = require('path');
const mysql = require('mysql');
const debug = require('debug')('app:bookRoutes');
const { MongoClient } = require('mongodb');

const sampleBooks = JSON.parse(fs.readFileSync(path.join(__dirname, '../views/books.json')));
//console.log(sampleBooks);

function router(nav) {
  const bookRouter = express.Router();
  bookRouter.route('/')
    .get((req, res) => {
      const connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        password: 'euler',
        user: 'euler',
        database: 'thales',
        schema: 'thales' // created by default
      });

      connection.connect();

      connection.query('select * from books', function (error, results, fields) {
        //console.dir(results[0]);
        //console.log("Results " + results);

        // console.log("Results " + JSON.stringify(results));

        if (error) {
          throw error
        }
        else {
          res.render('booksListView', {
            nav,
            books: results,
            title: 'My Library from variable'
          });
        }
      });
      connection.end();
    });

  bookRouter.route('/:id')
    .all((req, res, next) => {
      const { id } = req.params;
      const connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        password: 'euler',
        user: 'euler',
        database: 'thales',
        schema: 'thales' // created by default
      });

      connection.connect();
      const sql = 'select * from books where ID=' + id;
      connection.query(sql, function (error, results, fields) {
        console.log(results)
        if (error) {
          throw error
        }
        else {
          [req.book] = results
        }
        connection.end();
        next();
      })
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
