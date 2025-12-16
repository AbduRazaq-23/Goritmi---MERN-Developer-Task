import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateOtp from "../utills/generateOtp.js";
import sendEmail from "../utills/sendEmail.js";

// ===============================
// 📌 REGISTER USER
// ===============================
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //  Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All field are required" });
    }

    //  Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    //  Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    //  Generate OTP
    const otp = generateOtp(); // 6-digit string

    //  Hash OTP
    const emailOtpHash = await bcrypt.hash(otp, 10);

    //  Create user
    await User.create({
      name,
      email,
      passwordHash,
      emailOtpHash,
      emailOtpExpiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes
    });

    //  Send OTP email
    await sendEmail({
      to: email,
      subject: "Goritmi Verification Code",
      html: ` <div style="font-family: Arial, sans-serif">
        <h2>Verify your email</h2>
        <p>Your OTP code is:</p>
        <h1>${otp}</h1>
        <p>This code will expire in 10 minutes.</p>
      </div>`,
    });

    //  Response
    return res.status(201).json({
      message: "Registration successful. OTP sent to email.",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "server error" });
  }
};

export { register };
