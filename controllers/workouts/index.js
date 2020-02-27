var router = require('express').Router();
var auth = require('../../utils/auth');
var mongoose = require('mongoose');
var WorkoutModel = mongoose.model('Workout')
var uuidv4 = require('uuid/v4');

router.get('/', auth, async function (req, res, next) {
  const workouts = await WorkoutModel.find({});
  try {
    return res.json(workouts);
  } catch (err) {
    return res.status(500).json(err);
  }
});
  
router.post('/', auth, async function (req, res, next) {
  try {
    const workout = new WorkoutModel({
      workoutId: uuidv4(),
      userId: req.user.sub,
      name: req.body.name,
      description: req.body.description
    });
    await workout.save();
    return res.json(workout);
  } catch (err) {
    return res.status(500).json(err);
  }
});
  
module.exports = router;