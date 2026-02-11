const{Router}=require("express");
const userController = require("../controllers/userController");
const userRouter= Router();

userRouter.get("/",userController.getMainPage);
userRouter.get("/signup",userController.getSignupForm)
userRouter.post("/signup",userController.postUser)
userRouter.get("/login",userController.getLoginForm)
module.exports=userRouter;