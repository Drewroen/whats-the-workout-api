var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    birthday: {
        type: Date,
        required: false
    },
    bestTimes: {
        type: [{
            race: {
                type: String,
                required: true
            },
            time: {
                type: Number,
                required: true
            }
        }],
        required: false
    },
    vo2Max: {
        type: Number,
        required: false
    }
});

mongoose.model('User', UserSchema, 'users');