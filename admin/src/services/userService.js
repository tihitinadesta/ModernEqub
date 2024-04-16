import { getRequest } from "./api";

export const getAllUsers = async () => {
  try {
    const response = await getRequest('/products'); 
  
    return response;
  } catch (error) {
    throw new Error("Error fetching user transactions");
  }
};
