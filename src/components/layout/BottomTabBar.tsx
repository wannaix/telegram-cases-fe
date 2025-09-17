import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import styles from './BottomTabBar.module.css';
const tabs = [
  {
    id: "upgrade",
    iconSrc: "/icons/flash.svg",
    label: "Upgrade",
    path: "/upgrade",
  },
  {
    id: "wheel",
    iconSrc: "/icons/round.svg",
    label: "Wheel",
    path: "/wheel",
  },
  {
    id: "home",
    iconSrc: "/icons/menu.svg",
    label: "Cases",
    path: "/",
    isMain: true,
  },
  {
    id: "race",
    iconSrc: "/icons/joystick.svg",
    label: "Race",
    path: "/race",
  },
  {
    id: "battle",
    iconSrc: "/icons/trophy.svg",
    label: "Battle",
    path: "/battle",
  },
  {
    id: "profile",
    iconSrc: "/icons/person.svg",
    label: "Profile",
    path: "/profile",
  },
];
export const BottomTabBar: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const activeTabIndex = tabs.findIndex(tab => {
    if (tab.path === '/' && location.pathname === '/') {
      return true;
    }
    if (tab.path === '/' && location.pathname.startsWith('/case/')) {
      return true;
    }
    return location.pathname.startsWith(tab.path) && tab.path !== '/';
  });
  const indicatorTransform = activeTabIndex >= 0 ? `translateX(${4 + activeTabIndex * 62}px)` : 'translateX(4px)';
  return (
    <div className={styles.tabBarContainer}>
      {}
      <div className={styles.tabBarContent}>
        {}
        {activeTabIndex >= 0 && (
          <div 
            className={styles.slidingIndicator}
            style={{ transform: indicatorTransform }}
          />
        )}
        {tabs.map((tab) => {
          return (
            <NavLink
              key={tab.id}
              to={tab.path}
              className={styles.navLink}
            >
              {({ isActive }: { isActive: boolean }) => {
                const isReallyActive = isActive || (tab.path === '/' && location.pathname.startsWith('/case/'));
                return (
                  <div className={`${styles.tabItem} ${isReallyActive ? styles.tabItemActive : ''}`}>
                  {}
                  <div className={styles.tabIcon}>
                    <img 
                      src={tab.iconSrc}
                      alt={tab.label}
                      className={styles.tabIconImage}
                    />
                  </div>
                  {}
                  {isReallyActive && (
                    <span className={styles.tabLabel}>
                      {t(tab.label)}
                    </span>
                  )}
                  </div>
                );
              }}
            </NavLink>
          );
        })}
        {}
        <div className={styles.highlight}>
          <img 
            src="/icons/Highlight.svg"
            alt="highlight"
            className={styles.highlightImage}
          />
        </div>
      </div>
    </div>
  );
};