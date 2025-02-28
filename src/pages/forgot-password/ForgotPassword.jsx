/* eslint-disable */
/* eslint-disable no-console */

import React from "react";
import "../styles/Login.scss";
import { Grid, Flex, Input, Button, Form } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import apiConfig from "../../utils/apiConfig";
import { useMessageContext } from "../../context/useMessageContext";

function ForgotPassword() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const messageApi = useMessageContext();
  const [loading, setLoading] = React.useState(false);

  const onFinish = async (values) => {
    console.log("Form values:", values);
    setLoading(true);
    try {
      const response = await apiConfig.post("/auth/forgot-password", values);
      console.log("Response:", response?.data);
      messageApi.open({
        type: "success",
        content: "OTP Sent successfully!",
      });
      localStorage.setItem("email", values.email);
      navigate("/verify-email");
    } catch (error) {
      console.error("Error:", error);
      messageApi.open({
        type: "error",
        content: error?.response?.data?.message,
      });
    } finally {
      form.resetFields();
      setLoading(false);
    }
  };

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
            <h2>Forgot Password</h2>
            <p>Enter & verify your email address</p>
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

              <Button type="primary" htmlType="submit" block loading={loading}>
                Get Otp
              </Button>
              <Link className="ant-btn ant-btn-variant-link" to={"/"} block>
                Back to Login
              </Link>
            </Form>
          </div>
        </div>
      </Flex>
    </div>
  );
}

export default ForgotPassword;
