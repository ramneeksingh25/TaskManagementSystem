import { Link } from "react-router-dom";
import { FieldErrors, SubmitHandler, useForm, UseFormRegister } from "react-hook-form";
import { labelStyle, inputStyle } from "./formStyles";

interface LoginDetails {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginDetails>();

  const onSubmit = (data: LoginDetails) => {
    console.log("Login successful!", data);
    // Add your login logic here (e.g., API call)
    reset(); // Reset form after successful login
  };

  return (
    <div className="bg-black h-screen w-screen grid place-items-center gap-0 text-white">
      <LoginForm
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
      />
    </div>
  );
};

interface LoginFormProps {
  register:UseFormRegister<LoginDetails>
  handleSubmit: (callback: (data: LoginDetails) => void) => (
    event?: React.FormEvent<HTMLFormElement>
  ) => Promise<void>;
  onSubmit: SubmitHandler<LoginDetails>;
  errors: FieldErrors<LoginDetails>;
}

const LoginForm: React.FC<LoginFormProps> = ({
  register,
  handleSubmit,
  onSubmit,
  errors,
}) => {
  return (
    <form
      className="bg-gray-300/10 px-20 py-12 flex flex-col items-center justify-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label className="text-2xl font-bold mb-3">Login</label>
      <div className="relative z-0 w-full mb-10 group">
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
              message: "Email is not valid",
            },
          })}
          className={inputStyle("blue")}
          placeholder=" "
        />
        <label htmlFor="floating_email" className={labelStyle}>
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
              message: "Password must be at least 6 characters long",
            },
          })}
          className={inputStyle("blue")}
          placeholder=" "
        />
        <label htmlFor="floating_password" className={labelStyle}>
          Password
        </label>
        {errors.password && (
          <span className="text-red-500 text-xs">{errors.password.message}</span>
        )}
      </div>

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-5"
      >
        Login
      </button>
      <span className="text-center font-light">
        New Here?{" "}
        <Link to={"/signup"} className="font-bold hover:underline">
          Register
        </Link>
      </span>
    </form>
  );
};

export default Login;
