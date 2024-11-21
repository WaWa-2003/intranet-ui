import React, { useState } from "react";
import ToData from "../../data/ToData";
import BASE_URL from "../../../url/url";

interface ToCreateEditProps {
    editingToData: Partial<ToData> | null;
    setEditingToData: React.Dispatch<React.SetStateAction<ToData | null>>;
    onDataAdded: () => void;
}

const ToCreateEdit: React.FC<ToCreateEditProps> = ({ editingToData, setEditingToData, onDataAdded }) => {
    const [newToData, setNewToData] = useState<Omit<ToData, "id">>({
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

    const addToData = async () => {
        if (!newToData.company || !newToData.personName) {
            alert("Please fill in all required fields.");
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch(`${BASE_URL}/shiprush/todata`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newToData)
            });

            if (!response.ok) {
                throw new Error("Failed to add new To Data.")
            }

            setNewToData({
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
            console.error("Error adding new To Data: ", error);
            alert("Failed to add new To Data.")
        }
        finally {
            alert("Successfully added new To Data")
            setIsSubmitting(false);

        }
    }

    const updateToData = async () => {
        if (!editingToData || !editingToData.id) return;

        try {
            const response = await fetch(`${BASE_URL}/shiprush/todata/${editingToData.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(editingToData),
            });

            if (!response.ok) throw new Error("Failed to update To Data.");

            alert("Successfully updated To Data.");
            setEditingToData(null); // Exit edit mode
        } catch (error) {
            console.error("Error updating To Data:", error);
            alert("Failed to update To Data.");
        }
    };

    const cancelEditing = () => {
        setEditingToData(null); // Reset editing state
    };

    const fields: { label: string; field: keyof Omit<ToData, "id">; placeholder: string }[] = [
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
                {editingToData ? "Edit To Data" : "Create New To Data"}
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
                                editingToData
                                    ? editingToData[field as keyof ToData] || ""
                                    : newToData[field]
                            }
                            onChange={(e) =>
                                editingToData
                                    ? setEditingToData((prev) => ({
                                        ...prev!,
                                        [field]: e.target.value,
                                    }))
                                    : setNewToData((prev) => ({
                                        ...prev,
                                        [field]: e.target.value,
                                    }))
                            }
                        />
                    </div>
                ))}
            </div>
            {editingToData && (
                <div>
                    <button onClick={updateToData}>Update To Data</button>
                    <button
                        onClick={cancelEditing}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Cancel
                    </button> 
                </div>
                
            )}
            {
                !editingToData && (
                    <button
                        onClick={addToData}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-green-300 disabled:cursor-not-allowed"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Adding To Data..." : "Submit"}
                    </button>
                )
            }
        </div>
    );
};

export default ToCreateEdit;
 