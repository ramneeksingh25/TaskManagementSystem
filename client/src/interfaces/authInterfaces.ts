export interface LoginDetails {
	email: string;
	password: string;
}

export interface RegisterDetails {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
	role: string;
}

export interface DecodedToken {
	exp: number; 
	iat: number;  
	id: number;
	role: string;
  }