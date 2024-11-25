import React, { useState } from "react";
import UserData from "../../data/UserData";
import BASE_URL from "../../../url/url";
interface UserCreateEditProps {
    editingUserData: Partial<UserData> | null; 
    setEditingUserData: React.Dispatch<React.SetStateAction<UserData | null >>; 
    onDataAdded: () => void; 
}

const UserCreateEdit: React.FC<UserCreateEditProps> = ({ editingUserData, setEditingUserData, onDataAdded }) => {

    const [newUserData, setNewUserData] = useState<Omit<UserData,"id">> ({
        name: "", 
        position: "",
        department: "",
        email: "", 
    })

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false); 

    const addUserData = async () => {
        if(!newUserData.name || !newUserData.position || !newUserData.department || !newUserData.email) {
            alert("Please fill in all the required fields.");
            return; 
        }
        setIsSubmitting(true); 
        try {
            const response = await fetch(`${BASE_URL}/shiprush/userdata`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newUserData)
            });
            if (!response.ok) {
                throw new Error("Failed to add new User Data.")
            }
            setNewUserData({
                name: "",
                position: "",
                department: "",
                email: "", 
            })
            onDataAdded();
        }
        catch (error) {
            console.error("Error adding new User Data: ", error);
            alert("Failed to add new User Data.")
        }
        finally {
            alert("Successfully added new User Data")
            setIsSubmitting(false);

        }
    }

    const updateUserData = async () => {
        if (!editingUserData || !editingUserData.id) return;

        try {
            const response = await fetch(`${BASE_URL}/shiprush/userdata/${editingUserData.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(editingUserData),
            });

            if (!response.ok) throw new Error("Failed to update User Data.");

            alert("Successfully updated User Data.");
            setEditingUserData(null); // Exit edit mode
        } catch (error) {
            console.error("Error updating User Data:", error);
            alert("Failed to update User Data.");
        }
    };

    const cancelEditing = () => {
        setEditingUserData(null); // Reset editing state
    };

    const fields: { label: string; field: keyof Omit<UserData, "id">; placeholder: string }[] = [
        { label: "Name", field: "name", placeholder: "Name" },
        { label: "Position", field: "position", placeholder: "Position" },
        { label: "Department", field: "department", placeholder: "Department" },
        { label: "Email", field: "email", placeholder: "Email" },
    ];

    return (
        <div className="max-w-[800px] my-5 mx-3 p-5 bg-gray-100 border rounded-lg text-center h-fit">
            <h1 className="text-xl font-bold mb-5">
                {editingUserData ? "Edit User Data" : "Create New User Data"}
            </h1>

            <div className="grid grid-cols-1 gap-4 mb-2 text-left">
                {fields.map(({ label, field, placeholder }) => (
                    <div key={field} className="flex justify-between items-center">
                        <label className="">{label}</label>
                        <input
                            className="w-2/3 p-2 border rounded"
                            type="text"
                            placeholder={placeholder}
                            value={
                                editingUserData
                                    ? editingUserData[field as keyof UserData] || ""
                                    : newUserData[field]
                            }
                            onChange={(e) =>
                                editingUserData
                                    ? setEditingUserData((prev) => ({
                                        ...prev!,
                                        [field]: e.target.value,
                                    }))
                                    : setNewUserData((prev) => ({
                                        ...prev,
                                        [field]: e.target.value,
                                    }))
                            }
                        />
                    </div>
                ))}
            </div>
            {editingUserData && (
                <div>
                    <button onClick={updateUserData}>Update User Data</button>
                    <button
                        onClick={cancelEditing}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Cancel
                    </button> 
                </div>
                
            )}
            {
                !editingUserData && (
                    <button
                        onClick={addUserData}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-green-300 disabled:cursor-not-allowed"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Adding User Data..." : "Submit"}
                    </button>
                )
            }
        </div>
    );
};


export default UserCreateEdit; 