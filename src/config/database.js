const mongoose = require("mongoose");

const connectDB = async ()=>{
    await mongoose.connect("mongodb+srv://varunraj1545:JUKvtNzKEouFb9OE@namastenode.ytyud.mongodb.net/Tindev");

};

module.exports = connectDB;



