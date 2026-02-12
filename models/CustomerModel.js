import mongoose from "mongoose";
const CustomerSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    date: {
        type: String,
    },
    contact: {
        type: String,
    },
    email: {
        type: String,
    },
    country: {
        type: String,
    },
    status: {
        type: String,
        enum: ["Active", "Non-Active"],
        default: "Active"
    }
})
const Customer = mongoose.model("Customer", CustomerSchema)
export default Customer;