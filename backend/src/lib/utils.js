import jwt from "jsonwebtoken";
import { ENV } from "./env";

export const generateToken=(userId,res)=>{
 const {JWT_SECRET}=ENV;
 if(!JWT_SECRET) {
  throw new Error("JWT_SECRET NOT FOUNT");
 }

  const token =jwt.sign({userId},JWT_SECRET,{
    expiresIn:'7d',
  });

  res.cookie("jwt",token,{
  maxAge:7*24*60*60*1000, //ms
  httpOnly:true, //prevent xss attack :cross -site attack
 sameSite:"strict",//CSRF attracts
 secure:ENV.NODE_ENV=='production' ?true :false,

  });
  return token;
};