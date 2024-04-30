"use client";
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { useQuery } from "react-query";
import { Button, Space, Table, Tag, Tooltip } from "antd";
import type { TableProps } from "antd";
import { CiEdit } from "react-icons/ci";
import { IoCreateOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { IoEyeSharp } from "react-icons/io5";
import Snipper from "@/app/components/shared/Spinner";
import Link from "next/link";
import ProjectModal from "@/app/components/shared/ProjectModal";
interface DataType {
  id: string;
  title: string;
}

const page = () => {
  const [open, setOpen] = useState(false);

  const query = useQuery("projects", async () => {
    const response = await fetch("http://localhost:3004/projects");
    const data = response.json();
    return data;
  });

  const showModal = () => {
    setOpen(true);
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "S/N",
      dataIndex: "id",
      key: "id",
      render: (id) => <a>{id}</a>,
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
            <Button type="primary" onClick={showModal}>
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

  return (
    <>
      <ProjectModal open={open} setOpen={setOpen} />
      {query.status === "loading" && <Snipper />}
      <div className="text-start font-semibold mb-2">
        <Link
          className="bg-green-700 text-white px-2 py-1 rounded-md"
          href="/dashboard/projects/create"
        >
          Create Task
        </Link>
      </div>
      <Table
        columns={columns}
        dataSource={query?.data}
        pagination={{
          defaultPageSize: 5,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20"],
        }}
      />
    </>
  );
};

export default page;
