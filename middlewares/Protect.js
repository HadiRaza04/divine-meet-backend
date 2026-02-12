import jwt from 'jsonwebtoken'
import { jwt_secret } from '../env.js';
import User from '../models/UserModel.js';

const Protect = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if(!token) return res.status(401).json({ message: "Not authorized."});

        const decoded = jwt.verify(token, jwt_secret);

        req.user = await User.findById(decoded.id).select("-password");

        next();


    } catch (error) {
        res.status(401).json({ message: error.message });
    }
}
export default Protect;