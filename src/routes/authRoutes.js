/* eslint-disable prefer-destructuring */

const express = require('express');
const passport = require('passport');
const debug = require('debug')('app:bookRoutes');
const { MongoClient, ObjectId } = require('mongodb');

function router(nav) {
  const authRouter = express.Router();
  authRouter.route('/signUp')
    .post((req, res) => {
      const { username, password } = req.body;
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';
      (async function addUser() {
        let client;
        try {
          client = await MongoClient.connect(url);
          const db = client.db(dbName);
          const user = { username, password };
          debug('Mongodb Connected!');
          const col = await db.collection('users');
          const results = await col.insertOne(user);
          debug(results);
          //create user
          req.login(results.ops[0], () => {
            res.redirect('/auth/profile');
          });

        } catch (err) {
          debug(err.stack);
        }
        client.close();
      }());
    });

  authRouter.route('/signIn')
    .get((req, res) => {
      res.render('signin', {
        nav,
        title: 'Sign In'
      });
    })
    .post(passport.authenticate('local', {
      successRedirect: '/auth/profile',
      failureRedirect: '/'
    }));

  authRouter.route('/profile')
    .all((req, res, next) => {
      if (req.user) {
        next();
      } else {
        res.redirect('/');
      }
    })
    .get((req, res) => {
      res.json(req.user);
    });

  authRouter.route('/logout')
    .get((req, res) => {
      req.logOut();
      res.redirect('/');
    });

  return authRouter;
}


module.exports = router;
