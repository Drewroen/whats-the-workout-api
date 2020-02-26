const mongoose = require('mongoose');

module.exports = {
  connectToDatabase: async function() {
    const AWS = require('aws-sdk');
    AWS.config.update({ region: 'us-east-2' });
    const encrypted = process.env['MONGO_URL'];
    const kms = new AWS.KMS();
    const params = {
      CiphertextBlob: Buffer.from(encrypted, 'base64'),
    };
    const { Plaintext } = await kms.decrypt(params).promise();
    mongoose.connect(Plaintext.toString(), {
      useNewUrlParser: true
    });
  }
}