const express = require('express');

const chalk = require('chalk');

const app = express();
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');
const session = require('express-session');

const port = process.env.PORT || 3000;

const nav = [{ link: '/books', title: 'Books' }, { link: '/authors', title: 'Authors' }, { link: '/auth/logout', title: 'Logout' }];
const mysqlBookRoutes = require('./src/routes/mysqlBookRoutes')(nav);
const bookRoutes = require('./src/routes/bookRoutes')(nav);
const adminRoutes = require('./src/routes/adminRoutes')(nav);
const authRoutes = require('./src/routes/authRoutes')(nav);

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
  // console.log('Fields are is: ', fields);
  // console.log('The solution is: ', results);
  if (error) throw error;
});

connection.end();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('some-secret'));
app.use(session({ session: 'library' }));

require('./src/config/passport.js')(app);

app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/font-awesome/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.set('views', './src/views');
// app.set('view engine', 'pug');
app.set('view engine', 'ejs');

app.use('/mysql/books', mysqlBookRoutes);
app.use('/books', bookRoutes);
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);


app.get('/', (request, response) => {
  // response.sendFile(path.join(__dirname, '/views/index.html'));
  response.render('index', {
    nav,
    list: ['item-1', 'item-2'],
    title: 'My Library from variable',
    books: [{
      "author": "Gzorgz zliot",
      "country": "Unitzd Kingdom",
      "imagzLink": "imagzs/middlzmarch.jpg",
      "languagz": "english",
      "link": "https://zn.wikipzdia.org/wiki/Middlzmarch\n",
      "pages": 800,
      "title": "Middlzmarch",
      "yzar": 1871
    }]
  }
  );
});


app.listen(port, () => {
  debug(`Listening at port  ${chalk.green(port)}`);
});
