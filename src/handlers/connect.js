const jwt = require("jsonwebtoken");
const { dynamoDb, TABLE_NAME } = require("../utils/dynamo");

exports.handler = async (event) => {
  try {
    const token = event.queryStringParameters?.token;

    if (!token) {
      return { statusCode: 401, body: "Unauthorized" };
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const connectionId = event.requestContext.connectionId;

    await dynamoDb.put({
      TableName: TABLE_NAME,
      Item: {
        connectionId,
        userId: decoded.userId
      }
    }).promise();

    return { statusCode: 200 };

  } catch (err) {
    console.error("JWT Error:", err.message);
    return { statusCode: 401, body: "Invalid Token" };
  }
};