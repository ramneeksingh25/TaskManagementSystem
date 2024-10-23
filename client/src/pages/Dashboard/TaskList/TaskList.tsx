import { useEffect, useState } from "react";
import { getTasksByUser, getTasksForUser } from "../../../api";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import TaskItem from "./TaskItem";
import { io } from "socket.io-client";
import { Task } from "../../../interfaces/interfaces";
interface TaskListProps {
  myTask: boolean;
}

const socket = io('http://localhost:2000');

const TaskList = ({ myTask }: TaskListProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    const fetchTasks = async () => {
      setSortBy("")
      try {
        const response = myTask ? await getTasksForUser() : await getTasksByUser();
        console.log("Fetched tasks:", response); // Log response for debugging
        setTasks(response);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  
    socket.on('newTask', (newTask) => {
      setTasks((prevTasks: Task[]) => [newTask, ...prevTasks]);
    });
  
    return () => {
      socket.off('newTask');
    };
  }, [myTask]);
  const handleSort = (sortField: keyof Task) => {
    const sortableFields: (keyof Task)[] = ["name", "priority", "status", "dueDate"];
  
    if (!sortableFields.includes(sortField)) return;
  
    const isSameField = sortBy === sortField;
    const direction = isSameField && sortDirection === "asc" ? "desc" : "asc";
    setSortBy(sortField);
    setSortDirection(direction);
  
    const sortedTasks = [...tasks].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
  
      // Handle case-insensitive sorting for 'name' field
      if (sortField === "name") {
        const aName = (aValue as string).toLowerCase();
        const bName = (bValue as string).toLowerCase();
        if (aName < bName) return direction === "asc" ? -1 : 1;
        if (aName > bName) return direction === "asc" ? 1 : -1;
        return 0;
      }
  
      // Generic sorting for other fields
      if (aValue < bValue) return direction === "asc" ? -1 : 1;
      if (aValue > bValue) return direction === "asc" ? 1 : -1;
      return 0;
    });
  
    setTasks(sortedTasks);
  };

  const getArrow = (field: string) => {
    if (sortBy === field) {
      return sortDirection === "asc" ? <FaArrowUp/> : <FaArrowDown/>;
    }
    return "";
  };
  const sortFieldMapping: { [label: string]: keyof Task } = {
    Name: "name",
    Description: "description",
    Priority: "priority",
    Status: "status",
    "Due Date": "dueDate",
    "Created At": "createdAt",
    Creator: "creator",
    Assignees: "assignees",
  };
  return (
    <div className="rounded-lg relative overflow-hidden">
      {tasks.length!=0?<div className="text-black/70 absolute top-0 h-[6vh] w-full grid grid-cols-10 px-4 items-center">
        {[
          { label: "Name", key: "name" },
          { label: "Description", key: "description" },
          { label: "Priority", key: "priority" },
          { label: "Status", key: "status" },
          { label: "Due Date", key: "dueDate" },
          { label: "Created At", key: "createdAt" },
          { label: "Creator", key: "creator" },
          { label: "Assignees", key: "assignees" },
        ].map(({ label, key }) => (
          <span
            key={label}
            className={`${
              ["Description", "Assignees"].includes(label) && "col-span-2"
            } cursor-pointer hover:underline flex items-center gap-2`} 
            onClick={() => handleSort(sortFieldMapping[label])}
          >
            {label} {getArrow(key)}
          </span>
        ))}
      </div>:
      <span className="text-center block">No Tasks Found</span>
      }
      <div className="pt-[6vh]">
        {tasks.map((task, index) => (
          <div key={index}>
            <TaskItem task={task} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
