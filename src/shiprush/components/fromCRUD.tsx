import React, { useState, useEffect } from "react";
import FromData from "../data/FromData";
import BASE_URL from "../../url/url";
import FromList from "./From/FormList";

const FromCRUD: React.FC = () => {
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
            fetchFromList();
        }
    }

    return (
        <div>
            <div className="fromCreate">
                <h1 className="fromCreate--title">Create New From Data</h1>
                <div className="fromCreate--body">
                    <div className="fromCreate--body--field">
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
                    <div className="fromCreate--body--field">
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
                    <div className="fromCreate--body--field">
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
                    <div className="fromCreate--body--field">
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
                    <div className="fromCreate--body--field">
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
                    <div className="fromCreate--body--field">
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
                    <div className="fromCreate--body--field">
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
                    <div className="fromCreate--body--field">
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
                    <div className="fromCreate--body--field">
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
                    <div className="fromCreate--body--field">
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
                    <div className="fromCreate--body--field">
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

                    <button
                        onClick={addFromData}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-green-300 disabled:cursor-not-allowed"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Adding From Data..." : "Submit"}
                    </button>

                </div>
            </div>      
            <h2 className="text-center text-2xl font-semibold mb-1 mt-4">
                    From Data List
            </h2> 
            <div className="fromData--list-container">
                              
                <div className="flex flex-wrap gap-2 justify-center">
                    {fromList.length > 0 ? (
                        fromList.map((something) => (
                            <FromList key={something.id} {...something} />
                        ))
                    ) : (
                        <p>No data available</p>
                    )}
                </div>                 
            </div>
        </div>

    )
}

export default FromCRUD; 
