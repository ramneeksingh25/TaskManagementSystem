import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { buttonStyle, inputStyle, labelStyle } from "./formStyles";
import { loginUser } from "../../api"; // Import API to log in
import { LoginDetails } from "../../interfaces/interfaces";


const Login = () => {
	const { register, handleSubmit, formState: { errors }, reset } = useForm<LoginDetails>();
	const [responseMessage, setMessage] = useState({ error: false, message: "" });
	const [loading, setLoading] = useState<boolean>(false);
	const navigate = useNavigate();

	const onSubmit = async (data: LoginDetails) => {
		setLoading(true);
		try {
			const response = await loginUser(data);
			const token = response.data.token;
			localStorage.setItem('token', token);
			setMessage({ error: false, message: "Login successful!" });
			reset(); 

		} catch (error: unknown) {
			setMessage({
				error: true,
				message: (error as Error)?.message || "Login failed. Please try again.",
			});
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			navigate("/");
		}
	}, [navigate]);

	return (
		<div className="bg-black h-screen w-screen grid place-items-center gap-0 text-white">
			<form
				className="row-span-2 bg-gray-300/10 px-20 py-12 flex flex-col items-center justify-center"
				onSubmit={handleSubmit(onSubmit)}>
				<label className="text-2xl font-bold mb-3">Login</label>

				<div className="relative z-0 w-full mb-10 group">
					<input
						type="email"
						{...register("email", {
							required: "Email is required",
							pattern: {
								value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
								message: "Invalid email format",
							},
						})}
						className={inputStyle(errors.email)}
						placeholder=" "
					/>
					<label htmlFor="email" className={labelStyle}>
						Email address
					</label>
					{errors.email && (
						<span className="text-red-500 text-xs">{errors.email.message}</span>
					)}
				</div>

				<div className="relative z-0 w-full mb-10 group">
					<input
						type="password"
						{...register("password", {
							required: "Password is required",
							minLength: {
								value: 6,
								message: "Password must be at least 6 characters",
							},
						})}
						className={inputStyle(errors.password)}
						placeholder=" "
					/>
					<label htmlFor="password" className={labelStyle}>
						Password
					</label>
					{errors.password && (
						<span className="text-red-500 text-xs">{errors.password.message}</span>
					)}
				</div>

				{responseMessage.message && (
					<p className={`${responseMessage.error ? "text-red-500" : "text-green-500"}`}>
						{responseMessage.message}
					</p>
				)}

				<button
					type="submit"
					className={buttonStyle}
					disabled={loading}>
					<span className="relative z-10">{loading ? "Logging in..." : "Login"}</span>
				</button>

				<span className="text-center font-light">
					Don't have an account?{" "}
					<Link to={"/signup"} className="font-bold">
						Register
					</Link>
				</span>
			</form>
		</div>
	);
};

export default Login;
