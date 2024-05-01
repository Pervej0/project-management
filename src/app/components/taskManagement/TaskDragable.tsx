import { TProject } from "@/types/project.type";
import { useDraggable } from "@dnd-kit/core";
import React from "react";

const TaskDraggable = ({ tasksData }: { tasksData: TProject }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "draggable",
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return <></>;
};

export default TaskDraggable;
