const express = require('express');
const router = express.Router();
const db = require('../models/index');
const { Op } = require('sequelize');
const { OPEN_READWRITE } = require('sqlite3');

require('dotenv').config();
//環境変数API_KEYの中にapiキーが入っている
const key = process.env.API_KEY;


/* GET home page. */
router.get('/', (req, res, next) => {

  if (req.session.login) {
    res.redirect('/home');
    return;
  }
  

  const data = {
    title: 'Find What You Want',
    key: key,
  }
  res.render('index', data);
});

router.get('/search', (req, res, next) => {
    if (req.query) {
        let data = {
            title: 'Search Results',
            key: key,
        }
        res.render('search', data);
    } else {
        res.redirect('/');
    }
});

module.exports = router;
