import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateOtp from "../utills/generateOtp.js";
import sendEmail from "../utills/sendEmail.js";
import jwt from "jsonwebtoken";

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

    //  Return response as success
    return res.status(201).json({
      message: "Registration successful. OTP sent to email.",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "server error" });
  }
};

// ===============================
// 📌 VERIFY OTP
// ===============================
const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Validate input
    if (!email || !otp) {
      return res.status(400).json({ message: "All field are required" });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check Otp existence
    if (!user.emailOtpHash) {
      return res.status(404).json({ message: "Otp not found" });
    }

    // Otp expiry check
    if (user.emailOtpExpiresAt < Date.now()) {
      return res
        .status(400)
        .json({ message: "Otp expired! Please resend Otp." });
    }

    //  Max attempts check (5)
    if (user.emailOtpAttempts >= 5) {
      return res.status(429).json({
        message: "Maximum OTP attempts exceeded. Please resend OTP.",
      });
    }

    //Compare OTP (bcrypt)
    const isOtpValid = await bcrypt.compare(otp, user.emailOtpHash);

    if (!isOtpValid) {
      user.emailOtpAttempts += 1;
      await user.save();

      return res.status(400).json({ message: "Invalid Otp" });
    }

    // Otp success Email verify true & save
    user.isEmailVerified = true;
    user.emailOtpHash = null;
    user.emailOtpExpiresAt = null;
    user.emailOtpAttempts = 0;
    await user.save();

    //  Issue JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY }
    );

    // Token Options
    const Options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };

    // Return res as success & set cookie
    return res
      .cookie("token", token, Options)
      .status(200)
      .json({
        message: "Email Verified",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};

// ===============================
// 📌 RESEND OTP
// ===============================
const resendEmailOtp = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate input
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Already verified
    if (user.isEmailVerified) {
      return res.status(400).json({ message: "Email already verified" });
    }

    // Generate new Otp
    const otp = generateOtp();
    const emailOtpHash = await bcrypt.hash(otp, 10);

    // Overwrite old OTP (invalidate previous one)
    user.emailOtpHash = emailOtpHash;
    user.emailOtpExpiresAt = Date.now() + 10 * 60 * 1000; // 10 mint
    user.emailOtpAttempts = 0;
    await user.save();

    //Send email
    await sendEmail({
      to: email,
      subject: "Goritmi Verification Code (Resent)",
      html: `
        <div style="font-family: Arial, sans-serif">
          <h2>OTP Resent</h2>
          <p>Your new verification code is:</p>
          <h1>${otp}</h1>
          <p>This code will expire in 10 minutes.</p>
        </div>
      `,
    });

    return res
      .status(200)
      .json({ message: "OTP resent successfully. Please check your email." });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export { register, verifyOtp, resendEmailOtp };
