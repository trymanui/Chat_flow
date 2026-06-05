import React from "react";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import { useChatStore } from "../store/useChatStore";
import ContactList from "../components/ContactList";
import ChatList from "../components/ChatList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";

const ChatPage = () => {
  const { activeTab, selectedUser } = useChatStore();

  const content = (
    <>
      {/* LEFT PANEL */}
      <div
        className={`
          ${
            selectedUser
              ? "hidden md:flex"
              : "flex w-full md:w-80"
          }
          flex-col
          bg-slate-800/50
          backdrop-blur-sm
          h-full
        `}
      >
        <ProfileHeader />
        <ActiveTabSwitch />

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {activeTab === "chats" ? <ChatList /> : <ContactList />}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div
        className={`
          ${
            selectedUser
              ? "flex w-full"
              : "hidden md:flex"
          }
          flex-col
          flex-1
          bg-slate-900/50
          backdrop-blur-sm
          h-full
          transition-all
          duration-300
        `}
      >
        {selectedUser ? (
          <ChatContainer />
        ) : (
          <NoConversationPlaceholder />
        )}
      </div>
    </>
  );

  return (
    <div className="relative w-full h-screen md:h-[800px] text-white max-w-6xl           bg-slate-900/50
">
      
      {/* Desktop */}
      <div className="hidden md:block h-full">
        <BorderAnimatedContainer>
          {content}
        </BorderAnimatedContainer>
      </div>

      {/* Mobile */}
      <div className="flex md:hidden h-full">
        {content}
      </div>

    </div>
  );
};

export default ChatPage;