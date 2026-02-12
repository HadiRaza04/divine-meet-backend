import Organization from "../models/OrganizationModel.js";

export const AddOrg = async (req, res) => {
    try {
        const { name, description, location, } = req.body;

        if(!name || !description || !location ) return res.status(400).json({ success: false, message: "name, description and location required"});

        const newOrg = new Organization({name, location, description})
        await newOrg.save();

        res.status(201).json({ success: true, message: "Organization created success."})


    } catch (error) {
        res.status(400).json({ success: false, messgae: error.message });
    }
}
export const AllOrg = async (req, res) => {
    try {

        const org = await Organization.find();

        if(!org) return res.status(200).json({ message: "No organizations."})

        res.status(201).json({ success: true, org})


    } catch (error) {
        res.status(400).json({ success: false, messgae: error.message });
    }
}
