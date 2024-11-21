import React, { useState, useEffect } from "react";
import FromData from "../../data/FromData";
import BASE_URL from "../../../url/url";
import FromList from "./FormList";
import FromCreateEdit from "./FromCreateEdit";

const FromListData: React.FC = () => {
    const [fromList, setFromList] = useState<FromData[]>([]);
    const [editingData, setEditingData] = useState<FromData | null>(null);

    useEffect(() => {
        const fetchFromList = async () => {
            try {
                const response = await fetch(`${BASE_URL}/shiprush/fromdata`);
                if (!response.ok) {
                    throw new Error("Failed to fetch FromData");
                }
                const data = await response.json();
                setFromList(data);
            } catch (error) {
                console.error("Error fetching FromData: ", error);
                alert("Failed to load FromData.");
            }
        };
        fetchFromList();
    }, []);

    useEffect(() => {
        refreshFromList(); // Fetch initial data
    }, []);     

    const handleDelete = (id: number) => {
        setFromList((prevList) => prevList.filter((item) => item.id !== id));
    };

    const startEditing = (fromData: FromData) => {
        console.log("Editing data triggered:", fromData); // Debug log
        setEditingData(fromData);
    };

    const refreshFromList = async () => {
        try {
            const response = await fetch(`${BASE_URL}/shiprush/fromdata`);
            if (!response.ok) {
                throw new Error("Failed to fetch FromData");
            }
            const data = await response.json();
            setFromList(data);
        } catch (error) {
            console.error("Error fetching FromData: ", error);
            alert("Failed to load FromData.");
        }
    };
    

    return (
        <div className="flex">
            <FromCreateEdit
                editingFromData={editingData}
                setEditingFromData={setEditingData}
                onDataAdded={refreshFromList}
            />
            <div>
                <h2 className="text-center text-2xl font-semibold mb-1 mt-4">
                    From Data List
                </h2>
                <div className="flex flex-wrap gap-2 justify-center">
                    {fromList.length > 0 ? (
                        fromList.map((something) => (
                            <FromList
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

export default FromListData;
