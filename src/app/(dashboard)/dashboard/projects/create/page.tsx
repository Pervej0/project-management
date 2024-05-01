/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import {
  Button,
  DatePicker,
  DatePickerProps,
  Flex,
  Form,
  Input,
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

const page = () => {
  const [teams, setTeams] = useState<string[]>([]);
  const [activities, setActivities] = useState<string>("Inprogress");
  const [dueDate, setDueDate] = useState<string>("");

  const onSubmit = (data: any) => {
    data.teamMembers = teams;
    data.recentActivities = activities;
    data.dueDate = dueDate;

    console.log(data);
  };

  // const dateOnChange: DatePickerProps["onChange"] = (date, dateString) => {
  //   console.log(date, dateString);
  // };

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
        <label className="block text-lg mb-2">Project Task</label>
        <Form.Item
          name="task"
          rules={[
            {
              required: true,
              message: "Please input your task!",
            },
          ]}
        >
          <Input className="py-2 text-lg px-2 mb-2" placeholder="Task name" />
        </Form.Item>

        <Flex className="mb-5" align="center" gap={10}>
          <div className="w-full">
            <label className="block text-lg mb-2">Assign team members</label>
            <Select
              mode="multiple"
              className="w-full"
              placeholder="select members"
              onChange={(values) => setTeams(values)}
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
              onChange={(value) => setActivities(value)}
              options={ActivitiesOptions}
            />
          </div>
        </Flex>
        <Flex className="mb-5" align="center" gap={10}>
          <div className="w-full">
            <label className="block text-lg mb-2">Due Date</label>
            <DatePicker
              width={300}
              onChange={(_, dateString) => setDueDate(dateString as string)}
            />
          </div>
          <div className="w-full">
            <label className="block text-lg mb-2">Assignee</label>
            <Form.Item
              name="assignee"
              rules={[
                {
                  required: true,
                  message: "Please input assignee name!",
                },
              ]}
            >
              <Input className="text-lg px-2 mb-2" placeholder="Assign by" />
            </Form.Item>
          </div>
        </Flex>

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
