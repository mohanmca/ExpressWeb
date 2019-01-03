const express = require('express');

const chalk = require('chalk');

const app = express();
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const port = process.env.PORT || 3000;

app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/font-awesome/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.set('views', './src/views');
//app.set('view engine', 'pug');
app.set('view engine', 'ejs');

app.get('/', (request, response) => {
  // response.sendFile(path.join(__dirname, '/views/index.html'));
  response.render('index', { title: 'My Library from variable', list: ['item-1', 'item-2'] });
});

app.get('/home', (request, response) => {
  // response.sendFile(path.join(__dirname, '/views/index.html'));
  response.render('home', { title: 'My Library from JS variable', list: ['item-1', 'item-2'] });
});

app.listen(port, () => {
  debug(`Listening at port  ${chalk.green(port)}`);
});
