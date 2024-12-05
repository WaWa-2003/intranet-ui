import React, { useState, useEffect } from "react";
import ToData from "../../data/ToData";
import FromData from "../../data/FromData";
import RequestData from "../../data/RequestData";
import { createRequest, updateRequest } from "../../../services/requestService";
import { getToData } from "../../../services/toService";
import { getFromData } from "../../../services/fromService";
import { useUserInfo } from "../../../auth/UserInfoContext";

interface RequestCreateEditProps {
    editingRequestData: Partial<RequestData> | null;
    setEditingRequestData: React.Dispatch<React.SetStateAction<RequestData | null>>;
    onDataAdded: () => void; // Callback to refresh parent data // onDataAdded={getRequests}
}

const RequestCreateEdit: React.FC<RequestCreateEditProps> = ({
    editingRequestData,
    setEditingRequestData,
    onDataAdded,
}) => {
    const [toDataList, setToDataList] = useState<ToData[]>([]);
    const [fromDataList, setFromDataList] = useState<FromData[]>([]);

    const [newRequestData, setNewRequestData] = useState<Omit<RequestData, "id">>({
        fromId: 0,
        toId: 0,
        createdDateTime: new Date(),
        createdByEmail: "",
        status: "Pending",
        remarkByRequestor: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const { userInfo } = useUserInfo();

    // Fetch To and From company data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [toData, fromData] = await Promise.all([getToData(), getFromData()]);
                setToDataList(toData);
                setFromDataList(fromData);
            } catch (error) {
                console.error("Error fetching company data:", error);
                alert("Failed to load company data.");
            }
        };
        fetchData();
    }, []);

    // Populate form with editing data
    useEffect(() => {
        if (editingRequestData) {
            setNewRequestData({
                fromId: editingRequestData.fromId || 0,
                toId: editingRequestData.toId || 0,
                createdDateTime: editingRequestData.createdDateTime || new Date(),
                createdByEmail: editingRequestData.createdByEmail || "",
                status: editingRequestData.status || "Pending",
                remarkByRequestor: editingRequestData.remarkByRequestor || "",
            });
        } else {
            resetForm();
        }
    }, [editingRequestData]);

    const resetForm = () => {
        setNewRequestData({
            fromId: 0,
            toId: 0,
            createdDateTime: new Date(),
            createdByEmail: userInfo?.mail || "",
            status: "Pending",
            remarkByRequestor: "",
        });
    };

    const handleInputChange = (
        field: keyof Omit<RequestData, "id">,
        value: string | number
    ) => {
        setNewRequestData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        if (!newRequestData.fromId || !newRequestData.toId) {
            alert("Please select both 'From' and 'To' companies.");
            return;
        }

        setIsSubmitting(true);

        try {
            if (editingRequestData) {
                await updateRequest(editingRequestData.id!, newRequestData as RequestData);
                alert("Request updated successfully!");
                setEditingRequestData(null);
            } else {
                await createRequest(newRequestData);
                alert("Request created successfully!");
                resetForm();
            }
            onDataAdded(); // Notify parent to refresh data
        } catch (error) {
            console.error("Error submitting request:", error);
            alert("Failed to submit request.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        setEditingRequestData(null);
        resetForm();
    };

    const fields = [
        {
            label: "From Company",
            field: "fromId",
            options: fromDataList,
            optionLabel: (data: FromData) => `${data.company} - ${data.personName}`,
        },
        {
            label: "To Company",
            field: "toId",
            options: toDataList,
            optionLabel: (data: ToData) => `${data.company} - ${data.personName}`,
        },
        { label: "Requestor Remark", field: "remarkByRequestor", type: "text" },
    ];

    return (
        <div className="max-w-[800px] my-5 mx-3 p-5 bg-gray-100 border rounded-lg text-center">
            <h1 className="text-xl font-bold mb-5">
                {editingRequestData ? "Edit Shipment Request" : "Create New Shipment Request"}
            </h1>

            <div className="grid grid-cols-1 gap-4 mb-2">
                {fields.map(({ label, field, options, optionLabel, type }) => (
                    <div key={field} className="flex flex-col">
                        <label className="mb-1">{label}</label>
                        {options ? (
                            <select
                                className="p-2 border rounded"
                                value={newRequestData[field as keyof typeof newRequestData] as number}
                                onChange={(e) =>
                                    handleInputChange(field as keyof typeof newRequestData, Number(e.target.value))
                                }
                            >
                                <option value={0}>-- Select --</option>
                                {options.map((option) => (
                                    <option key={option.id} value={option.id}>
                                        {optionLabel(option)}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <input
                                type={type || "text"}
                                className="p-2 border rounded"
                                value={newRequestData[field as keyof typeof newRequestData] as string}
                                onChange={(e) =>
                                    handleInputChange(field as keyof typeof newRequestData, e.target.value)
                                }
                            />
                        )}
                    </div>
                ))}
            </div>

            <div className="flex justify-center gap-4">
                <button
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-green-300"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Submitting..." : editingRequestData ? "Update Request" : "Submit"}
                </button>
                {editingRequestData && (
                    <button
                        onClick={handleCancel}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </div>
    );
};

export default RequestCreateEdit;
