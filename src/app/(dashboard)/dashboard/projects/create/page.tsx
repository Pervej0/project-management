import { Button, Form, Input } from "antd";
import React from "react";

const page = () => {
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <div>
      <Form
        name="normal_login"
        initialValues={{
          remember: true,
        }}
        onFinish={onSubmit}
        layout="vertical"
        requiredMark="optional"
      >
        <Form.Item
          name="email"
          rules={[
            {
              type: "email",
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input className="py-2 text-lg px-2 mb-2" placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input.Password
            className="py-2 text-lg px-2"
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item style={{ marginBottom: "0px" }}>
          <Button block={true} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default page;
