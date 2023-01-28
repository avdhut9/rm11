const express=require("express");
const app=express.Router();
const Usermodel=require("./user.model")
const BMImodel=require("./bmi.model")
const jwt=require("jsonwebtoken")
const middleware=require("../middleware/checkmiddleware")
const cors=require("cors")
app.use(middleware)
app.use(cors())
app.use(express.json())
app.get("/",async(req,res)=>{
    res.send("ok")
})
app.post("/getprofile",async(req,res)=>{
    const {token}=req.headers
   const decode=jwt.decode(token,"avdhut@0511");
   if(decode.email){
let user=decode.email;
let info=await Usermodel.findOne({email:user},{password:0});
return res.send(info)
   }else{
    return res.send("error")
   }
   
     
})
app.post("/calculateBMI",async(req,res)=>{
    const {token}=req.headers;
   let{weight,height}=req.body;

   
    let BMI=weight/(height*height);
    const decode=jwt.decode(token,"avdhut@0511");
    if(decode.email){
        let user=decode.email;
       const allbmi=await BMImodel.create({weight:weight,height:height,BMI:BMI,email:user})
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