import React, { useState } from "react";
import { Task } from "../../../interfaces/interfaces";
import TaskDetail from "./TaskDetails";


interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Ensure task properties are defined
  const formatDate = (date: string | Date) => {
    return date ? new Date(date).toLocaleDateString() : "N/A";
  };

  const handleTaskClick = () => {
    setIsDetailOpen(true);
  };

  const closeDetailModal = () => {
    setIsDetailOpen(false);
  };

  if (!task) {
    return <div>No task data available.</div>;
  }

  return (
    <div className="border rounded-lg px-4 bg-white shadow-md">
      <div className="col-span-11 grid grid-cols-10 h-10 items-center whitespace-nowrap">
        <span
          className="text-ellipsis overflow-hidden font-bold hover:underline cursor-pointer"
          onClick={handleTaskClick}
        >
          {task.name || "No name available"}
        </span>
        <span className="cursor-default select-none text-ellipsis overflow-hidden col-span-2">
          {task.description || "No description"}
        </span>
        <span className="cursor-default select-none text-ellipsis overflow-hidden">
          {task.priority || "No priority"}
        </span>
        <span className="cursor-default select-none text-ellipsis overflow-hidden">
          {task.status || "No status"}
        </span>
        <span className="cursor-default select-none text-ellipsis overflow-hidden">
          {formatDate(task.dueDate)}
        </span>
        <span className="cursor-default select-none text-ellipsis overflow-hidden">
          {formatDate(task.createdAt)}
        </span>
        <span className="cursor-default select-none text-ellipsis overflow-hidden">
          {task.creator?.name || "No creator"}
        </span>
        <span className="cursor-default select-none text-ellipsis overflow-hidden col-span-2">
          {task.assignees && task.assignees.length > 0
            ? task.assignees.map((assignee, index) => `${assignee.name || "Unknown"}${index === task.assignees.length - 1 ? "" : ", "}`)
            : "No Assignees"}
        </span>
      </div>

      {isDetailOpen && (
        <TaskDetail task={task} onClose={closeDetailModal} />
      )}
    </div>
  );
};

export default TaskItem;