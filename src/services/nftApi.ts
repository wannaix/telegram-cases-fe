import axios from "axios";
const PARTNERS_API_URL = "https://portals-market.com";
const API_KEY = import.meta.env.VITE_PARTNERS_API_KEY || "73efdc22-c48b-4aba-b3ee-3688e42a596a";
export interface NFTAttribute {
  type: string;
  value: string;
  rarity_per_mille: number;
}
export interface NFTMetadata {
  id: string;
  name: string;
  collection_id: string;
  external_collection_number: number;
  photo_url: string;
  animation_url?: string;
  has_animation: boolean;
  price?: string;
  floor_price?: string;
  status: "listed" | "unlisted" | "withdrawn" | "auction" | "giveaway_locked" | "bundle";
  attributes: NFTAttribute[];
  is_owned: boolean;
  listed_at?: string;
  unlocks_at?: string;
  tg_id?: string;
  emoji_id?: string;
}
export interface CollectionFloor {
  floorPrices: { [key: string]: string };
}
export interface AttributeFloor {
  name: string;
  collection_name: string;
  floor_price: string;
}
export interface MarketAction {
  type: "sell" | "buy" | "offer" | "listing" | "price_update" | "delist" | "transfer" | "cancel" | "reject";
  created_at: string;
  amount?: string;
  nft: {
    id: string;
    name: string;
    photo_url: string;
    collection_id: string;
    external_collection_number: number;
    is_owned: boolean;
    floor_price?: string;
    price?: string;
  };
}
export interface UserWallet {
  balance: string;
  frozen_funds: string;
}
export interface MarketConfig {
  commission: string;
  deposit_wallet: string;
  usdt_course: string;
  user_cashback: string;
}
class NFTApiService {
  private apiKey: string = API_KEY;
  private getHeaders() {
    return {
      "Authorization": `partners ${this.apiKey}`,
      "Content-Type": "application/json",
    };
  }
  
  async searchNFTs(params: {
    collection_id?: string;
    external_collection_number?: number;
    filter_by_models?: string[];
    filter_by_collections?: string[];
    filter_by_backdrops?: string[];
    filter_by_symbols?: string[];
    name_filter?: string;
    min_price?: string;
    max_price?: string;
    status?: "listed" | "unlisted" | "auction";
    sort_by?: "listed_at desc" | "price asc" | "price desc" | "external_collection_number asc" | "external_collection_number desc" | "model_rarity asc" | "model_rarity desc";
    limit?: number;
    offset?: number;
    with_attributes?: boolean;
  } = {}): Promise<{ results: NFTMetadata[]; total_count: number }> {
    try {
      const response = await axios.get(
        `${PARTNERS_API_URL}/partners/nfts/search`,
        {
          params: {
            limit: 20,
            with_attributes: true,
            ...params,
          },
          headers: this.getHeaders(),
        }
      );
      
      return response.data;
    } catch (error) {
      console.error("Error searching NFTs:", error);
      return { results: [], total_count: 0 };
    }
  }
  
  async getOwnedNFTs(params: {
    collection_id?: string;
    status?: "listed" | "unlisted" | "auction";
    limit?: number;
    offset?: number;
  } = {}): Promise<{ nfts: NFTMetadata[]; total_count: number }> {
    try {
      const response = await axios.get(
        `${PARTNERS_API_URL}/partners/nfts/owned`,
        {
          params: {
            limit: 20,
            with_attributes: true,
            ...params,
          },
          headers: this.getHeaders(),
        }
      );
      
      return response.data;
    } catch (error) {
      console.error("Error fetching owned NFTs:", error);
      return { nfts: [], total_count: 0 };
    }
  }
  
  async getCollectionFloors(): Promise<CollectionFloor> {
    try {
      const response = await axios.get(
        `${PARTNERS_API_URL}/partners/collections/floors`,
        {
          headers: this.getHeaders(),
        }
      );
      
      return response.data;
    } catch (error) {
      console.error("Error fetching collection floors:", error);
      return { floorPrices: {} };
    }
  }
  
  async getAttributeFloors(): Promise<{ models: AttributeFloor[]; updated_at: string }> {
    try {
      const response = await axios.get(
        `${PARTNERS_API_URL}/partners/collections/attribute-floors`,
        {
          headers: this.getHeaders(),
        }
      );
      
      return response.data;
    } catch (error) {
      console.error("Error fetching attribute floors:", error);
      return { models: [], updated_at: "" };
    }
  }
  
  async getMarketActions(params: {
    action_types?: ("sell" | "buy" | "offer" | "listing" | "price_update" | "delist" | "transfer" | "cancel" | "reject")[];
    collection_id?: string;
    filter_by_collections?: string[];
    filter_by_models?: string[];
    min_price?: string;
    max_price?: string;
    status?: "listed" | "unlisted";
    sort_by?: "listed_at desc" | "price asc" | "price desc";
    limit?: number;
    offset?: number;
  } = {}): Promise<{ actions: MarketAction[] }> {
    try {
      const response = await axios.get(
        `${PARTNERS_API_URL}/partners/market/actions/`,
        {
          params: {
            limit: 20,
            ...params,
          },
          headers: this.getHeaders(),
        }
      );
      
      return response.data;
    } catch (error) {
      console.error("Error fetching market actions:", error);
      return { actions: [] };
    }
  }
  
  async getUserWallet(): Promise<UserWallet> {
    try {
      const response = await axios.get(
        `${PARTNERS_API_URL}/partners/users/wallets/`,
        {
          headers: this.getHeaders(),
        }
      );
      
      return response.data;
    } catch (error) {
      console.error("Error fetching user wallet:", error);
      return { balance: "0", frozen_funds: "0" };
    }
  }
  
  async getMarketConfig(): Promise<MarketConfig> {
    try {
      const response = await axios.get(
        `${PARTNERS_API_URL}/partners/market/config`,
        {
          headers: this.getHeaders(),
        }
      );
      
      return response.data;
    } catch (error) {
      console.error("Error fetching market config:", error);
      return { commission: "0", deposit_wallet: "", usdt_course: "0", user_cashback: "0" };
    }
  }
  
  
  async getNFTPrice(nft: NFTMetadata): Promise<number> {
    try {
      if (nft.price) {
        return parseFloat(nft.price);
      }
      
      if (nft.floor_price) {
        return parseFloat(nft.floor_price);
      }
      
      
      return Math.floor(Math.random() * 5000) + 100;
    } catch (error) {
      console.error("Error getting NFT price:", error);
      return Math.floor(Math.random() * 5000) + 100;
    }
  }
  
  async getCollectionFloorPrice(collectionId: string): Promise<number> {
    try {
      const floors = await this.getCollectionFloors();
      const floorPrice = floors.floorPrices[collectionId];
      return floorPrice ? parseFloat(floorPrice) : 0;
    } catch (error) {
      console.error("Error fetching collection floor price:", error);
      return 0;
    }
  }
  
  async checkUserExists(userId: number): Promise<boolean> {
    try {
      const response = await axios.get(
        `${PARTNERS_API_URL}/partners/users/${userId}`,
        {
          headers: this.getHeaders(),
        }
      );
      
      return response.data.exists || false;
    } catch (error) {
      console.error("Error checking user existence:", error);
      return false;
    }
  }
  
  async getUserNFTStats(): Promise<{ total_count: number; listed_count: number; unlisted_count: number }> {
    try {
      const response = await axios.get(
        `${PARTNERS_API_URL}/partners/nfts/stats`,
        {
          headers: this.getHeaders(),
        }
      );
      
      return response.data;
    } catch (error) {
      console.error("Error fetching user NFT stats:", error);
      return { total_count: 0, listed_count: 0, unlisted_count: 0 };
    }
  }
}
export const nftApi = new NFTApiService();