import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import handleError from "./error.middleware.js";
const verifyAccess = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.authorization;
    if(!authHeader) return next(handleError(401, "You are not authorized to perform that action"))
    let accessToken
    if (authHeader && authHeader.startsWith("Bearer ")) {
      accessToken = authHeader.split(" ")[1];
      jwt.verify(accessToken, process.env.SECRET_KEY, async (err, decoded) => {
        if (err) {
          return handleError(401, err.message);
        }
        const user = await User.findById(decoded.id);
        if (user) {
          decoded.id = user._id;
          req.id=user._id
          req.user=user ;
          next()
        }else{
          next(handleError(404, "User account does not exist"))
        }
      });
    }
  } catch (err) {
    next(err);
    console.log(err)
  }
};

export{verifyAccess}
