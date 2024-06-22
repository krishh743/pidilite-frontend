import apiClient from "./ApiClient";
import { Endpoints } from "./EndPoints";


export const AdminLogin = async (data: any): Promise<any> => {

  const response = await apiClient.post(`${Endpoints.AdminLogin}`, data);
  return response;
};
export const GetUserListAPi = async (): Promise<any> => {

  const response = await apiClient.get(`${Endpoints.getUserList}`);
  return response;
};

export const CreateUserListAPi = async (data:any): Promise<any> => {

  const response = await apiClient.post(`${Endpoints.getUserList}`,data);
  return response;
};

export const DeleteUserListAPi = async (id:any): Promise<any> => {

  const response = await apiClient.delete(`${Endpoints.getUserList}/${id}`,);
  return response;
}

export const GetGamesListAPi = async (): Promise<any> => {

  const response = await apiClient.get(`${Endpoints.getGamesList}`,);
  return response;
}


