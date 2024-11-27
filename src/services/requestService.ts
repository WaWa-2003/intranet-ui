// services/requestService.js
import axios from 'axios';
import BASE_URL from "../url/url"; 
import RequestData from '../shiprush/data/RequestData';

export const getRequests = async () => {
  const response = await axios.get(`${BASE_URL}/requests`);
  return response.data;
};

export const getRequestById = async (id: number) => {
  const response = await axios.get(`${BASE_URL}/requests/${id}`);
  return response.data;
};

export const createRequest = async (requestData: RequestData) => {
  const response = await axios.post(`${BASE_URL}/requests`, requestData);
  return response.data;
};

export const updateRequest = async (id: number, requestData: RequestData) => {
  const response = await axios.put(`${BASE_URL}/requests/${id}`, requestData);
  return response.data;
};

export const deleteRequest = async (id: number) => {
  const response = await axios.delete(`${BASE_URL}/requests/${id}`);
  return response.data;
};
