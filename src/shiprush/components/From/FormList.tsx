import React from "react";
import FromData from "../../data/FromData";
import BASE_URL from "../../../url/url";

interface FromListProps extends FromData {
    onDelete: (id: number) => void;
    startEditing: (fromData: FromData) => void;
}

const FromList: React.FC<FromListProps> = (props) => {
    const deleteFromData = async (id: number) => {
        try {
            const response = await fetch(`${BASE_URL}/shiprush/fromdata/${id}`, {
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
        <div className="fromData--list">
            <p className="fromData--list-p">
                <span className="bold">ID - </span> {props.id}
            </p>
            <p className="fromData--list-p">
                <span className="bold">Company Name - </span> {props.company}
            </p>
            <p className="fromData--list-p">
                <span className="bold">Person Name - </span> {props.personName}
            </p>
            <p className="fromData--list-p">
                <span className="bold">Phone - </span> {props.phone}
            </p>
            <p className="fromData--list-p">
                <span className="bold">Email Address - </span> {props.emailAddress}
            </p>
            <p className="fromData--list-p">
                <span className="bold">Address - </span> {props.address}
            </p>
            <p className="fromData--list-p">
                <span className="bold">City - </span> {props.city}
            </p>
            <p className="fromData--list-p">
                <span className="bold">ZIP - </span> {props.zip}
            </p>
            <p className="fromData--list-p">
                <span className="bold">Country - </span> {props.country}
            </p>
            <p className="fromData--list-p">
                <span className="bold">Residential - </span> {props.residential}
            </p>
            <p className="fromData--list-p">
                <span className="bold">Tax ID - </span> {props.taxId}
            </p>
            <p className="fromData--list-p">
                <span className="bold">EORI Destination - </span> {props.eoriDestination}
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
                    onClick={() => deleteFromData(props.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-red-300 disabled:cursor-not-allowed"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default FromList;
