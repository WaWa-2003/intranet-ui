import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa"; // Importing icons
import { deleteRequest } from "../../../services/requestService";
import RequestData from "../../data/RequestData";

interface RequestListProps extends RequestData {
    id: number;
    fromCompany: string;
    toCompany: string;
    fromCompanyId: number;
    toCompanyId: number; 
    status: string;
    onDelete: (id: number) => void;
    startEditing: (requestData: RequestData) => void;
}

const RequestList_RetrieveDelete: React.FC<RequestListProps> = (props) => {
    
    const handleDelete = async (id: number) => {
        try {
            const response = await deleteRequest(id);
            if (!response.ok) {
                throw new Error("Failed to delete.");
            }
            alert("Successfully Deleted!");
            props.onDelete(id); 
        } catch (error) {
            console.error("Error deleting request:", error);
            alert("Failed to delete request.");
        }
    };

    return (
        <div className="Request--list border p-4 rounded-lg shadow-md bg-white">
            <p>
                <span className="font-bold">ID: </span> {props.id}
            </p>
            <p>
                <span className="font-bold">From Company: </span> {props.fromCompany} ({props.fromCompanyId})
            </p>
            <p>
                <span className="font-bold">To Company: </span> {props.toCompany}
            </p>
            <p>
                <span className="font-bold">Requestor: </span> {props.createdByEmail}
            </p>

            <p>
                <span className="font-bold">Status: </span> {props.status}
            </p>
            <p>
                <span className="font-bold">Status: </span> {props.status}
            </p> 
            
            <div className="flex gap-2 mt-2 justify-start"> 
                <button
                    onClick={() => props.startEditing(props)}
                    className="flex items-center px-2 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:bg-yellow-300 disabled:cursor-not-allowed"
                >
                    <FaEdit /> 
                    
                </button>
                <button
                    onClick={() => handleDelete(props.id)}
                    className="flex items-center px-2 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-red-300 disabled:cursor-not-allowed"
                >
                    <FaTrash /> 
                    
                </button>
            </div>
        </div>
    );
};

export default RequestList_RetrieveDelete;
