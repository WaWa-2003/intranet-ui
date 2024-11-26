import React, { useState, useEffect } from "react";
import PackageData from "../../data/PackageData";
import BASE_URL from "../../../url/url";
import PackageList from "./PackageList_RetrieveDelete";
import PackageCreateEdit from "./PackageCreateEdit";

const PackageListData: React.FC = () => {
    const [packageList, setPackageList] = useState<PackageData[]>([]);
    const [editingData, setEditingData] = useState<PackageData | null>(null);

    const fetchPackageList = async () => {
        try {
            const response = await fetch(`${BASE_URL}/shiprush/package_data`);
            if (!response.ok) {
                throw new Error("Failed to fetch PackageData");
            }
            const data = await response.json();
            setPackageList(data);
        } catch (error) {
            console.error("Error fetching PackageData: ", error);
            alert("Failed to load PackageData.");
        }
    };

    // Combine initial load and refresh logic into one function.
    useEffect(() => {
        fetchPackageList();
    }, []);

    const handleDelete = (id: number) => {
        setPackageList((prevList) => prevList.filter((item) => item.id !== id));
    };

    const startEditing = (fromData: PackageData) => {
        console.log("Editing data triggered:", fromData); // Debug log
        setEditingData(fromData);
    };

    return (
        <div className="flex">
            <PackageCreateEdit
                editingPackageData={editingData}
                setEditingPackageData={setEditingData}
                onDataAdded={fetchPackageList} // Use the same function for refresh
            />
            <div>
                <h2 className="text-center text-2xl font-semibold mb-1 mt-4">
                    Package Data List
                </h2>
                <div className="flex flex-wrap gap-2 justify-center">
                    {packageList.length > 0 ? (
                        packageList.map((something) => (
                            <PackageList
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

export default PackageListData;
