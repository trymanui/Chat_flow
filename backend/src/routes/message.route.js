import express from 'express';

const router=express.Router();

router.get('/send',(req,res)=>{
  res.send("message sending endpoint")
})

export default router;