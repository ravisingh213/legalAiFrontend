import React, { useState } from "react";
import { Button, Form, Input, Menu, Modal } from "antd";

function ChatSearchModal({
  openSearchModal,
  handleOk,
  handleCancel,
  collapsed,
  items,
  handleClick,
  form,
}) {
  return (
    <>
      <Modal
        title={
          <Form form={form} layout="vertical" autoComplete="off">
            <Form.Item name="searchChat">
              <Input placeholder="Search Chat" className="search-chat-input" />
            </Form.Item>
          </Form>
        }
        open={openSearchModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="search-chat-content">
          <Menu
            mode="inline"
            inlineCollapsed={collapsed}
            items={items}
            onClick={handleClick}
          />
        </div>
      </Modal>
    </>
  );
}

export default ChatSearchModal;
