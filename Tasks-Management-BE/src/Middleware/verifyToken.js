import jwt from 'jsonwebtoken'
import User from '../Model/User.js';
import mongoose from 'mongoose';

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];

    if (!token) {
      return res.status(403).json({ error: "Token Is Required" });
    }

    const bearerToken = token.split(" ")[1]; 

    const decoded = jwt.verify(bearerToken, process.env.SECRET_KEY);
    const user = await User.findOne({
      _id: new mongoose.Types.ObjectId(decoded.user?.id),
    }).select("-password -__v");

    if (!user) {
      return res.status(401).send({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send(error);
  }
};

export default verifyToken;