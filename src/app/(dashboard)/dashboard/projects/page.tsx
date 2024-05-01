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
import toast from "react-hot-toast";
import { TProject } from "@/types/project.type";

interface DataType {
  id: string;
  title: string;
}

const page = () => {
  const [open, setOpen] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  const query = useQuery("projects", async () => {
    const response = await fetch("http://localhost:3004/projects");
    const data = await response.json();
    return data;
  });

  const showModal = () => {
    setOpen(true);
  };

  const removeProject = async (id: string) => {
    const response = await fetch(`http://localhost:3004/projects/${id}`, {
      method: "DELETE",
    });
    const result = await response.json();
    console.log(result, "xxx");
    if (result) {
      toast("Successfully deleted!");
    }
  };

  // const filterByProjectName =
  // console.log(filterByProjectName, "xxx");

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "S/N",
      dataIndex: "id",
      key: "id",
      render: (id, record, index) => <a>{index + 1}</a>,
    },
    {
      title: "Project Name",
      dataIndex: "title",
      key: "title",
      filters: query.data?.map((item: TProject) => ({
        text: item.title,
        value: item.title,
      })),

      onFilter: (value, record) => record.title.indexOf(value as string) === 0,
    },

    {
      title: "Team Members",
      dataIndex: "teamMembers",
      key: "teamMembers",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip placement="topLeft" title="View">
            <Link href={`/dashboard/projects/${record.id}`}>
              <Button>
                <IoEyeSharp size={16} />
              </Button>
            </Link>
          </Tooltip>
          <Tooltip placement="topLeft" title="Edit">
            <Button type="primary" onClick={showModal}>
              <CiEdit size={16} />
            </Button>
          </Tooltip>
          <Tooltip placement="topLeft" title="Delete">
            <Button onClick={() => removeProject(record.id)}>
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
          Create Project
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
