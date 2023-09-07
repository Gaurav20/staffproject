const mongoose = require("mongoose");
const userSchema= new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        require:"email is requier",
        trim:true
    },
    name:{
        type:String,
        require:"name is requier",
        trim:true
    },
    dob:{
        type:Date,
        require:"Date of birth is requier",
        trim:true
    },
    password:{
        type:Number,
        require:"password is requier",
        trim:true
    },
    otp:{
        type:Number,
        default:null,
        trim:true

    }
    
},{timestamps:true});

const user=mongoose.model('user',userSchema);
module.exports = user;