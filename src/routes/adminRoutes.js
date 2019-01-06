const express = require('express');

const adminRouter = express.Router();
const { MongoClient } = require('mongodb');
const debug = require('debug')('adminRoutes');
const fs = require('fs');
const path = require('path');

const books = JSON.parse(fs.readFileSync(path.join(__dirname, '../views/books.json')));

function router(nav) {
  adminRouter.route('/')
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
          const response = await db.collection('books').insertMany(books);
          res.json(response);
        } catch (err) {
          debug(err.stack);
        }
        client.close();
      }());
    });
  return adminRouter;
}

module.exports = router;
