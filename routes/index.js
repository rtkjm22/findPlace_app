const express = require('express');
const router = express.Router();
const db = require('../models/index');
const { Op } = require('sequelize');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/search', (req, res, next) => {
    res.render('search', {title: 'Search'});
});

module.exports = router;
