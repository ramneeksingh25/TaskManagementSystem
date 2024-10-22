import { useNavigate } from "react-router-dom";

const Logout = () => {
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem("token"); // Clear the token
		navigate("/signin"); // Redirect to login page
	};

	return <button onClick={handleLogout}>Log Out</button>;
};

export default Logout;