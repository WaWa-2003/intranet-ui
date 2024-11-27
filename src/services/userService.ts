// services/userService.js
import axios from 'axios';
import BASE_URL from "../url/url"; 
import UserData from '../shiprush/data/UserData';

export const getUsers = async () => {
  const response = await axios.get(`${BASE_URL}/users`);
  return response.data;
};

export const getUserById = async (id: number) => {
  const response = await axios.get(`${BASE_URL}/users/${id}`);
  return response.data;
};

export const createUser = async (userData: UserData) => {
  const response = await axios.post(`${BASE_URL}/users`, userData);
  return response.data;
};

export const updateUser = async (id: number, userData: UserData) => {
  const response = await axios.put(`${BASE_URL}/users/${id}`, userData);
  return response.data;
};

export const deleteUser = async (id: number) => {
  const response = await axios.delete(`${BASE_URL}/users/${id}`);
  return response.data;
};
