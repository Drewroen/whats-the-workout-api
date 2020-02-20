const serverless = require('serverless-http');
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/hello-world', function (req, res) {
    res.send('Hello World!')
  });

//app.listen(3000, () => console.log(`Listening on: 3000`));
module.exports.handler = serverless(app);