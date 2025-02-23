const express = require("express");
const app = express();
const connectDB = require("./config/database.js");
const User = require("./models/user.js");

const bcrypt = require("bcrypt");
const validator = require("validator");
const cookieParser = require('cookie-parser')


const user = require("./models/user.js");

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profiles");
const requestRouter = require("./routes/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

// Connect to the database
connectDB();

app.use(express.json());
app.use(cookieParser())





// Route for adding a new user to the database
// app.post("/signup", async (req, res) => {
//   try {
//     // Validate the sign-up data
//     validateSignUpData(req);

//     // Destructure data from request body AFTER validation
//     const { firstName, lastName, emailId, password } = req.body;

//     // Hash the password
//     const passwordHash = await bcrypt.hash(password, 10);

//     // Create a new user instance
//     const user = new User({ firstName, lastName, emailId, password: passwordHash });

//     // Save the user to the database
//     await user.save();

//     // Send a success response
//     res.status(201).json({ message: "User added successfully" });
//   } catch (err) {
//     // Handle errors
//     res.status(400).json({ error: err.message });
//   }
// });


//login api

// app.post("/login",async(req,res)=>{


//   try{
//   const {emailId, password} = req.body;
// //validating email that the email is correct or not
//   if(!validator.isEmail(emailId)){
//     throw new Error("email is not valid");
//   }
// //finding that the user is present in the Db or not!!
//   const user = await User.findOne({emailId : emailId});
//   if(!user){
//     throw new Error("User is not present in the DB!! Please Sign Up first");
//   }

//   const isPasswordValid = await bcrypt.compare(password, user.password);

//   if(isPasswordValid){
  
// //if the password is correct then we send the token to the browser for the user to access diffrent things into the website 
//     const token = jwt.sign({_id : user._id}, "VARUN@123345",{
//       expiresIn : "7d"
//     });
//     console.log(token);



//     res.cookie("token", token);

//     res.send("User Login Sucessful");

//   }

//   else{
//     throw new Error("Password is not Valid");
//   }

// }

//   catch(err){
//     res.status(400).send("Error" + err.message);
//   }
// })


// app.get("/profile", userAuth, async (req, res) => {
//   try {
//     const user = req.user;
//     res.status(200).json({
//       success: true,
//       data: user,
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: "An error occurred while fetching the profile.",
//     });
//   }
// });

// app.post("/sendConnection", userAuth, async(req,res)=>{
//   const user = req.user
//   res.send(user.firstName +  "sent connection request");
// })
 

  //send connection request to the user


  
 





//   try{
//   const cookies = req.cookies;
//   const {token} = cookies
//   // console.log(cookies);
//   // console.log(token);
 

//   const tokendecoded = await jwt.verify(token, 'VARUN@123345');
//   console.log(tokendecoded);

//   const { _id } = tokendecoded;

//   const user = await User.findById(_id);
//   if(!user){
//     throw new Error("User is not present!! Please Sign Up first");
//   }

//   else{
//     res.send(user);
//   }

// }

//   catch(err){
//     res.status(400).send("Error"+ err.message);
//   }

  






// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//for retreving all data from the database by the use of emailId..



//find one data from the database by the use of password





//update the database patch api
// app.patch("/user",async(req,res)=>{
//   const userId = req.body.userId;
//   const data = req.body;

//   try{
//     const user = await User.findByIdAndUpdate({_id : userId}, data);
//     res.send("user updated sucessfully");
//   }

//   catch(err){
//     res.status(400).send("something went wrong");
//   }
//  })

 //find on the basis of email and update





connectDB()
.then(()=>{
    console.log("Database Connection Established");

    app.listen(7777,()=>{
        console.log("server is running at port number 7777");
    })
})
.catch((err)=>{
    console.error("ERROR");
});






// app.use('/',(req,res,next)=>{
//     // res.send("response sent");
//     console.log("response is going to t")
//     next();
// }, (req,res)=>{
//     res.send("again response is sent");
// })

// app.use('/',(req,res,next)=>{
//     // res.send("response sent");
//     console.log("response is going to t")
//     next();
// }, (req,res)=>{
//     res.send("again response is sent");
// })

// // Import Express
// const express = require('express');
// const app = express();

// // Define a route
// app.get('/', (req, res) => {
//     res.send('varun raj is coming into nodejs');
// });

// app.get('/varun',(req,res)=>{
//     res.send("apna time aayega");

// });

// app.post("/varun",(req,res) =>{
//     res.send("sucessfully saved to database");
// })

// // Start the server
// app.listen(3000, () => {
//     console.log('Server is running on http://localhost:3000');
// });


// app.use('/',(req,res,next)=>{
//     // res.send("response sent");
//     console.log("response is going to t")
//     next();
// }, (req,res)=>{
//     res.send("again response is sent");
// })

// app.use('/',(req,res,next)=>{
//     // res.send("response sent");
//     console.log("response is going to t")
//     next();
// }, (req,res)=>{
//     res.send("again response is sent");
// })

// routing testing for express js

// app.get("/admin",(req,res,next)=>{
//     console.log("admin is authorzed");
//     const token = "xyz";
//     const isadminauthorized = token === "lll";
//     if(!isadminauthorized){
//         res.status(401).send("unathorized access");
//     }else{
//         next();
//     }
        
// });



// app.get("/admin/getAllData",(req,res)=>{
//     res.send("get all data executed");
   
// });



// app.get("/admin/deleteAllData",(req,res)=>{
//     res.send("all data is deleted");
// });