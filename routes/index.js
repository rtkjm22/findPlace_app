const express = require('express');
const router = express.Router();
const db = require('../models/index');
const { Op } = require('sequelize');

require('dotenv').config();

/* GET home page. */
router.get('/', function(req, res, next) {
    const key = process.env.API_KEY;
    const data = {
        title: 'Top page',
        key: key,
    }
    res.render('index', data);
});

router.get('/search', (req, res, next) => {
    res.render('search', {title: 'Search'});
});



module.exports = router;
