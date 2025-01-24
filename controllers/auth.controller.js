import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import handleError from "../middleware/error.middleware.js";
import jwt from "jsonwebtoken";

const signUp = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return next(handleError(403, "email, username or password cannot be empty"))
    }
    const isAuser = await User.findOne({email})
    if(isAuser) return next(handleError(400, "User already exist"))
    const hashedPassword =  bcrypt.hashSync(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    return res.status(201).json("User account creacted succesfully");
  } catch (err) {
    next(err);
    // console.log(err);
  }
};

const signIn = async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password) return next(handleError(403, "mail or password cannot be empty"));
    let email = req.body.email
    const validUser = await User.findOne({ email });
    if (!validUser) return next(handleError(404, "User not found"));

    const validPassword = bcrypt.compareSync(req.body.password, validUser.password);
    if (!validPassword) return next(handleError(401, "Invalid password"));
    const refreshToken = jwt.sign(
      { id: validUser._id },
      process.env.JWT_SECRET_KEY
    );
    const accessToken = jwt.sign(
      { id: validUser._id, username: validUser.username },
      process.env.SECRET_KEY
    );

    const{password, ...rest}= validUser._doc
    //   expiresIn: new Date(Date.now() + 60 *60*7*1000)
    return res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true, //https
        sameSite: "None", //cross site
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({ token: accessToken, ...rest });
  } catch (err) {
    next(err);
  }
};



export {
  signUp,
  signIn
};
