const express = require("express");
const { validateSignUpData } = require("../utils/validator");
const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const cookieParser = require('cookie-parser');
const {userAuth} = require("../middleware/auth");




const authRouter = express.Router();
authRouter.use(express.json());
authRouter.use(cookieParser());




authRouter.post("/signup", async (req, res) => {
    try {
      // Validate the sign-up data
      validateSignUpData(req);
  
      // Destructure data from request body AFTER validation
      const { firstName, lastName, emailId, password } = req.body;
  
      // Hash the password
      const passwordHash = await bcrypt.hash(password, 10);
  
      // Create a new user instance
      const user = new User({ firstName, lastName, emailId, password: passwordHash });
      const savedUser = await user.save();
      // Save the user to the database
      

     
      const token = jwt.sign({_id : user._id}, "VARUN@123345",{
        expiresIn : "7d"
      });

      res.cookie("token", token);

  
     
  
      res.json({ message: "User Added successfully!", data: savedUser });
  
      // Send a success response
 
    } catch (err) {
      // Handle errors
      res.status(400).json({ error: err.message });
    }
  });


  authRouter.post("/login",async(req,res)=>{
  
  
    try{
    const {emailId, password} = req.body;
  //validating email that the email is correct or not
    if(!validator.isEmail(emailId)){
      throw new Error("email is not valid");
    }
  //finding that the user is present in the Db or not!!
    const user = await User.findOne({emailId : emailId});
    if(!user){
      throw new Error("User is not present in the DB!! Please Sign Up first");
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
  
    if(isPasswordValid){
    
  //if the password is correct then we send the token to the browser for the user to access diffrent things into the website 
      const token = jwt.sign({_id : user._id}, "VARUN@123345",{
        expiresIn : "7d"
      });
      console.log(token);
  
  
  
      res.cookie("token", token);
  
      res.send(user);
  
    }
  
    else{
      throw new Error("Password is not Valid");
    }
  
  }
  

    catch(err){
      res.status(400).send("Error" + err.message);
    }
  });


  authRouter.post("/logout", userAuth, async(req, res)=>{
    res.cookie("token", null),{
      expires: new Date(Date.now())
     
    }
 
    res.send(req.user.firstName + "logout successfully");
  })

module.exports = authRouter






