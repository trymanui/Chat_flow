import mongoose from "mongoose";

export const connectDB=async()=>{
  try{
  const {MONGO_URL}=process.env;
  if (!MONGO_URL) throw new Error("MONGO_URL is not set");


   const conn= await mongoose.connect(process.env.MONGO_URL)
    console.log("mongodb connect",conn.connection.host)
  } catch(error){
console.error("error connecting to mongo db",error)
process.exit(1);
  }
}