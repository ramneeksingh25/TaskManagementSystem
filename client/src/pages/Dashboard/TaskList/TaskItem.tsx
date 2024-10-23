import React, { useState } from "react";
import { Task } from "../../../interfaces/interfaces";
import TaskDetail from "./TaskDetails";


interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString();
  };

  const handleTaskClick = () => {
    setIsDetailOpen(true);
  };

  const closeDetailModal = () => {
    setIsDetailOpen(false);
  };

  return (
    <div className="border rounded-lg px-4 bg-white shadow-md">
      <div className="col-span-11 grid grid-cols-10 h-10 items-center whitespace-nowrap">
        <span className="text-ellipsis overflow-hidden font-bold hover:underline cursor-pointer" onClick={handleTaskClick}>
          {task.name}
        </span>
        <span className="cursor-default select-none text-ellipsis overflow-hidden col-span-2">{task.description}</span>
        <span className="cursor-default select-none text-ellipsis overflow-hidden">{task.priority}</span>
        <span className="cursor-default select-none text-ellipsis overflow-hidden">{task.status}</span>
        <span className="cursor-default select-none text-ellipsis overflow-hidden">{formatDate(task.dueDate)}</span>
        <span className="cursor-default select-none text-ellipsis overflow-hidden">{formatDate(task.createdAt)}</span>
        <span className="cursor-default select-none text-ellipsis overflow-hidden">{task.creator.name}</span>
        <span className="cursor-default select-none text-ellipsis overflow-hidden col-span-2">
          {task.assignees.length > 0
            ? task.assignees.map((assignee, index) => `${assignee.name}${index === task.assignees.length - 1 ? "" : ", "}`)
            : "No Assignees"}
        </span>
      </div>

      {/* Task Detail Modal */}
      {isDetailOpen && (
        <TaskDetail task={task} onClose={closeDetailModal} />
      )}
    </div>
  );
};

export default TaskItem;
