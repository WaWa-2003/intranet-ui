import React, { useState, useEffect } from "react";
import ToData from "../../data/ToData";
import BASE_URL from "../../../url/url";
import ToList from "./ToList_RetrieveDelete";
import ToCreateEdit from "./ToCreateEdit";

const ToListData: React.FC = () => {
    const [fromList, setToList] = useState<ToData[]>([]);
    const [editingData, setEditingData] = useState<ToData | null>(null);

    useEffect(() => {
        const fetchToList = async () => {
            try {
                const response = await fetch(`${BASE_URL}/shiprush/todata`);
                if (!response.ok) {
                    throw new Error("Failed to fetch ToData");
                }
                const data = await response.json();
                setToList(data);
            } catch (error) {
                console.error("Error fetching ToData: ", error);
                alert("Failed to load ToData.");
            }
        };
        fetchToList();
    }, []);

    useEffect(() => {
        refreshToList(); // Fetch initial data
    }, []);
    

    const handleDelete = (id: number) => {
        setToList((prevList) => prevList.filter((item) => item.id !== id));
    };

    const startEditing = (fromData: ToData) => {
        console.log("Editing data triggered:", fromData); // Debug log
        setEditingData(fromData);
    };

    const refreshToList = async () => {
        try {
            const response = await fetch(`${BASE_URL}/shiprush/todata`);
            if (!response.ok) {
                throw new Error("Failed to fetch ToData");
            }
            const data = await response.json();
            setToList(data);
        } catch (error) {
            console.error("Error fetching ToData: ", error);
            alert("Failed to load ToData.");
        }
    };
    

    return (
        <div className="flex">
            <ToCreateEdit
                editingToData={editingData}
                setEditingToData={setEditingData}
                onDataAdded={refreshToList}
            />
            <div>
                <h2 className="text-center text-2xl font-semibold mb-1 mt-4">
                    To Data List
                </h2>
                <div className="flex flex-wrap gap-2 justify-center">
                    {fromList.length > 0 ? (
                        fromList.map((something) => (
                            <ToList
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

export default ToListData;
