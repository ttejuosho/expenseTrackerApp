import { User } from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/mailer.js";

export const register = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  try {
    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    // Generate JWT
    const token = jwt.sign(
      { userId: newUser.userId, email: newUser.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(201).json({
      user: { userId: newUser.userId, firstName, lastName, email },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to register user" });
  }
};

// --- Login ---
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ error: "User email not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    await sendEmail(
      "welcome",
      { firstName: user.firstName, loginLink: "http://localhost:5173/login" },
      "Welcome to Penny Pincher Pro!",
      user.email
    );

    res.json({
      user: {
        userId: user.userId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
};

// --- Logout ---
export const logout = async (req, res) => {
  try {
    // Clear the cookie by setting it to empty and expiring it immediately
    res.cookie("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: new Date(0), // immediately expired
    });

    res.json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("Logout failed:", err);
    res.status(500).json({ error: "Logout failed" });
  }
};

// --- Forgot Password ---
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { email: email.email } });
    if (!user) return res.status(404).json({ error: "User not found" });

    const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    user.resetToken = token;
    user.resetTokenExpiry = new Date(Date.now() + 3600 * 1000);
    await user.save();

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

    await sendEmail({
      to: email,
      subject: "Reset Your Password",
      html: `<p>Click the link to reset your password:</p>
             <p><a href="${resetLink}">${resetLink}</a></p>`,
    });

    res.json({ message: "Password reset email sent" });
  } catch (err) {
    res.status(500).json({ error: "Failed to send reset email" });
  }
};

// --- Reset Password ---
export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.userId);

    if (
      !user ||
      user.resetToken !== token ||
      user.resetTokenExpiry < new Date()
    )
      return res.status(400).json({ error: "Invalid or expired token" });

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetToken = null;
    user.resetTokenExpiry = null;
    await user.save();

    res.json({ message: "Password has been reset" });
  } catch (err) {
    res.status(500).json({ error: "Failed to reset password" });
  }
};

// --- Get Current User ---
export const getCurrentUser0 = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.userId, {
      attributes: ["userId", "firstName", "lastName", "email"],
    });
    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching current user:", error);
    res.status(401).json({ error: "Invalid token" });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    // Assuming you store the userId in req.user from your auth middleware
    const user = req.user;
    if (!user) return res.status(401).json({ error: "Unauthorized" });

    // Optionally, fetch full user details from DB
    // const userData = await User.findByPk(user.userId, { attributes: ["userId", "firstName", "lastName", "email"] });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to get current user" });
  }
};
