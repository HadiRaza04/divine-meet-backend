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
    image: {
        type: String,
    },
    // permissions: {
    //     type: String,
    //     enum: ['list', 'view', 'create'],
    //     default: 'list'

    // },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
})
const User = mongoose.model("User", UserSchema)
export default User;