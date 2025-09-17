import React from "react";
import styles from "./RacePage.module.css";
import { useTranslation } from "react-i18next";
const RacePage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.notification}>
          <div className={styles.notificationFrame}>
            <div className={styles.notificationLabel}>
              {t("racePage.race_will_start_in")} 2h 32m
            </div>
          </div>
        </div>
        <div className={styles.timer}>
          <div className={styles.timerContainer}>
            <div className={styles.timerBg}>
              <div className={styles.timerLabel}>{t("racePage.timer_for_next_race")}</div>
              <div className={styles.timerTitle}>00:00:00</div>
            </div>
          </div>
        </div>
        <div className={styles.buttons}>
          <button className={styles.buttonSecondary}>
            <span className={styles.buttonLabel}>{t("racePage.how_to_earn_points")}</span>
          </button>
          <button className={styles.buttonPrimary}>
            <span className={styles.buttonLabel}>{t("racePage.view_prizes")}</span>
          </button>
        </div>
        <div className={styles.raceContent}>
          {[1, 2, 3, 4, 5, 6].map((_, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.cardTitle}>#{index + 1}</div>
              <div className={styles.cardAvatar}>
                <img
                  src="/images/avatar.png"
                  alt="Avatar"
                />
                <div className={styles.avatarTitle}>
                  <div className={styles.avatarName}>@user123</div>
                </div>
              </div>
              <div className={styles.cardBalance}>
                <div className={styles.balanceTitle}>8120 pts</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.giveaway}>
        <div className={styles.giveawayTitle}>
          {t("racePage.giveaway_for_telegram_subscribers")}
        </div>
        <div className={styles.giveawayContainer}>
          <div className={styles.giveawayContent}>
            <div className={styles.packsRow}>
              <div className={styles.packCard}>
                <div className={styles.packImageContainer}>
                  <img
                    src="/images/Property 1=FREE - 6.png"
                    alt="Case"
                    className={styles.packImage}
                  />
                </div>
                <div className={styles.packInfo}>
                  <div className={styles.packName}>{t("racePage.gift_drop")}</div>
                  <div className={styles.packPriceLayout}>
                    <span className={styles.packPriceText}>11</span>
                    <img src="/icons/coin.png" alt="Coin" className={styles.packCoinIcon} />
                  </div>
                </div>
              </div>
              <div className={styles.packInfoCard}>
                <div className={styles.packLabel}>Description</div>
                <div className={styles.packDescription}>
                  {t("racePage.win_a_case_worth")} 1000 {t("racePage.coins")}!
                </div>
              </div>
            </div>
            {}
            <button className={styles.giveawayButton}>
              <span className={styles.giveawayButtonLabel}>{t("racePage.participate")}</span>
            </button>
            {}
            <div className={styles.giveawayEntry}>
              <img src="/icons/giftomus.svg" alt="Giftomus" />
              <div className={styles.entryLabel}>
                {t("racePage.link_for_a_channel_giftomus")}
              </div>
            </div>
            <div className={styles.giveawayFooter}>
              {t("racePage.to_participate_subscribe_to_our_telegram_channel")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RacePage;
