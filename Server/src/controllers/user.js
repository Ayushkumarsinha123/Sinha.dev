import { validateLength, validateEmail } from "../helper/validation.js";
import User from "../models/user.js";
import { generateToken } from "../services/auth.js";
import bcrypt from "bcrypt";

async function registerUser(req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: "all fields are required" });

  if (!validateEmail(email)) {
    return res.status(400).json({ message: "not the valid email" });
  }
  if (!validateLength(name, 6, 15)) {
    return res
      .status(400)
      .json({ message: "name should be 6 - 15 character long" });
  }
  if (!validateLength(password, 6, 15)) {
    return res
      .status(400)
      .json({ message: "password should be 6 - 15 character long" });
  }

  const check = await User.findOne({ email });
  if (check) return res.status(400).json({ message: "email already exist" });

  const hashed_password = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    name,
    email,
    password: hashed_password,
    verify: true,
    likeslist: {},
    bookmarkslist: {},
  });
  const token = generateToken(
    {
      id: newUser._id.toString(),
    },
    "15d",
  );
  res.send({
    id: newUser._id,
    name: newUser.name,
    picture: newUser.picture,
    token: token,
    message: "user registered!!",
    likes: [],
    bookmarks: [],
  });
}

async function loginUser(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) return res.status(400).json({ message: "user not registered" });
  if (user.googleId)
    return res
      .status(400)
      .json({
        message:
          "you have account associated with google, try to login with google",
      });
  const check = await bcrypt.compare(password, user.password);
  if (!check)
    return res.json(400).json({ message: "invalid credentials,try again." });
  const token = generateToken({ id: user._id.toString() }, "15d");
  res.send({
    id: user._id,
    name: user.name,
    picture: user.picture,
    token: token,
    bookmark: user.bookmarks,
    likes: user.likes,
  });
}

export { registerUser, loginUser };
