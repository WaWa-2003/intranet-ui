import React, { createContext, useContext, useState, ReactNode } from "react";

export interface UserInfo {
    displayName: string;
    jobTitle: string;
    mail: string;
    id: string;
}

interface UserInfoContextProps {
    userInfo: UserInfo | null;
    setUserInfo: React.Dispatch<React.SetStateAction<UserInfo | null>>;
}

const UserInfoContext = createContext<UserInfoContextProps | undefined>(undefined);

export const UserInfoProvider = ({ children }: { children: ReactNode }) => {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(() => {
        const storedUserInfo = localStorage.getItem("userInfo");
        return storedUserInfo ? JSON.parse(storedUserInfo) : null;
    });

    return (
        <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
            {children}
        </UserInfoContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUserInfo = () => {
    const context = useContext(UserInfoContext);
    if (!context) {
        throw new Error("useUserInfo must be used within a UserInfoProvider");
    }
    return context;
};
