/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Card from "../data/card";

const BASE_URL = "http://localhost:5000";

const CardCreate: React.FC = () => {
    const [newCard, setNewCard] = useState<Omit<Card, "id">>({
        title: "",
        image: "",
        description: "",
        status: false,
        weblink: "",
        imageLink: "",
    });
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imageURL, setImageURL] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    // Monitor image upload status
    useEffect(() => {
        if (imageURL && isSubmitting) {
            // Only proceed with card creation after image upload is complete
            submitCard();
        }
    }, [imageURL, isSubmitting]);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            // Reset imageURL when new image is selected
            setImageURL(null);
            setNewCard(prev => ({ ...prev, imageLink: "" }));
        }
    };

    const handleUpload = async (): Promise<boolean> => {
        if (!selectedImage) {
            console.log("No image selected for upload.");
            return false;
        }

        setIsUploading(true);
        const formData = new FormData();
        formData.append("image", selectedImage);

        try {
            const response = await fetch(`${BASE_URL}/upload`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Image upload failed");
            }

            const data = await response.json();
            const imagePath = data.imagePath;
            
            setImageURL(imagePath);
            setNewCard(prev => ({ ...prev, imageLink: imagePath }));
            
            console.log("Image uploaded successfully:", imagePath);
            return true;
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Failed to upload image. Please try again.");
            return false;
        } finally {
            setIsUploading(false);
        }
    };

    const submitCard = async () => {
        try {
            const response = await fetch(`${BASE_URL}/cards`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newCard),
            });

            if (!response.ok) {
                throw new Error("Failed to add card");
            }

            // Reset form
            setNewCard({
                title: "",
                image: "",
                description: "",
                status: false,
                weblink: "",
                imageLink: "",
            });
            setImageURL(null);
            setSelectedImage(null);
            alert("Card added successfully!");
        } catch (error) {
            console.error("Error adding card:", error);
            alert("Failed to add card.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const addCard = async () => {
        // Validate required fields
        if (!newCard.title || !newCard.description) {
            alert("Please fill in all required fields.");
            return;
        }

        setIsSubmitting(true);

        if (selectedImage && !newCard.imageLink) {
            const uploadSuccess = await handleUpload();
            if (!uploadSuccess) {
                setIsSubmitting(false);
                return;
            }
            // submitCard will be called by useEffect after imageURL is updated
        } else {
            // If no image to upload, submit card directly
            await submitCard();
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-6">Card Create</h1>
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Add New Card</h2>
                <div className="space-y-4">
                    <input
                        className="w-full p-2 border rounded"
                        type="text"
                        placeholder="Title"
                        value={newCard.title}
                        onChange={(e) => setNewCard(prev => ({ ...prev, title: e.target.value }))}
                        required
                    />

                    <div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="mb-2"
                        />
                        {isUploading && <p className="text-blue-500">Uploading image...</p>}
                        {imageURL && (
                            <div className="mt-2">
                                <img
                                    src={`${BASE_URL}${imageURL}`}
                                    alt="Uploaded"
                                    className="h-32 object-cover rounded"
                                />
                            </div>
                        )}
                    </div>

                    <input
                        className="w-full p-2 border rounded"
                        type="text"
                        placeholder="Description"
                        value={newCard.description}
                        onChange={(e) => setNewCard(prev => ({ ...prev, description: e.target.value }))}
                        required
                    />

                    <div className="flex items-center">
                        <label className="me-3">Status</label>
                        <input
                            type="checkbox"
                            checked={newCard.status}
                            onChange={(e) => setNewCard(prev => ({ ...prev, status: e.target.checked }))}
                            className="mr-2"
                        />
                        <label>Active</label>
                    </div>

                    <input
                        className="w-full p-2 border rounded"
                        type="text"
                        placeholder="Weblink"
                        value={newCard.weblink}
                        onChange={(e) => setNewCard(prev => ({ ...prev, weblink: e.target.value }))}
                    />

                    <button
                        onClick={addCard}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-green-300 disabled:cursor-not-allowed"
                        disabled={isUploading || isSubmitting}
                    >
                        {isUploading ? "Uploading Image..." : isSubmitting ? "Adding Card..." : "Add Card"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CardCreate;