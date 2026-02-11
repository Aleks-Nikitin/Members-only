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
const port= process.env.PORT || 3000;
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}))
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
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await db.findByEmail(username)

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
         const match = await bcrypt.compare(password, user.password);
        if (!match) {
        // passwords do not match!
        return done(null, false, { message: "Incorrect password" })
        }

      return done(null, user);
    } catch(err) {
      return done(err);
    }
  })
);
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.findUserById(id);

    done(null, user);
  } catch(err) {
    done(err);
  }
});
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
  })
);
/*
passport.use(
    new LocalStrategy(indexController.verifyLocal)
)
passport.serializeUser(indexController.serialize);
passport.deserializeUser(indexController.deserialize);
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
  })
);
*/
app.use("/",indexRouter,userRouter);

app.listen(port,'localhost',(err)=>{
    if(err){
        throw new Error;
    }
    console.log("server started");
})