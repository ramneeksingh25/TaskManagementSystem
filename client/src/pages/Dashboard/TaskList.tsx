import { useEffect, useState } from "react";
import { getTasksByUser, getTasksForUser } from "../../api";
import TaskItem from "./TaskItem";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

interface TaskListProps {
  myTask: boolean;
}

const TaskList = ({ myTask }: TaskListProps) => {
  const [tasks, setTasks] = useState([]);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = myTask ? await getTasksForUser() : await getTasksByUser();
        setTasks(response);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [myTask]);

  const handleSort = (sortField: string) => {
    const sortableFields = ["name", "priority", "status", "dueDate"];
    if (!sortableFields.includes(sortField)) return;

    const isSameField = sortBy === sortField;
    const direction = isSameField && sortDirection === "asc" ? "desc" : "asc";
    setSortBy(sortField);
    setSortDirection(direction);

    const sortedTasks = [...tasks].sort((a, b) => {
      if (a[sortField] < b[sortField]) return direction === "asc" ? -1 : 1;
      if (a[sortField] > b[sortField]) return direction === "asc" ? 1 : -1;
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

  return (
    <div className="rounded-lg relative overflow-hidden">
      <div className="text-black/70 absolute top-0 h-[6vh] w-full grid grid-cols-10 px-4 items-center">
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
            onClick={() => handleSort(key)} // Toggle sort on click
          >
            {label} {getArrow(key)} {/* Show arrow */}
          </span>
        ))}
      </div>
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
