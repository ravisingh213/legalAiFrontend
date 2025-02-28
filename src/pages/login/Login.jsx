/* eslint-disable */
/* eslint-disable no-console */

import React, { useEffect, useState } from "react";
import "../styles/Login.scss";
import { Grid, Flex, Input, Button, Form } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import apiConfig from "../../utils/apiConfig";
import { useMessageContext } from "../../context/useMessageContext";

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [form] = Form.useForm();
  const messageApi = useMessageContext();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      if (token) {
        setIsLoggedIn(true);
        navigate("/chat-modal");
      }
    };

    checkToken();
  }, []);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await apiConfig.post("/auth/login", values);
      console.log("Response:", response.data);
      localStorage.setItem("token", response.data.token);
      messageApi.open({
        type: "success",
        content: "User login successfully!",
      });
      navigate("/chat-modal");
    } catch (error) {
      console.error("Error:", error);
      messageApi.open({
        type: "error",
        content: error.response.data.message,
      });
    } finally {
      form.resetFields();
      setLoading(false);
    }
  };

  if (isLoggedIn) {
    return null;
  }

  return (
    <div className="login-container">
      <Flex gap="middle" className="login-con">
        <div className="login-left-container">
          <div className="login-leftLection">
            <h1>Legal AI</h1>
            <h4>We Intelligent Legal Agent</h4>
          </div>
        </div>
        <div className="login-right-container">
          <div className="login-box">
            <h2>Sign into your account</h2>
            <p>Fill your email and password</p>
            <Form
              name="basic"
              autoComplete="off"
              form={form}
              onFinish={onFinish}
            >
              <Form.Item
                name="email"
                rules={[{ required: true, message: "Please enter your Email" }]}
              >
                <Input placeholder="Email Address" prefix={<MailOutlined />} />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: "Please enter Password" }]}
              >
                <Input
                  type="password"
                  placeholder="Password"
                  prefix={<LockOutlined />}
                />
              </Form.Item>

              <Button type="primary" htmlType="submit" block loading={loading}>
                Login
              </Button>
              <Link
                className="ant-btn ant-btn-variant-link"
                to={"/ForgotPassword"}
                block
              >
                Forgot Password
              </Link>
              <p className="signUp">
                Don't have an account? <Link to="/register">Sign Up</Link>
              </p>
            </Form>
          </div>
        </div>
      </Flex>
    </div>
  );
}

export default Login;
