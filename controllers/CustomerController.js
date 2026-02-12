import Customer from '../models/CustomerModel.js'

export const AddCustomer = async (req, res) => {
    try {
        const { name, date, contact, email, country, status } = req.body;

        if(!name || !email || !date) return res.status(400).json({ messgae: "Name and email is required."});

        const newCustomer = new Customer({ name, date, contact, email, country, status })
        await newCustomer.save();

        res.statue(201).json({ success: true, message: "Customer created success.", newCustomer})
        
    } catch (error) {
        res.statue(400).json({ success: false, message: error.message})
    }
}
export const GetAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();
        if(!customers) return res.status(400).json({ messgae: "No Customers."});

        res.statue(201).json({ success: true, customers})
        
    } catch (error) {
        res.statue(400).json({ success: false, message: error.message})
    }
}