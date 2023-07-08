import express, { Router } from "express"
import { register_callback } from "./register"
import {login_callback} from "./login"
const router:Router = express.Router()

router.post("/register", register_callback)
router.post("/login", login_callback)

export default router