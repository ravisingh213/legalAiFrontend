import React from "react";
import "../styles/Login.scss";
import { Flex, Input, Button, Form, message } from "antd";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import apiConfig from "../../utils/apiConfig";
import { useMessageContext } from "../../context/useMessageContext";

function SignUp() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const messageApi = useMessageContext();
  const [loading, setLoading] = React.useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await apiConfig.post("/auth/register", values);
      console.log("Response:", response.data);
      messageApi.open({
        type: "success",
        content: "user register successfully!",
      });
      navigate("/");
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
            <h2>Sign up </h2>
            <p>Register with your name email and password</p>
            <Form
              name="basic"
              autoComplete="off"
              form={form}
              onFinish={onFinish}
            >
              <Form.Item
                name="name"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input placeholder="User Name" prefix={<UserOutlined />} />
              </Form.Item>
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

              <Button type="primary" block htmlType="submit" loading={loading}>
                Sign Up
              </Button>
              <p className="signUp">
                if you have an account? <Link to="/">Login</Link>
              </p>
            </Form>
          </div>
        </div>
      </Flex>
    </div>
  );
}

export default SignUp;
