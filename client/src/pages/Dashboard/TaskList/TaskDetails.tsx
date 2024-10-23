import React, { useState } from 'react';
import { Task, TaskData } from '../../../interfaces/interfaces';
import { updateTask } from '../../../api';


interface TaskDetailProps {
  task: Task;
  onClose: () => void;
}

const TaskDetail: React.FC<TaskDetailProps> = ({ task, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Task>({
    ...task,
    dueDate: task.dueDate.split('T')[0],
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
      await updateTask(task.id.toString(), updatedTask);
      console.log("Task updated:", updatedTask);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const formatDate = (date: string | Date) => {
    const formattedDate = typeof date === 'string' ? new Date(date) : date;
    return formattedDate.toLocaleDateString();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-40">
      <div className='fixed inset-0 bg-black/70 z-40' onClick={onClose}></div>
      <div className="bg-white rounded-lg shadow-lg p-5 max-w-lg w-full absolute z-50">
        <h2 className="text-xl font-bold mb-4">{task.name}</h2>
        
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
          <div className="mb-4">
            <p className="mb-2"><strong>Description:</strong> {task.description}</p>
            <p className="mb-2"><strong>Priority:</strong> {task.priority}</p>
            <p className="mb-2"><strong>Status:</strong> {task.status}</p>
            <p className="mb-2"><strong>Due Date:</strong> {formatDate(task.dueDate)}</p>
            <p className="mb-2"><strong>Created At:</strong> {formatDate(task.createdAt)}</p>
            <p className="mb-2"><strong>Creator:</strong> {task.creator.name}</p>
            <p className="mb-2"><strong>Assignees:</strong> {task.assignees.length > 0 ? task.assignees.map(assignee => assignee.name).join(", ") : "No Assignees"}</p>
          </div>
        )}

        <div className="flex justify-end">
          {isEditing ? (
            <button className="bg-blue-500 text-white px-3 py-2 rounded" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          ) : (
            <button className="bg-green-500 text-white px-3 py-2 rounded" onClick={() => setIsEditing(true)}>
              Edit Task
            </button>
          )}
          <button className="bg-blue-500 text-white px-3 py-2 rounded ml-2" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
