import React, { useEffect, useState } from "react";
import type { LiveDrop } from "../../../types";
import { subscribeToLiveDrops } from "../../../services/wsApi";
import styles from './LiveDropFeed.module.css';
import { getImageSrc } from '../../../utils/image';
export const LiveDropFeed: React.FC = () => {
  const [drops, setDrops] = useState<LiveDrop[]>([]);
  const [animatingDrops, setAnimatingDrops] = useState<Set<string>>(new Set());
  const visibleCount = 30;
  useEffect(() => {
    const unsubscribe = subscribeToLiveDrops((drop) => {
      const dropKey = drop.id + drop.timestamp;
      setAnimatingDrops(prev => new Set([...prev, dropKey]));
      setDrops((prev) => {
        const next = [drop, ...prev];
        const unique = Array.from(
          new Map(next.map((d) => [d.id + d.timestamp, d])).values()
        );
        return unique.slice(0, 50);
      });
    });
    return unsubscribe;
  }, []);
  const visibleDrops = drops.slice(0, visibleCount);
  return (
    <div className={`w-full flex items-center mt-2 mb-4 ${styles.mainContainer}`}>
      <div className={styles.liveIndicator}>
        <span className={styles.liveText}>Live</span>
        <div className={styles.liveDot} />
      </div>
      <div className="flex-1 overflow-x-auto scrollbar-hide">
        <div className={`flex ${styles.dropsContainer}`}>
          {visibleDrops.map((drop) => {
            const dropKey = drop.id + drop.timestamp;
            const isAnimating = animatingDrops.has(dropKey);
            return (
              <div
                key={dropKey}
                className={`${styles.dropItem} ${isAnimating ? styles.dropItemNew : ''}`}
              >
              <div className={styles.userInfoRow}>
                <div className={styles.userInfo}>
                  <div 
                    className={styles.userAvatar}
                    style={drop.user.avatar ? { 
                      backgroundImage: `url(${drop.user.avatar})` 
                    } : {}}
                  >
                    {!drop.user.avatar && (
                      <span className={styles.userAvatarIcon}>
                        👤
                      </span>
                    )}
                  </div>
                  <span className={styles.userName} title={drop.user.username}>
                    {drop.user.username}
                  </span>
                </div>
                <div className={styles.caseIconContainer}>
                  <img
                    key={`case-${drop.case.id}`}
                    src={getImageSrc(drop.case.imageUrl, drop.case.imageBase64)}
                    alt={drop.case.name}
                    className={styles.caseIcon}
                    onError={e => { e.currentTarget.src = '/temporary-case-image.png'; }}
                  />
                </div>
              </div>
              <img
                key={`item-${drop.item.id}`}
                src={drop.item.imageUrl}
                alt={drop.item.name}
                className={styles.itemImage}
                onError={e => { e.currentTarget.src = '/temporary-case-image.png'; }}
              />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};