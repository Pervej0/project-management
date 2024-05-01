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
import { TProject, TTask } from "@/types/project.type";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";

interface DataType {
  id: string;
  title: string;
}

const page = () => {
  const query = useQuery("projects", async () => {
    const response = await fetch("http://localhost:3004/projects");
    const data = await response.json();
    return data;
  });

  // for Drop-able
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
  });
  const droppableStyle = {
    color: isOver ? "green" : undefined,
  };

  // for Drag-able
  const {
    attributes,
    listeners,
    setNodeRef: draggableSetNodeRef,
    transform,
  } = useDraggable({
    id: "draggable",
  });

  const draggableStyle = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  const tasksData = query?.data?.map((item: TProject) => ({
    teamMembers: item.teamMembers,
    tasks: item.tasks[0],
  }));

  return (
    <>
      {query.status === "loading" && <Snipper />}
      <DndContext>
        <div className="flex">
          <DndContext>
            <button
              ref={draggableSetNodeRef}
              style={draggableStyle}
              {...listeners}
              {...attributes}
            >
              <div className="w-[300px] border flex flex-col items-center justify-center">
                <div className="border-b font-semibold">Tasks</div>

                {tasksData?.map((item: any) => (
                  <div
                    key={item.tasks.tasksId}
                    className="border p-2 my-3 text-start"
                  >
                    <h3>{item.tasks.name}</h3>
                    <h4 className="text-sm text-green-700 font-semibold">
                      Assign By {item.tasks.assignee}
                    </h4>
                  </div>
                ))}
              </div>
            </button>
            <div ref={setNodeRef} style={droppableStyle}>
              <div className="w-full text-start border">
                <div className="border-b font-semibold">Status</div>
                <div className="overflow-hidden">
                  <table className="min-w-full">
                    <thead className="bg-white">
                      <tr>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Inprogress
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Updated
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Completed
                        </th>
                      </tr>
                    </thead>
                    <tbody></tbody>
                  </table>
                </div>
              </div>
            </div>
          </DndContext>
        </div>
      </DndContext>
    </>
  );
};

export default page;
