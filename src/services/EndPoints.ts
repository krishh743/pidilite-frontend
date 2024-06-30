import { Config } from "./Config";

export const Endpoints = {
  AdminLogin: `${Config.BASE_API_URL}/api/trainer/login`,
  getUserList:`${Config.BASE_API_URL}/api/trainer`,
  getGamesList:`${Config.BASE_API_URL}/api/variation`,
  createVariation:`${Config.BASE_API_URL}/api/variation`
};
