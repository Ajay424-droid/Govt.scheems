const serverless = require('serverless-http');
const app = require('../node/app');

module.exports.handler = serverless(app);
