var express = require('express');
var router = express.Router();
var socketApi = require('../socketApi');

/* GET home page. */
router.get('/', function(req, res, next) {
  socketApi.getMessages().toArray(function(err,data){
    res.send(data);
  })
});

router.post('/', function(req, res, next) {
  let msj = {
    text: req.body.text,
    author: req.body.author
  }
  socketApi.sendNotification(msj);
  res.render('index', { title: 'Express' });
});

module.exports = router;
