import React, { useState, useEffect } from "react";
import UserData from "../../data/UserData";
import BASE_URL from "../../../url/url";
import UserList_RetrieveDelete from "./UserList_RetrieveDelete";
import UserCreateEdit from "./UserCreateEdit";

const UserCRUD: React.FC = () => {
    const [fromList, setUserList_RetrieveDelete] = useState<UserData[]>([]);
    const [editingData, setEditingData] = useState<UserData | null>(null);

    useEffect(() => {
        const fetchUserList_RetrieveDelete = async () => {
            try {
                const response = await fetch(`${BASE_URL}/shiprush/userdata`);
                if (!response.ok) {
                    throw new Error("Failed to fetch UserData");
                }
                const data = await response.json();
                setUserList_RetrieveDelete(data);
            } catch (error) {
                console.error("Error fetching UserData: ", error);
                alert("Failed to load UserData.");
            }
        };
        fetchUserList_RetrieveDelete();
    }, []);

    useEffect(() => {
        refreshUserList_RetrieveDelete(); // Fetch initial data
    }, []);
    

    const handleDelete = (id: number) => {
        setUserList_RetrieveDelete((prevList) => prevList.filter((item) => item.id !== id));
    };

    const startEditing = (fromData: UserData) => {
        console.log("Editing data triggered:", fromData); // Debug log
        setEditingData(fromData);
    };

    const refreshUserList_RetrieveDelete = async () => {
        try {
            const response = await fetch(`${BASE_URL}/shiprush/userdata`);
            if (!response.ok) {
                throw new Error("Failed to fetch UserData");
            }
            const data = await response.json();
            setUserList_RetrieveDelete(data);
        } catch (error) {
            console.error("Error fetching UserData: ", error);
            alert("Failed to load UserData.");
        }
    };
    

    return (
        <div className="flex">
            <UserCreateEdit
                editingUserData={editingData}
                setEditingUserData={setEditingData}
                onDataAdded={refreshUserList_RetrieveDelete}
            />
            <div>
                <h2 className="text-center text-2xl font-semibold mb-1 mt-4">
                    User Data List
                </h2>
                <div className="flex flex-wrap gap-2 justify-center">
                    {fromList.length > 0 ? (
                        fromList.map((something) => (
                            <UserList_RetrieveDelete
                                key={something.id}
                                {...something}
                                onDelete={handleDelete}
                                startEditing={startEditing} // Pass this prop
                            />
                        ))
                    ) : (
                        <p>No data available</p>
                    )}
                </div> 
            </div> 
        </div>
    );
};

export default UserCRUD;
