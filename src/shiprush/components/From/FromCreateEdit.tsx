import React, { useState } from "react";
import FromData from "../../data/FromData";
import BASE_URL from "../../../url/url";

interface FromCreateEditProps {
    editingFromData: Partial<FromData> | null;
    setEditingFromData: React.Dispatch<React.SetStateAction<FromData | null>>;
    onDataAdded: () => void;
}

const FromCreateEdit: React.FC<FromCreateEditProps> = ({ editingFromData, setEditingFromData, onDataAdded }) => {
    const [newFromData, setNewFromData] = useState<Omit<FromData, "id">>({
        company: "",
        personName: "",
        phone: "",
        emailAddress: "",
        address: "",
        city: "",
        zip: "",
        country: "",
        residential: "",
        taxId: "",
        eoriDestination: "",
    });

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const addFromData = async () => {
        if (!newFromData.company || !newFromData.personName) {
            alert("Please fill in all required fields.");
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch(`${BASE_URL}/shiprush/fromdata`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newFromData)
            });

            if (!response.ok) {
                throw new Error("Failed to add new From Data.")
            }

            setNewFromData({
                company: "",
                personName: "",
                phone: "",
                emailAddress: "",
                address: "",
                city: "",
                zip: "",
                country: "",
                residential: "",
                taxId: "",
                eoriDestination: "",
            })
            onDataAdded();
        }
        catch (error) {
            console.error("Error adding new From Data: ", error);
            alert("Failed to add new From Data.")
        }
        finally {
            alert("Successfully added new From Data")
            setIsSubmitting(false);

        }
    }

    const updateFromData = async () => {
        if (!editingFromData || !editingFromData.id) return;

        try {
            const response = await fetch(`${BASE_URL}/shiprush/fromdata/${editingFromData.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(editingFromData),
            });

            if (!response.ok) throw new Error("Failed to update From Data.");

            alert("Successfully updated From Data.");
            setEditingFromData(null); // Exit edit mode
        } catch (error) {
            console.error("Error updating From Data:", error);
            alert("Failed to update From Data.");
        }
    };

    const cancelEditing = () => {
        setEditingFromData(null); // Reset editing state
    };

    const fields: { label: string; field: keyof Omit<FromData, "id">; placeholder: string }[] = [
        { label: "Company", field: "company", placeholder: "Company Name" },
        { label: "Person", field: "personName", placeholder: "Person Name" },
        { label: "Phone", field: "phone", placeholder: "Phone" },
        { label: "Email Address", field: "emailAddress", placeholder: "Email Address" },
        { label: "Address", field: "address", placeholder: "Address" },
        { label: "City", field: "city", placeholder: "City" },
        { label: "Zip", field: "zip", placeholder: "Zip" },
        { label: "Country", field: "country", placeholder: "Country" },
        { label: "Residential", field: "residential", placeholder: "Residential" },
        { label: "Tax ID", field: "taxId", placeholder: "Tax ID" },
        { label: "EORI Destination", field: "eoriDestination", placeholder: "EORI Destination" },
    ];

    return (
        <div className="max-w-[800px] my-5 mx-3 p-5 bg-gray-100 border rounded-lg text-center h-fit">
            <h1 className="text-xl font-bold mb-5">
                {editingFromData ? "Edit From Data" : "Create New From Data"}
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
                                editingFromData
                                    ? editingFromData[field as keyof FromData] || ""
                                    : newFromData[field]
                            }
                            onChange={(e) =>
                                editingFromData
                                    ? setEditingFromData((prev) => ({
                                        ...prev!,
                                        [field]: e.target.value,
                                    }))
                                    : setNewFromData((prev) => ({
                                        ...prev,
                                        [field]: e.target.value,
                                    }))
                            }
                        />
                    </div>
                ))}
            </div>
            {editingFromData && (
                <div>
                    <button onClick={updateFromData}>Update From Data</button>
                    <button
                        onClick={cancelEditing}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Cancel
                    </button> 
                </div>
                
            )}
            {
                !editingFromData && (
                    <button
                        onClick={addFromData}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-green-300 disabled:cursor-not-allowed"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Adding From Data..." : "Submit"}
                    </button>
                )
            }
        </div>
    );
};

export default FromCreateEdit;
 