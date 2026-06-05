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
          min-h-0
        `}
      >
        <ProfileHeader />
        <ActiveTabSwitch />

        <div className="flex-1 overflow-y-auto p-4 space-y-2 min-h-0">
          {activeTab === "chats" ? (
            <ChatList />
          ) : (
            <ContactList />
          )}
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
          h-full
          min-h-0
          bg-slate-900/50
          backdrop-blur-sm
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
    <>
      {/* Desktop - unchanged */}
      <div className="hidden md:block relative w-full max-w-6xl h-[800px] text-white">
        <BorderAnimatedContainer>
          {content}
        </BorderAnimatedContainer>
      </div>

      {/* Mobile */}
      <div
        className="
          md:hidden
          fixed
          inset-0
          w-screen
          h-dvh
          overflow-hidden
          text-white
          bg-slate-900
        "
      >
        <div className="flex h-full w-full">
          {content}
        </div>
      </div>
    </>
  );
};

export default ChatPage;