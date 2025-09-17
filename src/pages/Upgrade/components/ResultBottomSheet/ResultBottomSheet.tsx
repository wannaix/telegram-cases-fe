import React from "react";
import styles from './ResultBottomSheet.module.css';
import { useTranslation } from "react-i18next";
interface ResultBottomSheetProps {
  isVisible: boolean;
  result: "success" | "fail" | null;
  onClose: () => void;
  selectedCase?: {id: number, name: string, price: number, image: string} | null;
  onInventoryNavigate?: () => void;
}
export const ResultBottomSheet: React.FC<ResultBottomSheetProps> = ({ 
  isVisible, 
  result, 
  onClose,
  onInventoryNavigate, 
}) => {
  const { t } = useTranslation();
  if (!result) return null;
  const isSuccess = result === "success";
  return (
    <div className={`${styles.resultBottomSheetOverlay} ${isVisible ? styles.show : ''}`}>
      <div className={`${styles.resultBottomSheet} ${isVisible ? styles.show : ''}`}>
        <div className={styles.resultCloseIcon} onClick={onClose}>
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 16 16" 
            fill="none" 
            className={styles.resultCloseIconImage}
          >
            <path 
              d="M12 4L4 12M4 4L12 12" 
              stroke="white" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className={styles.resultTitle}>
          <div className={styles.resultTitleMain}>
            {isSuccess ? t('upgradePage.success') : t('upgradePage.failure')}
          </div>
          <div className={styles.resultTitleSub}>
            {isSuccess ? t('upgradePage.upgraded_successfully') : t('upgradePage.upgrade_failed')}
          </div>
        </div>
        {isSuccess ? (
          <div className={styles.resultImageContainer}>
            <img 
              src="/icons/success.png"
              alt="Success"
              className={styles.resultImageSuccess}
            />
          </div>
        ) : (
          <div className={styles.resultImageFailContainer}>
            <div className={styles.resultImageFailMain}>
              <img 
                src="/icons/fail.png"
                alt="Fail"
                className={styles.resultImageFailImage}
              />
            </div>
          </div>
        )}
        <div className={styles.resultActions}>
          {isSuccess ? (
            <>
              <div className={styles.resultActionsRow}>
                <button 
                  className={`${styles.resultButton} ${styles.resultButtonPrimary} ${styles.resultButtonFull}`}
                  onClick={onClose}
                >
                  {t('upgradePage.repeat')}
                </button>
              </div>
              <div className={styles.resultActionsRow}>
                <button 
                  className={`${styles.resultButton} ${styles.resultButtonSecondary} ${styles.resultButtonFull}`}
                  onClick={onInventoryNavigate || onClose}
                >
                  {t('upgradePage.continue')}
                </button>
              </div>
            </>
          ) : (
            <>
              <div className={styles.resultActionsRow}>
                <button 
                  className={`${styles.resultButton} ${styles.resultButtonSecondary} ${styles.resultButtonHalf}`}
                  onClick={onClose}
                >
                  {t('upgradePage.back')}
                </button>
                <button 
                  className={`${styles.resultButton} ${styles.resultButtonSecondary} ${styles.resultButtonHalf}`}
                  onClick={onClose}
                >
                  {t('upgradePage.repeat')}
                </button>
              </div>
              <div className={styles.resultActionsRow}>
                <button 
                  className={`${styles.resultButton} ${styles.resultButtonSecondary} ${styles.resultButtonFull}`}
                  onClick={onClose}
                >
                  {t('upgradePage.continue')}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};