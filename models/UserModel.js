import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
     name: {
        type: String,
    },
    designation: {
        type: String,
    },
    country: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobile: {
        type: String,
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'ameer'],
        default: 'user'

    },
    permissions: {
        type: String,
        enum: ['list', 'view', 'create'],
        default: 'list'

    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    // role: {
    //   type: String,
    //   enum: ["admin", "user"],
    //   default: "user",
    // }
})
const User = mongoose.model("User", UserSchema)
export default User;