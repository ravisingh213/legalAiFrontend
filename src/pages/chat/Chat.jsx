/* eslint-disable */
/* eslint-disable no-console */

import React, { useState } from "react";
import "../styles/Chat.scss";

import { Button, Input, Row, Col, Card, Typography, Space } from "antd";
import {
  LinkOutlined,
  ArrowUpOutlined,
  MessageOutlined,
  BulbOutlined,
  CodeOutlined,
  DiffOutlined,
  GlobalOutlined,
  EnvironmentOutlined,
  AudioOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import logoLI from "../../li-logo.png";
import SidePanel from "../shared/SidePanel";
import Header from "../shared/Header";

const { Text } = Typography;
const { TextArea } = Input;

function Chat() {
  return (
    <div className="chat-container">
      <SidePanel />

      <div className="right-section">
        <Header />

        <div className="chatbox-front">
          <div className="chat-dashboard">
            {/* <div className="logoli">
              {" "}
              <img src={logoLI} />
            </div> */}
            <Row>
              {/* <Col span={6}>
                                <Card className='card-box'>
                                    <Link to={"/messages"}>
                                        <MessageOutlined className='pinkColor' />
                                        <p>Message to confort friend</p>
                                    </Link>
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card className='card-box'>
                                    <BulbOutlined className='orangeColor' />
                                    <p>Design a fun coading game</p>
                                </Card>
                            </Col>
                            <Col span={6}>
                            <Card className='card-box'>
                            <CodeOutlined className='redColor' />
                            <p>Make me a personal webpage</p>
                            </Card>
                            </Col>
                            <Col span={6}>
                            <Card className='card-box'>
                            <DiffOutlined className='blueColor' />
                            <p>Study Vocabulary</p>
                            </Card>
                            </Col> */}
              <div
                style={{ textAlign: "center", padding: "20px", width: "100%" }}
              >
                <h1
                  style={{
                    fontSize: "30px",
                    fontWeight: "600",
                    lineHeight: "24px",
                    // marginBottom: "20px",
                  }}
                >
                  What can I help with?
                </h1>
                <div
                  style={{
                    marginTop: "30px",
                    width: "100%",
                    marginInline: "auto",
                  }}
                >
                  {/* <Card className="card-box"> */}
                  <Card
                    className="chat-card"
                    style={{
                      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                      margin: "20px",
                      position: "relative",
                      minHeight: "150px",
                      borderRadius: "25px",
                    }}
                  >
                    <TextArea
                      placeholder="Message ChatGPT"
                      bordered={false}
                      style={{
                        resize: "none",
                        minHeight: "80px",
                      }}
                    />
                    {/* <div
                      style={{
                        position: "absolute",
                        bottom: "12px",
                        left: "12px",
                      }}
                    >
                      <Space>
                        <Button icon={<PlusCircleOutlined />} />
                        <Button icon={<GlobalOutlined />} />
                        <Button icon={<EnvironmentOutlined />} />
                      </Space>
                    </div> */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: "12px",
                        right: "12px",
                        marginTop: "5px",
                      }}
                    >
                      <Button className="btn-send" type="primary">
                        <ArrowUpOutlined />
                      </Button>
                    </div>
                  </Card>
                  {/* </Card> */}
                </div>
              </div>
            </Row>
          </div>
        </div>
        <div className="chatInput-box">
          <Link className="attchedment">
            <LinkOutlined />
          </Link>
          <Input placeholder="Type Message" />
          <Link to={"/"}>
            <Button className="btn-send" type="primary">
              <ArrowUpOutlined />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Chat;
