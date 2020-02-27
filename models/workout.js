var mongoose = require('mongoose');

var WorkoutSchema = new mongoose.Schema({
    workoutId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    }
});

mongoose.model('Workout', WorkoutSchema, 'workouts');