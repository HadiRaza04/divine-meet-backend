import mongoose from 'mongoose';

const EventsSchema = new mongoose.Schema({
     name: {
        type: String,
    },
    date: {
        type: String,
    },
    location: {
        type: String,
        
    },
    ticket: {
        type: String,
        enum: ['Paid', 'Unpaid'],
        default: 'Unpaid'
    },
    capacity: {
        type: String,
    },
    status: {
        type: String,
        enum: ['Pending', 'Done'],
        default: 'Pending'
    },
    // role: {
    //   type: String,
    //   enum: ["admin", "user"],
    //   default: "user",
    // }
})
const Event = mongoose.model("Event", EventsSchema)
export default Event;