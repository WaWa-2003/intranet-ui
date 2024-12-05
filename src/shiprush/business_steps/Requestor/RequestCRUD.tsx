import React, { useState, useEffect } from "react";
import RequestData from "../../data/RequestData";
import RequestList from "./RequestList_RetrieveDelete";
import RequestCreateEdit from "./RequestCreateEdit";
import { getRequests, deleteRequest } from "../../../services/requestService";
import axios from "axios";

const RequestCRUD: React.FC = () => {
    const [requestList, setRequestList] = useState<RequestData[]>([]);
    const [editingRequestData, setEditingRequestData] = useState<RequestData | null>(null);

    useEffect(() => {
        const fetchRequestList = async () => {
            try {
              const data = await getRequests();
              setRequestList(data);
            } catch (error) {
              console.error("Detailed error:", error);
              
              // More detailed error logging
              if (axios.isAxiosError(error)) {
                console.error("Response data:", error.response?.data);
                console.error("Status:", error.response?.status);
                console.error("Headers:", error.response?.headers);
              }
              
              alert(`Failed to load shipment requests: ${error}`);
            }
          };

        fetchRequestList(); // Initial data fetch
    }, []);

    

    const refreshRequestList = async () => {
        try {
            const data = await getRequests(); // Fetch updated data
            setRequestList(data); // Update state
        } catch (error) {
            console.error("Error refreshing shipment requests: ", error);
            alert("Failed to refresh shipment requests.");
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteRequest(id); // Delete request using the service
            setRequestList((prevList) => prevList.filter((item) => item.id !== id)); // Update state to remove deleted item
            alert("Successfully deleted the shipment request.");
        } catch (error) {
            console.error("Error deleting shipment request: ", error);
            alert("Failed to delete shipment request.");
        }
    };

    const startEditing = (requestData: RequestData) => {
        console.log("Editing data triggered:", requestData); // Debug log
        setEditingRequestData(requestData); // Set data for editing
    };

    return (
        <div className="flex">
            <RequestCreateEdit
                editingRequestData={editingRequestData}
                setEditingRequestData={setEditingRequestData}
                onDataAdded={refreshRequestList}
            />
            <div>
                <h2 className="text-center text-2xl font-semibold mb-1 mt-4">
                    Shipment Request List
                </h2>
                <div className="flex flex-wrap gap-2 justify-center"> 
                    {requestList.map((item) => ( 
                        <RequestList 
                            fromCompanyId={0} 
                            toCompanyId={0} 
                            key={item.id}
                            fromCompany={item.fromData?.company || ''}
                            toCompany={item.toData?.company || ''}
                            status={item.status || 'N/A'} // Provide a default value
                            {...item}
                            onDelete={handleDelete}
                            startEditing={startEditing}                        />
                    ))} 
                </div> 
            </div>
        </div>
    );
};

export default RequestCRUD;
