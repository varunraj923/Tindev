const { text } = require("express");
const socket = require("socket.io"); // use require if you're using CommonJS

const InitializeSocket = (Server) => {
    const io = socket(Server, {
        cors: {
            origin: "http://localhost:5173",
        }
    });

    io.on("connection", (socket) => {
        console.log("New client connected");

        socket.on("joinChat", ({userId, targetUserId}) => {
            const roomId = [userId, targetUserId].sort().join("_");
            console.log("room id is" + roomId);
            socket.join(roomId);
        
           
        });

        socket.on("sendMessage", ({firstName, userId, targetUserId, text}) => {
            const roomId = [userId, targetUserId].sort().join("_");
            console.log(firstName + "joined" + text)
            io.to(roomId).emit("messageReceived", {firstName, text});
          

        });

        socket.on("disconnect", () => {
            console.log("Client disconnected");
        });
    });
};

module.exports = InitializeSocket;
