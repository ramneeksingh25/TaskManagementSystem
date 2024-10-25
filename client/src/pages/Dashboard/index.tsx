import { useEffect, useState } from "react";
import Logout from "../Auth/Logout";
import CreateTask from "./CreateTask";
import TaskList from "./TaskList/TaskList";
import { getUserProfile } from "../../api";
import { useAuth } from "../../context/AuthContext";
import { DecodedToken, UserProfile } from "../../interfaces/interfaces";
import { MdAssignment } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { IoFilter } from "react-icons/io5";
import ThemeButton from "../ThemeButton";

const Home = () => {
	const { user, setUser } = useAuth();
	const [myTask, setMyTask] = useState(true);
	useEffect(() => {
		const fetchUserDetails = async () => {
			const response = await getUserProfile();
			setUser(response);
			return response;
		};
		fetchUserDetails();
	}, [setUser]);
	return (
		<div className="h-[100vh] grid grid-rows-12">
			<Header user={user} />
			<div className="row-span-11 grid grid-rows-12 px-0 md:px-6 lg:px-12 pt-2 bg-slate-300 dark:bg-slate-900 transition-colors duration-150">
				<div className="rounded-none md:rounded-3xl px-3 md:px-6 lg:px-10 overflow-hidden grid grid-cols-2 bg-stone-900/5 dark:bg-stone-950/40 border border-black/20 shadow-sm dark:border-slate-700/90 transition-all duration-150">
					<div className="flex justify-start items-center gap-2 select-none">
						<span
							className={`text-sm md:text-base p-1 md:p-2 lg:p-3 rounded-xl hover:shadow-gray-900 shadow-gray-600 font-bold  cursor-pointer flex items-center justify-start gap-3 transition-all duration-300 ${
								myTask ? "bg-slate-200 text-blue-700 hover:text-blue-800 hover:shadow-inner" : "text-blue-900 dark:text-white hover:bg-slate-400/20 dark:hover:text-blue-400 shadow-none hover:shadow-md"
							}`}
							onClick={() => {
								setMyTask(true);
							}}>
							<FaTasks className="hidden md:block lg:block"/>
							<span>My Tasks</span>
						</span>
						<span
							className={`text-sm md:text-base p-1 md:p-2 lg:p-3 rounded-xl  hover:shadow-gray-900 shadow-gray-600 font-bold  cursor-pointer flex items-center justify-start gap-3 transition-all duration-300 ${
								myTask ? "text-blue-900 dark:text-white dark:hover:text-blue-400 hover:bg-slate-400/20 shadow-none hover:shadow-md" : "bg-slate-200 text-blue-600 hover:text-blue-800 hover:shadow-inner"
							}`}
							onClick={() => {
								setMyTask(false);
							}}>
							<MdAssignment className="hidden md:block lg:block"/>
							<span>Assigned Tasks</span>
						</span>
						<span
							className={"relative z-10 text-sm md:text-base bg-blue-600 hover:text-blue-800 text-white hover:bg-slate-100 p-[0.4] md:p-2 md:px-3 sm:rounded-full rounded-3xl shadow hover:shadow-gray-900 hover:shadow-md shadow-gray-600 cursor-pointer flex items-center justify-start gap-3 transition duration-150"}>
							<IoFilter />
							<span className="hidden md:block lg:block">
								Filter
							</span>
						</span>
					</div>
					<div className="flex items-center justify-end">
						<CreateTask />
					</div>
				</div>
				<div className="row-span-11 w-full overflow-scroll">
					<div className="overflow-scroll h-full pb-3 px-0 md:px-6 lg:px-12 shadow-4xl">
						<TaskList myTask={myTask} />
					</div>
				</div>
			</div>
		</div>
	);
};

const Header: React.FC<{ user: DecodedToken | UserProfile }> = ({ user }) => {
	return (
		<div className="row-span-1 flex items-center justify-between px-4 md:px-6 lg:px-12 border border-b-2 border-slate-400 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 transition duration-150">
			<h1 className="text-base md:text-3xl font-bold select-none"> Welcome, {" "}
					{(user as UserProfile).name}!
			</h1>
			<div className="flex items-center">
				<Logout />
				<ThemeButton/>
			</div>
		</div>
	);
};
export default Home;
