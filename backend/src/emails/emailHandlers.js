import { resendClient } from "../lib/resend.js"
import { createWelcomeEmailTemplate } from "./emailTemplate.js"
import { sender } from "../lib/resend.js";

export const sendWelcomeEmail=async (email,name,clientURL)=>{
const {data,error}= await resendClient.emails.send({
  from:`${sender.name} <${sender.email}>`,
  to:email,
  subject:"Welcome to Chat Flow",
  html:createWelcomeEmailTemplate(name,clientURL),
});

if (error) {
  console.error("Resend API Error:", JSON.stringify(error, null, 2));
  throw new Error(error.message || "Failed to send welcome email");
}
console.log("WELCOME email send ", data);
};