export interface TaskData {
    id?: number; // Optional because it may not be present when creating a new task
    name: string;
    description?: string; // Optional field
    dueDate?: Date; // Optional field
    priority?: string; // Optional field
    status?: 'To Do' | 'In Progress' | 'Completed'; // You can extend the statuses as needed
    isMultiUser?: boolean; // Optional field
    creatorId: number; // The ID of the user who created the task
  }
  
  // Optionally, if you want to include the relationships:
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