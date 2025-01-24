import handleError from "../middleware/error.middleware.js";
import User from "../models/user.model.js";
const deleteUser = async (req, res, next) => {
  try {
    if(!req.body.email || !req.body.password ) return next(handleError(400, "email or password cammot be emty"))
    if (req.id != req.params.id) return next(handleError(401, "You can only delete your own account"));
     await User.findByIdAndDelete(req.params.id)
     res.status(200).json({message: "Account deleted successfully"})
  } catch (err) {
    next(err);
  }
}

export {deleteUser};