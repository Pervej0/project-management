"use client";
/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { projects } from "@/data/projects";
import { useQuery } from "react-query";
import { Button, Space, Table, Tag, Tooltip } from "antd";
import type { TableProps } from "antd";
import { CiEdit } from "react-icons/ci";
import { IoCreateOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { IoEyeSharp } from "react-icons/io5";
interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "S/N",
    dataIndex: "id",
    key: "id",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Name",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Tooltip placement="topLeft" title="View">
          <Button>
            <IoEyeSharp size={16} />
          </Button>
        </Tooltip>
        <Tooltip placement="topLeft" title="Edit">
          <Button>
            <CiEdit size={16} />
          </Button>
        </Tooltip>
        <Tooltip placement="topLeft" title="Delete">
          <Button>
            <MdDeleteOutline size={16} />
          </Button>
        </Tooltip>
      </Space>
    ),
  },
];

const page = () => {
  const query = useQuery("projects", () => projects);
  console.log(query, "xx");

  return (
    <>
      <Table columns={columns} dataSource={query?.data} />
    </>
  );
};

export default page;
