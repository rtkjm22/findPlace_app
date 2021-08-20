const express = require('express');
const router = express.Router();
const db = require('../models/index');
const { Op } = require('sequelize');
const { OPEN_READWRITE } = require('sqlite3');

/* GET users listing. */
router.get('/', (req, res, next) => {
    res.redirect('../');
});

router.get('/login', (req, res, next) => {
    let data = {
        title: 'ログイン画面です。',
        content: 'ログイン画面のコンテンツです。'
    }
    res.render('users/login', data);
});

router.get('/signup', (req, res, next) => {

    let data = {
        title: 'SIGN UP',
        content: '以下のフォームを入力して新規登録してください。',
        form: new db.User(),
        err: null,
    }
    res.render('users/signup', data);
});

router.post('/signup', (req, res, next) => {
    const form = {
        name:   req.body.name,
        age:    req.body.age,
        mail:   req.body.mail,
        pass:   req.body.pass,
        pass2:  req.body.pass2,
        color:  req.body.color,
        secret: req.body.secret
    };
    db.sequelize.sync()
        .then(() => db.User.create(form))
        .then(usr => {
            res.redirect('/users/login');
        })
        .catch(err => {
            let data = {
                title: 'SIGN UP',
                content: '以下のフォームを入力して新規登録してください。',
                form: form,
                err: err
            }
            console.log(err);
            res.render('users/signup', data);
        });
});

module.exports = router;
