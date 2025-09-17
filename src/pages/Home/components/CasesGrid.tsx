import React from "react";
import styles from './CasesGrid.module.css';
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { casesApi } from "../../../services/api";
import type { Case, OpenCaseResult } from "../../../types";
import { useTranslation } from 'react-i18next';
import { getImageSrc, getImageUrl } from "../../../utils/image";
export const CasesGrid: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [openResult, setOpenResult] = React.useState<OpenCaseResult | null>(null);
  const [modal, setModal] = React.useState<string | null>(null);
  const { data: cases = [], isLoading, error } = useQuery({
    queryKey: ['cases'],
    queryFn: casesApi.getCases,
  });
  const renderResultModal = () => (
    openResult && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
        <div className="bg-gray-900 rounded-2xl p-6 shadow-xl flex flex-col items-center">
          <img src={getImageUrl(openResult.result.item.imageUrl)} alt={openResult.result.item.name} className="w-20 h-20 rounded-xl object-cover mb-2" />
          <span className="font-bold text-lg text-white mb-1">{openResult.result.item.name}</span>
          <span className="text-sm text-gray-400 mb-2">{t('you_won')}</span>
          <button className="btn-primary w-full mt-2" onClick={() => setOpenResult(null)}>{t('close')}</button>
        </div>
      </div>
    )
  );
  const renderLockedModal = () => (
    modal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
        <div className="bg-gray-900 rounded-2xl p-6 shadow-xl flex flex-col items-center">
          <span className="font-bold text-lg text-white mb-2">{modal}</span>
          <button className="btn-primary w-full mt-2" onClick={() => setModal(null)}>{t('close')}</button>
        </div>
      </div>
    )
  );
  const handleCaseClick = (caseItem: Case) => {
    if (caseItem.isLocked) {
      setModal(t('case_locked'));
      return;
    }
    navigate(`/case/${caseItem.id}`);
  };
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="case-card">
            <div className="aspect-square bg-gray-700 animate-pulse rounded-lg"></div>
            <div className="p-4 space-y-2">
              <div className="h-4 bg-gray-700 rounded animate-pulse"></div>
              <div className="flex justify-between items-center">
                <div className="h-4 w-16 bg-gray-700 rounded animate-pulse"></div>
                <div className="h-8 w-16 bg-gray-700 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-4">😞</div>
        <p className="text-gray-400 mb-4">
          Failed to load cases
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Try Again
        </button>
      </div>
    );
  }
  if (cases.length === 0) {
    return (
      <div className="text-center py-16 max-w-md mx-auto">
        <div className="text-6xl mb-6">📦</div>
        <h3 className="text-2xl font-bold text-white mb-3">
          {t('no_cases_title')}
        </h3>
        <p className="text-gray-400 mb-6 leading-relaxed">
          {t('no_cases_description')}
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition"
        >
          {t('refresh_page')}
        </button>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
      {cases.map((caseItem) => (
        <CaseCard
          key={caseItem.id}
          case={caseItem}
          onClick={() => handleCaseClick(caseItem)}
        />
      ))}
      {renderResultModal()}
      {renderLockedModal()}
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
      className={`case-card relative rounded-2xl shadow-lg overflow-hidden flex flex-col justify-between max-w-xs w-full mx-auto min-h-[220px] ${styles.caseCard}`}
    >
      <div className={`absolute inset-0 z-0 pointer-events-none ${styles.backgroundStripes}`} aria-hidden="true"
      />
      {caseItem.isLocked && (
        <img
          src="/lock-icon.svg"
          alt="locked"
          className="absolute top-3 right-3 w-8 h-8 z-20"
        />
      )}
      <div className="flex-1 flex items-center justify-center w-full pt-4 pb-2 relative z-10">
        <img
          src={imageSrc}
          alt={caseItem.name}
          className="w-28 h-28 object-contain select-none pointer-events-none"
          onError={(e) => {
            e.currentTarget.src = '/temporary-case-image.png';
          }}
        />
      </div>
      <div className="w-full flex items-center justify-between rounded-b-2xl px-4 py-3 mt-2 relative z-10 overflow-hidden">
        <div className="flex items-center gap-2 z-10 relative">
          <span className="text-lg font-bold text-green-400 drop-shadow-md">{caseItem.price}</span>
          <img src="/icons/coin.png" alt="TON" className="w-6 h-6" />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-5 py-1.5 rounded-lg shadow transition focus:outline-none focus:ring-2 focus:ring-blue-500 relative z-10"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          Open
        </button>
      </div>
    </div>
  );
};