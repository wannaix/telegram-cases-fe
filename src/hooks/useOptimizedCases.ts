import { useQuery } from '@tanstack/react-query';
import { casesApi } from '../services/api';
import type { Case } from '../types';
import { DEMO_CASE_IMAGES, DEMO_ITEM_IMAGES } from '../config/images';
const optimizeCases = (cases: Case[]): Case[] => {
  return cases.map(caseItem => {
    if (caseItem.imageUrl?.startsWith('http')) {
      return {
        ...caseItem,
        imageBase64: null 
      };
    }
    const demoUrl = DEMO_CASE_IMAGES[caseItem.id as keyof typeof DEMO_CASE_IMAGES];
    return {
      ...caseItem,
      imageUrl: demoUrl || caseItem.imageUrl,
      imageBase64: null, 
      items: caseItem.items?.map(item => ({
        ...item,
        item: {
          ...item.item,
          imageUrl: item.item.imageUrl?.startsWith('http') 
            ? item.item.imageUrl 
            : DEMO_ITEM_IMAGES[item.item.id as keyof typeof DEMO_ITEM_IMAGES] || item.item.imageUrl,
          imageBase64: null
        }
      })) || []
    };
  });
};
export const useOptimizedCases = () => {
  return useQuery({
    queryKey: ['cases', 'optimized'],
    queryFn: async () => {
      const cases = await casesApi.getCases();
      return optimizeCases(cases);
    },
    staleTime: 5 * 60 * 1000, 
    gcTime: 10 * 60 * 1000, 
  });
};