var router = require('express').Router();
var auth = require('../../utils/auth');
var mongoose = require('mongoose');
var UserModel = mongoose.model('User')
var uuidv4 = require('uuid/v4');

router.get('/get-user', auth, async function (req, res, next) {
  try {
    let userId = req.query.userId;
    const user = await UserModel.findOne({ 'userId' : userId });
    return res.json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
});
  
router.put('/set-user', auth, async function (req, res, next) {
  try {
    var user = await UserModel.findOne({ 'userId' : req.user.sub });
    if (user) {
      user.set(req.body);
    } else {
      user = new UserModel(req.body);
      user.userId = req.user.sub;
    }
    await user.save();
    return res.json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
});
  
module.exports = router;