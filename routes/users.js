const express = require('express');
const router = express.Router();
const db = require('../models/index');
const { Op } = require('sequelize');
const { OPEN_READWRITE } = require('sqlite3');
const bcrypt = require('bcrypt');

/* GET users listing. */
router.get('/', (req, res, next) => {
    res.redirect('../');
});

router.get('/login', (req, res, next) => {
    let data = {
        title: 'LOG IN',
        content: '以下のフォームからログインしてください。'
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

router.post('/signup', async (req, res, next) => {
    const pass = req.body.pass;
    const pass2 = req.body.pass2;
    const salt = 10;
    if (pass === pass2) {
        const hashed = await bcrypt.hash(pass, salt);
        const form = {
            name:   req.body.name,
            age:    req.body.age,
            mail:   req.body.mail,
            pass:   hashed,
            pass2:  hashed,
            color:  req.body.color,
            secret: req.body.secret
        };
    } else {
        const form = {
            name:   req.body.name,
            age:    req.body.age,
            mail:   req.body.mail,
            pass:   req.body.pass,
            pass2:  req.body.pass2,
            color:  req.body.color,
            secret: req.body.secret
        };
    }
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
