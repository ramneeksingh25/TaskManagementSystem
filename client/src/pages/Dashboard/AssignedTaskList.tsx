import { useEffect, useState } from "react";
import { getTasksByUser } from "../../api";
import TaskItem from "./TaskItem";
const AssignedTaskList = () => {
	const [tasks, setTasks] = useState([]);
	useEffect(() => {
		const fetchTasks = async () => {
			const response = await getTasksByUser();
			setTasks(response);
		};
		fetchTasks();
	}, []);
	return (
		<div className="bg-black top-10 w-full gap-3 h-full overflow-scroll">
			{tasks.map((task, index) => (
				<div key={index}>
					<TaskItem task={task} />
				</div>
			))}
		</div>
	);
};

export default AssignedTaskList;
