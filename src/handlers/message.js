const AWS = require("aws-sdk");
const { dynamoDb, TABLE_NAME } = require("../utils/dynamo");

exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  const message = body.message;

  const connections = await dynamoDb.scan({
    TableName: TABLE_NAME
  }).promise();

  const apigateway = new AWS.ApiGatewayManagementApi({
    endpoint: event.requestContext.domainName + "/" + event.requestContext.stage
  });

  const postCalls = connections.Items.map(async ({ connectionId }) => {
    try {
      await apigateway.postToConnection({
        ConnectionId: connectionId,
        Data: JSON.stringify({ message })
      }).promise();
    } catch (err) {
      if (err.statusCode === 410) {
        console.log("Stale connection detected:", connectionId);

        await dynamoDb.delete({
          TableName: TABLE_NAME,
          Key: { connectionId }
        }).promise();

        console.log("Removed stale connection:", connectionId);
      } else {
        console.error("Failed to send:", err);
      }
    }
  });

  await Promise.all(postCalls);

  return { statusCode: 200 };
};