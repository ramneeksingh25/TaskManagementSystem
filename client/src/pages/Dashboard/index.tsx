
import Logout from "../Auth/Logout";
import AssignedTaskList from "./AssignedTaskList";
import CreateTask from "./CreateTask";
import TaskList from "./TaskList";

const Home = () => {
	
	return (
		<div className="h-[100vh] grid grid-rows-12">
			<Header />
			<div className="row-span-5 p-32">
				My Tasks:
                <TaskList />
            </div>
			<div className="row-span-5 p-32">
				Assigned Tasks:
                <AssignedTaskList />
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
