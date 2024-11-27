import React, { useState, useEffect } from "react";
import ToData from "../../data/ToData";
import { getToData } from "../../../services/toService";

const RequestCreateEdit: React.FC = () => {
    const [toDataList, setToDataList] = useState<ToData[]>([]);
    const [selectedToId, setSelectedToId] = useState<number | null>(null);

    useEffect(() => {
        const fetchToList = async () => {
            try {
                const response = await getToData(); //fetch(`${BASE_URL}/shiprush/todata`);
                if (!response.ok) {
                    throw new Error("Failed to fetch ToData");
                }
                const data = await response.json();
                setToDataList(data);
            } catch (error) {
                console.error("Error fetching ToData: ", error);
                alert("Failed to load ToData.");
            }
        };
        fetchToList();
    }, []);

    const handleToSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedToId(parseInt(event.target.value, 10));
    };

    const handleSubmit = () => {
        // Submit the form with selectedToId
        console.log("Selected To ID:", selectedToId);
        // Add your API call to save the request here
    };

    return (
        <div>
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                <label htmlFor="to-select">Select To Company:</label>
                <select id="to-select" onChange={handleToSelect}>
                    <option value="">-- Select a Company --</option>
                    {toDataList.map((to) => (
                        <option key={to.id} value={to.id}>
                            {to.company} - {to.personName}
                        </option>
                    ))}
                </select>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default RequestCreateEdit;
