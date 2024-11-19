import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000', // Backend server URL
});

export const getCards = () => api.get('/cards');
export const getCardById = (id: number) => api.get(`/cards/${id}`);
export const createCard = (cardData: unknown) => api.post('/cards', cardData);
export const updateCard = (id: number, cardData: unknown) => api.put(`/cards/${id}`, cardData);
export const deleteCard = (id: number) => api.delete(`/cards/${id}`);
