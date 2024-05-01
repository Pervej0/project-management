/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { TTask } from "@/types/project.type";
import React from "react";
import { useQuery } from "react-query";

const page = ({ params }: { params: { projectId: string } }) => {
  const query = useQuery("project", async () => {
    const response = await fetch(
      `http://localhost:3004/projects/${params.projectId}`
    );
    const data = await response.json();
    return data;
  });
  console.log(query);

  return (
    <div className="shadow-xl m-4 bg-slate-100 border p-5">
      <div>
        <h2 className="text-2xl font-semibold mb-4">{query?.data?.title}</h2>
        <h3 className="text-xl font-medium mb-5">
          <span className="font-semibold">Team members:</span>{" "}
          {query?.data?.teamMembers.map((item: string) => item + ", ")}
        </h3>
        <div>
          <h4 className="text-lg font-semibold underline">Tasks</h4>
          {query?.data?.tasks.map((item: TTask) => (
            <div
              key={item.tasksId}
              className="text-white bg-gray-700 p-2 my-2 rounded-md"
            >
              <h5>{item.name}</h5>
              <h5>
                <span className="font-semibold">Deadline:</span> {item.dueDate}
              </h5>
              <h5>
                <span className="font-semibold">Status:</span>{" "}
                {item.recentActivities}
              </h5>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
