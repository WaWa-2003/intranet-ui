// services/requestService.js
import axios from 'axios';
import BASE_URL from "../url/url"; 
import RequestData from '../shiprush/data/RequestData';

const URL = `${BASE_URL}/shiprush`; 

export const getRequests = async () => {
  const response = await axios.get(`${URL}/requests`);
  return response.data;
};

export const getRequestById = async (id: number) => {
  const response = await axios.get(`${URL}/requests/${id}`);
  return response.data;
};

export const createRequest = async (requestData: Omit<RequestData, "id">) => {
  const response = await axios.post(`${URL}/requests`, requestData);
  return response.data;
};

export const updateRequest = async (id: number, requestData: RequestData) => {
  const response = await axios.put(`${URL}/requests/${id}`, requestData);
  return response.data;
};

export const deleteRequest = async (id: number) => {
  const response = await axios.delete(`${URL}/requests/${id}`);
  return response.data;
};
