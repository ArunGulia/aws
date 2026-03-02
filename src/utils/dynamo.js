const AWS = require("aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "WebSocketConnections";

module.exports = { dynamoDb, TABLE_NAME };
