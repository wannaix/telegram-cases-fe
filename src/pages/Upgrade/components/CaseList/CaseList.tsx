import React from "react";
import { CaseCard } from './components/CaseCard';
import styles from './CaseList.module.css';
interface CaseListProps {
  cases: Array<{
    id: number;
    name: string;
    price: number;
    image: string;
  }>;
  selectedCase: {id: number, name: string, price: number, image: string} | null;
  onSelectCase: (caseItem: {id: number, name: string, price: number, image: string}) => void;
}
export const CaseList: React.FC<CaseListProps> = ({ cases, selectedCase, onSelectCase }) => {
  return (
    <div className={styles.caseListContainer}>
      <div className={styles.caseContent}>
        {cases.map((caseItem) => (
          <CaseCard
            key={caseItem.id}
            caseItem={caseItem}
            isSelected={selectedCase?.id === caseItem.id}
            onClick={() => onSelectCase(caseItem)}
          />
        ))}
      </div>
    </div>
  );
};