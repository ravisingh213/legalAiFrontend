/* eslint-disable */
/* eslint-disable no-console */

// import React, { useState } from 'react'
import { useState } from "react";
import "../styles/MyAccount.scss";

import { Tabs, Button, Form, Input, Table, Space, Modal, Checkbox } from "antd";

import {
  DeleteOutlined,
  ExportOutlined,
  MailOutlined,
  MenuOutlined,
  CloseOutlined,
  DownloadOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

import { TabsProps } from "antd";

// import Header from '../shared/Header';
import UserSidenav from "../shared/UserSidenav";

const onChange = (key) => {
  console.log(key);
};

const dataSource = [
  {
    key: "1",
    date: "20 Jan 2020",
    document: "Advisory on communication with sebi officials",
    status: "Processed",
    action: "delete",
  },
  {
    key: "2",
    date: "12 Jan 2025",
    document: "Advisory on communication with sebi officials",
    status: "Processed",
    action: "delete",
  },
];

const columns = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Document",
    dataIndex: "document",
    key: "document",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Action",
    dataIndex: "action",
    render: (_, record) => (
      <Space size="middle">
        <Button type="primary-txt">
          <DownloadOutlined />
        </Button>
      </Space>
    ),
  },
];

const dataSourceSE = [
  {
    key: "1",
    date: "20 Jan 2020",
    document: "Advisory on communication with sebi officials",
    addedby: "Santosh Jain",
    status: "Processed",
    action: "delete",
  },
  {
    key: "2",
    date: "12 Jan 2025",
    document: "Advisory on communication with sebi officials",
    addedby: "Santosh Jain",
    status: "Processed",
    action: "delete",
  },
];

const columnsSe = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Document",
    dataIndex: "document",
    key: "document",
  },
  {
    title: "Added by",
    dataIndex: "addedby",
    key: "addedby",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Action",
    dataIndex: "action",
    render: (_, record) => (
      <Space size="middle">
        <Button type="primary-txt">
          <DownloadOutlined />
        </Button>
        <Button type="danger">
          <DeleteOutlined />
        </Button>
      </Space>
    ),
  },
];

const items = [
  {
    key: "1",
    label: "External Sources",
    children: (
      <div className="Mydetails-tabs">
        <Table dataSource={dataSource} columns={columns} />
      </div>
    ),
    icon: <ExportOutlined />,
  },
  {
    key: "2",
    label: "Internal Databases",
    children: (
      <div className="Mydetails-tabs">
        <Table dataSource={dataSourceSE} columns={columnsSe} />
      </div>
    ),
    icon: <LoginOutlined />,
  },
];

function DocumentManager() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="chat-container">
      {isVisible && <UserSidenav />}

      <div className="desktop-view">
        <UserSidenav />
      </div>

      <div className="right-section">
        <button
          onClick={() => setIsVisible(!isVisible)}
          className="mobiletogglenav"
        >
          {isVisible ? <CloseOutlined /> : <MenuOutlined />}
        </button>

        <div className="myaccount-con">
          <div className="headStyle">
            <h2>Document Manager</h2>
          </div>
          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </div>
      </div>
    </div>
  );
}

export default DocumentManager;
