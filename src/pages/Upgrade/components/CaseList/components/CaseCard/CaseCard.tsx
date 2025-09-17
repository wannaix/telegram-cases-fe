import React from "react";
import styles from './CaseCard.module.css';
interface CaseCardProps {
  caseItem: {
    id: number;
    name: string;
    price: number;
    image: string;
  };
  isSelected: boolean;
  onClick: () => void;
}
export const CaseCard: React.FC<CaseCardProps> = ({ caseItem, isSelected, onClick }) => {
  return (
    <div 
      className={`${styles.caseCard} ${isSelected ? styles.caseCardSelected : ''}`}
      onClick={onClick}
    >
      <div className={styles.caseImageContainer}>
        <img 
          src={caseItem.image}
          alt={caseItem.name}
          className={styles.caseImage}
        />
      </div>
      <div className={styles.caseInfo}>
        <div className={styles.caseTitle}>
          {caseItem.name}
        </div>
        <div className={styles.casePriceContainer}>
          <div className={styles.casePriceLayout}>
            <img 
              src="/icons/coin.png" 
              alt="Coin" 
              className={styles.coinIcon}
            />
            <div className={styles.casePrice}>
              {caseItem.price}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};