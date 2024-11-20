import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FromData from "../../data/FromData";
import BASE_URL from "../../../url/url";

const FormEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FromData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/shiprush/fromdata/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch Form Data");
        }
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error("Error fetching Form Data: ", error);
        alert("Failed to load Form Data.");
      }
    };
    fetchFormData();
  }, [id]);

  const updateFormData = async () => {
    if (!formData) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`${BASE_URL}/shiprush/fromdata/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to update Form Data.");
      }
      alert("Form Data updated successfully.");
      navigate("/fromlist");
    } catch (error) {
      console.error("Error updating Form Data: ", error);
      alert("Failed to update Form Data.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!formData) {
    return <p>Loading Form Data...</p>;
  }

  return (
    <div className="max-w-[800px] h-fit my-5 mx-3 p-5 bg-gray-100 border border-gray-300 rounded-lg shadow-md">
      <h1 className="text-xl font-bold mb-5">Edit Form Data</h1>
      <div className="grid grid-cols-2 gap-4 text-left mb-2">
        {Object.keys(formData).map((key) => (
          key !== "id" && (
            <div className="flex flex-col" key={key}>
              <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
              <input
                className="w-full p-2 border rounded"
                type="text"
                placeholder={`Enter ${key}`}
                value={(formData as any)[key]}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, [key]: e.target.value }))
                }
              />
            </div>
          )
        ))}
      </div>
      <button
        onClick={updateFormData}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-green-300 disabled:cursor-not-allowed"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Updating..." : "Update"}
      </button>
    </div>
  );
};

export default FormEdit;
