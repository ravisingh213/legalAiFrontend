import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import "./App.css";

import Login from "./pages/login/Login";
import ForgotPassword from "./pages/forgot-password/ForgotPassword";
import VerifyEmail from "./pages/forgot-password/VerifyEmail";
import ResetPassword from "./pages/forgot-password/ResetPassword";
import ThanksPage from "./pages/forgot-password/ThanksPage";
import Chat from "./pages/chat/Chat";
import Messages from "./pages/chat/Messages";
import SignUp from "./pages/signUp/SignUp";
import Settings from "./pages/my-account/Settings";
import DocumentManager from "./pages/my-account/DocumentManager";
import UserManager from "./pages/my-account/UserManager";
import { Layout } from "antd";
import { MessageProvider } from "./context/useMessageContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { TokenProvider } from "./context/TokenContext";

function App() {
  return (
    <div className="leagalAI-container">
      <MessageProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="register" element={<SignUp />} />
            <Route path="ForgotPassword" element={<ForgotPassword />} />
            <Route path="verify-email" element={<VerifyEmail />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="password-reset-successfull" element={<ThanksPage />} />

            <Route
              path="chat-modal"
              element={
                <ProtectedRoute>
                  <Chat />
                </ProtectedRoute>
              }
            />
            <Route
              path="messages"
              element={
                <ProtectedRoute>
                  <Messages />
                </ProtectedRoute>
              }
            />

            <Route
              path="Settings"
              element={
                <ProtectedRoute>
                  <TokenProvider>
                    <Settings />
                  </TokenProvider>
                </ProtectedRoute>
              }
            />
            <Route
              path="Document-manager"
              element={
                <ProtectedRoute>
                  <TokenProvider>
                    <DocumentManager />
                  </TokenProvider>
                </ProtectedRoute>
              }
            />
            <Route
              path="user-manager"
              element={
                <ProtectedRoute>
                  <TokenProvider>
                    <UserManager />
                  </TokenProvider>
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      </MessageProvider>
    </div>
  );
}

export default App;
