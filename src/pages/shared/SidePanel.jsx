/* eslint-disable */
/* eslint-disable no-console */

import React, { useState } from "react";
import "../styles/SidePanel.scss";
// import type { MenuProps } from 'antd';
import { Button, Form, Menu } from "antd";
import {
  BellOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SearchOutlined,
  SettingOutlined,
  WechatOutlined,
  WechatWorkOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

import logoLI from "../../li-logo.png";
import ChatSearchModal from "../../components/ChatSearchModal";

// type MenuItem = Required<MenuProps>['items'][number];

const items = [
  {
    label: "Lorem ipsome dollar sit amet",
    route: "/messages",
    disabled: false,
  },
  { label: "Today", disabled: true },
  { label: "Lorem ipsome dollar sit amet" },
  { label: "Lorem ipsome dollar sit amet" },
  { label: "Lorem ipsome dollar sit amet" },

  { label: "Previous 7 Days", disabled: true },
  { label: "Lorem ipsome dollar sit amet" },
  { label: "Lorem ipsome dollar sit amet" },
  { label: "Lorem ipsome dollar sit amet" },

  { label: "Previous 30 Days", disabled: true },
  { label: "Lorem ipsome dollar sit amet" },
  { label: "Lorem ipsome dollar sit amet" },
  { label: "Lorem ipsome dollar sit amet" },
  { label: "Lorem ipsome dollar sit amet" },
  { label: "Lorem ipsome dollar sit amet" },
  { label: "Lorem ipsome dollar sit amet" },
  { label: "Lorem ipsome dollar sit amet" },
  { label: "Lorem ipsome dollar sit amet" },
  { label: "Lorem ipsome dollar sit amet" },
];

function SidePanel() {
  const [collapsed, setCollapsed] = useState(false);
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const [form] = Form.useForm();
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const navigate = useNavigate();

  const handleClick = (itemId) => {
    // Navigate based on the itemId
    navigate(`/messages`);
  };

  const showModal = () => {
    setOpenSearchModal(true);
  };

  const handleOk = () => {
    setOpenSearchModal(false);
  };

  const handleCancel = () => {
    form.resetFields();
    setOpenSearchModal(false);
  };

  return (
    <div className="side-navigation">
      <ChatSearchModal
        openSearchModal={openSearchModal}
        handleOk={handleOk}
        handleCancel={handleCancel}
        collapsed={collapsed}
        items={items}
        handleClick={handleClick}
        form={form}
      />

      <div className="sidebar-header">
        <Button className="collapsemanu" onClick={toggleCollapsed}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        {!collapsed && (
          <div className="right-icons">
            <Button
              className="collapsemanu"
              icon={<SearchOutlined />}
              onClick={() => {
                showModal();
              }}
            />
            <Button
              className="collapsemanu"
              icon={<WechatWorkOutlined />}
              onClick={() => {
                navigate("/chat-modal");
              }}
            />
          </div>
        )}
      </div>

      <div className="sidenav-container">
        <Menu
          mode="inline"
          inlineCollapsed={collapsed}
          items={items}
          onClick={handleClick}
        />
      </div>
    </div>
  );
}

export default SidePanel;
