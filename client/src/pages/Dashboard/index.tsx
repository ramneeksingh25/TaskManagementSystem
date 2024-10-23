import { useState } from "react";
import Logout from "../Auth/Logout";
import CreateTask from "./CreateTask";
import TaskList from "./TaskList";

const Home = () => {
	const [myTask, setMyTask] = useState(true);
	return (
		<div className="h-[100vh] grid grid-rows-12">
			<Header />
			<div className="row-span-10 grid grid-cols-12 bg-gray-300">
				<div className="flex flex-col px-2 col-span-2">
					<span
						className="font-bold hover:underline cursor-pointer"
						onClick={() => {
							setMyTask(true);
						}}>
						My Tasks
					</span>
					<span
						className="font-bold hover:underline cursor-pointer"
						onClick={() => {
							setMyTask(false);
						}}>
						Assigned Tasks
					</span>
				</div>
				<div className="col-span-10 w-full overflow-scroll grid grid-rows-12 pb-3 pr-3">
					<span className="font-extrabold text-2xl transition-all duration-300 flex items-center justify-center">
						{myTask ? "My Tasks" : "Assigned Tasks"}
					</span>
					<div className="overflow-scroll row-span-11">
						<TaskList myTask={myTask} />
					</div>
				</div>
			</div>
		</div>
	);
};

const Header = () => (
	<div className="bg-yellow-500 row-span-1 flex items-center justify-between px-32">
		<CreateTask />
		<Logout />
	</div>
);

export default Home;
