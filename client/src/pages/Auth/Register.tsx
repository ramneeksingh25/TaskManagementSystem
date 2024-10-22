import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { buttonStyle, inputStyle, labelStyle } from "./formStyles";
import { loginUser, registerUser } from "../../api";
import { RegisterDetails } from "../../interfaces/authInterfaces";

const Register = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		watch,
	} = useForm<RegisterDetails>();

	const [responseMessage, setMessage] = useState({ error: false, message: "" });
	const [loading, setLoading] = useState<boolean>(false);

	// Handle registration and automatic login
	const onSubmit = async (data: RegisterDetails) => {
		setLoading(true);
		try {
			// Registration API call
			const response = await registerUser(data);
			setMessage({ error: false, message: "Registration successful!" });
			
			// Automatic login after registration
			const loginData = { email: data.email, password: data.password };
			await loginUser(loginData);

			reset(); // Reset form after successful registration
		} catch (error: unknown) {
			setMessage({
				error: true,
				message: (error as Error)?.message || "Registration failed. Please try again.",
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
				<label className="text-2xl font-bold mb-3">Register</label>

				{/* Name Input */}
				<div className="relative z-0 w-full mb-10 group">
					<input
						type="text"
						{...register("name", {
							required: "Name is required",
							pattern: {
								value: /^[^\d].*$/,
								message: "Name cannot start with a number",
							},
						})}
						className={inputStyle(errors.name)}
						placeholder=" "
					/>
					<label htmlFor="name" className={labelStyle}>
						Name
					</label>
					{errors.name && (
						<span className="text-red-500 text-xs">{errors.name.message}</span>
					)}
				</div>

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

				{/* Confirm Password Input */}
				<div className="relative z-0 w-full mb-10 group">
					<input
						type="password"
						{...register("confirmPassword", {
							required: "Confirm Password is required",
							validate: (value) =>
								value === watch("password") || "Passwords do not match",
						})}
						className={inputStyle(errors.confirmPassword)}
						placeholder=" "
					/>
					<label htmlFor="confirmPassword" className={labelStyle}>
						Confirm Password
					</label>
					{errors.confirmPassword && (
						<span className="text-red-500 text-xs">
							{errors.confirmPassword.message}
						</span>
					)}
				</div>

				{/* Response Message */}
				{responseMessage.message && (
					<p className={`${responseMessage.error ? "text-red-500" : "text-green-500"}`}>
						{responseMessage.message}
					</p>
				)}

				{/* Register Button */}
				<button
					type="submit"
					className={buttonStyle}
					disabled={loading}>
					<span className="relative z-10">
						{loading ? "Registering..." : "Register"}
					</span>
				</button>

				{/* Login Link */}
				<span className="text-center font-light">
					Already have an account?{" "}
					<Link to={"/signin"} className="font-bold">
						Login
					</Link>
				</span>
			</form>
		</div>
	);
};

export default Register;
