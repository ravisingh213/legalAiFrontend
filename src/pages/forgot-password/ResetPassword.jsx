/* eslint-disable */
/* eslint-disable no-console */

import React from "react";
import "../styles/Login.scss";
import { Flex, Input, Button, Form } from "antd";
import { KeyOutlined, MailOutlined } from "@ant-design/icons";
import apiConfig from "../../utils/apiConfig";
import { Link, useNavigate } from "react-router-dom";
import { useMessageContext } from "../../context/useMessageContext";

function ResetPassword() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const messageApi = useMessageContext();
  const [loading, setLoading] = React.useState(false);

  const onFinish = async (values) => {
    console.log("Form values:", values);
    setLoading(true);
    values.email = localStorage.getItem("email");
    try {
      const response = await apiConfig.post("/auth/reset-password", values);
      console.log("Response:", response?.data);
      messageApi.open({
        type: "success",
        content: "Password reset successfully!",
      });
      navigate("/password-reset-successfull");
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
            <h2>Create New Password</h2>
            <p>Create new password and login with new credentials</p>
            <Form
              name="basic"
              autoComplete="off"
              form={form}
              onFinish={onFinish}
            >
              <Form.Item
                name="newPassword"
                rules={[{ required: true, message: "newPassword" }]}
              >
                <Input placeholder="New Password" prefix={<KeyOutlined />} />
              </Form.Item>

              <Button type="primary" block htmlType="submit" loading={loading}>
                Reset Password
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

export default ResetPassword;
