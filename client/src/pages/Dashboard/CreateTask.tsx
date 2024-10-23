import React, { useState, useEffect } from "react";
import { createTask, getAllUsers } from "../../api";
import { buttonStyle } from "../Auth/formStyles";
import { jwtDecode } from "jwt-decode";

const CreateTask = () => {
	const [dialogOpen, setDialogOpen] = useState(false);

	return (
		<>
			<div
				className={buttonStyle}
				onClick={() => setDialogOpen(true)}
			>
				<span className="relative z-10"></span>
				Create Task
			</div>
			{dialogOpen && (
				<>
					<div
						className="absolute h-screen w-screen bg-black/70 top-0 left-0 z-30"
						onClick={() => setDialogOpen(false)}
					></div>
					<div className="absolute bg-white border-black z-40 w-[50vw] -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 p-4 rounded-lg shadow-lg">
						<NewTaskForm onClose={() => setDialogOpen(false)} />
					</div>
				</>
			)}
		</>
	);
};

interface User {
	id: number;
	name: string;
}

interface NewTaskFormProps {
	onClose: () => void;
}

const NewTaskForm: React.FC<NewTaskFormProps> = ({ onClose }) => {
	const [taskData, setTaskData] = useState({
		name: "",
		description: "",
		dueDate: new Date().toISOString().split("T")[0], // Default to today
		priority: "Medium",
		assigneeIds: [] as string[],
	});
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchUsers = async () => {
		  try {
			const response = await getAllUsers();
			const token = localStorage.getItem("token"); 			
			if (token) {
			  const decodedToken = jwtDecode<User>(token);
			  const currentUserId = decodedToken.id;
			  const filteredUsers = response.filter((user:User) => user.id !== currentUserId);
			  setUsers(filteredUsers);
			}
		  } catch (error) {
			console.error("Error fetching users:", error);
		  } finally {
			setLoading(false);
		  }
		};
	
		fetchUsers();
	  }, []);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setTaskData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleAssigneeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const userId = e.target.value;
		setTaskData((prev) => ({
			...prev,
			assigneeIds: e.target.checked
				? [...prev.assigneeIds, userId]
				: prev.assigneeIds.filter((id) => id !== userId),
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const createdTask = { ...taskData, dueDate: new Date(taskData.dueDate) }
		console.log(createdTask);
		await createTask(createdTask);
		onClose();
	};

	return (
		<form onSubmit={handleSubmit}>
			<h2 className="text-xl font-bold mb-4">Create New Task</h2>
			<div className="mb-4">
				<label className="block mb-1">Task Name</label>
				<input
					type="text"
					name="name"
					className="border p-2 w-full"
					value={taskData.name}
					onChange={handleInputChange}
					required
				/>
			</div>
			<div className="mb-4">
				<label className="block mb-1">Description</label>
				<textarea
					name="description"
					className="border p-2 w-full"
					value={taskData.description}
					onChange={handleInputChange}
				></textarea>
			</div>
			<div className="mb-4">
				<label className="block mb-1">Due Date</label>
				<input
					type="date"
					name="dueDate"
					className="border p-2 w-full"
					value={taskData.dueDate}
					onChange={handleInputChange}
				/>
			</div>
			<div className="mb-4">
				<label className="block mb-1">Priority</label>
				<select
					name="priority"
					className="border p-2 w-full"
					value={taskData.priority}
					onChange={handleInputChange}
				>
					<option value="Low">Low</option>
					<option value="Medium">Medium</option>
					<option value="High">High</option>
				</select>
			</div>
			<div className="mb-4">
				<label className="block mb-1">Assign Users</label>
				{loading ? (
					<p>Loading users...</p>
				) : (
					<div className="border p-2 w-full">
						{users.map((user) => (
							<div key={user.id} className="flex items-center mb-2">
								<input
									type="checkbox"
									id={`user-${user.id}`}
									value={user.id}
									checked={taskData.assigneeIds.includes(user.id.toString())}
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
				<button type="button" className="mr-4 bg-gray-500 text-white px-3 py-2 rounded" onClick={onClose}>
					Cancel
				</button>
				<button type="submit" className="bg-blue-500 text-white px-3 py-2 rounded">
					Create Task
				</button>
			</div>
		</form>
	);
};

export default CreateTask;
