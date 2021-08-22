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
    const salt = 10;
    const hashed_pass = await bcrypt.hash(req.body.pass, 10);
    let form = {
        name:   req.body.name,
        age:    req.body.age,
        mail:   req.body.mail,
        pass:   hashed_pass,
        color:  req.body.color,
        secret: req.body.secret
    };
    console.log(typeof(form.color));
    
    db.sequelize.sync()
        .then(() => db.User.create(form))
        .then(usr => {
            res.redirect('/users/login');
        })
        .catch(err => {
            form.pass = '';
            let data = {
                title: 'SIGN UP',
                content: '以下のフォームをすべて入力して新規登録してください。',
                form: form,
                err: err
            }
            console.log(err);
            res.render('users/signup', data);
        });
    
});

module.exports = router;
