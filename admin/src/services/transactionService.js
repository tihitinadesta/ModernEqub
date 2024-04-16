import { getRequest } from "./api";

export const getLatestTransactions = async () => {
  try {
    const response = await getRequest('/products'); 
  
    return response;
  } catch (error) {
    throw new Error("Error fetching the Transactions");
  }
};


export const getAllTransactions = async () => {
  try {
    const response = await getRequest('/products'); 
  
    return response;
  } catch (error) {
    throw new Error("Error fetching the Transactions");
  }
};
