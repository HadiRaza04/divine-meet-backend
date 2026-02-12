import Mosque from "../models/MosqueModel.js";

export const AddMosque = async (req, res) => {
    try {
        const { name, description, location, } = req.body;

        if(!name || !description || !location ) return res.status(400).json({ success: false, message: "name, description and location required"});

        const newMosque = new Mosque({name, location, description})
        await newMosque.save();

        res.status(201).json({ success: true, message: "Mosque created success."})


    } catch (error) {
        res.status(400).json({ success: false, messgae: error.message });
    }
}
export const AllMosque = async (req, res) => {
    try {

        const mosque = await Mosque.find();

        if(!mosque) return res.status(200).json({ message: "No mosque."})

        res.status(201).json({ success: true, mosque})


    } catch (error) {
        res.status(400).json({ success: false, messgae: error.message });
    }
}
