export const BASE_URL = "https://task-manager-azure-five.vercel.app";

export const API_PATHS = {
    AUTH: {
        LOGIN: "/api/v1/auth/login",
        REGISTER: "/api/v1/auth/register",
        GET_USER_INFO: "/api/v1/auth/getUser",
    },
    DASHBOARD: {
        GET_DATA: "/api/v1/dashboard",
    },
    TASKS: {
        GET_ALL: "/api/v1/task/getAll",
        ADD: "/api/v1/task/add",
        UPDATE: (id: string) => `/api/v1/task/update/${id}`,
        DELETE: (id: string) => `/api/v1/task/delete/${id}`,
    },
    IMAGE: {
        UPLOAD_IMAGE: "/api/v1/auth/upload-image",
    }
};
