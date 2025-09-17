import axios from "axios";
import { Case, User, OpenCaseResult, InventoryItem, MultipleOpenCaseResult } from "../types";
import { retrieveLaunchParams } from "@telegram-apps/sdk";
const API_BASE_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : "https://telegram-cases-be.onrender.com/api";
function getToken() {
  return localStorage.getItem("token");
}
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const { initDataRaw } = retrieveLaunchParams();
      if (initDataRaw) {
        try {
          const response = await authApi.login(initDataRaw);
          localStorage.setItem("token", response.token);
          const config = error.config;
          config.headers = config.headers || {};
          config.headers.Authorization = `Bearer ${response.token}`;
          return api(config);
        } catch (loginError) {
          console.error("Reauthorization failed:", loginError);
        }
      }
    }
    return Promise.reject(error);
  }
);
export const createCryptoBotInvoice = async (amount: string | number) => {
  const response = await api.post("/deposit/cryptobot-invoice", { amount });
  return response.data;
};
export const casesApi = {
  
  getCases: async (): Promise<Case[]> => {
    const response = await api.get("/cases");
    return response.data.cases;
  },
  
  getCase: async (caseId: string): Promise<Case> => {
    const response = await api.get(`/cases/${caseId}`);
    
    return response.data.case;
  },
  
  openCase: async (caseId: string): Promise<OpenCaseResult> => {
    const response = await api.post("/cases/open", { caseId });
    return response.data;
  },
  
  openMultipleCases: async (caseId: string, amount: number): Promise<MultipleOpenCaseResult> => {
    const response = await api.post("/cases/open-multiple", { caseId, amount });
    return response.data;
  },
  
  getCaseHistory: async (page = 1, limit = 20) => {
    const response = await api.get(
      `/cases/history?page=${page}&limit=${limit}`
    );
    return response.data;
  },
};
export const authApi = {
  
  login: async (initData: string): Promise<{ token: string; user: User }> => {
    const response = await api.post("/auth/login", { initData });
    localStorage.setItem("token", response.data.token);
    return response.data;
  },
  
  getMe: async (): Promise<User> => {
    const response = await api.get("/auth/me");
    return response.data.user;
  },
  
  logout: () => {
    localStorage.removeItem("token");
  },
};
export const userApi = {
  
  getProfile: async () => {
    const response = await api.get("/users/profile");
    return response.data;
  },
  
  getInventory: async (page = 1, limit = 50) => {
    const response = await api.get(
      `/users/inventory?page=${page}&limit=${limit}`
    );
    return response.data;
  },
  
  getLeaderboard: async (type = "totalWon", limit = 10) => {
    const response = await api.get(
      `/users/leaderboard?type=${type}&limit=${limit}`
    );
    return response.data;
  },
  
  updateBalance: async (amount: number, type: "deposit" | "withdraw") => {
    const response = await api.post("/users/balance", { amount, type });
    return response.data;
  },
};
export const inventoryApi = {
  
  getInventory: async (): Promise<InventoryItem[]> => {
    const response = await api.get("/inventory");
    return response.data.inventory;
  },
  
  sellInventoryItem: async (itemId: string, quantity: number) => {
    const response = await api.post("/inventory/sell", { itemId, quantity });
    return response.data;
  },
  
  sellAll: async () => {
    const response = await api.post("/inventory/sell", { sellAll: true });
    return response.data;
  },
  
  withdrawInventoryItem: async (itemId: string, quantity: number) => {
    const response = await api.post("/inventory/withdraw", { itemId, quantity });
    return response.data;
  },
};
export const upgradeApi = {
  roll: async (baseChance: number, coef: number) => {
    const response = await api.post("/upgrade/roll", { baseChance, coef });
    return response.data;
  },
};
export async function getDepositBalance() {
  const res = await api.get("/deposit/balance");
  return res.data.balance;
}
export async function initiateTonDeposit() {
  const res = await api.post("/deposit/ton-initiate");
  return res.data; 
}
export async function tonCheckDeposit() {
  const res = await api.post("/deposit/ton-check");
  return res.data; 
}
export default api;
