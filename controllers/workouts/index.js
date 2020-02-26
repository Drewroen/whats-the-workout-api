var router = require('express').Router();
var auth = require('../../utils/auth');
var mongoose = require('mongoose');
var WorkoutModel = mongoose.model('Workout')

router.get('/', auth, async function (req, res, next) {
  const workouts = await WorkoutModel.find({});
  try {
    return res.json(workouts);
  } catch (err) {
    return res.status(500).json(err);
  }
});
  
router.post('/', auth, async function (req, res, next) {
  const workout = new WorkoutModel({
    workoutId: "bla",
    userId: "bla",
    name: "Workout",
    details: "BLA"
  });
  try {
    await workout.save();
    return res.json(workout);
  } catch (err) {
    return res.status(500).json(err);
  }
});
  
module.exports = router;