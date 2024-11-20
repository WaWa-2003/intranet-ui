import React, { useState, useEffect } from "react";
import FromData from "../../data/FromData";
import BASE_URL from "../../../url/url";
import FromList from "./FormList";

const FromListData: React.FC = () => {

    const [fromList, setFromList] = useState<FromData[]>([]);

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


    return (
        <div className="flex flex-wrap gap-2 justify-center">
            {fromList.length > 0 ? (
                fromList.map((something) => (
                    <FromList key={something.id} {...something} />
                ))
            ) : (
                <p>No data available</p>
            )}
        </div>

    )
}

export default FromListData; 
