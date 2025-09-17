import React, { useState } from "react";
import type { Case, OpenCaseResult } from "../../types";
import { useTranslation } from 'react-i18next';
import { LiveDropFeed } from "./components/LiveDropFeed";
import { useNavigate } from "react-router-dom";
import styles from './HomePage.module.css';
import { getImageSrc } from "../../utils/image";
import { useOptimizedCases } from "../../hooks/useOptimizedCases";
const tabs = [
  { id: 'free', label: 'Free Cases', title: 'Free Cases' },
  { id: 'limited', label: 'Limited Case', title: 'Limited Cases' },
  { id: 'mix', label: 'Mix Cases', title: 'Mix Cases' },
  { id: 'allin', label: 'All In Cases', title: 'All In Cases' },
  { id: 'tickets', label: 'Tickets Cases', title: 'Tickets Cases' },
];
const mockCase: Case = {
  id: 'mock-case',
  name: 'Surfboard',
  description: 'Test case for development',
  price: 12,
  imageUrl: null,
  imageBase64: null,
  isActive: true,
  isLocked: false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  items: []
};
if (typeof document !== 'undefined' && !document.getElementById('skeleton-animations')) {
  const style = document.createElement('style');
  style.id = 'skeleton-animations';
  style.textContent = `
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    @keyframes shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
  `;
  document.head.appendChild(style);
}
export const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('free');
  const [openResult, setOpenResult] = useState<OpenCaseResult | null>(null);
  const { data: cases = [], isLoading } = useOptimizedCases();
  const handleCaseClick = (caseItem: Case) => {
    if (caseItem.isLocked) {
      return;
    }
    navigate(`/case/${caseItem.id}`);
  };
  const activeTabTitle = tabs.find(tab => tab.id === activeTab)?.title || 'Free Cases';
  const getFilteredCases = () => {
    const casesToFilter = cases.length === 0 ? [mockCase] : cases;
    switch (activeTab) {
      case 'free':
        return casesToFilter;
      case 'limited':
        return casesToFilter.slice(0, 3);
      case 'mix':
        return casesToFilter.slice(2, 6);
      case 'allin':
        return casesToFilter.slice(1, 5);
      case 'tickets':
        return casesToFilter.slice(3, 7);
      default:
        return casesToFilter;
    }
  };
  const filteredCases = getFilteredCases();
  return (
    <div className={styles.pageContainer}>
      <div>
        <div className={styles.topSection}>
        <div className={styles.promoSection}>
          <div className={styles.promoContent}>
            <div className={styles.promoCodeButton}>
              <span className={styles.promoCodeText}>
                PROMOCODE
              </span>
            </div>
            <div className={styles.giftSection}>
              <div className={styles.giftBlackRect} />
              <div className={styles.giftWhiteRect} />
              <span className={styles.giftText}>
                GIFTBOOST
              </span>
              <span className={styles.percentText}>
                +7%
              </span>
            </div>
          </div>
        </div>
        <LiveDropFeed />
        </div>
      </div>
      <div className={`w-full overflow-x-auto scrollbar-hide ${styles.scrollContainer}`}>
        <div className="flex gap-2 min-w-max py-2 px-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${styles.tabButton} rounded-md whitespace-nowrap transition-colors border ${
                tab.id === activeTab 
                  ? 'bg-gradient-to-b from-[#1C204E] to-[#0F5B99] border-[#0F5B99] text-white' 
                  : 'text-[#7988BC] hover:text-white border-transparent'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <div className={styles.casesSection}>
        <span className={styles.casesTitle}>
          {activeTabTitle}
        </span>
        <div className={styles.casesGrid}>
          {isLoading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <CaseSkeleton key={index} />
            ))
          ) : filteredCases.length === 0 ? (
            <div className={styles.noCasesContainer}>
              <div className={styles.noCasesContent}>
                <div className={styles.noCasesEmoji}>📦</div>
                <h3 className={styles.noCasesTitle}>
                  {t('no_cases_title')}
                </h3>
                <p className={styles.noCasesDescription}>
                  {t('no_cases_description')}
                </p>
                <button 
                  onClick={() => window.location.reload()}
                  className={styles.noCasesButton}
                >
                  {t('refresh_page')}
                </button>
              </div>
            </div>
          ) : (
            filteredCases.map((caseItem) => (
              <CaseCard
                key={caseItem.id}
                case={caseItem}
                onClick={() => handleCaseClick(caseItem)}
              />
            ))
          )}
        </div>
        </div>
      </div>
      {openResult && (
        <div className={styles.resultModal}>
          <div className={styles.resultModalContent}>
            <img 
              src={openResult.result.item.imageUrl || '/temporary-case-image.png'} 
              alt={openResult.result.item.name} 
              className={styles.resultModalImage}
            />
            <span className={styles.resultModalTitle}>
              {openResult.result.item.name}
            </span>
            <button 
              onClick={() => setOpenResult(null)}
              className={styles.resultModalButton}
            >
              {t('close')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
const CaseSkeleton: React.FC = () => {
  return (
    <div 
      className={styles.caseSkeleton}
      style={{
        width: '175px',
        height: '226px',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '4px',
        overflow: 'hidden'
      }}
    >
      {}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
          animation: 'shimmer 2s infinite',
          zIndex: 1
        }}
      />
      <div 
        className={styles.skeletonImageContainer}
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px 16px 8px'
        }}
      >
        <div 
          className={styles.skeletonImage}
          style={{
            width: '120px',
            height: '140px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            animation: 'pulse 2s ease-in-out infinite'
          }}
        ></div>
      </div>
      <div 
        className={styles.skeletonBottomBar}
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '8px 16px',
          height: '44px',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '4px',
          gap: '8px'
        }}
      >
        <div 
          className={styles.skeletonPrice}
          style={{
            width: '40px',
            height: '16px',
            background: 'rgba(255, 255, 255, 0.15)',
            borderRadius: '4px'
          }}
        ></div>
        <div 
          className={styles.skeletonCoin}
          style={{
            width: '20px',
            height: '20px',
            background: 'rgba(255, 255, 255, 0.15)',
            borderRadius: '50%'
          }}
        ></div>
      </div>
    </div>
  );
};
interface CaseCardProps {
  case: Case;
  onClick: () => void;
}
const CaseCard: React.FC<CaseCardProps> = ({ case: caseItem, onClick }) => {
  const imageSrc = getImageSrc(caseItem.imageUrl, caseItem.imageBase64);
  return (
    <div
      className={styles.caseCard}
      onClick={onClick}
    >
      <div className={styles.caseImageContainer}>
        <img
          src={imageSrc}
          alt={caseItem.name}
          className={styles.caseImage}
          onError={(e) => {
            e.currentTarget.src = '/temporary-case-image.png';
          }}
        />
      </div>
      <div className={styles.caseBottomBar}>
        <span className={styles.casePrice}>
          {caseItem.price}
        </span>
        <img src="/icons/coin.png" alt="coin" className={styles.caseCoinIcon} />
      </div>
      {caseItem.isLocked && (
        <div className={styles.caseLockOverlay}>
          <img src="/lock-icon.svg" alt="locked" className={styles.caseLockIcon} />
        </div>
      )}
    </div>
  );
};