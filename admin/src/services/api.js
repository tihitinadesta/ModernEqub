import axios from "axios";

const baseUrl = "https://dummyjson.com";

const getToken = async () => {
  try {
    const token = await localStorage.getItem("token");
    return token;
  } catch (error) {
    console.error("Error getting token from AsyncStorage:", error);
    return null;
  }
};

const apiRequest = async (method, endpoint, data = null) => {
  try {
    const token = await getToken();
    if (!token) {
      console.error("No token found");
      return null;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const config = {
      method,
      url: baseUrl + endpoint,
      headers,
      data: data ? JSON.stringify(data) : null,
    };

    const response = await axios(config);

    return response.data;
  } catch (error) {
    console.error("API request failed:", error);
    return null;
  }
};

export const postRequest = async (endpoint, data) => {
  return await apiRequest("POST", endpoint, data);
};

export const getRequest = async (endpoint) => {
  return await apiRequest("GET", endpoint);
};

export const putRequest = async (endpoint, data) => {
  return await apiRequest("PUT", endpoint, data);
};