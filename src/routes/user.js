const express =  require("express");
const { userAuth } = require("../middleware/auth");
const userRouter =  express.Router();
const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

    //writing the logic for retriving all the pending connection request for the user
    

userRouter.get("/user/requests/received", userAuth, async(req,res)=>{


try{
    const logedInUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
        toUserId : logedInUser._id,
        status : "interested"
    }).populate("fromUserId",["firstName" , "lastName"]);
    res.json({message: "data fetched successfully", data : connectionRequest})
}
catch(err){
    res.status(400).json({message: "something went wrong" + err.message })

}

})


//now writing a api for all the accepted connection request


userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    console.log(connectionRequests);

    const data = connectionRequests.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });

    res.json({ data });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});



//creating feed api

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit>50 ? 50 : limit;
    const skip = (page-1)*limit

    const connectionRequests = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId  toUserId");

    const hideUsersFromFeed = new Set();
    connectionRequests.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });

    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    }).select(USER_SAFE_DATA)
    .skip(skip)
    .limit(limit);
     

    res.json({ data: users });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
module.exports = userRouter;
