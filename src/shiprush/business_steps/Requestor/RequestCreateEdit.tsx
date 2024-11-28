import React, { useState, useEffect } from "react";
import ToData from "../../data/ToData";
import { getToData } from "../../../services/toService";
import FromData from "../../data/FromData";
import { getFromData } from "../../../services/fromService";
import { createRequest } from "../../../services/requestService"; // Assuming you have a service for requests
import RequestData from "../../data/RequestData";

const RequestCreateEdit: React.FC = () => {
    const [toDataList, setToDataList] = useState<ToData[]>([]);
    const [selectedToId, setSelectedToId] = useState<number>(0);

    const [fromDataList, setFromDataList] = useState<FromData[]>([]);
    const [selectedFromId, setSelectedFromId] = useState<number>(0);

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    useEffect(() => {
        const fetchToList = async () => {
            try {
                const response = await getToData();
                setToDataList(response);
            } catch (error) {
                console.error("Error fetching ToData: ", error);
                alert("Failed to load ToData.");
            }
        };
        fetchToList();
    }, []);

    useEffect(() => {
        const fetchFromList = async () => {
            try {
                const response = await getFromData();
                setFromDataList(response);
            } catch (error) {
                console.error("Error fetching FromData: ", error);
                alert("Failed to load FromData.");
            }
        };
        fetchFromList();
    }, []);

    const handleToSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedToId(parseInt(event.target.value, 10) || 0);
    };

    const handleFromSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedFromId(parseInt(event.target.value, 10) || 0);
    };

    const handleCreateRequest = async () => {
        if (!selectedToId || !selectedFromId) {
            alert("Please select both a To and From company.");
            return;
        }

        setIsSubmitting(true);

        const requestData: Omit<RequestData, "id"> = {
            fromId: selectedFromId,
            toId: selectedToId,
            createdDateTime: new Date(), 
        };
        try {
            const response = await createRequest(requestData);
            alert("Request successfully created!");
            console.log("Created Request: ", response);
        } catch (error) {
            console.error("Error creating request: ", error);
            alert("Frontend : Failed to create request.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <form onSubmit={(e) => { e.preventDefault(); handleCreateRequest(); }}>
                <div>
                    <label htmlFor="to-select">Select To Company:</label>
                    <select id="to-select" onChange={handleToSelect}>
                        <option value="">-- Select a Company --</option>
                        {toDataList.map((to) => (
                            <option key={to.id} value={to.id}>
                                {to.company} - {to.personName}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="from-select">Select From Company:</label>
                    <select id="from-select" onChange={handleFromSelect}>
                        <option value="">-- Select a Company --</option>
                        {fromDataList.map((from) => (
                            <option key={from.id} value={from.id}>
                                {from.company} - {from.personName}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="bg-green-500 text-white px-3 py-1 rounded">
                    {isSubmitting ? "Creating Request Data..." : "Submit"}
                </button>
            </form>
        </div>
    );
};

export default RequestCreateEdit;
