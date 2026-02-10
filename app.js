const express= require("express");
const path=require("node:path")
const app =express();
const port= process.env.PORT || 3000;
app.set("view engine",path.join(__dirname,"views"));

app.set("ejs");
app.use(express.urlencoded({extended:true}))
app.listen(port,'0.0.0.0',(err)=>{
    if(err){
        throw new Error;
        
    }
    console.log("server started");
})