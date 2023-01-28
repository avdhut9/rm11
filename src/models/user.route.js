const express=require("express");
const app=express.Router();
const jwt=require("jsonwebtoken")
app.post("/",async(req,res)=>{
    const{refreshtoken}=req.headers
    if(!refreshtoken){
        res.send("not authorized")
    }try{
const verify=jwt.verify(refreshtoken,"avdhut$123")

    const token=jwt.sign({_id:verify._id,email:verify.email},"avdhut@0511",{expiresIn:"7 days"})
return res.send({token})
    }catch(e){
return res.send(e.message)
    }
})
module.exports=app
