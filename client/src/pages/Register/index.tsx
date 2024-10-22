import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { labelStyle, inputStyle } from "../Login/formStyles";

interface RegisterDetails {
  name: string;
  email: string;
  password: string;
  confirmPassword: string; 
  role: string;
}

interface RegisterFormProps {
  registerDetails: RegisterDetails;
  setRegisterDetails: React.Dispatch<React.SetStateAction<RegisterDetails>>;
}

const Register = () => {
  const [registerDetails, setRegisterDetails] = useState<RegisterDetails>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  useEffect(() => {
    console.log(registerDetails);
  }, [registerDetails]);

  return (
    <div className="bg-black h-screen w-screen grid place-items-center gap-0 text-white">
      <RegisterForm
        registerDetails={registerDetails}
        setRegisterDetails={setRegisterDetails}
      />
    </div>
  );
};

const RegisterForm: React.FC<RegisterFormProps> = ({
  registerDetails,
  setRegisterDetails,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log(registerDetails);
    
    console.log("Registration successful!", registerDetails);
  };

  return (
    <form
      className=" bg-gray-300/10 px-20 py-12 flex flex-col items-center justify-center"
      onSubmit={handleSubmit}
    >
      <label className="text-2xl font-bold mb-5">Register</label>
      <div className="relative z-0 w-full mb-10 group">
        <input
          type="text"
          name="floating_name"
          id="floating_name"
          value={registerDetails.name}
          onChange={(e) =>
            setRegisterDetails({ ...registerDetails, name: e.target.value })
          }
          className={inputStyle("blue")}
          placeholder=" "
          required
        />
        <label
          htmlFor="floating_name"
          className={labelStyle}
        >
          Name
        </label>
      </div>
      <div className="relative z-0 w-full mb-10 group">
        <input
          type="email"
          name="floating_email"
          id="floating_email"
          value={registerDetails.email}
          onChange={(e) =>
            setRegisterDetails({ ...registerDetails, email: e.target.value })
          }
          className={inputStyle("blue")}
          placeholder=" "
          required
        />
        <label
          htmlFor="floating_email"
          className={labelStyle}
        >
          Email address
        </label>
      </div>
      <div className="relative z-0 w-full mb-10 group">
        <input
          type="password"
          name="floating_password"
          id="floating_password"
          value={registerDetails.password}
          onChange={(e) =>
            setRegisterDetails({ ...registerDetails, password: e.target.value })
          }
          className={inputStyle("blue")}
          placeholder=" "
          required
        />
        <label
          htmlFor="floating_password"
          className={labelStyle}
        >
          Password
        </label>
      </div>
      <div className="relative z-0 w-full mb-10 group">
        <input
          type="password"
          name="floating_confirm_password"
          id="floating_confirm_password"
          value={registerDetails.confirmPassword}
          onChange={(e) =>
            setRegisterDetails({ ...registerDetails, confirmPassword: e.target.value })
          }
          className={inputStyle("blue")}
          placeholder=" "
          required
        />
        <label
          htmlFor="floating_confirm_password"
          className={labelStyle}
        >
          Confirm Password
        </label>
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-5"
      >
        Register
      </button>
      <span className="text-center font-light">
        Already have an account?{" "}
        <Link to={"/signin"} className="font-bold hover:underline">
          Login
        </Link>
      </span>
    </form>
  );
};

export default Register;
