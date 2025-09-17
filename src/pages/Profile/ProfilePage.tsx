import React from "react";
import { useTelegramWebApp } from "../../hooks/useTelegramWebApp";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getDepositBalance, inventoryApi, userApi } from "../../services/api";
import { useQuery } from "@tanstack/react-query";
import type { InventoryItem } from "../../types";
import DepositModal from "./DepositModal";
import { subscribeToDepositEvents } from "../../services/wsApi";
import { useSearchParams } from "react-router-dom";
import styles from "./ProfilePage.module.css";
export const ProfilePage: React.FC = () => {
  const { user } = useTelegramWebApp();
  const [tonConnectUI] = useTonConnectUI();
  const tonAddress = tonConnectUI.account?.address;
  const [depositBalance, setDepositBalance] = useState<number | null>(null);
  const { t, i18n } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isDepositModalOpen, setDepositModalOpen] = useState(false);
  useEffect(() => {
    if (searchParams.get('openDeposit') === 'true') {
      setDepositModalOpen(true);
      setSearchParams({});
    }
  }, [searchParams, setSearchParams]);
  const { data: inventory = [], isLoading: isInventoryLoading } = useQuery({
    queryKey: ["inventory"],
    queryFn: inventoryApi.getInventory,
  });
  const { data: userProfile } = useQuery({
    queryKey: ["userProfile"],
    queryFn: userApi.getProfile,
  });
  useEffect(() => {
    getDepositBalance()
      .then(setDepositBalance)
      .catch(() => setDepositBalance(null));
    const unsub = subscribeToDepositEvents(() => {
      getDepositBalance()
        .then(setDepositBalance)
        .catch(() => setDepositBalance(null));
    });
    return () => unsub();
  }, []);
  return (
    <>
      <div className={styles.container}>
        {}
        <div className={styles.profileHeader}>
          {user?.photoUrl ? (
            <img
              src={user.photoUrl}
              alt={user.firstName || user.username || t("profilePage.user")}
              className={styles.avatar}
            />
          ) : (
            <div className={styles.avatarPlaceholder}>
              {user?.firstName?.[0] || user?.username?.[0] || "👤"}
            </div>
          )}
          <div className={styles.profileInfo}>
            <h2 className={styles.profileName}>
              {user?.firstName || user?.username || t("profilePage.user")}
            </h2>
            <p className={styles.profileUsername}>
              @{user?.username || t("profilePage.username")}
            </p>
          </div>
        </div>
        {}
        {!tonAddress ? (
          <div className={styles.statsContainer}>
            <button
              className={styles.connectWalletButton}
              onClick={() => tonConnectUI.openModal()}
            >
              <span className={styles.buttonLabel}>{t("profilePage.connect_wallet")}</span>
            </button>
          </div>
        ) : (
          <>
            {}
            <div className={styles.statsContainer}>
              <div className={styles.statsItem}>
                <span className={styles.statsLabel}>{t("balance")}</span>
                <div className={styles.balanceRow}>
                  <span className={styles.balanceValue}>
                    {depositBalance !== null ? depositBalance.toFixed(2) : "0.00"}
                  </span>
                  <img src="/icons/coin.png" alt="TON" className={styles.coinIcon} />
                </div>
              </div>
              <div className={styles.buttonContainer}>
                <button
                  className={styles.depositButton}
                  onClick={() => setDepositModalOpen(true)}
                >
                  <span className={styles.buttonLabel}>{t("profilePage.deposit")}</span>
                </button>
              </div>
            </div>
            {}
            <div className={styles.statsContainer}>
              <div className={styles.statsItem}>
                <span className={styles.statsLabel}>{t("profilePage.connect_wallet")}</span>
                <div className={styles.balanceRow}>
                  <span className={styles.balanceValue}>
                    {tonAddress.slice(0, 6)}...{tonAddress.slice(-5)}
                  </span>
                </div>
              </div>
              <div className={styles.buttonContainer}>
                <button
                  className={styles.inventoryButton}
                  onClick={() => tonConnectUI.disconnect()}
                >
                  <span className={styles.buttonLabel}>{t("profilePage.disconnect")}</span>
                </button>
              </div>
            </div>
          </>
        )}
        {}
        <div className={styles.languageSection}>
          <h3 className={styles.sectionTitle}>{t("profilePage.language")}</h3>
          <div className={styles.languageButtons}>
            <button
              className={`${styles.languageButton} ${i18n.language === "ru" ? styles.active : ""}`}
              onClick={() => {
                i18n.changeLanguage("ru");
                localStorage.setItem("lang", "ru");
              }}
            >
              <span className={styles.languageButtonLabel}>{t("profilePage.russian")}</span>
            </button>
            <button
              className={`${styles.languageButton} ${i18n.language === "en" ? styles.active : ""}`}
              onClick={() => {
                i18n.changeLanguage("en");
                localStorage.setItem("lang", "en");
              }}
            >
              <span className={styles.languageButtonLabel}>{t("profilePage.english")}</span>
            </button>
          </div>
        </div>
      </div>
      {}
      <div className={styles.progressSection}>
        {}
        <div className={styles.levelContainer}>
          <div className={styles.levelHeader}>
            <div className={styles.levelProgress}>
              <span className={styles.levelTitle}>{t("profilePage.level")} 1</span>
              <span className={styles.levelProgressText}>Rookie</span>
            </div>
            <span className={styles.levelProgressCount}>
              {userProfile?.stats?.openingsCount || 0} / 350 {t("profilePage.cases")}
            </span>
          </div>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ width: `${((userProfile?.stats?.openingsCount || 0) / 350) * 100}%` }}
            />
          </div>
        </div>
        {}
        <div className={styles.achievementsSection}>
          <h3 className={styles.achievementsTitle}>{t("profilePage.next_rank_reward")}</h3>
          <div className={styles.achievementsList}>
            <div className={styles.achievementCard}>
              <h4 className={styles.achievementTitle}>First Case</h4>
              <p className={styles.achievementDescription}>
                Open your first case and start your journey
              </p>
            </div>
            <div className={styles.achievementCard}>
              <h4 className={styles.achievementTitle}>Lucky Strike</h4>
              <p className={styles.achievementDescription}>
                Get a rare item on your first try
              </p>
            </div>
            <div className={styles.achievementCard}>
              <h4 className={styles.achievementTitle}>Case Collector</h4>
              <p className={styles.achievementDescription}>
                Open 100 cases
              </p>
            </div>
            <div className={styles.achievementCard}>
              <h4 className={styles.achievementTitle}>High Roller</h4>
              <p className={styles.achievementDescription}>
                Open a case worth more than 50 TON
              </p>
            </div>
          </div>
        </div>
        {}
        <div className={styles.achievementsGrid}>
          <div className={styles.achievementItem}>
            <span className={styles.achievementName}>Rookie</span>
            <div className={styles.achievementIcon} style={{ backgroundImage: 'url(/temporary-case-image.png)' }} />
          </div>
          <div className={styles.achievementItem}>
            <span className={styles.achievementName}>Explorer</span>
            <div className={styles.achievementIcon} style={{ backgroundImage: 'url(/temporary-case-image.png)' }} />
          </div>
          <div className={styles.achievementItem}>
            <span className={styles.achievementName}>Drop Hunter</span>
            <div className={styles.achievementIcon} style={{ backgroundImage: 'url(/temporary-case-image.png)' }} />
          </div>
          <div className={styles.achievementItem}>
            <span className={styles.achievementName}>Case Master</span>
            <div className={styles.achievementIcon} style={{ backgroundImage: 'url(/temporary-case-image.png)' }} />
          </div>
          <div className={styles.achievementItem}>
            <span className={styles.achievementName}>Bonus Raider</span>
            <div className={styles.achievementIcon} style={{ backgroundImage: 'url(/temporary-case-image.png)' }} />
          </div>
          <div className={styles.achievementItem}>
            <span className={styles.achievementName}>Treasure</span>
            <div className={styles.achievementIcon} style={{ backgroundImage: 'url(/temporary-case-image.png)' }} />
          </div>
          <div className={styles.achievementItem}>
            <span className={styles.achievementName}>Epic Opener</span>
            <div className={styles.achievementIcon} style={{ backgroundImage: 'url(/temporary-case-image.png)' }} />
          </div>
          <div className={styles.achievementItem}>
            <span className={styles.achievementName}>Rookie</span>
            <div className={styles.achievementIcon} style={{ backgroundImage: 'url(/temporary-case-image.png)' }} />
          </div>
          {}
          <div className={`${styles.achievementItem} ${styles.locked}`}>
            <span className={styles.achievementName}>Explorer</span>
            <div className={styles.achievementIcon} style={{ backgroundImage: 'url(/temporary-case-image.png)' }} />
          </div>
          <div className={`${styles.achievementItem} ${styles.locked}`}>
            <span className={styles.achievementName}>Drop Hunter</span>
            <div className={styles.achievementIcon} style={{ backgroundImage: 'url(/temporary-case-image.png)' }} />
          </div>
          <div className={`${styles.achievementItem} ${styles.locked}`}>
            <span className={styles.achievementName}>Case Master</span>
            <div className={styles.achievementIcon} style={{ backgroundImage: 'url(/temporary-case-image.png)' }} />
          </div>
          <div className={`${styles.achievementItem} ${styles.locked}`}>
            <span className={styles.achievementName}>Bonus Raider</span>
            <div className={styles.achievementIcon} style={{ backgroundImage: 'url(/temporary-case-image.png)' }} />
          </div>
          <div className={`${styles.achievementItem} ${styles.locked}`}>
            <span className={styles.achievementName}>Treasure</span>
            <div className={styles.achievementIcon} style={{ backgroundImage: 'url(/temporary-case-image.png)' }} />
          </div>
          <div className={`${styles.achievementItem} ${styles.locked}`}>
            <span className={styles.achievementName}>Epic Opener</span>
            <div className={styles.achievementIcon} style={{ backgroundImage: 'url(/temporary-case-image.png)' }} />
          </div>
          <div className={`${styles.achievementItem} ${styles.locked}`}>
            <span className={styles.achievementName}>Explorer</span>
            <div className={styles.achievementIcon} style={{ backgroundImage: 'url(/temporary-case-image.png)' }} />
          </div>
        </div>
      </div>
      {}
      <div className={styles.inventorySection}>
        <div className={styles.inventoryTitle}>
          <span className={styles.inventoryTitleText}>
            {t("profilePage.inventory")}
          </span>
        </div>
        <div className={styles.inventoryGrid}>
            {isInventoryLoading ? (
              <div className={styles.loadingInventoryContainer}>
                <div className={styles.inventorySpinner}></div>
              </div>
            ) : inventory && inventory.length === 0 ? (
              <div className={styles.emptyInventoryContainer}>
                <div className={styles.emptyInventoryIcon}>👜</div>
                <p className={styles.emptyInventoryText}>
                  {t("inventory_empty")}
                </p>
              </div>
            ) : inventory && inventory.length > 0 ? (
              inventory.map((item: InventoryItem) => (
                <div key={item.id} className={styles.inventoryItemCard}>
                  <div className={styles.inventoryItemImageContainer}>
                    <img
                      src={item.item.imageUrl || '/temporary-case-image.png'}
                      alt={item.item.name}
                      className={styles.inventoryItemImage}
                      onError={(e) => {
                        e.currentTarget.src = '/temporary-case-image.png';
                      }}
                    />
                  </div>
                  <div className={styles.inventoryItemBottomInfo}>
                    <div className={styles.inventoryItemName}>
                      {item.item.name}
                    </div>
                    <div className={styles.inventoryItemInfoContainer}>
                      <span className={styles.inventoryItemQuantity}>
                        Qty: {item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.emptyInventoryContainer}>
                <div className={styles.emptyInventoryIcon}>⚠️</div>
                <p className={styles.emptyInventoryText}>
                  {t("profilePage.failed_to_load_inventory")}
                </p>
              </div>
            )}
        </div>
      </div>
      {}
      <DepositModal
        open={isDepositModalOpen}
        onClose={() => setDepositModalOpen(false)}
      />
    </>
  );
};
