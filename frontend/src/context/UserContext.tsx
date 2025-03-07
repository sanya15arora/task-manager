import { createContext, useState, ReactNode } from "react";

interface User {
    _id: string,
    fullName: string,
    email: string,
    password: string,
    profileImageUrl: string,
}

interface UserContextType {
    user: User | null;
    updateUser: (userData: User) => void;
    clearUser: () => void;
}

const defaultUserContextValue: UserContextType = {
    user: null,
    updateUser: () => { },
    clearUser: () => { },
};

export const UserContext = createContext<UserContextType>(defaultUserContextValue);

interface UserProviderProps {
    children: ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const updateUser = (userData: User) => {
        setUser(userData);
    };

    const clearUser = () => {
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, updateUser, clearUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;