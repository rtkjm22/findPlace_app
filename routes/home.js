const express = require('express');
const router = express.Router();
const db = require('../models/index');
const { Op } = require('sequelize');
const { OPEN_READWRITE } = require('sqlite3');

function check_sesison(req, res) {
    if (req.session.login == null) {
        req.session.back = '/home';
        res.redirect('../users/login');
        return true;
    } else {
        return false;
    }
}

/* GET users listing. */
router.get('/', (req, res, next) => {
    if(check_sesison(req, res)){ return };
    let data = {
        title: 'home',
        content: 'home_content'
    }
    res.render('home/index', data);
});




module.exports = router;
