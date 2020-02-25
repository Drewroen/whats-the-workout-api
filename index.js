const serverless = require('serverless-http');
const express = require('express');
const app = express();
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const mongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://drewroen.auth0.com/.well-known/jwks.json`
  }),
  audience: 'https://api.whatstheworkout.com',
  issuer: 'https://drewroen.auth0.com/',
  algorithms: ['RS256']
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.get('/xping', function (req, res) {
  var pingResponse = {
    message: 'The service is healthy'
  }
  res.send(pingResponse);
});

app.get('/xping-auth', checkJwt, function (req, res) {
  var pingResponse = {
    message: 'The service is healthy. You are logged in'
  }
  res.send(pingResponse);
});

async function decrypt(source) {
  const params = {
    CiphertextBlob: Buffer.from(source, 'base64'),
  };
  const { Plaintext } = await kms.decrypt(params).promise();
  return Plaintext.toString();
}

const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-2' });
const encrypted = process.env['MONGO_URL'];
const kms = new AWS.KMS();
decrypt(encrypted).then(decrypted => {console.log(decrypted); mongoose.connect(decrypted, {
  useNewUrlParser: true
})});

var Workout = new mongoose.Schema({
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

var WorkoutModel = mongoose.model('WorkoutModel', Workout, 'workouts');
module.exports = WorkoutModel;

app.get('/workouts', checkJwt, async function (req, res) {
  const workouts = await WorkoutModel.find({});
  try {
    res.send(workouts);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/workouts', checkJwt, async function (req, res) {
  const workout = new WorkoutModel({
    workoutId: "bla",
    userId: "bla",
    name: "Workout",
    details: "BLA"
  });
  try {
    await workout.save();
    res.send(workout);
  } catch (err) {
    res.status(500).send(err);
  }
})

//app.listen(3000, () => console.log(`Listening on: 3000`));

module.exports.handler = serverless(app);