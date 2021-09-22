const express = require('express');
const router = express.Router();
const db = require('../models/index');
const { Op } = require('sequelize');
const { OPEN_READWRITE } = require('sqlite3');
const { check, validationResult } = require('express-validator');

require('dotenv').config();
//環境変数API_KEYの中にapiキーが入っている
const key = process.env.API_KEY;
const home_path = "http://localhost:3000";


/* GET home page. */
router.get('/', (req, res, next) => {

  if (req.session.login) {
    res.redirect('/home');
    return;
  }
  

  const data = {
    title: 'Find What You Want',
    key: key
  }
  res.render('index', data);
});

router.get('/search', (req, res, next) => {
    if (req.query) {
        let data = {
            title: 'Search Results',
            key: key
        }
        res.render('search', data);
    } else {
        res.redirect('/');
    }
});

router.get('/contact', (req, res, next) => {
  let data = {
    title: 'CONTACT',
    err: null,
    form: null,
    arr: '',
  }
  res.render('contact', data);
});

router.post('/contact', [
  check('name')
    .notEmpty().withMessage('お名前は必ず入力してください')
    .isLength({ min: 1, max: 20 }).withMessage('お名前は1文字以上20文字以内で入力してください')
    .escape(),

  check('mail')
    .notEmpty().withMessage('メールアドレスを入力してください')
    .isEmail().withMessage('メールアドレス形式で入力してください')
    .isLength({ min: 1, max: 50}).withMessage('メールアドレスは1文字以上50文字以内で入力してください')
    .escape(),

  check('type')
    .notEmpty().withMessage('お問い合わせ種別は必ず入力してください')
    .isInt().withMessage('不正なお問い合わせ種別です1'),

  check('content')
    .notEmpty().withMessage('お問い合わせ内容は必ず入力してください')
    .isLength({ min: 1, max: 300 }).withMessage('お問い合わせ内容は1文字以上300文字以内で入力してください')
    .escape()

], (req, res, next) => {
  const errors = validationResult(req);

  const b = req.body;
  
  if (!errors.isEmpty()) {
    const arr = errors.array();
    let data = {
      title: 'CONTENT',
      err: null,
      form: null,
      arr: arr
    }
    res.render('contact', data);
  } else {

    let path = `${home_path}/confirm?n=${b.name}&m=${b.mail}&t=${b.type}&c=${b.content}`;
  
    res.redirect(path);
  }

});

router.get('/confirm', (req, res, next) => {
  const q = req.query;
  if (!q.n  || !q.m || !q.t || !q.c) {
    res.redirect(`${home_path}/contact`);
  }
  const form = {
    name: q.n,
    mail: q.m,
    type: q.t,
    content: q.c
  }

  let data = {
    title: 'CONFIRM',
    form: form,
    path: `?n=${q.n}&m=${q.m}&t=${q.t}&c=${q.c}`
  }
  res.render('confirm', data);
});

router.get('/thanks', (req, res, next) => {
  const q = req.query;
  if (!q.n  || !q.m || !q.t || !q.c) {
    res.redirect(`${home_path}/contact`);
  }

  let data = {
    title: 'THANKS',
  }
  res.render('thanks', data);
});



module.exports = router;
