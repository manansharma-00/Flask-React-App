import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:5000/users';

export const getUsers = async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
};

export const getUserById = async (userId) => {
    const response = await axios.get(`${BASE_URL}/${userId}`);
    return response.data;
};

export const createUser = async (userData) => {
    const response = await axios.post(`${BASE_URL}/add`, userData);
    return response.data;
};

export const updateUser = async (userId, userData) => {
    try {
        console.log("Data being sent to backend:", userData);  // Debugging line
        const response = await axios.put(`${BASE_URL}/${userId}`, userData);
        return response.data;
    } catch (error) {
        console.error("Error in updateUser:", error.response?.data?.error || error.message);
        throw error;
    }
};


export const deleteUser = async (userId) => {
    const response = await axios.delete(`${BASE_URL}/${userId}`);
    return response.data;
};
