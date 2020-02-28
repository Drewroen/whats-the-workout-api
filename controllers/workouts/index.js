var router = require('express').Router();
var auth = require('../../utils/auth');
var mongoose = require('mongoose');
var WorkoutModel = mongoose.model('Workout')
var uuidv4 = require('uuid/v4');

router.get('/get-all-workouts', async function (req, res, next) {
  try {
    const workouts = await WorkoutModel.find({});
    return res.json(workouts);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get('/get-workout', auth, async function (req, res, next) {
  try {
    const workout = await WorkoutModel.findOne({ 'workoutId' : req.query.workoutId });
    return res.json(workout);
  } catch (err) {
    return res.status(500).json(err);
  }
});
  
router.post('/create-workout', auth, async function (req, res, next) {
  try {
    var workout = new WorkoutModel(req.body);
    workout.workoutId = uuidv4();
    workout.userId = req.user.sub;
    await workout.save();
    return res.json(workout);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.patch('/update-workout', auth, async function (req, res, next) {
  try {
    var workout = await WorkoutModel.findOne({ 'workoutId' : req.query.workoutId });
    workout.set(req.body);
    await workout.save();
    return res.json(workout);
  } catch (err) {
    return res.status(500).json(err);
  }
});
  
module.exports = router;