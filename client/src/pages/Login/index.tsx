import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { labelStyle, inputStyle } from "./formStyles";

interface LoginDetails {
	email: string;
	password: string;
}
interface LoginFormProps {
	loginDetails: LoginDetails;
	setLoginDetails: React.Dispatch<React.SetStateAction<LoginDetails>>;
}

const Login = () => {
	const [loginDetails, setLoginDetails] = useState<LoginDetails>({
		email: "",
		password: "",
	});
	useEffect(() => {
		console.log(loginDetails);
	}, [loginDetails]);
	return (
        <div className="bg-black h-screen w-screen grid place-items-center gap-0 text-white">
            <LoginForm
                loginDetails={loginDetails}
                setLoginDetails={setLoginDetails}
            />
        </div>
	);
};

const LoginForm:React.FC<LoginFormProps> = ({ loginDetails, setLoginDetails }) => {
	return (
		<form className="bg-gray-300/10 px-20 py-12 flex flex-col items-center justify-center">
            <label className="text-2xl font-bold mb-3">Login</label>
			<div className="relative z-0 w-full mb-10 group">
				<input
					type="email"
					name="floating_email"
					id="floating_email"
					value={loginDetails.email}
					onChange={(e) =>
						setLoginDetails({ ...loginDetails, email: e.target.value })
					}
					className={inputStyle("blue")}
					placeholder=" "
					required
				/>
				<label
					htmlFor="floating_email"
					className={labelStyle}>
					Email address
				</label>
			</div>
			<div className="relative z-0 w-full mb-10 group">
				<input
					type="password"
					name="floating_password"
					id="floating_password"
					value={loginDetails.password}
					onChange={(e) =>
						setLoginDetails({ ...loginDetails, password: e.target.value })
					}
					className={inputStyle("blue")}
					placeholder=" "
					required
				/>
				<label
					htmlFor="floating_password"
					className={labelStyle}>
					Password
				</label>
			</div>

			<button
				type="submit"
				className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-5">
				Login
			</button>
            <span className="text-center font-light">New Here? <Link to={"/signup"} className="font-bold hover:underline">Register</Link> </span>
		</form>
	);
};

export default Login;
