/* eslint-disable */
/* eslint-disable no-console */

import React, { useState } from "react";
import "../styles/SidePanel.scss";
// import { MenuProps } from 'antd';
import { Button, Menu } from "antd";
import { ArrowLeftOutlined, LogoutOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

import logoLI from "../../li-logo.png";
import { useToken } from "../../context/TokenContext";

// type MenuItem = Required<MenuProps>['items'][number];

function UserSidenav() {
  const { decodedToken } = useToken();
  const navigate = useNavigate();

  const items = decodedToken?.isAdmin
    ? [
        {
          label: <Link to={"/Settings"}>Settings</Link>,
        },
        {
          label: <Link to={"/user-manager"}>User Manager</Link>,
        },
        {
          label: <Link to={"/Document-manager"}>Document Manager</Link>,
        },
      ]
    : [
        {
          label: <Link to={"/Settings"}>Settings</Link>,
        },
      ];

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="side-navigation">
      <Link to={"/chat-modal"} className="back-btn">
        <ArrowLeftOutlined /> Back to Chat
      </Link>
      <Menu mode="inline" items={items} />
      <div style={{ marginTop: "60vh" }}>
        <div style={{ borderTop: "1px solid #ccc", paddingTop: "10px" }}>
          <div
            className="back-btn"
            style={{ padding: "0 10px", cursor: "pointer" }}
            onClick={() => {
              logout();
            }}
          >
            <LogoutOutlined /> Logout
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserSidenav;
