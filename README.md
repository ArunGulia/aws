This project demonstrates a cloud-native, serverless architecture for real-time messaging without managing servers.
Key Features:
WebSocket API using AWS API Gateway
Stateless Lambda functions for $connect, $disconnect, and message routes
JWT-based authentication during connection
DynamoDB connection registry for active clients
Broadcast messaging to multiple concurrent connections
Automatic stale connection removal (410 cleanup)

High Level Architecture below - 
Client
⬇
API Gateway (WebSocket)
⬇
Lambda Functions
⬇
DynamoDB (Connection Tracking)

Configure YOUR OWN AWS Account before Deployment - 
Deployment
npm install
aws configure
serverless deploy

Connect using: wss://<websocket-url>?token=<JWT_TOKEN>

Testing - 
Using Postman WebSocket: JSON payload
{
  "action": "sendMessage",
  "message": "Hello from client"
}

Open multiple clients to verify broadcasting and check in Dyanamo-DB for Auto stale connection removal
