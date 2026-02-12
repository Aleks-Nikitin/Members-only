const {matchedData,validationResult,body}=require("express-validator");
const bcrypt =require("bcryptjs");
const db= require("../db/query");
const lengthErr= "length must be more than 1";
const emailErr= "Not a valid email";
const booleanErr= "Not a boolean"
const passwordErr="Minimum length: 8 characters Minimum of 1 lowercase character ,Minimum of 1 uppercase character,Minimum of 1 number,Minimum of 1 symbol "
const validateUser=[
    body("firstname").trim()
    .isLength({min:1}).withMessage(`first name err:${lengthErr}`),
    body("lastname").trim()
    .isLength({min:1}).withMessage(`last name err:${lengthErr}`),
    body("username").trim()
    .isEmail().withMessage(`ERROR:${emailErr}`),
    body("password").trim()
    .isStrongPassword().withMessage(`Password err ${passwordErr}`),
    body("confpassword").trim()
    .custom((value,{req})=>{
        return value ==req.body.password;
    }).withMessage("confirm password doesnt match"),
    body("admin").isBoolean().withMessage(booleanErr)
   
]


async function getMainPage(req,res) {
    const messages= await db.getAllMsg();
    console.log(messages);
     res.render("index",{title:"Main page",user:req.user,messages:messages})
}
async function getSignupForm(req,res) {
    res.render("signup",{title:"Sign up:"})
}
const postUser= [validateUser,async (req,res,next) => {
    const errors=validationResult(req);
       console.log(req.body)
    if(!errors.isEmpty()){
        return res.render("signup",{title:"sign up",errors:errors.array(),user:req.body})
    }
    const {firstname,lastname,username,password,admin}=matchedData(req);
    const passwordHashed= await bcrypt.hash(password,10);
    await db.postUser(firstname,lastname,username,passwordHashed,admin);
    res.redirect("/");
}
]
async function getLoginForm(req,res){
    res.render("login",{title:"Login Forn"})
}
async function getMembershipForm(req,res){
    res.render("membership",{title:"Membership form"});

}
async function getMsgForm(req,res,next){
    res.render("msgForm",{title:"Create your message"})
}
async function postMsg(req,res){
    const{title,msg}=req.body;
    const {id} = req.user;
    const date = Date.now();
    await db.postMsg(title,date,msg,id);
    res.redirect("/");

}
async function isAuth(req,res,next){
    if(req.isAuthenticated()){
        next();
    }else{
        res.status(401).json({msg:"You are not authorized to view this resource"})
    }
}
async function postMembership(req,res){
    let keyword="coding";
    const{passcode}=req.body;
    if(passcode==keyword && req.user.membership == null){
        console.log(req.user);
        await db.addMembership(req.user.id);
    }
    console.log(req.user);
    res.redirect("/");
}

module.exports={
    getMainPage,
    getSignupForm,
    postUser,
    getLoginForm,
    getMembershipForm,
    postMembership,
    isAuth,
    getMsgForm,
    postMsg
}