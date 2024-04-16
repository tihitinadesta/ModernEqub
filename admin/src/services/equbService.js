import { getRequest } from "./api";

export const getAllEqubs = async () => {
  try {
    const response = await getRequest('/products'); 
  
    return response;
  } catch (error) {
    throw new Error("Error fetching the equb data");
  }
};
