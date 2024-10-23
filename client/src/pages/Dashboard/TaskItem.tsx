import React, { useState } from "react";
import { Task, TaskData } from "../../interfaces/interfaces";
import { updateTask } from "../../api";

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Task>({
    ...task,
    dueDate: task.dueDate,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedTask: TaskData = {
        ...formData,
        dueDate: new Date(formData.dueDate),
        status: formData.status as "To Do" | "In Progress" | "Completed",
      };
      const updatedTaskResponse = await updateTask(task.id.toString(), updatedTask);

      console.log("Task updated:", updatedTaskResponse);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="border rounded-lg px-4 bg-white shadow-md">
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Task Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="mr-2 bg-gray-500 text-white px-3 py-2 rounded"
            >
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white px-3 py-2 rounded">
              Update Task
            </button>
          </div>
        </form>
      ) : (
        <div className="col-span-11 grid grid-cols-10 h-10 items-center whitespace-nowrap">
          <span className="text-ellipsis overflow-hidden font-bold">{task.name}</span>
          <span className="text-ellipsis overflow-hidden col-span-2">{task.description}</span>
          <span className="text-ellipsis overflow-hidden">{task.priority}</span>
          <span className="text-ellipsis overflow-hidden">{task.status}</span>
          <span className="text-ellipsis overflow-hidden">{formatDate(task.dueDate)}</span>
          <span className="text-ellipsis overflow-hidden">{formatDate(task.createdAt)}</span>
          <span className="text-ellipsis overflow-hidden">{task.creator.name}</span>
          <span className="text-ellipsis overflow-hidden col-span-2">
            {task.assignees.length > 0
              ? task.assignees.map((assignee, index) => `${assignee.name}${index === task.assignees.length - 1 ? "" : ", "}`)
              : "No Assignees"}
          </span>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
