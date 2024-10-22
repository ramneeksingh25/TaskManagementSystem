import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

// Define the interface for registration details
interface RegisterDetails {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
	role: string;
}

const Register = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
    watch
	} = useForm<RegisterDetails>();

	const onSubmit = (data: RegisterDetails) => {
		console.log("Registration successful!", data);
		// Here you can add your registration logic (e.g., API call)
		reset(); // Clear form after successful registration
	};

	return (
		<div className="bg-black h-screen w-screen grid place-items-center gap-0 text-white">
			<form
				className="row-span-2 bg-gray-300/10 px-20 py-12 flex flex-col items-center justify-center"
				onSubmit={handleSubmit(onSubmit)}>
				<label className="text-2xl font-bold mb-3">Register</label>

				<div className="relative z-0 w-full mb-10 group">
					<input
						type="text"
						{...register("name", {
							required: "Name is required",
							pattern: {
								value: /^[^\d].*$/, // Regex to ensure the name does not start with a number
								message: "Name cannot start with a number",
							},
						})}
						className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${
							errors.name ? "border-red-500" : "border-gray-300"
						} appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
						placeholder=" "
					/>
					<label
						htmlFor="name"
						className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
						Name
					</label>
					{errors.name && (
						<span className="text-red-500 text-xs">{errors.name.message}</span>
					)}
				</div>

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
						className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${
							errors.email ? "border-red-500" : "border-gray-300"
						} appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
						placeholder=" "
					/>
					<label
						htmlFor="email"
						className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
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
						className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${
							errors.password ? "border-red-500" : "border-gray-300"
						} appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
						placeholder=" "
					/>
					<label
						htmlFor="password"
						className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
						Password
					</label>
					{errors.password && (
						<span className="text-red-500 text-xs">
							{errors.password.message}
						</span>
					)}
				</div>

				<div className="relative z-0 w-full mb-10 group">
          <input
            type="password"
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: (value) =>
                value === watch("password") || "Passwords do not match", // Validate against the password field
            })}
            className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            } appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
            placeholder=" "
          />
          <label
            htmlFor="confirmPassword"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Confirm Password
          </label>
          {errors.confirmPassword && (
            <span className="text-red-500 text-xs">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>


				<button
					type="submit"
					className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-5">
					Register
				</button>
				<span className="text-center font-light">
					Already have an account?{" "}
					<Link
						to={"/signin"}
						className="font-bold">
						Login
					</Link>{" "}
				</span>
			</form>
		</div>
	);
};

export default Register;
