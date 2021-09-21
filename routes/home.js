const express = require('express');
const router = express.Router();
const db = require('../models/index');
const { Op } = require('sequelize');
const { OPEN_READWRITE } = require('sqlite3');
const key = process.env.API_KEY;
const bcrypt = require('bcrypt');

const link = "http://localhost:3000/home";

// セッションしているか判定
function check_session(req, res) {
    if (req.session.login == null) {
        req.session.back = '/users/login';
        res.redirect(req.session.back);
        return true;
    } else {
        return false;
    }
}

// ホーム -> get ======================================================================================================================
router.get('/', (req, res, next) => {
  if(check_session(req, res)){ return };

  const name = req.session.login.name;
  const age  = req.session.login.age;
  const path = `/home/${name}/${age}`;
  res.redirect(path);
});
// /ホーム -> get ======================================================================================================================



// ホーム(セッション開始済み) -> get ======================================================================================================================
router.get('/:name/:age', (req, res, next) => {
  if (check_session(req, res)) { return };

  const p_name = req.params.name;
  const p_age  = req.params.age;
  const home_link = `${link}/${p_name}/${p_age}`;
  const content = `こんにちは、${p_name}さん！`;

  const mail = req.session.login.mail;
  const color = req.session.login.color;

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
      path: `/home/${p_name}/${p_age}`,
      link: home_link,
    }
    res.render('home/each', data);
  }).catch(e => {
    console.log(`これはエラーです。${e}`);
  });
});
// /ホーム(セッション開始済み) -> get ======================================================================================================================

// ホーム(セッション開始済み) -> post ======================================================================================================================
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
// /ホーム(セッション開始済み) -> post ======================================================================================================================




// 検索結果 -> get ======================================================================================================================
router.get('/:name/:age/results', (req, res, next) => {
  if (check_session(req, res)) { return };

  const name = req.session.login.name;
  const age  = req.session.login.age;
  const mail = req.session.login.mail;
  const range = req.query.range;

  const p_name = req.params.name;
  const p_age = req.params.age;
  const home_link = `${link}/${p_name}/${p_age}`;

  console.log('リザルト画面にアクセスできました。');
  console.log(range);

  let data = {
    alert: 'リザルト画面です。',
    range: range,
    title: 'RESULTS',
    key: key,
    link: home_link,
  }
  res.render('home/results', data);

});
// /検索結果 -> get ======================================================================================================================




// ユーザー情報変更ページ -> get ======================================================================================================================
router.get('/:name/:age/edit', (req, res, next) => {
  if (check_session(req, res)) { return };

  const path = `/home/${req.session.login.name}/${req.session.login.age}/edit`;
  const id = req.session.login.id;

  const p_name = req.params.name;
  const p_age = req.params.age;
  const home_link = `${link}/${p_name}/${p_age}`;

  db.User.findByPk(id)
  .then( usr => {
    let form = usr;

    let data = {
      title: 'UPDATE',
      content: 'ユーザー情報の変更',
      form: form,
      path: path,
      err: null,
      link: home_link,
    }
    res.render('home/edit', data);
    })
    
});
// /ユーザー情報変更ページ -> get ======================================================================================================================

// ユーザー情報変更ページ -> post ======================================================================================================================
router.post('/:name/:age/edit', (req, res, next) => {
  if (check_session(req, res)) { return };

  const path = `/home/${req.session.login.name}/${req.session.login.age}/edit`;
  const next_path = `/home/${req.session.login.name}/${req.session.login.age}/updated`;

  const p_name = req.params.name;
  const p_age = req.params.age;
  const home_link = `${link}/${p_name}/${p_age}`;

  let form = {
    name:   req.body.name,
    age:    req.body.age,
    mail:   req.body.mail,
    pass:   req.body.pass,
    color:  req.body.color,
    secret: req.body.secret
  }
    db.User.findByPk(req.session.login.id)
      .then( async (usr) => {
        const compared = await bcrypt.compare(form.pass, usr.pass);

        if (!compared) {
          throw await new Error("パスワードが正しくありません。");
        } else {
          return;
        }
      })
      .then(() => db.User.update({
        name: form.name,
        age:  form.age,
        mail: form.mail,
        color: form.color,
        secret: form.secret
      },
      {
        where: {id: req.session.login.id}
      }))
      .then(() => db.User.findByPk(req.session.login.id))
      .then((usr) => {
        req.session.login = usr;
        res.redirect(next_path);
      })
      .catch( err => {
        console.log('------------------------------------------------------------');
        console.log(JSON.stringify(err));
        console.log(err);
        console.log(err.message);
        console.log('------------------------------------------------------------');
        let data = {
          title: 'UPDATE',
          content: 'ユーザー情報の変更',
          form: form,
          path: path,
          link: home_link,
          err: err.message,
        }
        res.render('home/edit', data);
      })
      .finally(() => {
        console.log('==============================================================');
      })
});
// ユーザー情報変更ページ -> post ======================================================================================================================




// ユーザー情報変更完了ページ -> get ======================================================================================================================
router.get('/:name/:age/updated', (req, res, next) => {
  if (check_session(req, res)) { return };
  
  res.redirect('/home');
});
// /ユーザー情報変更完了ページ -> get ======================================================================================================================

router.get('/:name/:age/logout', (req, res, next) => {
  req.session.destroy((err) => {
    res.redirect('/');
  })
});


// マイカラーAPI -> get ======================================================================================================================
router.get('/color', (req, res, next) => {
  const color = req.session.login.color;
  res.json({color: color});
});
// /マイカラーAPI -> get ======================================================================================================================

module.exports = router;
