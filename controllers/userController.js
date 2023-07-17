const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SCERET_KEY = process.env.SCERET_KEY ;

const signup = async (req, res) => {
  // Existing User Check
  // Hashed Password
  // User Creation
  // Token Generate

  const { username, email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res.send(400).json({ message: "USer already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await userModel.create({
      email: email,
      password: hashedPassword,
      username: username,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, SCERET_KEY);
    res.status(201).json({ user: result, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something error" });
  }
};

const signin = async (req, res) => {
  const {  email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ email: email });
    if (!existingUser) {
      return res.send(404).json({ message: "USer not exists" });
    }

    const matchPassword = await bcrypt.compare(password, existingUser.password);

    if (!matchPassword) {
      return res.send(400).json({ message: "Invalid credentoa;" });
    }

    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, SCERET_KEY);
    res.status(200).json({ user: existingUser, token: token });
  } catch (error) {
      console.log(error);
      res.status(500).json({message:"something wrong"})
  }
};
module.exports = { signup, signin };
