const debug = require('debug')('app:flashCardControllers');
//const { MongoClient, ObjectId } = require('mongodb');


function bookControllers(bookService, nav) {
  function getIndex(req, res) {
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
  }


  function getById(req, res, next) {
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
        const book = await books.findOne({ _id: new ObjectId(id) });
        console.log('Bookd retrieved!' + JSON.stringify(req.book));

        book.details = await bookService.getBookById(book.bookId);
        debug('Mongodb Connected!' +   JSON.stringify(book.details));

        res.render('bookView', {
          nav,
          book,
          title: 'My Library from variable'
        });

      } catch (err) {
        debug(err.stack);
      }
      client.close();
      next();
    }());
  }

  function middleware(req, res, next) {
    if (req.user) {
      next();
    } else {
      res.redirect('/');
    }
  }

  return { getIndex, getById, middleware }
}
module.exports = bookControllers;