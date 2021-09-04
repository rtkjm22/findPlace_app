const express = require('express');
const router = express.Router();
const db = require('../models/index');
const { Op } = require('sequelize');
const { OPEN_READWRITE } = require('sqlite3');
const key = process.env.API_KEY;

function check_session(req, res) {
    if (req.session.login == null) {
        req.session.back = '/users/login';
        res.redirect(req.session.back);
        return true;
    } else {
        return false;
    }
}

/* GET users listing. */
router.get('/', (req, res, next) => {
  if(check_session(req, res)){ return };

  const name = req.session.login.name;
  const age  = req.session.login.age;
  const path = `/home/${name}/${age}`;
  res.redirect(path);
});



router.get('/:name/:age', (req, res, next) => {
  if (check_session(req, res)) { return };

  const name = req.params.name;
  const age  = req.params.age;
  const content = `こんにちは、${name}さん！`;

  const mail = req.session.login.mail;
  db.History.findAll({
    where: {
      userId: mail
    },
    order: [
      ['createdAt', 'DESC']
    ],
  }).then(his => {
    const get_history = (el) => {
      let arr = [];
      for (let i=0;i<el.length;i++) {
        let item = {lng:el[i].lng, lat:el[i].lat}
        arr.push(item);
      }
      return arr;
    }
    
    const history = get_history(his);


    let data = {
      title: 'HOME',
      content: content,
      key: key,
      history: history,
      path: `/home/${name}/${age}`
    }
    res.render('home/each', data);
  }).catch(e => {
    console.log(`これはエラーです。${e}`);
  });
});


router.post('/:name/:age', (req, res, next) => {
  if (check_session(req, res)) { return };

  const name = req.session.login.name;
  const age  = req.session.login.age;
  const mail = req.session.login.mail;

  const lng  = req.body.lng;
  const lat  = req.body.lat;
  const type = req.body.type;
  const range = req.body.range;
  const keyword = req.body.keyword;
  const query = `?type=${type}&range=${range}&lat=${lng}&lat=${lng}&keyword=${keyword}`;

  console.log(query);
  db.sequelize.sync()
    .then(() => db.History.create({
      userId: mail,
      lng: lng,
      lat: lat,
    }))
    .then(his => {
      res.redirect(`/home/${name}/${age}/results${query}`);
    })
    .catch(e => {
      console.log(`エラーです。=>${e}`);
    })
}); 



router.get('/:name/:age/results', (req, res, next) => {
  if (check_session(req, res)) { return };

  const name = req.session.login.name;
  const age  = req.session.login.age;
  const mail = req.session.login.mail;
  const range = req.query.range;

  console.log('リザルト画面にアクセスできました。');
  console.log(range);

  let data = {
    alert: 'リザルト画面です。',
    range: range,
    title: 'result',
    key: key
  }
  res.render('home/results', data);

});



module.exports = router;
