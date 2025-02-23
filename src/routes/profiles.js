const express = require("express");
const {userAuth} = require("../middleware/auth");
const cookieParser = require('cookie-parser')
const {editoptions} = require("../utils/validator")
const bcrypt = require('bcrypt');
const validate = require("validator");
const User = require("../models/user");

const profileRouter = express.Router();
profileRouter.use(cookieParser())

profileRouter.get("/profile", userAuth, async (req, res) => {
    try {
      const user = req.user;
      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "An error occurred while fetching the profile.",
      });
    }
  });


  //updating user profile api
  

  
  profileRouter.patch("/profile/edit", userAuth, async(req,res)=>{
    try{
    if(!editoptions(req)){
      throw new Error("these fields not allowed to update")
    };
  const loggedinUser = req.user;

 Object.keys(req.body).forEach((key)=> (loggedinUser[key] = req.body[key]));
 await loggedinUser.save();

res.send("Profile Updated Successfully");

  }
  catch(err){
    res.status(400).send("Error"+err.message);
  }
  }
)

profileRouter.patch("/password/edit", userAuth, async(req,res)=>{
  try{
 const {oldPassword, newPassword} = req.body;

 const loggedinUser = req.user;

 if(!oldPassword || !newPassword){
  throw new Error("Enter old and new Password both to proceed");
 }

 const isOldPasswordValid = await bcrypt.compare(oldPassword, loggedinUser.password);
 if(!isOldPasswordValid){
  return res.status(401).json({ error: "Incorrect old password" });
 }

 const hashednewPassword = await bcrypt.hash(newPassword,10);

 loggedinUser.password = hashednewPassword;

 await loggedinUser.save();
 return res.status(200).json({ message: "Password updated successfully!" });

}
catch(err){
  res.status(400).status("Error" + err.message);
}












})



 module.exports = profileRouter;
  