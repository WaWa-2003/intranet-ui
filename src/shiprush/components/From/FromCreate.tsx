import React, { useState } from "react";
import FromData from "../../data/FromData";
import BASE_URL from "../../../url/url";

const FromCreate: React.FC = () => {
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
    const [isUpdating, setIsUpdating] = useState<boolean>(false);

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

    return (
        <div className="max-w-[800px] h-fit my-5 mx-3 p-5 bg-gray-100 border border-gray-300 rounded-lg shadow-md text-center sticky top-5">
            <h1 className="text-xl font-bold mb-5">Create New From Data</h1>
            <div className="grid grid-cols-2 gap-4 text-left mb-2">  {/*  sm:grid-cols-1 */}
                <div className="flex flex-col">
                    <label htmlFor="">
                        Company
                    </label>
                    <input
                        className="w-full p-2 border rounded"
                        type="text"
                        placeholder="Company Name"
                        value={newFromData.company}
                        onChange={(e) => setNewFromData(prev => ({ ...prev, company: e.target.value }))}
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="">
                        Person
                    </label>
                    <input
                        className="w-full p-2 border rounded"
                        type="text"
                        placeholder="Person Name"
                        value={newFromData.personName}
                        onChange={(e) => setNewFromData(prev => ({ ...prev, personName: e.target.value }))}
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="">
                        Phone
                    </label>
                    <input
                        className="w-full p-2 border rounded"
                        type="text"
                        placeholder="Phone"
                        value={newFromData.phone}
                        onChange={(e) => setNewFromData(prev => ({ ...prev, phone: e.target.value }))}
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="">
                        Email Address
                    </label>
                    <input
                        className="w-full p-2 border rounded"
                        type="text"
                        placeholder="Email Address"
                        value={newFromData.emailAddress}
                        onChange={(e) => setNewFromData(prev => ({ ...prev, emailAddress: e.target.value }))}
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="">
                        Address
                    </label>
                    <input
                        className="w-full p-2 border rounded"
                        type="text"
                        placeholder="Address"
                        value={newFromData.address}
                        onChange={(e) => setNewFromData(prev => ({ ...prev, address: e.target.value }))}
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="">
                        City
                    </label>
                    <input
                        className="w-full p-2 border rounded"
                        type="text"
                        placeholder="City"
                        value={newFromData.city}
                        onChange={(e) => setNewFromData(prev => ({ ...prev, city: e.target.value }))}
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="">
                        Zip
                    </label>
                    <input
                        className="w-full p-2 border rounded"
                        type="text"
                        placeholder="Zip"
                        value={newFromData.zip}
                        onChange={(e) => setNewFromData(prev => ({ ...prev, zip: e.target.value }))}
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="">
                        Country
                    </label>
                    <input
                        className="w-full p-2 border rounded"
                        type="text"
                        placeholder="Country"
                        value={newFromData.country}
                        onChange={(e) => setNewFromData(prev => ({ ...prev, country: e.target.value }))}
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="">
                        Residential
                    </label>
                    <input
                        className="w-full p-2 border rounded"
                        type="text"
                        placeholder="Residential"
                        value={newFromData.residential}
                        onChange={(e) => setNewFromData(prev => ({ ...prev, residential: e.target.value }))}
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="">
                        Tax ID
                    </label>
                    <input
                        className="w-full p-2 border rounded"
                        type="text"
                        placeholder="Tax ID"
                        value={newFromData.taxId}
                        onChange={(e) => setNewFromData(prev => ({ ...prev, taxId: e.target.value }))}
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="">
                        EORI Destination
                    </label>
                    <input
                        className="w-full p-2 border rounded"
                        type="text"
                        placeholder="EORI Destination"
                        value={newFromData.eoriDestination}
                        onChange={(e) => setNewFromData(prev => ({ ...prev, eoriDestination: e.target.value }))}
                        required
                    />
                </div>
            </div>
            <button
                onClick={addFromData}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-green-300 disabled:cursor-not-allowed"
                disabled={isSubmitting}
            >
                {isSubmitting ? "Adding From Data..." : "Submit"}
            </button>
        </div>
    )
}

export default FromCreate; 
