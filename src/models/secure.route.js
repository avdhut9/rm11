const express=require("express");
const app=express.Router();
const Usermodel=require("./user.model")
const BMImodel=require("./bmi.model")
const jwt=require("jsonwebtoken")
const middleware=require("../middleware/checkmiddleware")
app.use(middleware)
app.get("/",async(req,res)=>{
    res.send("ok")
})
app.post("/getprofile",async(req,res)=>{
    const {token}=req.headers
   const decode=jwt.decode(token,"avdhut@0511");
   if(decode.email){
let user=decode.email;
let info=await Usermodel.find({email:user},{password:0});
return res.send(info)
   }else{
    return res.send("error")
   }
   
     
})
app.post("/calculateBMI",async(req,res)=>{
    const {token}=req.headers
    const{weight,height}=req.body;
    const BMI=Number(weight)/(Number(height)*Number(height));
    const decode=jwt.decode(token,"avdhut@0511");
    if(decode.email){
        let user=decode.email;
       const allbmi=await BMImodel.create({weight:Number(weight),height:Number(height),BMI:BMI,email:user})
        return res.send({BMI:BMI})
           }else{
            return res.send("error")
           }
           

})
app.get("/getCalculationHistory",async(req,res)=>{
    const {token}=req.headers
    const decode=jwt.decode(token,"avdhut@0511");
  if(decode.email){
    const user=await BMImodel.find({email:decode.email});
    return res.send(user)
  }else{
    res.send("error")
  }
})
module.exports=app;