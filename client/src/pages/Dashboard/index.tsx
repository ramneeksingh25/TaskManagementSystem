import { useEffect, useState } from "react";
import Logout from "../Auth/Logout";
import CreateTask from "./CreateTask";
import TaskList from "./TaskList/TaskList";
import { getUserProfile } from "../../api";
import { useAuth } from "../../context/AuthContext";
import { DecodedToken, UserProfile } from "../../interfaces/interfaces";
import { MdAssignment } from "react-icons/md";
import { FaTasks } from "react-icons/fa";

const Home = () => {
	const { user, setUser } = useAuth();
	const [myTask, setMyTask] = useState(true);
	useEffect(() => {
		const fetchUserDetails = async () => {
			const response = await getUserProfile();
			console.log("Fetching user details:", response);
			setUser(response);
			return response;
		};
		fetchUserDetails();
	}, [setUser]);
	return (
		<div className="h-[100vh] grid grid-rows-12">
			<Header user={user} />
			<div className="row-span-11 grid grid-cols-12 bg-gray-300">
				<div className="flex flex-col px-2 col-span-2">
					<CreateTask />
					<span
						className="font-bold hover:underline cursor-pointer flex items-center justify-start gap-3 text-2xl"
						onClick={() => {
							setMyTask(true);
						}}>
						<FaTasks />
						<span>My Tasks</span>
					</span>
					<span
						className="font-bold hover:underline cursor-pointer flex items-center justify-start gap-3 text-2xl"
						onClick={() => {
							setMyTask(false);
						}}>
						<MdAssignment />
						<span>Assigned Tasks</span>
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

const Header: React.FC<{ user: DecodedToken | UserProfile }> = ({ user }) => {
	return (
		<div className="bg-yellow-500 row-span-1 flex items-center justify-between px-32">
			<h1 className="text-3xl font-bold">Task Manager</h1>
			<div className="flex items-center">
				<span className="text-gray-500 text-xs">
					Logged in as {(user as UserProfile).name}{" "}
				</span>
				<Logout />
			</div>
		</div>
	);
};
export default Home;