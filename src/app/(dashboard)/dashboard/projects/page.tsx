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
import toast, { Toaster } from "react-hot-toast";
import { TProject } from "@/types/project.type";

interface DataType {
  id: string;
  title: string;
}

const page = () => {
  const [open, setOpen] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [projectUpdateData, setProjectData] = useState({});

  const query = useQuery("projects", async () => {
    const response = await fetch("http://localhost:3004/projects");
    const data = await response.json();
    setDataSource(data);
    return data;
  });

  const removeProject = async (id: string) => {
    const response = await fetch(`http://localhost:3004/projects/${id}`, {
      method: "DELETE",
    });
    const result = await response.json();
    if (result) {
      toast("Successfully deleted!");
      const filterdData = dataSource?.filter(
        (item: TProject) => item.id !== result.id
      );
      setDataSource(filterdData);
    }
  };

  const updateProject = async (id: string) => {
    console.log(projectUpdateData, "xxx");
    if (Object.entries(projectUpdateData).length > 0) {
      const response = await fetch(`http://localhost:3004/projects/${id}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectUpdateData),
      });
      const result = await response.json();
      console.log(result, "ccc");
    }
    return;
    // if (result) {
    //   toast("Successfully updated!");
    //   setDataSource(query.data);
    // }
  };

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
            <Button
              type="primary"
              onClick={() => {
                setOpen(true);
                updateProject(record.id);
              }}
            >
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
      <ProjectModal
        open={open}
        setOpen={setOpen}
        setProjectData={setProjectData}
      />
      <Toaster />
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
        dataSource={dataSource}
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
