const express = require('express');
const router = express.Router();
const db = require('../models/index');
const { Op } = require('sequelize');
const { OPEN_READWRITE } = require('sqlite3');
const key = process.env.API_KEY;

function check_session(req, res) {
    if (req.session.login == null) {
        req.session.back = '/users/login';
        res.redirect(req.session.back);
        return true;
    } else {
        return false;
    }
}

/* GET users listing. */
router.get('/', (req, res, next) => {
  if(check_session(req, res)){ return };

  const name = req.session.login.name;
  const age  = req.session.login.age;
  const path = `/home/${name}/${age}`;
  res.redirect(path);
});

router.get('/hoge', (req, res, next) => {
  if (check_session(req, res)) { return };
  let data = {
    title: 'hoge',
    content: 'data',
  }
  res.render('home/hoge', data);
});

router.get('/:name/:age', (req, res, next) => {
  if (check_session(req, res)) { return };

  const name = req.params.name;
  const age = req.params.age;
  const content = `こんにちは、${name}さん！`;

  let data = {
    title: 'HOME',
    content: content,
    key: key,
  }
  res.render('home/each', data);
});



module.exports = router;
