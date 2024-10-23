import { useEffect, useState } from "react";
import { getTasksForUser } from "../../api";
import TaskItem from "./TaskItem";

const TaskList = () => {
	const [tasks, setTasks] = useState([]);
	useEffect(() => {
		const fetchTasks = async () => {
			const response = await getTasksForUser();
			setTasks(response);
		};
		fetchTasks();
	}, []);
	return (
		<div className="bg-black top-10 w-full grid grid-cols-3 gap-3 h-full overflow-scroll">
			{tasks.map((task, index) => (
				<div key={index}>
					<TaskItem task={task} />
				</div>
			))}
		</div>
	);
};

export default TaskList;
