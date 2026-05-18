import User from "../models/User.js";
import bcrypt from "bcryptjs"
import {generateToken} from "../lib/utils.js"
import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import { ENV } from "../lib/env.js";



export const signup= async (req,res)=>{
  const {fullName,email,password}=req.body
  try {
    if(!fullName ||!email ||!password){
        return res.status(400).json({message:"ALL fields are required"});
      }

    if(password.length<6){
     return res.status(400).json({message:"Password must be at least 6 characters"});
    }


    //checks emails s valid :regex
    const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
      return res.status(400).json({message:"Invalid email format"}) 
    }

    const user=await User.findOne({email});
    if(user) return res.status(401).json({message:"Email already exists "})

      //password changing to unreadable formats
     const salt=await bcrypt.genSalt(10)
     const hashPassword=await bcrypt.hash(password,salt)

//create new user

const newUser= new User({
  fullName,
  email,
  password:hashPassword
})

if(newUser){
  const savedUser=  await newUser.save()
  generateToken(savedUser._id,res)

  res.status(201).json({
    _id:newUser._id,
    fullName:newUser.fullName,
    email:newUser.email,
    profilePic:newUser.profilePic
  })

  //send welcome mail
   try{
  await sendWelcomeEmail(savedUser.email,savedUser.fullName,ENV.CLIENT_URL);
   } catch(error){
  console.error("failed to send email ",error);
   }
} else{
  res.status(400).json({message:"invalid user data"});
}

  } catch (error) {
    console.log("error in signup controller: ",error)
    res.status(500).json({
      message:"internal server error",
    })
  }
}