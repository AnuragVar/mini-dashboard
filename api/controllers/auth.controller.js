import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const options = {
  httpOnly: true,
  secure: true,
};
const signup = async function (req, res, next) {
  try {
    const { name, email, password } = req.body;
    console.log("checking",name, email, password);
    if ([name, email, password].some((field) => !field?.trim())) {
      console.log(2);
      throw new ApiError(407, "All fields are required!!");
    }
    //all fields are required

    if (!email.trim().includes("@"))
      throw new ApiError(405, "Email is incorrect!!");
    //validating email

    const existedUser = await User.findOne({
      $or: [{ name }, { email }],
    });

    if (existedUser) throw new ApiError(408, "User already existed!!");
    //user already exist or not

    const hassedPassword = bcryptjs.hashSync(password, 10);

    const newUser = User({ name, email, password: hassedPassword });

    await newUser.save();
    const { password: pass, ...info } = newUser._doc;

    res
      .status(200)
      .json(new ApiResponse(200, info, "User created successfully"));
  } catch (error) {
    next(error);
  }
};
export { signup };

export const signIn = async function (req, res, next) {
  try {
    const { email, password, name } = req.body;
    //taking credentials from body
    //validate them - empty, email format
    //check for the existing user
    //check the password with the password of the user
    //assigning a token to them
    //findOne
    //
    if (!email && !name)
      throw new ApiError(400, "Atleast email or name is required!!!");
    // if ([email, name, password].some((field) => field?.trim() === "")) {
    //   throw new ApiError(400, "all fields are required");
    // }

    const existedUser = await User.findOne({
      $or: [{ name }, { email }],
      // name,
    });

    if (!existedUser) throw new ApiError(400, "User doesn't exist");

    const isValidPassword = bcryptjs.compareSync(
      password,
      existedUser.password
    );

    if (!isValidPassword) throw new ApiError(400, "Password is wrong!!");

    const token = jwt.sign(
      { id: existedUser._id },
      process.env.JWT_SECRET_TOKEN,
      { expiresIn: "2d" }
    );

    const { password: pass, ...info } = existedUser._doc;
    res
      .cookie("access_token", token, options)
      .status(200)
      .json(new ApiResponse(200, info, "user is logged successfully"));
  } catch (error) {
    // throw new ApiError(500, error.message || "Something wrong happens!!");
    next(error);
  }
};

export const signInThroughGoogle = async (req, res, next) => {
  try {
    const { name, email, photo } = req.body;
    console.log(name, email, photo);
    const existedUser = await User.findOne({
      email,
    });
    console.log(2);
    if (existedUser) {
      const token = jwt.sign(
        { id: existedUser._id },
        process.env.JWT_SECRET_TOKEN,
        { expiresIn: "2d" }
      );
      console.log(existedUser);
      console.log(3);
      const { password, ...info } = existedUser._doc;

      res
        .cookie("access_token", token, options)
        .status(200)
        .json(new ApiResponse(200, info, "user is logged successfully"));
    } else {
      const generatePassword =
        Math.random.toString(36).slice(-8) + Math.random.toString(36).slice(-8);
      const hassedPassword = bcryptjs.hashSync(generatePassword, 10);
      const newUser = await User.create({
        name:
          name.split(" ").join("").toLowerCase() +
          Math.random.toString(36).slice(-4),
        email,
        password: hassedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign(
        { id: newUser._id },
        process.env.JWT_SECRET_TOKEN,
        {
          expiresIn: "2d",
        }
      );

      const { password, ...info } = newUser._doc;

      res
        .cookie("access_token", token, options)
        .status(200)
        .json(new ApiResponse(200, info, "user is logged successfully"));
    }
  } catch (error) {
    next(error);
  }
};

export const profileUpdate = async (req, res, next) => {
  const { name, email, password, id } = req.body;
  const existedUser = await User.findOne({ id });
  if (!existedUser) {
    throw new ApiError(500, "Something went wrong while fetching User Data");
  }
  if (name?.trim() !== "") existedUser.name = name;
  if (email?.trim() !== "") existedUser.email = email;
  if (password?.trim() !== "") {
    const hassedPassword = bcryptjs.hashSync(password, 10);
    existedUser.password = hassedPassword;
  }

  await existedUser.save();
  return existedUser;
};
