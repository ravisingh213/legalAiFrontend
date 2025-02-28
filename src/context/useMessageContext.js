import { message } from "antd";
import { createContext, useContext, useState } from "react";

const MessageContext = createContext();

export function useMessageContext() {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessageContext must be used within a MessageProvider");
  }
  return context.messageApi;
}

export function MessageProvider({ children }) {
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <MessageContext.Provider value={{ messageApi }}>
      {children}
      {contextHolder}
    </MessageContext.Provider>
  );
}
