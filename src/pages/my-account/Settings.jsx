/* eslint-disable */
/* eslint-disable no-console */

import { useEffect, useState } from "react";
import "../styles/MyAccount.scss";

import { Tabs, Button, Form, Input, Modal } from "antd";
import {
  EditOutlined,
  UserOutlined,
  LockOutlined,
  MenuOutlined,
  CloseOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import apiConfig from "../../utils/apiConfig";
import logoLI from "../../li-logo.png";

import { TabsProps } from "antd";

// import Header from '../shared/Header';
import UserSidenav from "../shared/UserSidenav";
import { useToken } from "../../context/TokenContext";
import { useMessageContext } from "../../context/useMessageContext";

const onChange = (key) => {
  console.log(key);
};

function Settings() {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [editModalText, setEditModalText] = useState("");
  const [tab, setTab] = useState("1");
  const [form] = Form.useForm();
  const [modalForm] = Form.useForm();
  const messageApi = useMessageContext();
  const { decodedToken } = useToken();
  const [isVisible, setIsVisible] = useState(false);
  console.log("@@@@@@@@@@@", decodedToken);

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    setLoading(true);
    const formValues = {
      password: values.password,
      currentPassword: values.currentPassword,
    };
    console.log("formValues", formValues);
    try {
      const response = await apiConfig.post("/auth/changePassword", formValues);
      console.log("Response:", response.data);
      messageApi.open({
        type: "success",
        content: "password reset successfully!",
      });
    } catch (error) {
      console.error("Error:", error);
      messageApi.open({
        type: "error",
        content: error?.response?.data?.message,
      });
    } finally {
      form.resetFields();
      setTab("1");
      setLoading(false);
    }
  };

  const onSubmit = async (values) => {
    console.log("values", values);
    setLoading(true);
    try {
      const response = await apiConfig.post("/user/edit", values);
      console.log("Response:", response.data);
      messageApi.open({
        type: "success",
        content: "user profile edit successfully!",
      });
      // navigate("/");
      await fetchUser();
    } catch (error) {
      console.error("Error:", error);
      messageApi.open({
        type: "error",
        content: error?.response?.data?.message,
      });
    } finally {
      handleCancel();
      form.resetFields();
      setLoading(false);
    }
  };

  const showModal = (text) => {
    setEditModalText(text);
    modalForm.setFieldsValue({
      ...userData?.user,
    });
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setEditModalText("");
    setIsModalOpen(false);
  };

  const fetchUser = async () => {
    try {
      const response = await apiConfig.get("/user/getUser");
      console.log("User data:", response.data);
      setUserData(response.data);
    } catch (error) {
      console.log("Error fetching user:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const items = [
    {
      key: "1",
      label: "My Details",
      children: (
        <div className="Mydetails-tabs">
          <div className="details-box">
            <div className="detail-head">Name:</div>
            <div className="detail-text">{userData?.user?.name}</div>
            <div className="detail-action">
              <Link
                onClick={() => {
                  showModal("name");
                }}
              >
                <EditOutlined />
              </Link>
            </div>
          </div>

          <div className="details-box">
            <div className="detail-head">Email:</div>
            <div className="detail-text">{userData?.user?.email}</div>
            <div className="detail-action">
              <Link
                onClick={() => {
                  showModal("email");
                }}
              >
                <EditOutlined />
              </Link>
            </div>
          </div>

          <div className="details-box">
            <div className="detail-head">Bio:</div>
            <div className="detail-text">Some description about yourself</div>
            <div className="detail-action">
              <Link
                onClick={() => {
                  showModal("description");
                }}
              >
                <EditOutlined />
              </Link>
            </div>
          </div>

          <div className="details-box">
            <div className="detail-head">Workspace:</div>
            <div className="detail-text">Legal Ai</div>
            <div className="detail-action">
              <Link
                onClick={() => {
                  showModal("workspace");
                }}
              >
                <EditOutlined />
              </Link>
            </div>
          </div>
        </div>
      ),
      icon: <UserOutlined />,
    },
    {
      key: "2",
      label: "Change Password",
      children: (
        <div className="changePassword">
          <Form
            name="basic"
            autoComplete="off"
            style={{ maxWidth: 400 }}
            form={form}
            onFinish={onFinish}
          >
            <Form.Item
              name="currentPassword"
              rules={[
                { required: true, message: "Please enter currect password" },
              ]}
            >
              <Input type="password" placeholder="Enter Current Password" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please enter Password" },
                { min: 6, message: "Password must be at least 6 characters" },
              ]}
            >
              <Input type="password" placeholder="Enter New Password" />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Please confirm your password" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("The confirm passwords do not match")
                    );
                  },
                }),
              ]}
            >
              <Input type="password" placeholder="Enter Confirm New Password" />
            </Form.Item>

            <Button type="primary" block htmlType="submit" loading={loading}>
              Save
            </Button>
          </Form>
        </div>
      ),
      icon: <LockOutlined />,
    },
  ];

  return (
    <div className="chat-container">
      <Modal
        title={`Edit ${editModalText}`}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={""}
      >
        <div className="modalBody" style={{ marginTop: "20px" }}>
          <Form
            name="basic"
            autoComplete="off"
            form={modalForm}
            onFinish={onSubmit}
          >
            <Form.Item
              name={editModalText}
              rules={[
                {
                  required: true,
                  message: `Please Enter Your ${editModalText}`,
                },
              ]}
            >
              <Input
                type={editModalText === "email" ? "email" : "text"}
                placeholder={`Enter Your ${editModalText}`}
              />
            </Form.Item>

            <div className="footerBTN">
              <Button type="primary" htmlType="submit" loading={loading}>
                Edit
              </Button>{" "}
              <Button type="info" onClick={handleCancel}>
                Cancel
              </Button>{" "}
            </div>
          </Form>
        </div>
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
            <h2>Settings</h2>
            <p>Check your details and change your password</p>
          </div>

          {userData && (
            <Tabs
              activeKey={tab}
              items={items}
              onChange={(key) => setTab(key)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Settings;
