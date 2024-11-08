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

const CardAllShow: React.FC = () => {
    const [cards, setCards] = useState<Card[]>([]);


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
                                // onClick={() => startEditing(card)}
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

export default CardAllShow;
