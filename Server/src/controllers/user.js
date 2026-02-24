import { validateLength, validateEmail } from "../helper/validation";
import User from "../models/user";
import { generateToken } from "../services/auth";

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
  if (check) return res.json(400).json({ message: "email already exist" });

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
    id: User._id.toString(),
  },
  "15d",
);

res.send({
  id: User._id,
  name: User.name,
  picture: User.picture,
  token: token,
  message: "user registered!!",
  likes: [],
  bookmarks: [],
});
}

export {
  registerUser,
}


