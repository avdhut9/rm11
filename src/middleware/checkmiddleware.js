const jwt=require("jsonwebtoken");

const middleware=async(req,res,next)=>{
    const {token}=req.headers;
    if(!token){
        return res.send("unauthorized")
    }try{
    const verify=jwt.verify(token,"avdhut@0511");
    if(verify){
        req.userid=verify._id
        next()
    }
    }catch(e){
      
    return res.send(e.message);

}
    }
    module.exports=middleware