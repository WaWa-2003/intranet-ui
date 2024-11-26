import React from "react";
import PackageData from "../../data/PackageData";
import BASE_URL from "../../../url/url";

interface PackageListProps extends PackageData {
    onDelete: (id: number) => void;
    startEditing: (packageData: PackageData) => void;
}

const PackageList_RetrieveDelete: React.FC<PackageListProps> = (props) => {
    const deletePackageData = async (id: number) => {
        try {
            const response = await fetch(`${BASE_URL}/shiprush/package_data/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete.");
            }
            alert("Successfully Deleted!");
            props.onDelete(id); // Update the parent component's state
        } catch (error) {
            console.error("Error deleting card:", error);
        }
    };

    return (
        <div className="Data--list">
            <p className="Data--list-p">
                <span className="bold">ID - </span> {props.id}
            </p>
            <p className="Data--list-p">
                <span className="bold">Packaging </span> {props.packaging}
            </p>
            <p className="Data--list-p">
                <span className="bold">Weight - </span> {props.weight}
            </p>
            <p className="Data--list-p">
                <span className="bold">Weight Unit Type - </span> {props.weightUnitType}
            </p>
            <p className="Data--list-p">
                <span className="bold">Declared Value - </span> {props.declaredValue}
            </p>
            <p className="Data--list-p">
                <span className="bold">Currency - </span> {props.currency}
            </p>
            <p className="Data--list-p">
                <span className="bold">Height - </span> {props.height}
            </p>
            <p className="Data--list-p">
                <span className="bold">Height Unit Type - </span> {props.heightUnitType}
            </p>
            <p className="Data--list-p">
                <span className="bold">Width - </span> {props.width}
            </p>
            <p className="Data--list-p">
                <span className="bold">Width Unit Type - </span> {props.weightUnitType}
            </p>
            <p className="Data--list-p">
                <span className="bold">Length - </span> {props.length}
            </p>
            <p className="Data--list-p">
                <span className="bold">Length Unit Type - </span> {props.lengthUnitType}
            </p>
            <div className="flex gap-1">
                <button
                    onClick={() => {
                        console.log("Edit button clicked for ID:", props.id); // Debug log
                        props.startEditing(props);
                    }}
                    className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:bg-yellow-300 disabled:cursor-not-allowed"
                >
                    Edit
                </button>
                <button
                    onClick={() => deletePackageData(props.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-red-300 disabled:cursor-not-allowed"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default PackageList_RetrieveDelete;
