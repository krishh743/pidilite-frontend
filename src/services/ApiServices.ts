import apiClient from "./ApiClient";
import { Endpoints } from "./EndPoints";


export const AdminLogin = async (data: any): Promise<any> => {

  const response = await apiClient.post(`${Endpoints.AdminLogin}`, data);
  return response;
};



