import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useChatStore=create((set,get)=>({
  allContacts:[],
  chats:[],
  messages:[],
  activeTab:'chats',
  selectedUser:null,
  isUserLoading:false,
  isMessagesLoading:false,
  isSoundEnabled:localStorage.getItem("isSoundEnabled")===true,

  toggleSound:()=>{
    localStorage.getItem('isSoundEnabled',!get().isSoundEnabled)
    set({isSoundEnabled:!get().isSoundEnabled})
  },

  setActiveTab:(tab)=>set({activeTab:tab}),
  setSelectedUser:(selectedUser)=>set({selectedUser}),

  getAllContact:async()=>{
set({isUserLoading:true});
try {
  const res=await axiosInstance.get("/messages/contacts");
  set({allContacts:res.data});
} catch (error) {
  toast.error(error.response.data.message);
}finally{
  set({isUserLoading:false});
}
  },

  getMyChatPartners:async()=>{
try {
  set({isUserLoading:true});
  const res=await axiosInstance.get("/messages/chats");
  set({chats:res.data});
} catch (error) {
    toast.error(error.response.data.message);
}finally{
  set({isUserLoading:false});
}
  }
}))