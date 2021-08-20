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

router.post('/signup', (req, res, next) => {
    async function checkpw() {
        const hashed_pass = await hash_pass(req.body.pass, 10);
        const hashed_pass2 = await hash_pass(req.body.pass2, 10);
        console.log(hashed_pass);
        console.log(hashed_pass2);
    }

    async function hash_pass(password, stretch) {
        let hashedPassword = await bcrypt.hash(password, stretch);
        return hashedPassword;
    }

    const form = {
        name:   req.body.name,
        age:    req.body.age,
        mail:   req.body.mail,
        pass:   req.body.pass,
        pass2:  req.body.pass2,
        color:  req.body.color,
        secret: req.body.secret
    };
    let err;

    let data = {
        title: 'SIGN UP',
        content: '以下のフォームを入力して新規登録してください。',
        form: form,
        err: err
    }
    res.render('user/signup', data);
    
    // db.sequelize.sync()
    //     .then(() => db.User.create(form))
    //     .then(usr => {
    //         res.redirect('/users/login');
    //     })
    //     .catch(err => {
    //         let data = {
    //             title: 'SIGN UP',
    //             content: '以下のフォームを入力して新規登録してください。',
    //             form: form,
    //             err: err
    //         }
    //         console.log(err);
    //         res.render('users/signup', data);
    //     });
});

module.exports = router;
