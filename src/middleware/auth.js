const jwt = require("jsonwebtoken");
const User = require("../models/user");
const cookieParser = require('cookie-parser')


const userAuth = async (req, res, next) => {
  try {
    // Extract the token from cookies
    const { token } = req.cookies;
    console.log(token);

    // Check if the token exists
   if(!token){
    throw new Error("user not found");
   }

    // Verify the token (corrected from jwt.sign to jwt.verify)
    const decodedObj = jwt.verify(token, "VARUN@123345"); // Use the same secret as in token creation

    // Find the user by ID from the decoded token
    const user = await User.findById(decodedObj._id);


    // Check if the user exists
    if (!user) {
      throw new Error("User not found in the database");
    }

    // Attach the user object to the request
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    res.status(400).send("Error"+ err.message);
   
    }

}

   
    // Handle other errors
  


module.exports = {
  userAuth,
};