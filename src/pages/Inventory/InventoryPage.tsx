import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { inventoryApi } from "../../services/api";
import type { InventoryItem } from "../../types";
import { useTranslation } from 'react-i18next';
export const InventoryPage: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: inventory = [], isLoading, error } = useQuery({
    queryKey: ["inventory"],
    queryFn: inventoryApi.getInventory,
  });
  const sellMutation = useMutation({
    mutationFn: ({ itemId, quantity }: { itemId: string; quantity: number }) =>
      inventoryApi.sellInventoryItem(itemId, quantity),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["inventory"] }),
  });
  const sellAllMutation = useMutation({
    mutationFn: inventoryApi.sellAll,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["inventory"] }),
  });
  const withdrawMutation = useMutation({
    mutationFn: ({ itemId, quantity }: { itemId: string; quantity: number }) =>
      inventoryApi.withdrawInventoryItem(itemId, quantity),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["inventory"] }),
  });
  const { t } = useTranslation();
  return (
    <div className="p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">👜 {t('inventory')}</h1>
          <button
            className="btn-primary px-4 py-2 text-sm"
            onClick={() => sellAllMutation.mutate()}
            disabled={sellAllMutation.isPending || inventory.length === 0}
          >
            {t('sell_all')}
          </button>
        </div>
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">{t('inventory_load_error')}</div>
        ) : inventory.length === 0 ? (
          <div className="text-center text-gray-500 py-8">{t('inventory_empty')}</div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {inventory.map((inv: InventoryItem) => (
              <div
                key={inv.id}
                className="bg-gray-800 rounded-xl shadow-lg p-4 flex flex-col items-center"
              >
                <img
                  src={inv.item.imageUrl || "/temporary-case-image.png"}
                  alt={inv.item.name}
                  className="w-16 h-16 object-cover rounded mb-2"
                  onError={e => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/temporary-case-image.png";
                  }}
                />
                <div className="font-bold text-white text-center mb-1">
                  {inv.item.name}
                </div>
                <div className="text-xs text-gray-400 mb-1">
                  {t('quantity')}: {inv.quantity}
                </div>
                <div className="text-sm text-blue-500 font-semibold mb-2">
                  {inv.item.price} TON
                </div>
                <div className="flex gap-2 w-full">
                  <button
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white rounded-lg py-1 text-xs font-semibold transition-colors disabled:opacity-60"
                    onClick={() => sellMutation.mutate({ itemId: inv.item.id, quantity: 1 })}
                    disabled={sellMutation.isPending || inv.quantity === 0}
                  >
                    {t('sell')}
                  </button>
                  <button
                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg py-1 text-xs font-semibold transition-colors disabled:opacity-60"
                    onClick={() => withdrawMutation.mutate({ itemId: inv.item.id, quantity: 1 })}
                    disabled={withdrawMutation.isPending || inv.quantity === 0}
                  >
                    {t('withdraw')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
