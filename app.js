const express= require("express");
const path=require("node:path")
const app =express();
const userRouter= require("./routes/userRouter");
const port= process.env.PORT || 3000;
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}))

app.use("/",userRouter);
app.listen(port,'localhost',(err)=>{
    if(err){
        throw new Error;
    }
    console.log("server started");
})