const express= require("express");
const path=require("node:path")
const app =express();
const userRouter= require("./routes/userRouter");
const session = require("express-session");
const passport =require("passport");
const bcrypt= require("bcryptjs");
const pool = require("./db/pool");
const db= require("./db/query");
const indexController=require("./controllers/indexController");
const indexRouter = require("./routes/indexRouter");
const pgSession =require("connect-pg-simple")(session);
const LocalStrategy = require("passport-local").Strategy
const port= process.env.PORT || 8060;
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"));
app.use(session({
    saveUninitialized:false,
    store: new pgSession({
        pool:pool,
        tableName:"session"
    }),
    secret:process.env.SECRET,
    resave:false,
    cookie:{maxAge:30 * 24 * 60 * 60 * 1000}

}))
app.use(passport.session());
 
passport.use(
  new LocalStrategy(indexController.verifyLocal));
passport.serializeUser(indexController.serialize);
passport.deserializeUser(indexController.deserialize);
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
  })
);
app.use("/",indexRouter,userRouter);

app.listen(port,'0.0.0.0',(err)=>{
    if(err){
        throw new Error;
    }
    console.log("server started");
})

app.use((req,res)=>{
    res.status(404).render("404",{title:"ERROR 404: Page not found"})
})