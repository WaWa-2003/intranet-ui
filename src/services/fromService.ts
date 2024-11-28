// services/toDataService.js
import axios from 'axios';
import BASE_URL from "../url/url"; 
import FromData from '../shiprush/data/FromData';

const URL = `${BASE_URL}/shiprush`; 

export const getFromData = async () => {
  const response = await axios.get(`${URL}/fromdata`);
  return response.data;
};

export const getFromDataById = async (id: number) => {
  const response = await axios.get(`${URL}/fromdata/${id}`);
  return response.data;
};

export const createFromData = async (requestFromData: Omit<FromData, "id">) => {
  const response = await axios.post(`${URL}/fromdata`, requestFromData);
  return response.data;
};

export const updateFromData = async (id: number, requestFromData: FromData) => {
  const response = await axios.put(`${URL}/fromdata/${id}`, requestFromData);
  return response.data;
};

export const deleteFromData = async (id: number) => {
  const response = await axios.delete(`${URL}/fromdata/${id}`);
  return response.data;
};
