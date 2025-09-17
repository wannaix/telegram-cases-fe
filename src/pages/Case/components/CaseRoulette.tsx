import React, { useRef, useEffect, useState } from 'react';
import type { Item } from '../../../types';
import { getImageSrc } from '../../../utils/image';
import styles from './CaseRoulette.module.css';
interface CaseRouletteProps {
  items: Item[];
  isSpinning: boolean;
  winningItem?: Item;
  onSpinComplete?: () => void;
  caseName?: string;
  onClose?: () => void;
  key?: string; 
}
export const CaseRoulette: React.FC<CaseRouletteProps> = ({
  items,
  isSpinning,
  winningItem,
  onSpinComplete,
  caseName,
  onClose
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationIdRef = useRef<number | null>(null);
  const itemWidth = 130; 
  const minRepeats = Math.max(50, Math.ceil(200 / items.length)); 
  const extendedItems = Array(minRepeats).fill(items).flat();
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (isAnimating) return;
    if (isSpinning && winningItem) {
      const winningIndex = items.findIndex(item => item.id === winningItem.id);
      if (winningIndex === -1) {
        console.warn('Winning item not found in items array');
        return;
      }
      console.log(`CaseRoulette: Starting animation for ${winningItem.name} at index ${winningIndex}`);
      setIsAnimating(true);
      container.style.transition = 'none';
      container.style.transform = 'translateX(0)';
      animationIdRef.current = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const baseItemsCount = items.length;
          const totalDuration = 10000; 
          const totalSpins = itemWidth * baseItemsCount * 8; 
          const containerWidth = container.parentElement?.clientWidth || 0;
          const centerOffset = containerWidth / 2;
          const initialMarginLeft = 260; 
          const finalPosition = totalSpins + itemWidth * (winningIndex + 2.9) - centerOffset + initialMarginLeft;
          container.style.transition = `transform ${totalDuration}ms cubic-bezier(0.25, 0.1, 0.25, 1)`;
          container.style.transform = `translateX(-${finalPosition}px)`;
          const handleAnimationEnd = () => {
            container.removeEventListener('transitionend', handleAnimationEnd);
            setIsAnimating(false);
            setTimeout(() => {
              onSpinComplete?.();
            }, 100);
          };
          container.addEventListener('transitionend', handleAnimationEnd, { once: true });
        });
      });
    }
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [isSpinning, winningItem, isAnimating, items, onSpinComplete]);
  return (
    <div className={styles.rouletteContainer}>
      <div className={styles.header}>
        {caseName && (
          <div className={styles.caseName}>{caseName}</div>
        )}
        {onClose && (
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        )}
      </div>
      <div className={styles.selectorTop}>
        <img 
          src="/icons/Highlight.svg"
          alt="selector down"
          className={styles.selectorIcon}
        />
      </div>
      <div className={styles.itemsContainer}>
        <div 
          ref={containerRef}
          className={styles.itemsTrack}
        >
          {extendedItems.map((item, index) => (
            <div key={`${item.id}-${index}`} className={styles.rouletteItem}>
              <div className={styles.itemCard}>
                <div className={styles.priceCircle}>
                  <img src="/icons/coin.png" alt="TON" className={styles.coinIcon} />
                  <span className={styles.priceText}>{item.price.toFixed(2)}</span>
                </div>
                <img
                  src={getImageSrc(item.imageUrl, item.imageBase64)}
                  alt={item.name}
                  className={styles.itemImage}
                  onError={(e) => {
                    e.currentTarget.src = '/temporary-case-image.png';
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.selectorBottom}>
        <img 
          src="/icons/Highlight.svg"
          alt="selector up"
          className={styles.selectorIconBottom}
        />
      </div>
    </div>
  );
};