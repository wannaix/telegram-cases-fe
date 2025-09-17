export interface Item {
  id: string;
  name: string;
  rarity: 'COMMON' | 'UNCOMMON' | 'RARE' | 'EPIC' | 'LEGENDARY' | 'ANCIENT' | 'CONTRABAND';
  type: string;
  price: number;
  imageUrl: string | null;
  imageBase64?: string | null;
  nftContract?: string;
  nftTokenId?: string;
  nftCollectionName?: string;
  nftOpenseaUrl?: string;
}
export interface CaseItem {
  id: string;
  caseId: string;
  itemId: string;
  dropChance: number;
  item: Item;
}
export interface Case {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string | null;
  imageBase64: string | null;
  isActive: boolean;
  isLocked: boolean;
  unlockLevel?: number;
  unlockPrice?: number;
  createdAt: string;
  updatedAt: string;
  items: CaseItem[];
}
export interface User {
  id: string;
  telegramId: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  balance: number;
  isPremium: boolean;
  totalSpent: number;
  totalWon: number;
  createdAt: string;
}
export interface OpenCaseResult {
  success: boolean;
  result: {
    item: Item;
    profit: number;
    message: string;
  };
}
export interface SimpleOpenCaseResult {
  item: Item;
  profit: number;
  message?: string;
}
export interface MultipleOpenCaseResult {
  success: boolean;
  results: SimpleOpenCaseResult[];
}
export type CaseOpenResultType = OpenCaseResult | SimpleOpenCaseResult;
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}
export interface LiveDrop {
  id: string;
  user: {
    username: string;
    avatar: string;
  };
  item: {
    id: string;
    name: string;
    rarity: string;
    price: number;
    imageUrl: string;
  };
  case: {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    imageBase64?: string;
    isLocked: boolean;
    items: unknown[];
  };
  timestamp: string;
}
export interface InventoryItem {
  id: string;
  item: Item;
  quantity: number;
}