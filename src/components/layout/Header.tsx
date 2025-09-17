import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useTelegramWebApp } from "../../hooks/useTelegramWebApp";
import { getDepositBalance } from "../../services/api";
import { subscribeToDepositEvents } from "../../services/wsApi";
import { TonConnectButton } from "@tonconnect/ui-react";
import styles from './Header.module.css';
interface HeaderProps {
  showBackButton?: boolean;
}
export const Header: React.FC<HeaderProps> = ({ showBackButton = false }) => {
  const navigate = useNavigate();
  const { user } = useTelegramWebApp();
  const { data: depositBalance } = useQuery({
    queryKey: ["userBalance"],
    queryFn: getDepositBalance,
    refetchInterval: 5000,
  });
  const displayName = user
    ? user.firstName && user.lastName
      ? `${user.firstName} ${user.lastName}`
      : user.firstName || user.username || "User"
    : "User";
  useEffect(() => {
    const unsub = subscribeToDepositEvents(() => {
      
    });
    return () => unsub();
  }, []);
  return (
    <div className={styles.header}>
      <div className={styles.headerContent}>
        {}
        <div className={styles.leftSection}>
          {showBackButton && (
            <button
              onClick={() => navigate(-1)}
              className={styles.backButton}
            >
              ←
            </button>
          )}
          <div
            className={styles.userSection}
            onClick={() => navigate("/profile")}
          >
            {user?.photoUrl ? (
              <img
                src={user.photoUrl}
                alt={displayName}
                className={styles.userAvatar}
              />
            ) : (
              <div className={styles.userAvatarFallback}>
                {displayName[0] || "👤"}
              </div>
            )}
            <span className={styles.userName}>
              {displayName}
            </span>
          </div>
        </div>
        {}
        <div className={styles.rightSection}>
          <div className={styles.balanceSection}>
            <span
              className={styles.balanceText}
              onClick={() => navigate("/profile")}
            >
              {depositBalance !== null && depositBalance !== undefined ? depositBalance.toFixed(2) : "0.00"}
            </span>
            <img src="/icons/coin.png" alt="TON" className={styles.coinIcon} />
          </div>
          
          <div className={styles.walletSection}>
            <TonConnectButton className={styles.tonConnectButton} />
          </div>
        </div>
      </div>
    </div>
  );
};