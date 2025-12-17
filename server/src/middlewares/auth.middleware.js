import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const authMiddleware = async (req, res) => {
  try {
  } catch (error) {
    return res.status(401).json({ message: "invalid token" });
  }
};

export default authMiddleware;
