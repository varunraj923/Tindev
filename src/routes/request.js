const express = require("express");
const requestRouter = express.Router();
const user = require("../models/user");
const ConnectionRequest = require("../models/connectionRequest");
const { userAuth } = require("../middleware/auth");

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        // Corrected allowedStatus array
        const allowedStatus = ["ignored", "interested"];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ message: "Invalid status: " + status });
        }

        // Await to fetch the user
        const toUser = await user.findById(toUserId);
        if (!toUser) {
            return res.status(400).json({ message: "Enter a valid user ID to send the connection request." });
        }

       

        // Check if the connection request already exists
        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId },
            ],
        });

        if (existingConnectionRequest) {
            return res.status(400).send({ message: "Connection Request Already Exists!!" });
        }

        if(fromUserId.equals(toUserId)){
            throw new Error("can't send the connection request to the same user")
        }

        // Create and save the new connection request
        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status,
        });

        const data = await connectionRequest.save();
        return res.json({ message: "Connection request sent successfully: " + status, data });

    } catch (err) {
        if (!res.headersSent) {
            return res.status(500).json({ message: "Something went wrong: " + err.message });
        }
    }
});


requestRouter.post("/request/review/:status/:requestId", userAuth, async (req,res)=>{
    try{
        const status = req.params.status;
        const requestId = req.params.requestId;
        const logedInUser = req.user;

        const allowedStatus = ["accepted", "rejected"];
        if(!allowedStatus.includes(status)){
            res.status(400).json({message : "status is invalid"});
        }

        const connectionRequest = await ConnectionRequest.findOne({
           _id : requestId,
           toUserId : logedInUser._id,
           status : "interested"
         })

         if(!connectionRequest){
            res.status(400).json({message : "something went wrong"})
         }

         connectionRequest.status = status;

         const data = await connectionRequest.save();

         res.json({ message: "Connection request " + status, data });
 

    }

    catch(err){
        
        if (!res.headersSent) {
            return res.status(500).json({ message: "Something went wrong: " + err.message });
        }
    }
})

module.exports = requestRouter;
