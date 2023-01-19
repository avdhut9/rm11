require("dotenv").config();
const Usermodel=require("./src/models/user.model")
const jwt=require("jsonwebtoken")
const express=require("express");
const PORT=process.env.PORT||8080;
const connect=require("./src/config/connect")
const refresh=require("./src/models/user.route")
const argon2 = require('argon2');
const app=express();
app.use(express.json())
app.use("/refresh",refresh)
app.get("/",async(req,res)=>{
    const user=await Usermodel.find();
    res.send(user)
   })
app.post("/signup",async(req,res)=>{
    const hash=await argon2.hash(req.body.password);
try{
    const user=await Usermodel.create({...req.body,password:hash})
    return res.send("user signed up successfully")
}catch(e){
    return res.send(e.message)
}
})
app.post("/login",async(req,res)=>{
    const{email,password}=req.body
   try{
const user=await Usermodel.findOne({email:email})
       if(!user){
            return res.status(401).send("user not found")
        }else{
            if(await argon2.verify(user.password,password)){
                const token=jwt.sign({_id:user._id,email:user.email},"avdhut@0511",{expiresIn:"7 days"})
                const refreshtoken=jwt.sign({_id:user._id,email:user.email},"avdhut$123",{expiresIn:"28 days"})
               return  res.send(res.send({message:"user login successfully",token,refreshtoken}))
            }else{
                return res.send("password does not match")
            }
            }
    }catch(e){
        console.log("ok")
return res.send(e.message)
    }
})
app.listen(PORT,async()=>{
    await connect()
    console.log("http://localhost:8080")
})