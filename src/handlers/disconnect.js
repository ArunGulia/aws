const { dynamoDb, TABLE_NAME } = require("../utils/dynamo");

exports.handler = async (event) => {
  const connectionId = event.requestContext.connectionId;

  await dynamoDb.delete({
    TableName: TABLE_NAME,
    Key: { connectionId }
  }).promise();

  return { statusCode: 200 };
};
