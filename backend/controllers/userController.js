import AsyncHandler from "express-async-handler";
import UserModel from "../models/userModel.js"
const AuthUser=AsyncHandler(async(req,res)=>{
const {email,password}=req.body
  const User =await UserModel.findOne({email});

  if(User&&(await User.matchPassword(password)))
  {
    res.json({
        _id:User._id,
        name:User.name,
        email:User.email,
        isAdmin:User.isAdmin,
        token:null
    })
  }
  else{
     res.status (401)
     throw new Error('Invalid email or password')
  }
})

export default AuthUser;