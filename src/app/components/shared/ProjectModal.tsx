"use client";
import { TProject } from "@/types/project.type";
import {
  Button,
  Flex,
  Form,
  Input,
  Modal,
  Select,
  SelectProps,
  Space,
} from "antd";
import React, { useState } from "react";

const TeamOptions: SelectProps["options"] = [
  {
    label: "Md Pervej Hossain",
    value: "Md Pervej Hossain",
  },
  {
    label: "Tonmoy Parvez",
    value: "Tonmoy Parvez",
  },
  {
    label: "Mir Hossain",
    value: "Mir Hossain",
  },
  {
    label: "Al-amin Howlader",
    value: "Al-amin Howlader",
  },
];

const ProjectModal = ({ open, setOpen }: { open: boolean; setOpen: any }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const [team, setTeam] = useState([]);

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const onSubmit = (data: any) => {
    data.teamMembers = team;
    console.log(data);
    form.resetFields();
  };

  return (
    <>
      <Modal
        title="Title"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={() => setOpen(false)}
      >
        <Form
          name="normal_login"
          initialValues={{
            remember: true,
          }}
          onFinish={onSubmit}
          layout="vertical"
          requiredMark="optional"
        >
          <label className="block text-lg mb-2">Project title</label>
          <Form.Item
            name="task"
            rules={[
              {
                required: true,
                message: "Please input your task!",
              },
            ]}
          >
            <Input className="py-2 text-lg px-2" placeholder="Project title" />
          </Form.Item>
          <div className="w-full mb-4">
            <label className="block text-lg mb-2">Assign team members</label>
            <Select
              mode="multiple"
              className="w-full"
              placeholder="select members"
              onChange={(values) => setTeam(values)}
              options={TeamOptions}
              optionRender={(option) => <Space>{option.data.value}</Space>}
            />
          </div>

          <Form.Item style={{ marginBottom: "0px" }}>
            <Button block={true} type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ProjectModal;
