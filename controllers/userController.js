const {matchedData,validationResult,body}=require("express-validator");
const bcrypt =require("bcryptjs");

const lengthErr= "length must be more than 1";
const emailErr= "Not a valid email";
const booleanErr= "Not a boolean"
const passwordErr="Minimum length: 8 characters Minimum of 1 lowercase character ,Minimum of 1 uppercase character,Minimum of 1 number,Minimum of 1 symbol "
const validateUser=[
    body("firstname").trim()
    .isLength({min:1}).withMessage(`first name err:${lengthErr}`),
    body("lastname").trim()
    .isLength({min:1}).withMessage(`last name err:${lengthErr}`),
    body("email").trim()
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
     res.render("index",{title:"Main page"})
}
async function getSignupForm(req,res) {
    res.render("signup",{title:"Sign up:"})
}
const postUser= [validateUser,async (req,res,next) => {
    const errors=validationResult(req);
       console.log(req.body)
    if(!errors.isEmpty()){
        res.render("signup",{title:"sign up",errors:errors.array(),user:req.body})
    }
    const {firstname,lastname,email,password,admin}=matchedData(req);
    const passwordHashed= await bcrypt.hash(password,10);
}
]
module.exports={
    getMainPage,
    getSignupForm,
    postUser
}