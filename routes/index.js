const express = require('express');
const router = express.Router();
const db = require('../models/index');
const { Op } = require('sequelize');
const { OPEN_READWRITE } = require('sqlite3');

require('dotenv').config();
//環境変数API_KEYの中にapiキーが入っている
const key = process.env.API_KEY;


/* GET home page. */
router.get('/', (req, res, next) => {
    const data = {
        title: 'Search Everywhere',
        content: '行きたいところを素早く提案いたします。',
        key: key,
    }
    res.render('index', data);
});

router.get('/search', (req, res, next) => {
    if (req.query) {
        let data = {
            title: 'Search Results',
            content: 'Search Results',
            key: key,
        }
        res.render('search', data);
    } else {
        res.redirect('/');
    }
});

// router.post('/search', (req, res, next) => {
//     let place = req.body.place;
//     let lat = req.body.user_lat;
//     let lng = req.body.user_lng;

//     const pos = [
//         {
//             user_lat: lat,
//             user_lng: lng
//         }
//     ];

//     let data = {
//         title: 'Search',
//         content: '検索しました。',
//         place: place,
//     }

//     res.render('search', data);
// });


module.exports = router;
