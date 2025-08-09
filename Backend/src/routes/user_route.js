import express from "express";
import { protectRoute } from "../middleware/auth_middleware.js";
import { getMyFriends,
        getRecommendedUsers,
        sendFriendRequest, 
        acceptFriendRequest, 
        getFriendRequest,
        getOutgoingFriendRequest } from "../controllers/user_controller.js";

const router = express.Router();

// apply auth middleware to all routes 
router.use(protectRoute);

router.get("/", getRecommendedUsers);
router.get("/friends", getMyFriends);

router.post("/friend-request/:id", sendFriendRequest);
router.put("/friend-request/:id/accept", acceptFriendRequest);

router.get("/friend-request", getFriendRequest);
router.get("/outgoing-friend-requests", getOutgoingFriendRequest);




export default router;