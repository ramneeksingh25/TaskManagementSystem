import React, { useState, useEffect } from "react";
import {
	Task,
	TaskDataWithRelationships,
	UserProfile,
} from "../../../interfaces/interfaces";
import { updateTask, deleteTask, getAllUsers } from "../../../api";
import { jwtDecode } from "jwt-decode";

interface TaskDetailProps {
	task: Task;
	onClose: () => void;
}

const TaskDetail: React.FC<TaskDetailProps> = ({ task, onClose }) => {
	const [isEditing, setIsEditing] = useState(false);
	const formatDate = (date: Date) => {
		return date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
		});
	};

	const [formData, setFormData] = useState<TaskDataWithRelationships>({
		id: task.id,
		name: task.name,
		description: task.description,
		dueDate: new Date(task.dueDate),
		priority: task.priority,
		isMultiUser: task.isMultiUser,
		assignees: task.assignees,
	});
	const [availableUsers, setAvailableUsers] = useState<UserProfile[]>([]); // Available users for assigning
	const [loadingUsers, setLoadingUsers] = useState(true);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const users = await getAllUsers();
				const token = localStorage.getItem("token");
				if (token) {
					const decodedToken = jwtDecode<UserProfile>(token);
					const currentUserId = decodedToken.id;
					const filteredUsers = users.filter(
						(user: UserProfile) => user.id !== currentUserId
					);
					setAvailableUsers(filteredUsers);
				}
				setAvailableUsers(users);
			} catch (error) {
				console.error("Error fetching users:", error);
			} finally {
				setLoadingUsers(false);
			}
		};
		fetchUsers();
	}, []);

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	// Handle assignee change
	const handleAssigneeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const userId = parseInt(e.target.value);
		setFormData((prev) => ({
			...prev,
			assignees: e.target.checked
				? [
						...(prev.assignees || []),
						availableUsers.find((user) => user.id === userId)!,
				  ]
				: prev.assignees?.filter((assignee) => assignee.id !== userId),
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const updatedTask: TaskDataWithRelationships = {
				...formData,
				dueDate: formData.dueDate,
				status: formData.status as "To Do" | "In Progress" | "Completed",
				assignees: formData.assignees,
			};
			await updateTask(task.id.toString(), updatedTask);
			console.log("Task updated:", updatedTask);
			setIsEditing(false);
		} catch (error) {
			console.error("Error updating task:", error);
		}
	};

	const handleDelete = async () => {
		const confirmDelete = window.confirm(
			"Are you sure you want to delete this task?"
		);
		if (confirmDelete) {
			try {
				await deleteTask(task.id.toString());
				console.log("Task deleted");
				onClose();
			} catch (error) {
				console.error("Error deleting task:", error);
			}
		}
	};

	return (
		<div className="fixed inset-0 flex items-center justify-center z-40">
			<div
				className="fixed inset-0 bg-black/70 z-40"
				onClick={onClose}></div>
			<div className="bg-slate-300 text-slate-950 dark:bg-slate-950 dark:text-slate-200 border border-slate-300/20 dark:shadow-2xl dark:shadow-slate-50/10 rounded-lg shadow-lg p-5 max-w-lg w-full absolute z-50">
				<h2 className="text-xl font-bold mb-4">{task.name}</h2>

				{isEditing ? (
					<form onSubmit={handleSubmit}>
						<div className="mb-4">
							<label className="block mb-1">Due Date</label>
							<input
								type="date"
								name="dueDate"
								defaultValue={formatDate(new Date(task.dueDate))}
								onChange={handleChange}
								className="border-b border-slate-900/20 dark:border-slate-300/20  p-2 w-full bg-slate-300 text-slate-950 dark:bg-slate-800 dark:text-slate-200"
								required
							/>
						</div>

						<div className="mb-4">
							<label className="block mb-1 ">Priority</label>
							<select
								name="priority"
								value={formData.priority}
								onChange={handleChange}
								className="border-b border-slate-900/20 dark:border-slate-300/20  p-2 w-full bg-slate-300 text-slate-950 dark:bg-slate-800 dark:text-slate-200"
								required>
								<option value="low">Low</option>
								<option value="medium">Medium</option>
								<option value="high">High</option>
							</select>
						</div>

						<div className="mb-4">
							<label className="block mb-1 ">Status</label>
							<select
								name="status"
								value={formData.status}
								onChange={handleChange}
								className="border-b border-slate-900/20 dark:border-slate-300/20  p-2 w-full bg-slate-300 text-slate-950 dark:bg-slate-800 dark:text-slate-200"
								required>
								<option value="To Do">To Do</option>
								<option value="In Progress">In Progress</option>
								<option value="Completed">Completed</option>
							</select>
						</div>

						<div className="mb-4">
							<label className="block mb-1">Assign Users</label>
							{loadingUsers ? (
								<p>Loading users...</p>
							) : (
								<div className="border-b border-slate-900/20 dark:border-slate-300/20  p-2 w-full bg-slate-300 text-slate-950 dark:bg-slate-800 dark:text-slate-200 
							h-20 overflow-scroll">
									{availableUsers.map((user) => (
										<div
											key={user.id}
											className="flex items-center mb-2">
											<input
												type="checkbox"
												id={`user-${user.id}`}
												value={user.id}
												checked={formData.assignees?.some(
													(assignee) => assignee.id === user.id
												)}
												onChange={handleAssigneeChange}
												className="mr-2"
											/>
											<label htmlFor={`user-${user.id}`}>{user.name}</label>
										</div>
									))}
								</div>
							)}
						</div>

						<div className="flex justify-end">
							<button
								type="button"
								onClick={() => setIsEditing(false)}
								className="mr-2 bg-gray-500 text-white px-3 py-2 rounded">
								Cancel
							</button>
							<button
								type="submit"
								className="bg-blue-500 text-white px-3 py-2 rounded">
								Update Task
							</button>
						</div>
					</form>
				) : (
					<div className="mb-4">
						{/* Display task details */}
						<p className="mb-2">
							<strong>Description:</strong> {task.description}
						</p>
						<p className="mb-2">
							<strong>Priority:</strong> {task.priority}
						</p>
						<p className="mb-2">
							<strong>Status:</strong> {task.status}
						</p>
						<p className="mb-2">
							<strong>Due Date:</strong> {formatDate(new Date(task.dueDate))}
						</p>
						<p className="mb-2">
							<strong>Created At:</strong>{" "}
							{formatDate(new Date(task.createdAt))}
						</p>
						<p className="mb-2">
							<strong>Creator:</strong> {task.creator.name}
						</p>
						<p className="mb-2">
							<strong>Assignees:</strong>{" "}
							{task.assignees.length > 0
								? task.assignees.map((assignee) => assignee.name).join(", ")
								: "No Assignees"}
						</p>
					</div>
				)}

				<div className="flex justify-end">
					{isEditing || (
						<>
							<button
								className="bg-green-500 text-white px-3 py-2 rounded"
								onClick={() => setIsEditing(true)}>
								Edit Task
							</button>
							<button
								className="bg-red-500 text-white px-3 py-2 rounded ml-2"
								onClick={handleDelete}>
								Delete Task
							</button>
							<button
								className="bg-blue-500 text-white px-3 py-2 rounded ml-2"
								onClick={onClose}>
								Close
							</button>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default TaskDetail;
