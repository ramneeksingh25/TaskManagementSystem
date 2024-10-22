import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { buttonStyle, inputStyle, labelStyle } from "./formStyles";
import { loginUser } from "../../api"; // Import API to log in

export interface LoginDetails {
	email: string;
	password: string;
}

const Login = () => {
	const { register, handleSubmit, formState: { errors }, reset } = useForm<LoginDetails>();
	const [responseMessage, setMessage] = useState({ error: false, message: "" });
	const [loading, setLoading] = useState<boolean>(false);
	const navigate = useNavigate();

	// Handle login form submission
	const onSubmit = async (data: LoginDetails) => {
		setLoading(true);
		try {
			// Login API call
			const response = await loginUser(data);

			// Store the JWT token in localStorage
			const token = response.data.token;
			localStorage.setItem('token', token);

			setMessage({ error: false, message: "Login successful!" });
			reset(); // Reset form fields after successful login
			navigate("/"); // Redirect to the home route
		} catch (error: unknown) {
			setMessage({
				error: true,
				message: (error as Error)?.message || "Login failed. Please try again.",
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="bg-black h-screen w-screen grid place-items-center gap-0 text-white">
			<form
				className="row-span-2 bg-gray-300/10 px-20 py-12 flex flex-col items-center justify-center"
				onSubmit={handleSubmit(onSubmit)}>
				<label className="text-2xl font-bold mb-3">Login</label>

				{/* Email Input */}
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

				{/* Password Input */}
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

				{/* Response Message */}
				{responseMessage.message && (
					<p className={`${responseMessage.error ? "text-red-500" : "text-green-500"}`}>
						{responseMessage.message}
					</p>
				)}

				{/* Login Button */}
				<button
					type="submit"
					className={buttonStyle}
					disabled={loading}>
					<span className="relative z-10">{loading ? "Logging in..." : "Login"}</span>
				</button>

				{/* Register Link */}
				<span className="text-center font-light">
					Don't have an account?{" "}
					<Link to={"/register"} className="font-bold">
						Register
					</Link>
				</span>
			</form>
		</div>
	);
};

export default Login;
