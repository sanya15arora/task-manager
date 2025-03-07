export interface User {
    _id: string;
    email: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export type Status<T extends string> = T;

export type TaskStatus = Status<"Pending" | "Inprogress" | "Completed">;


export interface Task {
    _id?: string;
    userId?: string;
    title: string;
    description: string;
    status: TaskStatus
    createdAt?: string;
    updatedAt?: string;
}

export interface DashboardData {
    totalTasks: number;
    pendingTasks: number;
    inProgressTasks: number;
    completedTasks: number;
    tasks: Task[];
}

export interface User {
    _id: string;
    email: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}

