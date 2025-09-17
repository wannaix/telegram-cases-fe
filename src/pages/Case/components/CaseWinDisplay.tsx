import React, { useState } from 'react';
import type { Item } from '../../../types';
import { getImageSrc } from '../../../utils/image';
import { useTranslation } from 'react-i18next';
import styles from './CaseWinDisplay.module.css';
interface CaseWinDisplayProps {
  winningItem?: Item | null;
  winningItems?: Item[];
  onKeepIt: () => void;
  caseName: string;
  possiblePrizes?: Item[];
}
export const CaseWinDisplay: React.FC<CaseWinDisplayProps> = ({
  winningItem,
  winningItems = [],
  onKeepIt,
  caseName,
}) => {
  const { t } = useTranslation();
  const [isClosing, setIsClosing] = useState(false);
  const allItems = winningItem ? [winningItem] : winningItems;
  const isMultiple = allItems.length > 1;
  const handleKeepIt = () => {
    setIsClosing(true);
    setTimeout(() => {
      onKeepIt();
    }, 300);
  };
  return (
    <div className={styles.winContainer}>
      <div className={styles.header}>
        <h2 className={styles.caseName}>{caseName}</h2>
      </div>
      <div className={styles.winSection}>
        <div className={`${styles.winItemsWrapper} ${isMultiple ? styles.multiple : ''}`}>
          {allItems.map((item, index) => (
            <div 
              key={item.id || index} 
              className={`${styles.winItemContainer} ${isClosing ? styles.closing : ''} ${isMultiple ? styles.multipleItem : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={styles.priceCircle}>
                <img src="/icons/coin.png" alt="TON" className={styles.coinIcon} />
                <span className={styles.priceText}>{item.price.toFixed(1)}</span>
              </div>
              <div className={styles.sparkles}>
                <div className={styles.sparkle1}>✦</div>
                <div className={styles.sparkle2}>✧</div>
                <div className={styles.sparkle3}>✦</div>
                <div className={styles.sparkle4}>✧</div>
              </div>
              <img
                src={getImageSrc(item.imageUrl, item.imageBase64)}
                alt={item.name}
                className={styles.winItemImage}
                onError={(e) => {
                  e.currentTarget.src = '/temporary-case-image.png';
                }}
              />
            </div>
          ))}
        </div>
      </div>
      <button 
        className={styles.keepButton}
        onClick={handleKeepIt}
      >
        {t('caseCard.keep_it')}
      </button>
    </div>
  );
};