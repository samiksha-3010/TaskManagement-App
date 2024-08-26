import user from '../model/user.js';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.json({
        success: false,
        message: "All fields are mandatory."
      });

    const isEmailExist = await user.find({ email: email });
    if (isEmailExist.length) {
      return res.json({
        success: false,
        message: "Email already exists, try a different email."
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new user({ name, email, password: hashedPassword });

    await newUser.save();

    return res.json({
      success: true,
      message: "User registered successfully.",
      user: newUser,
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};


export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.json({
        success: false,
        message: "All fields are mandatory.",
      });

    const newUser = await user.findOne({ email });
    if (!newUser) return res.json({ success: false, message: "User not found." });

    const isPasswordRight = await bcrypt.compare(password, newUser.password);

    if (isPasswordRight) {
      const userObject = {
        name: newUser.name,
        email: newUser.email,
        task:newUser.tasks,
        _id: newUser._id,
      };
      const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);

      return res.json({
        success: true,
        message: "Login Successful.",
        user: userObject,
        token: token,
      });
    }

    return res.json({ success: false, message: "Password is wrong." });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};