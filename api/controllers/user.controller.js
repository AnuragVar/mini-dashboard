import { ApiError } from "../utils/ApiError.js";
import bcryptjs from "bcryptjs";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";

export const test = function (req, res) {
  res.json({ message: "done" });
};

export const userUpdate = async (req, res, next) => {
  try {
    // console.log(req.user.id, req.params.id);
    if (req.user.id !== req.params.id) {
      throw new ApiError(400, "You can only update your own account!!");
    }
    console.log("hi");
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    // console.log(req.user.id);

    // console.log(req.user);
    // console.log(req.body);
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        $set: {
          userName: req.body?.userName,
          email: req.body?.email,
          password: req.body?.password,
          avatar: req.body?.avatar,
        },
      },
      { new: true }
    );
    const { password, ...info } = updatedUser._doc;
    res
      .status(200)
      .json(new ApiResponse(200, info, "user updated successfully!!"));
  } catch (error) {
    next(error);
    return;
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    throw new ApiError(400, "You are not authorized to do it!!");

  try {
    await User.findByIdAndDelete(req.user.id);
  } catch (error) {
    throw new ApiError(500, "something wents wrong!!");
  }
  res.clearCookie("access_token");
  res.status(200).json(new ApiResponse(200, "User deleted Successfully"));
};

export const signOut = (req, res, next) => {
  if (req.user.id !== req.params.id)
    throw new ApiError(400, "You don't access to signOut it!!");

  res
    .status(200)
    .json(new ApiResponse(200, "User is logged out successfully!!"));
};
