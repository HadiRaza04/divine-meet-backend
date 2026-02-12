import mongoose from "mongoose";

const OrgSchema = new mongoose.Schema({
     name: {
        type: String,
    },
    location: {
        type: String,
    },
    description: {
        type: String,
    }
})
const Organization = mongoose.model("Organization", OrgSchema)
export default Organization;