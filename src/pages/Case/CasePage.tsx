import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { casesApi, getDepositBalance } from "../../services/api";
import styles from "./CasePage.module.css";
import { useTranslation } from "react-i18next";
import { getImageSrc } from "../../utils/image";
import { CaseRoulette } from "./components/CaseRoulette";
import { CaseWinDisplay } from "./components/CaseWinDisplay";
import { MultipleRoulettes } from "./components/MultipleRoulettes";
import type { Item, SimpleOpenCaseResult } from "../../types";
import DepositModal from "../Profile/DepositModal";
export const CasePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const [selectedAmount, setSelectedAmount] = useState(1);
  const [isOpening, setIsOpening] = useState(false);
  const [, setOpenResult] = useState<SimpleOpenCaseResult | { results: SimpleOpenCaseResult[], isMultiple: boolean } | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winningItem, setWinningItem] = useState<Item | null>(null);
  const [winningItems, setWinningItems] = useState<Item[]>([]);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const { t } = useTranslation();
  const { data: caseData, isLoading: isCaseLoading } = useQuery({
    queryKey: ["case", id],
    queryFn: () => (id ? casesApi.getCase(id) : Promise.resolve(null)),
    enabled: !!id,
  });
  const { data: userBalance } = useQuery({
    queryKey: ["userBalance"],
    queryFn: getDepositBalance,
    refetchInterval: 5000,
  });
  const openCaseMutation = useMutation({
    mutationFn: (caseId: string) => casesApi.openCase(caseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userBalance"] });
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
    },
    onError: (error: unknown) => {
      const errorMessage = error instanceof Error ? error.message : "Ошибка при открытии кейса";
      alert(errorMessage);
    }
  });
  if (isCaseLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
      </div>
    );
  }
  if (!caseData) {
    return (
      <div className={styles.loadingContainer}>
        <div>Кейс не найден</div>
      </div>
    );
  }
  const finalCaseData = caseData;
  const caseItems = finalCaseData?.items || [];
  const nftLoading = isCaseLoading;
  const hasEnoughBalance = userBalance !== undefined && finalCaseData && userBalance >= (finalCaseData.price * selectedAmount);
  const handleOpenCase = async () => {
    if (!id) return;
    setOpenResult(null);
    setShowResult(false);
    setWinningItems([]);
    setWinningItem(null);
    setIsOpening(true);
    try {
      if (selectedAmount === 1) {
        const result = await openCaseMutation.mutateAsync(id);
        const caseResult = 'result' in result ? result.result : result;
        if (caseResult) {
          setWinningItem(caseResult.item);
          setIsSpinning(true);
          setOpenResult(caseResult);
        }
      } else {
        const response = await casesApi.openMultipleCases(id, selectedAmount);
        if (response.success && response.results) {
          const items = response.results.map(r => r.item);
          setWinningItems(items);
          setOpenResult({ results: response.results, isMultiple: true });
          setIsSpinning(true);
        }
      }
    } catch (error) {
      console.error('Error opening cases:', error);
    } finally {
      if (!isSpinning) {
        setIsOpening(false);
      }
    }
  };
  const handleQuickOpen = async () => {
    if (!id) return;
    setIsOpening(true);
    try {
      const results = [];
      for (let i = 0; i < selectedAmount; i++) {
        if (id) {
          const result = await openCaseMutation.mutateAsync(id);
          const actualResult = 'result' in result ? result.result : result;
          if (actualResult) {
            results.push(actualResult);
          }
        }
      }
      if (results.length === 1) {
        setOpenResult(results[0]);
      } else {
        setOpenResult({ results, isMultiple: true });
      }
      setShowResult(true);
    } catch (error) {
      console.error('Error quick opening cases:', error);
    } finally {
      setIsOpening(false);
    }
  };
  return (
    <div className={styles.pageContainer}>
      <div className={styles.caseContent}>
        <div className={styles.topSection}>
          <div className={styles.contentCard}>
            {showResult && (winningItem || winningItems.length > 0) ? (
              <CaseWinDisplay
                winningItem={winningItem}
                winningItems={winningItems}
                caseName={finalCaseData.name}
                possiblePrizes={caseItems.map((ci: { item: Item }) => ci.item).sort((a, b) => b.price - a.price)}
                onKeepIt={() => {
                  setShowResult(false);
                  setIsSpinning(false);
                  setWinningItem(null);
                  setWinningItems([]);
                  setOpenResult(null);
                }}
              />
            ) : selectedAmount > 1 ? (
              <MultipleRoulettes
                items={caseItems.map((ci: { item: Item }) => ci.item)}
                amount={selectedAmount}
                isSpinning={isSpinning}
                winningItems={winningItems}
                caseName={finalCaseData.name}
                onSpinComplete={() => {
                  setShowResult(true);
                  setIsOpening(false);
                }}
              />
            ) : (
              <CaseRoulette
                key={winningItem?.id || 'default'}
                items={caseItems.map((ci: { item: Item }) => ci.item)}
                isSpinning={isSpinning}
                winningItem={winningItem as Item | undefined}
                caseName={finalCaseData.name}
                onSpinComplete={() => {
                  setShowResult(true);
                  setIsOpening(false);
                }}
              />
            )}
          </div>
          {hasEnoughBalance && !showResult ? (
            <>
              <div className={styles.numberButtonsRow}>
                {[1, 2, 3].map((num) => (
                  <button
                    key={num}
                    onClick={() => setSelectedAmount(num)}
                    disabled={isSpinning || isOpening}
                    className={`${styles.numberButton} ${
                      selectedAmount === num ? styles.numberButtonActive : ""
                    } ${isSpinning || isOpening ? styles.numberButtonDisabled : ""}`}
                  >
                    <span className={styles.numberButtonText}>x{num}</span>
                  </button>
                ))}
              </div>
              <div className={styles.openButtonsContainer}>
                <button 
                  className={`${styles.openButton} ${isOpening || isSpinning ? styles.openButtonDisabled : ''}`}
                  onClick={handleOpenCase}
                  disabled={isOpening || openCaseMutation.isPending || isSpinning}
                >
                  <span className={styles.openButtonText}>
                    {t("caseCard.open_case")}
                  </span>
                </button>
                <button 
                  className={`${styles.openButton} ${isOpening || isSpinning ? styles.openButtonDisabled : ''}`}
                  onClick={handleQuickOpen}
                  disabled={isOpening || openCaseMutation.isPending || isSpinning}
                >
                  <span className={styles.openButtonText}>
                    {t("caseCard.quick_open")}
                  </span>
                </button>
              </div>
            </>
          ) : !showResult ? (
            <div className={styles.notEnoughFundsContainer}>
              <div className={styles.notEnoughFundsMessage}>
                <span className={styles.infoIcon}>ℹ</span>
                <span className={styles.notEnoughFundsText}>{t("caseCard.not_enough_funds")}</span>
              </div>
              <button 
                className={styles.depositButton}
                onClick={() => setShowDepositModal(true)}
              >
                <span className={styles.depositButtonText}>{t("caseCard.deposit")}</span>
              </button>
            </div>
          ) : null}
          <div className={styles.caseContentTitle}>
            <span className={styles.caseContentTitleText}>{t("caseCard.case_content")}</span>
          </div>
        </div>
        <div className={styles.casesGrid}>
          <div className={styles.itemsGrid}>
            {nftLoading ? (
              <div className={styles.loadingItemsContainer}>
                <div className={styles.smallSpinner}></div>
              </div>
            ) : caseItems && caseItems.length > 0 ? (
              caseItems.map((caseItem) => (
                <div key={caseItem.id} className={styles.itemCard}>
                  <div className={styles.itemImageContainer}>
                    <img
                      src={getImageSrc(caseItem.item.imageUrl, caseItem.item.imageBase64)}
                      alt={caseItem.item.name}
                      className={styles.itemImage}
                      onError={(e) => {
                        e.currentTarget.src = "/temporary-case-image.png";
                      }}
                    />
                  </div>
                  <div className={styles.itemBottomInfo}>
                    <div className={styles.itemName}>{caseItem.item.name}</div>
                    <div className={styles.itemPriceInfoContainer}>
                      <div className={styles.itemPriceContainer}>
                        <img
                          src="/icons/coin.png"
                          alt="coin"
                          className={styles.itemCoinIcon}
                        />
                        <span className={styles.itemPrice}>
                          {caseItem.item.price.toFixed(1)}
                        </span>
                      </div>
                      <span className={styles.itemSeparator}>/</span>
                      <div className={styles.itemDiceContainer}>
                        <img
                          src="/icons/dice.svg"
                          alt="dice"
                          className={styles.itemDiceIcon}
                        />
                        <span className={styles.itemDiceText}>{caseItem.dropChance}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.emptyStateContainer}>
                <div className={styles.emptyStateIcon}>📦</div>
                <p className={styles.emptyStateText}>{t("caseCard.items_loading")}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      {}
      <DepositModal
        open={showDepositModal}
        onClose={() => setShowDepositModal(false)}
      />
    </div>
  );
};
