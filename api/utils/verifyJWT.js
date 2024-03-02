import { ApiError } from "./ApiError.js";
import jwt from "jsonwebtoken";

export const verifyJWT = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log(token);
  if (!token) throw new ApiError(400, "You need to signedIn");

  jwt.verify(token, process.env.JWT_SECRET_TOKEN, (err, user) => {
    if (err) {
      throw new ApiError(400, "Unauthorized Access!!");
    }
    req.user = user;
    next();
  });
};
