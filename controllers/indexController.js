const db=require("../db/query");
const bcrypt=require("bcryptjs");

const verifyLocal = async (username,password,done)=>{
    try {
        const user = await db.findByEmail(username);
        if(!user){
            return done(null,false,{message:"Incorrect username"})
        }
        const match =await bcrypt.compare(password,user.password);
        if(!match){
            return done(null,false,{message:"Incorrect password"})
        }
        return done(null,user);
    } catch (error) {
        return done(err)
    }
}
const deserialize = async (id, done)=>  {
  try {
    const user = await db.findUserById(id);
    done(null, user);
  } catch(err) {
    done(err);
  }
}
const serialize = async(user, done)=>  {
  done(null, user.id);
} 
const logout = async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};
module.exports={
    verifyLocal,
    deserialize,
    serialize,
    logout
}