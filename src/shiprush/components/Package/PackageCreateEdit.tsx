import React, { useState } from "react";
import PackageData from "../../data/PackageData";
import BASE_URL from "../../../url/url";

interface ToCreateEditProps {
    editingPackageData: Partial<PackageData> | null;
    setEditingPackageData: React.Dispatch<React.SetStateAction<PackageData | null>>;
    onDataAdded: () => void;
}

const ToCreateEdit: React.FC<ToCreateEditProps> = ({ editingPackageData, setEditingPackageData, onDataAdded }) => {
    const [newPackageData, setNewPackageData] = useState<Omit<PackageData, "id">>({
        packaging: "",
        weight: 0,
        weightUnitType: "",
        declaredValue: 0,
        currency: "",
        height: 0,
        heightUnitType: "",
        width: 0,
        widthUnitType: "",
        length: 0,
        lengthUnitType: "",
    });

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const unitOptions = ["kg", "lb", "cm", "inch"];

    const addPackageData = async () => {
        if (!newPackageData.packaging || !newPackageData.weight) {
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
                body: JSON.stringify(newPackageData)
            });

            if (!response.ok) {
                throw new Error("Failed to add new To Data.")
            }

            setNewPackageData({
                packaging: "",
                weight: 0,
                weightUnitType: "",
                declaredValue: 0,
                currency: "",
                height: 0,
                heightUnitType: "",
                width: 0,
                widthUnitType: "",
                length: 0,
                lengthUnitType: "",
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

    const updatePackageData = async () => {
        if (!editingPackageData || !editingPackageData.id) return;

        try {
            const response = await fetch(`${BASE_URL}/shiprush/todata/${editingPackageData.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(editingPackageData),
            });

            if (!response.ok) throw new Error("Failed to update To Data.");

            alert("Successfully updated To Data.");
            setEditingPackageData(null); // Exit edit mode
        } catch (error) {
            console.error("Error updating To Data:", error);
            alert("Failed to update To Data.");
        }
    };

    const cancelEditing = () => {
        setEditingPackageData(null); // Reset editing state
    };
    // packaging: "",
    // weight: 0,
    // weightUnitType: "",
    // declaredValue: 0,
    // currency: "",
    // height: 0,
    // heightUnitType: "",
    // width: 0,
    // widthUnitType: "",
    // length: 0,
    // lengthUnitType: "",
    const fields: { label: string; field: keyof Omit<PackageData, "id">; placeholder: string; isUnit?: boolean }[] = [
        { label: "Packaging", field: "packaging", placeholder: "Packaging" },
        { label: "Weight", field: "weight", placeholder: "Weight" },
        { label: "Weight Unit", field: "weightUnitType", placeholder: "Weight Unit Type", isUnit: true },
        { label: "Declared Value", field: "declaredValue", placeholder: "Declared Value" },
        { label: "Currency", field: "currency", placeholder: "Currency" },
        { label: "Height", field: "height", placeholder: "Height" },
        { label: "Height Unit", field: "heightUnitType", placeholder: "Height Unit Type", isUnit: true },
        { label: "Width", field: "width", placeholder: "Width" },
        { label: "Width Unit", field: "widthUnitType", placeholder: "Width Unit Type", isUnit: true },
        { label: "Length", field: "length", placeholder: "Length" },
        { label: "Length Unit", field: "lengthUnitType", placeholder: "Length Unit Type", isUnit: true },
    ];

    return (
        <div className="max-w-[800px] my-5 mx-3 p-5 bg-gray-100 border rounded-lg text-center h-fit">
            <h1 className="text-xl font-bold mb-5">
                {editingPackageData ? "Edit To Data" : "Create New To Data"}
            </h1>
    
            <div className="grid grid-cols-1 gap-4 mb-2 text-left">
                {fields.map(({ label, field, placeholder, isUnit }) => (
                    <div key={field} className="flex justify-between items-center">
                        <label>{label}</label>
                        {isUnit ? (
                            <select
                                className="w-2/3 p-2 border rounded"
                                value={
                                    editingPackageData
                                        ? editingPackageData[field as keyof PackageData] || ""
                                        : newPackageData[field]
                                }
                                onChange={(e) =>
                                    editingPackageData
                                        ? setEditingPackageData((prev) => ({
                                            ...prev!,
                                            [field]: e.target.value,
                                        }))
                                        : setNewPackageData((prev) => ({
                                            ...prev,
                                            [field]: e.target.value,
                                        }))
                                }
                            >
                                <option value="" disabled>Select unit</option>
                                {unitOptions.map((unit) => (
                                    <option key={unit} value={unit}>
                                        {unit}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <input
                                className="w-2/3 p-2 border rounded"
                                type="text"
                                placeholder={placeholder}
                                value={
                                    editingPackageData
                                        ? editingPackageData[field as keyof PackageData] || ""
                                        : newPackageData[field]
                                }
                                onChange={(e) =>
                                    editingPackageData
                                        ? setEditingPackageData((prev) => ({
                                            ...prev!,
                                            [field]: e.target.value,
                                        }))
                                        : setNewPackageData((prev) => ({
                                            ...prev,
                                            [field]: e.target.value,
                                        }))
                                }
                            />
                        )}
                    </div>
                ))}
            </div>
            {editingPackageData ? (
                <div>
                    <button
                        onClick={updatePackageData}
                        className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                        Update To Data
                    </button>
                    <button
                        onClick={cancelEditing}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Cancel
                    </button>
                </div>
            ) : (
                <button
                    onClick={addPackageData}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-green-300 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Adding To Data..." : "Submit"}
                </button>
            )}
        </div>
    );
};

export default ToCreateEdit;
 