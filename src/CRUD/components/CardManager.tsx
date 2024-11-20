import React, { useState, useEffect } from 'react';

const BASE_URL = 'http://localhost:5000';

interface Card {
    id: number;
    title: string;
    image: string;
    description: string;
    status: boolean;
    weblink: string;
    imageLink:string;
}

const CardManager: React.FC = () => {
    const [cards, setCards] = useState<Card[]>([]);
    const [newCard, setNewCard] = useState<Omit<Card, 'id'>>({
        title: '',
        image: '',
        description: '',
        status: false,
        weblink: '' ,
        imageLink: ''
    }); 
    const [editingCard, setEditingCard] = useState<Card | null>(null);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imageURL, setImageURL] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState<boolean>(false);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            alert("One file selected.")
            setSelectedImage(file);
           
        } else {
            alert("No file selected.");
            console.log("No file selected.");
        }
    };

    const handleUpload = async () => {
        alert("handle upload starts here");
        if (!selectedImage) {
            console.log("No image selected for upload.");
            return;
        }

        if (!newCard.imageLink) {
            alert("imageLink is empty");             
        }
        else {
            alert("imageLink is not empty");
        } 

        setIsUploading(true);

        const formData = new FormData();
        alert("formData.append(image, selectedImage);");   
        formData.append("image", selectedImage);

        try {
            const response = await fetch(`${BASE_URL}/upload`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                alert("Image upload failed.");   
                console.log("Image upload failed.");
                throw new Error("Image upload failed");
            }

            const data = await response.json();
            setImageURL(data.imagePath);
            if (editingCard) {
                setEditingCard({ ...editingCard, image: data.imagePath, imageLink: data.imagePath });
                alert("handle upload. editingCard.imageLink - " + editingCard.imageLink + "  data.imagePath - " +  data.imagePath); 
            } else {
                setNewCard((prevCard) => ({ ...prevCard, imageLink: data.imagePath }));
            }
            
            console.log("Image uploaded successfully:", data.imagePath);
            alert('image upload successfully.')                        

        } catch (error) {
            console.error("Error uploading image:", error);
        } finally {
            setIsUploading(false);
        }
    };

    const fetchCards = async () => {
        try {
            const response = await fetch(`${BASE_URL}/cards`);
            if (!response.ok) {
                throw new Error('Failed to fetch cards');
            }
            const data = await response.json();
            setCards(data);
        } catch (error) {
            console.error("Error fetching cards:", error);
        }
    };

    const addCard = async () => {

        if (selectedImage && !newCard.imageLink) {
            await handleUpload();
        }

        if (!newCard.imageLink) {
            alert("Please upload an image before adding the card.");
            return;
        }

        try {
            alert(" add try starts here");
            const response = await fetch(`${BASE_URL}/cards`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newCard),
            }); 

            alert(" fetch ok ");
            alert('response - ' + response.json.name);

            if (!response.ok) {
                alert("Failed to add card Up");
                throw new Error("Failed to add card Up");
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
            fetchCards(); 

        } catch (error) {
            console.error("Error adding card:", error);
            alert("Failed to add card down.");
        }
    }; 

    const startEditing = (card: Card) => {
        setEditingCard(card);
        setImageURL(card.image);
    };

    const cancelEditing = () => {
        setEditingCard(null);
        setImageURL(null);
        setSelectedImage(null);
    };

    const updateCard = async () => { 

        if (selectedImage) {
            await handleUpload();
        }
        
        if (!editingCard) return;

        if (!editingCard.imageLink) {
            alert("Please upload an image before updating the card.");
            return;
        }
        else{
            alert ("editingCard.imageLink" + editingCard.imageLink + " imageURL - " + imageURL)
        }

        try {
            alert("update try start here and editingCard.imageLink" + editingCard.imageLink);
            const updatedCard = {
                title: editingCard.title,
                image: imageURL || editingCard.image,
                description: editingCard.description,
                status: editingCard.status,
                weblink: editingCard.weblink,
                imageLink: editingCard.imageLink 
            };
            alert("update fetch start here");
            alert(editingCard.imageLink); 

            const response = await fetch(`${BASE_URL}/cards/${editingCard.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedCard),
            });

            if (!response.ok) {
                throw new Error('Failed to update card');
            }
            // Reset form
            setEditingCard({
                id:0, 
                title: "",
                image: "",
                description: "",
                status: false,
                weblink: "",
                imageLink: "",
            });

            setImageURL(null);
            setSelectedImage(null);
            alert("Card updated successfully!"); 
            fetchCards(); 

        } catch (error) {
            console.error("Error updating card:", error);
        }
    };

    const deleteCard = async (id: number) => {
        try {
            const response = await fetch(`${BASE_URL}/cards/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete card');
            }

            fetchCards();
        } catch (error) {
            console.error("Error deleting card:", error);
        }
    };

    useEffect(() => {
        fetchCards();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-6">Manage System Data Cards</h1>

            {!editingCard ? (
                <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Add New Card</h2>
                <div className="space-y-4">
                    <input
                        className="w-full p-2 border rounded"
                        type="text"
                        placeholder="Title"
                        value={newCard.title}
                        onChange={(e) => setNewCard({ ...newCard, title: e.target.value })}
                    />

                    <div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="mb-2"
                        />
                        {isUploading && <p>Uploading image...</p>}
                        {imageURL && (
                            <img
                                src={`${BASE_URL}${imageURL}`}
                                alt="Uploaded"
                                className="mt-2 h-32"
                            />
                        )}
                    </div>

                    <input
                        className="w-full p-2 border rounded"
                        type="text"
                        placeholder="Description"
                        value={newCard.description}
                        onChange={(e) =>
                            setNewCard({ ...newCard, description: e.target.value })
                        }
                    />

                    <div>
                        <label className="me-3">Status</label>
                        <input
                            type="checkbox"
                            checked={newCard.status}
                            onChange={(e) =>
                                setNewCard({ ...newCard, status: e.target.checked })
                            }
                            className="mr-2"
                        />
                        <label>Active</label>
                    </div>

                    <input
                        className="w-full p-2 border rounded"
                        type="text"
                        placeholder="Weblink"
                        value={newCard.weblink}
                        onChange={(e) =>
                            setNewCard({ ...newCard, weblink: e.target.value })
                        }
                    />

                    <button
                        onClick={addCard}
                        className="px-4 py-2 bg-green-500 text-white rounded"
                        disabled={isUploading}
                    >
                        {isUploading ? "Uploading..." : "Add Card"}
                    </button>
                </div>
            </div>
            ) : (
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Edit Card</h2>
                    <div className="space-y-4">
                        <input
                            className="w-full p-2 border rounded"
                            type="text"
                            placeholder="Title"
                            value={editingCard.title}
                            onChange={(e) => setEditingCard({ ...editingCard, title: e.target.value })}
                        />
                        <img
                            src={editingCard.imageLink}
                            alt={editingCard.title}
                            className="w-24 h-24 object-cover rounded"
                        />
                        <div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="mb-2"
                            />                            
                        </div>
                        <input
                            className="w-full p-2 border rounded"
                            type="text"
                            placeholder="Description"
                            value={editingCard.description}
                            onChange={(e) => setEditingCard({ ...editingCard, description: e.target.value })}
                        />
                        <div>
                            <input
                                type="checkbox"
                                checked={editingCard.status}
                                onChange={(e) => setEditingCard({ ...editingCard, status: e.target.checked })}
                                className="mr-2"
                            />
                            <label>Status</label>
                        </div>
                        <input
                            className="w-full p-2 border rounded"
                            type="text"
                            placeholder="Weblink"
                            value={editingCard.weblink}
                            onChange={(e) => setEditingCard({ ...editingCard, weblink: e.target.value })}
                        />
                        <div className="space-x-4">
                            <button
                                onClick={updateCard}
                                className="px-4 py-2 bg-green-500 text-white rounded"
                            >
                                Save Changes
                            </button>
                            <button
                                onClick={cancelEditing}
                                className="px-4 py-2 bg-gray-500 text-white rounded"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <h2 className="text-xl font-semibold mb-4">Existing Cards</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cards.map((card) => (
                    <div key={card.id} className="p-4 border rounded shadow">
                        <h3 className="font-semibold text-lg">{card.title}</h3>
                        <img
                            src={card.imageLink}
                            alt={card.title}
                            className="w-24 h-24 object-cover rounded mt-2 mb-4"
                        />
                        <p>{card.description}</p>
                        <a
                            href={card.weblink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500"
                        >
                            View More
                        </a>
                        <div className="flex space-x-4 mt-4">
                            <button
                                onClick={() => startEditing(card)}
                                className="px-4 py-2 bg-yellow-500 text-white rounded"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => deleteCard(card.id)}
                                className="px-4 py-2 bg-red-500 text-white rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CardManager;
