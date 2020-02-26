var router = require('express').Router();
var auth = require('../../utils/auth');

router.get('/', function (req, res) {
  var pingResponse = {
    message: 'The service is healthy'
  }
  return res.json(pingResponse);
});
  
router.get('/auth', auth, function (req, res, next) {
  var pingResponse = {
      message: 'The service is healthy. You are logged in'
  }
  return res.json(pingResponse);
});
  
module.exports = router;