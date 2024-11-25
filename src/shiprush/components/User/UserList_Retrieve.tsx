import React from "react";
import UserData from "../../data/UserData";
import BASE_URL from "../../../url/url";

interface ToListProps extends UserData {
    onDelete: (id: number) => void;
    startEditing: (toData: UserData) => void;
}

const ToList_RetrieveDelete: React.FC<ToListProps> = (props) => {
    const deleteUserData = async (id: number) => {
        try {
            const response = await fetch(`${BASE_URL}/shiprush/toData/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete.");
            }
            alert("Successfully Deleted!");
            props.onDelete(id); // Update the parent component's state
        } catch (error) {
            console.error("Error deleting card:", error);
        }
    };

    return (
        <div className="Data--list">
            <p className="Data--list-p">
                <span className="bold">ID - </span> {props.id}
            </p>
            <p className="Data--list-p">
                <span className="bold">Name - </span> {props.name}
            </p>
            <p className="Data--list-p">
                <span className="bold">Position - </span> {props.position}
            </p>
            <p className="Data--list-p">
                <span className="bold">Department - </span> {props.department}
            </p> 
            
            <div className="flex gap-1">
                <button
                    onClick={() => {
                        console.log("Edit button clicked for ID:", props.id); // Debug log
                        props.startEditing(props);
                    }}
                    className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:bg-yellow-300 disabled:cursor-not-allowed"
                >
                    Edit
                </button>
                <button
                    onClick={() => deleteUserData(props.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-red-300 disabled:cursor-not-allowed"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default ToList_RetrieveDelete;
