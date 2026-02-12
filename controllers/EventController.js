import Event from "../models/EventsModel.js";

export const AddEvent = async (req, res) => {
    try {
        const { name, date, location, ticket, capacity, status, role, permissions } = req.body;

        if(!name || !date || !location ) return res.status(400).json({ success: false, message: "name, date and location required"});

        const newEvent = new Event({name, date, location, ticket, capacity, status, role, permissions})
        await newEvent.save();

        res.status(201).json({ success: true, message: "Event created success."})


    } catch (error) {
        res.status(400).json({ success: false, messgae: error.message });
    }
}
export const AllEvents = async (req, res) => {
    try {

        const events = await Event.find();

        if(!events) return res.status(200).json({ message: "No events."})

        res.status(201).json({ success: true, events})


    } catch (error) {
        res.status(400).json({ success: false, messgae: error.message });
    }
}
