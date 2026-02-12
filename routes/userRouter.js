const{Router}=require("express");
const userController = require("../controllers/userController");
const userRouter= Router();

userRouter.get("/",userController.getMainPage);
userRouter.get("/signup",userController.getSignupForm);
userRouter.post("/signup",userController.postUser);
userRouter.get("/login",userController.getLoginForm);
userRouter.get("/membership",userController.isAuth,userController.getMembershipForm);
userRouter.post("/membership",userController.isAuth,userController.postMembership);
userRouter.get("/createMsg",userController.isAuth,userController.getMsgForm);
userRouter.post("/createMsg",userController.postMsg);
module.exports=userRouter;