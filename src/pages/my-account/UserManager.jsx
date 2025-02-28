/* eslint-disable */
/* eslint-disable no-console */

// import React, { useState } from 'react'
import { useEffect, useRef, useState } from "react";
import _, { set } from "lodash";
import "../styles/MyAccount.scss";

import {
  Tabs,
  Button,
  Form,
  Input,
  Table,
  Space,
  Modal,
  Checkbox,
  Badge,
  Tag,
} from "antd";

import {
  DeleteOutlined,
  UserOutlined,
  MailOutlined,
  MenuOutlined,
  CloseOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import apiConfig from "../../utils/apiConfig";

import { TabsProps } from "antd";

// import Header from '../shared/Header';
import UserSidenav from "../shared/UserSidenav";
import { useMessageContext } from "../../context/useMessageContext";

function UserManager() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalForm] = Form.useForm();
  const [usersData, setUsersData] = useState(null);
  const [usersPendingInvites, setUsersPendingInvites] = useState(null);
  const [activeKey, setActiveKey] = useState("1");
  // const [searchValue, setSearchValue] = useState("");
  const messageApi = useMessageContext();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    modalForm?.resetFields();
    setIsModalOpen(false);
  };

  const onChange = (key) => {
    // setSearchValue("");
    setActiveKey(key);
  };

  const [isVisible, setIsVisible] = useState(false);

  const debouncedHandleSearch = _.debounce(async (e) => {
    console.log(e.target.value);
    let name = e.target.value;
    name = name.trim();

    try {
      if (activeKey === "1") {
        const response = await apiConfig.post(`user/getUserByName`, { name });
        console.log(response);
        setUsersData(response.data);
      } else {
        const response = await apiConfig.post(
          `user/getPendingInviteUserByEmail`,
          { name }
        );
        console.log(response);
        setUsersPendingInvites(response.data);
      }
    } catch (error) {}
  }, 1000); // Adjust the delay as needed

  const handleSearch = (e) => {
    // setSearchValue(e.target.value);
    debouncedHandleSearch(e);
  };

  const operations = (
    <div className="tabsExtra-sec">
      <Input
        type="text"
        prefix={<SearchOutlined />}
        // value={searchValue}
        placeholder="Search"
        onChange={(e) => {
          handleSearch(e);
        }}
      />{" "}
      <Button type="primary" onClick={showModal}>
        <UserOutlined /> Invite Member
      </Button>
    </div>
  );

  const { TextArea } = Input;

  const deleteUser = async (id) => {
    try {
      const response = await apiConfig.delete(`user/deleteUser/${id}`);
      console.log("User deleted successfully:", response.data);
      messageApi.open({
        type: "success",
        content: "User deleted successfully!",
      });
      await fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      messageApi.open({
        type: "error",
        content: error?.response?.data?.message,
      });
    }
  };

  const deletePendingInviteUser = async (id) => {
    try {
      const response = await apiConfig.delete(
        `user/deletePendingInviteUser/${id}`
      );
      console.log("User deleted successfully:", response.data);
      messageApi.open({
        type: "success",
        content: "User deleted successfully!",
      });
      await fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      messageApi.open({
        type: "error",
        content: error?.response?.data?.message,
      });
    }
  };

  const columns = [
    {
      title: "S.No", // Serial Number column
      key: "sno",
      align: "center",
      rowScope: "row",
      render: (_, __, index) => index + 1, // Generate row number dynamically
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    {
      title: "Role",
      dataIndex: "isAdmin",
      key: "isAdmin",
      align: "center",
      render: (_, record) => (
        <Tag color={record?.isAdmin ? "geekblue" : "green"}>
          {record?.isAdmin ? "Admin" : "User"}
        </Tag>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <Button type="danger">
            <DeleteOutlined
              onClick={() => {
                deleteUser(record._id);
              }}
            />
          </Button>
        </Space>
      ),
    },
  ];

  const columnsInvite = [
    {
      title: "S.No", // Serial Number column
      key: "sno",
      align: "center",
      rowScope: "row",
      render: (_, __, index) => index + 1, // Generate row number dynamically
    },
    {
      title: "Id",
      dataIndex: "_id",
      key: "_id",
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    {
      title: "Action",
      dataIndex: "action",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <Button type="danger">
            <DeleteOutlined
              onClick={() => {
                deletePendingInviteUser(record._id);
              }}
            />
          </Button>
        </Space>
      ),
    },
  ];

  const items = [
    {
      key: "1",
      label: "All Member",
      children: (
        <div className="Mydetails-tabs">
          <Table
            dataSource={usersData?.user}
            columns={columns}
            pagination={{ pageSize: 5 }}
            bordered
            rowClassName={() => "medium-row"}
          />
        </div>
      ),
      icon: <UserOutlined />,
    },
    {
      key: "2",
      label: "Pending Invites",
      children: (
        <div className="Mydetails-tabs">
          <Table
            dataSource={usersPendingInvites?.user}
            columns={columnsInvite}
            pagination={{ pageSize: 5 }}
            bordered
            scroll={{ x: "max-content" }}
          />
        </div>
      ),
      icon: <MailOutlined />,
    },
  ];

  const onSubmit = async (values) => {
    console.log("values", values);
    try {
      const response = await apiConfig.post("/user/inviteMember", values);
      console.log("Response:", response.data);
      await fetchUsers();
      messageApi.open({
        type: "success",
        content: "user invited successfully!",
      });
    } catch (error) {
      console.error("Error:", error);
      messageApi.open({
        type: "error",
        content: error?.response?.data?.message,
      });
    } finally {
      modalForm.resetFields();
      handleCancel();
    }
  };

  const fetchUsers = async () => {
    console.log("Fetching user data...");
    try {
      const response = await apiConfig.get("/user/getAllUsers");
      const responsePendingInvites = await apiConfig.get(
        "/user/getAllPendingInvites"
      );
      console.log("User data:", response.data);
      setUsersData(response.data);
      setUsersPendingInvites(responsePendingInvites.data);
    } catch (error) {
      console.log("Error fetching user:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="chat-container">
      <Modal
        title={
          <div className="modalTitle">
            <h3>Invite Member to the Legal Ai workspace</h3>{" "}
            <p>
              This workpscae is private, only selected member and roles can use
              it workspace, This workspace is opted out of training
            </p>
          </div>
        }
        open={isModalOpen}
        onCancel={handleCancel}
        footer={""}
      >
        <Form
          name="basic"
          autoComplete="off"
          form={modalForm}
          onFinish={onSubmit}
        >
          <div className="modalBody">
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please enter your Email" }]}
            >
              <Input placeholder="Email Address" />
            </Form.Item>
            {/* <Checkbox>Resent email for existing invites</Checkbox> */}
          </div>
          <div className="footerBTN">
            <Button type="primary" htmlType="submit">
              Invite
            </Button>{" "}
            <Button type="info" onClick={handleCancel}>
              Cancel
            </Button>{" "}
          </div>
        </Form>
      </Modal>

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
            <h2>User Manager</h2>
            <p>Team 6 Member</p>
          </div>
          {usersData && (
            <Tabs
              tabBarExtraContent={operations}
              defaultActiveKey="1"
              items={items}
              onChange={onChange}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default UserManager;
