export interface LoginDetails {
	email: string;
	password: string;
}

export interface User {
  name: string;
  email: string;
}

export interface UserProfile {
  id: number;
  name: string;
  email: string;
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

export interface TaskData {
    id?: number;
    name: string;
    description?: string; 
    dueDate?: Date; 
    priority?: string; 
    status?: 'To Do' | 'In Progress' | 'Completed'; 
    isMultiUser?: boolean; 
  }
  

  export interface TaskDataWithRelationships extends TaskData {
    creator?: {
      id: number;
      name: string;
      email: string;
    };
    assignees?: Array<{
      id: number;
      name: string;
      email: string;
    }>;
  }

  export interface Task {
    id: number;
    name: string;
    description: string;
    dueDate: string;
    priority: string;
    status: string;
    isMultiUser: boolean;
    creator: User;
    creatorId: number;
    assignees: User[];
    createdAt: string;
    updatedAt: string;
  }
  