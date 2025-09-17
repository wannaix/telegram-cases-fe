import React, { useState, useEffect } from 'react';
import type { Item } from '../../../types';
import { CaseRoulette } from './CaseRoulette';
import styles from './MultipleRoulettes.module.css';
interface MultipleRoulettesProps {
  items: Item[];
  amount: number;
  isSpinning: boolean;
  winningItems?: Item[];
  caseName: string;
  onSpinComplete?: () => void;
}
export const MultipleRoulettes: React.FC<MultipleRoulettesProps> = ({
  items,
  amount,
  isSpinning,
  winningItems = [],
  caseName,
  onSpinComplete
}) => {
  const [, setCompletedCount] = useState(0);
  const handleSingleComplete = () => {
    setCompletedCount(prev => {
      const newCount = prev + 1;
      console.log(`Roulette completed: ${newCount}/${amount}`);
      if (newCount >= amount) {
        console.log('All roulettes completed, calling onSpinComplete');
        onSpinComplete?.();
        return 0; 
      }
      return newCount;
    });
  };
  useEffect(() => {
    if (isSpinning) {
      console.log(`MultipleRoulettes: Starting spin with ${winningItems.length} items for ${amount} roulettes`);
      setCompletedCount(0);
    }
  }, [isSpinning, winningItems.length, amount]);
  return (
    <div className={styles.multipleRoulettes}>
      {Array.from({ length: amount }).map((_, index) => (
        <div key={index}>
          <CaseRoulette
            items={items}
            isSpinning={isSpinning}
            winningItem={winningItems[index]}
            caseName={index === 0 ? caseName : undefined}
            onSpinComplete={handleSingleComplete}
          />
        </div>
      ))}
    </div>
  );
};