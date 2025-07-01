const express = require("express");
const app = express();
const http = require('http');
const connectDB = require("./config/database.js");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const InitializeSocket = require('./utils/socket');

const User = require("./models/user.js");

// Create HTTP server
const Server = http.createServer(app);

// Import Routers
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profiles");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

// Import InitializeSocket


// Middlewares
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Use Routers
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

// Initialize Socket
InitializeSocket(Server);

// Connect to the database and start server
connectDB()
.then(() => {
    console.log("Database Connection Established");

    const PORT = process.env.PORT || 3000;
    Server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((err) => {
    console.error("Database Connection Error:", err);
});


