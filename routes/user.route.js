import express from "express"
import { verifyAccess } from "../middleware/auth.middleware.js"
import { deleteUser } from "../controllers/user.controller.js"
const userRouter = express.Router()
userRouter.route("/user/:id").delete( verifyAccess, deleteUser)

export default userRouter