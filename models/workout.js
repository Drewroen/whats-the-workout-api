var mongoose = require('mongoose');

var WorkoutSchema = new mongoose.Schema({
    workoutId: {
        type: String,
        required: false
    },
    userId: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: false
    },
    details: {
        type: String,
        required: false
    }
});

mongoose.model('Workout', WorkoutSchema, 'workouts');