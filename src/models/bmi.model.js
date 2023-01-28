const mongoose=require("mongoose");
const Schema=new mongoose.Schema({
    weight:{type:Number,required:true},
    height:{type:Number,required:true},
    email:{type:String,required:true},
    BMI:{type:Number,required:true}

})
const BMImodel=mongoose.model("bmi",Schema);
module.exports=BMImodel;
