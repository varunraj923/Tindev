const express = require("express");
const app = express();
const connectDB = require("./config/database.js")
const User = require("./models/user.js");


app.post("/signup",async (req,res)=>{
  const user = new User({
    firstName : "rahul",
    lastName : "raj",
    emailId : "rahulraj1@gmail.com",
    password : "rahulraj1@",
  });

  try{
    await user.save();
    res.send("User added Successfully");
   
  }
  catch{
    (err)=>{
        res.status(400).send(err.message);
    }
  }





});



connectDB()
.then(()=>{
    console.log("Database Connection Established");

    app.listen(7777,()=>{
        console.log("server is running at port number 7777");
    })
})
.catch((err)=>{
    console.error("ERRor");
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