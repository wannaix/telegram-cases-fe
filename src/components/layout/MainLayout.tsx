import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { BottomTabBar } from "./BottomTabBar";
import { Header } from "./Header";
import styles from './MainLayout.module.css';
export const MainLayout: React.FC = () => {
  const location = useLocation();
  const showBackButton = location.pathname.startsWith("/case/");
  return (
    <div className={`${styles.container}`}>
      {}
      <Header showBackButton={showBackButton} />
      {}
      <main>
        <div className="max-w-5xl mx-auto px-4 w-full">
          <Outlet />
        </div>
      </main>
      {}
      <BottomTabBar />
    </div>
  );
};
