// AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "../interfaces/authInterfaces";

interface AuthContextType {
	user: DecodedToken; // Replace `any` with a specific user type if you have one
	setUser: (user: DecodedToken) => void; // Update this to the specific type
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<DecodedToken>({
		exp: 0,
		iat: 0,
		id: 0,
		role: "user",
	});

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			const decodedToken = jwtDecode<DecodedToken>(token); // Use your custom interface here
			setUser(decodedToken);
		}
	}, []);

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
