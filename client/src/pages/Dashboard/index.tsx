import { useEffect } from "react";
import Logout from "../Auth/Logout";
import { getTasksForUser } from "../../api";
import CreateTask from "./CreateTask";

const Home = () => {
	const fetchTasks = async () => {
		const response = await getTasksForUser();
		console.log(response);
	};
	useEffect(() => {
		fetchTasks();
	}, []);
	return (
		<div className="h-screen grid grid-rows-3">
			<Logout />
			<Header />
		</div>
	);
};

const Header = () => (
	<div className="bg-green-500 row-span-2">
		<CreateTask />
		<Logout />
	</div>
);

export default Home;
