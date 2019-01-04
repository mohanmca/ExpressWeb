const express = require('express');

const chalk = require('chalk');

const app = express();
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const port = process.env.PORT || 3000;
const bookRouter = express.Router();
const fs = require('fs')
const books = JSON.parse(fs.readFileSync(path.join(__dirname, '/src/views/books.json')));


app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/font-awesome/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.set('views', './src/views');
// app.set('view engine', 'pug');
app.set('view engine', 'ejs');

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

bookRouter.route('/single')
  .get((req, res) => {
    res.send('Single book');
  });


app.use('/books', bookRouter);


app.get('/', (request, response) => {
  // response.sendFile(path.join(__dirname, '/views/index.html'));
  response.render('index', {
    nav: [
      { link: '/books', title: 'Books' },
      { link: '/authors', title: 'Authors' }],
    list: ['item-1', 'item-2'],
    title: 'My Library from variable',
  }
  );
});

app.get('/home', (request, response) => {
  // response.sendFile(path.join(__dirname, '/views/index.html'));
  response.render('home',
    {
      nav: [
        { link: '/books', title: 'Books' },
        { link: '/authors', title: 'Authors' }],
      list: ['item-1', 'item-2'],
      title: 'My Library from variable',
    });
});

app.listen(port, () => {
  debug(`Listening at port  ${chalk.green(port)}`);
});
