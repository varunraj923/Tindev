const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
   firstName : {
    type : String,
   },
   lastName : {
    type : String,
   },
   emailId :{
    type : String,
   },
   password : {
    type : String,
   },
   age:{
    type: Number,
   },
   gender: {
    type: String,
   },
   


});


// userSchema.methods.getJWT = async function(){
//    const user = this;
//    const token = await jwt.sign({_id : user._id}, "VARUN@123345", {
//       expiresIn : "7d",

//    });
//    return token;
// };


// //validate password logic

// userSchema.methods.validatePassword = async function(passwordbyuser){

//    const hashedPassword = this.password;
 

//      const isPasswordValid = await bcrypt.compare(passwordbyuser, hashedPassword);

//      return isPasswordValid;



// };

module.exports = mongoose.model("User", userSchema);