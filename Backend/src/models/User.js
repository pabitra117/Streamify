import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema= new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        bio: {
            type: String,
            default: "",
        },
        profilepic: {
            type: String,
            default: "",
        },
        nativelanguage: {
            type: String,
            default: "",
        },
        learninglanguage: {
            type: String,
            default: "",
        },
        location: {
            type: String,
            default: "",
        },
        isOnboarded: {
            type: Boolean,
            default: false,
        },
        friends: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    {timestamps: true}
);



   const User = mongoose.model("User", userSchema);
   
   // TODO: explain this once again
   userSchema.pre("save", async function (next) {
    if (!this.isModified("password"))  return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }

   });

   export default User;