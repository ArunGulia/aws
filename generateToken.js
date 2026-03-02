const jwt = require("jsonwebtoken");

//const secret = "PASTE_YOUR_SECRET_HERE";
const secret = "'YOUR_JWT_SECRET_KEY'"; 
//create your token by running this file once and copy the generated token to use in your client application
const token = jwt.sign(
  { userId: "YourUserId" },
  secret,
  { expiresIn: "1h" }
);

console.log(token);