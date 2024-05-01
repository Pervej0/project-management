"use client";
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

const ActivitiesOptions: SelectProps["options"] = [
  { value: "In Progress", label: "In Progress" },
  { value: "Completed", label: "Completed" },
  { value: "New Assignments", label: "New Assignments" },
  { value: "Updates", label: "Updates" },
  { value: "Milestones Reached", label: "Milestones Reached" },
  { value: "Issues/Concerns", label: "Issues/Concerns" },
  { value: "Delays", label: "Delays" },
  { value: "Feedback Received", label: "Feedback Received" },
  { value: "Dependencies", label: "Dependencies" },
  { value: "Communication", label: "Communication" },
];

const ProjectModal = ({ open, setOpen }: any) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
  };

  const handleActivitiesChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  return (
    <>
      <Modal
        title="Title"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
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
            <Input className="py-2 text-lg px-2" placeholder="Email" />
          </Form.Item>
          <Flex className="mb-8" align="center" gap={10}>
            <div className="w-full">
              <label className="block text-lg mb-2">Assign team members</label>
              <Select
                mode="multiple"
                className="w-full"
                placeholder="select members"
                onChange={handleChange}
                options={TeamOptions}
                optionRender={(option) => <Space>{option.data.value}</Space>}
              />
            </div>
            <div className="w-full">
              <label className="block text-lg mb-2">Project Task</label>
              <Select
                className="w-full"
                defaultValue="Inprogress"
                // style={{ width: 120 }}
                onChange={handleActivitiesChange}
                options={ActivitiesOptions}
              />
            </div>
          </Flex>

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
