var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET parking lots list. */
router.get('/parkinglots', (req, res, next) => {
  var db = require("../db");
  var ParkingLots = db.Mongoose.model('ParkingLot', db.ParkingLot, 'ParkingLot');
  var query = { admin: req.query.admin };
  ParkingLots.find(query).lean().exec(
     function (e, docs) {
      console.log(docs); 
  });
});

router.post('/parkinglot', (req, res, next) => {
  var db = require("../db");

  var ParkingLots = db.Mongoose.model('ParkingLot', db.ParkingLot, 'ParkingLot');
  var parkinglot = new ParkingLots({ 
    name: req.body.name, 
    vacanciesamount: req.body.vacanciesamount, 
    hourprice: req.body.hourprice, 
    admin: req.body.userid 
  });
  
  parkinglot.save(function (err) {
      if (err) {
          console.log("Error! " + err.message);
          return err;
      }
      else {
          console.log("Post saved");
      }
  });
});

router.post('/newadmin', (req, res, next) => {
  var db = require("../db");

  var Users = db.Mongoose.model('User', db.User, 'User');
  var user = new Users({ 
    email: req.body.email, 
    password: req.body.password, 
    name: req.body.name, 
    isadmin: true 
  });
  
  user.save(function (err) {
      if (err)
          console.log("Error! " + err.message);
      else
          console.log("Post saved");
          
      return err;
  });
});

router.get('/users', (req, res, next) => {
  var db = require("../db");
  var Users = db.Mongoose.model('User', db.User, 'User');
  Users.find({}).lean().exec(
    function (e, docs) {
      console.log(docs);  
  });
});

module.exports = router;
