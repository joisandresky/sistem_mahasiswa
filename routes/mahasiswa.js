var express = require('express');
var router = express.Router();

//Mahasiswa Pages
router.get('/', function(req, res){
  res.render('mahasiswa');
});

module.exports = router;
