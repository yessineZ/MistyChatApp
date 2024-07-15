import  express  from "express";
import CheckAuth from "../middlewares/checkAuth.js";
import  {getUsersForSideBar}  from "../controllers/user.controller.js";
import { generateAvatar } from "../controllers/animeAvatar.controller.js";
const router = express.Router();

router.get('/',CheckAuth,getUsersForSideBar) ;

router.get('/avatar',generateAvatar) ; 


export default router