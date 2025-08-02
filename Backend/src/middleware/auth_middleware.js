import jwt from "jsonwebtoken";
import User from "../models/User.js";



export const protectRoute = async (req, res, next) => {

    try{
      const token = req.cookies.jwt;

        if (!token) {
         return res.status(401).json({ message: "Unauthorized - No token provided"});
        } 

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log("Decoded token:", decoded);

        if(!decoded) {
            return res.status(401).json({ message: "Unauthorized - Invalid token" });
        }

        const user = await User.findById(decoded.userid).select("-password");
        console.log("User from token:", user);

        if(!user) {
            return res.status(404).json({ message: " Unauthorized - User not found" });
        }
        req.user = user;
    
        next();

    } catch (error) {
        console.error("Error in protectRoute middleware:", error);
        return res.status(500).json({ message: "Internal Server Error" });

    }
}