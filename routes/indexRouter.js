const {Router}=require("express");
const indexRouter= Router();
const indexController=require("../controllers/indexController");
indexRouter.get("/log-out", indexController.logout);

module.exports=indexRouter;