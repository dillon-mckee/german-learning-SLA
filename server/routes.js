var User = require('./models/users')
var router = require('express').Router();

router.get('/user', function(req, res) {
  User.find(function(err, user) {
    if(err) {
      return res.status(500).json({
        message: 'Internal Server Error'
      });
    }
  });
});

router.post('/user', function(req, res) {
  console.log('req.body', req.body);
  User.create({
    name: req.body.name
  }, function(err, user) {
    if(err) {
      return res.status(500).json({
        message: 'Internal Server Error'
      });
    }
    res.status(201).json(user);
  });
});

module.exports = router;
