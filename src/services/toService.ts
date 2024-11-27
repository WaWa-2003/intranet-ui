// services/toDataService.js
import axios from 'axios';
import BASE_URL from "../url/url"; 
import ToData from '../shiprush/data/ToData';

const URL = `${BASE_URL}/shiprush`; 

export const getToData = async () => {
  const response = await axios.get(`${URL}/todata`);
  return response.data;
};

export const getToDataById = async (id: number) => {
  const response = await axios.get(`${URL}/todata/${id}`);
  return response.data;
};

export const createToData = async (requestToData: Omit<ToData, "id">) => {
  const response = await axios.post(`${URL}/todata`, requestToData);
  return response.data;
};

export const updateToData = async (id: number, requestToData: ToData) => {
  const response = await axios.put(`${URL}/todata/${id}`, requestToData);
  return response.data;
};

export const deleteToData = async (id: number) => {
  const response = await axios.delete(`${URL}/todata/${id}`);
  return response.data;
};
