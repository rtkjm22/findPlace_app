const express = require('express');
const router = express.Router();
const db = require('../models/index');
const { Op } = require('sequelize');

const apikey = require('./private');
const key = apikey.api.key;

/* GET home page. */
router.get('/', function(req, res, next) {
    
    const data = {
        title: 'Top page',
    }
    res.render('index', data);
});

router.get('/search', (req, res, next) => {
    res.render('search', {title: 'Search'});
});



module.exports = router;
