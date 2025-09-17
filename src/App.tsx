import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTelegramWebApp } from "./hooks/useTelegramWebApp";
import { useEffect } from "react";
import { authApi } from "./services/api";
import { MainLayout } from "./components/layout/MainLayout";
import { HomePage } from "./pages/Home/HomePage";
import { CasePage } from "./pages/Case/CasePage";
import { ProfilePage } from "./pages/Profile/ProfilePage";
import { UpgradePage } from "./pages/Upgrade/UpgradePage";
import { InventoryPage } from "./pages/Inventory/InventoryPage";
import { DepositPage } from "./pages/Deposit/DepositPage";
import BonusWheelPage from "./pages/BonusWheel/BonusWheelPage";
import RacePage from "./pages/Race/RacePage";
import BattlePage from "./pages/Battle/BattlePage";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, 
    },
  },
});
function App() {
  const { isReady, initData } = useTelegramWebApp();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const realInitData = initData || (process.env.NODE_ENV === "development" ? "dev" : "");
    if (!token && realInitData) {
      authApi
        .login(realInitData)
        .then(response => {
          localStorage.setItem("token", response.token);
        })
        .catch(() => {
        });
    }
  }, [initData]);
  if (!isReady) {
    return (
      <div className="bg-telegram-bg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-telegram-text">Loading...</p>
        </div>
      </div>
    );
  }
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="case/:id" element={<CasePage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="upgrade" element={<UpgradePage />} />
            <Route path="inventory" element={<InventoryPage />} />
            <Route path="deposit" element={<DepositPage />} />
            <Route path="wheel" element={<BonusWheelPage />} />
            <Route path="bonus" element={<BonusWheelPage />} />
            <Route path="race" element={<RacePage />} />
            <Route path="battle" element={<BattlePage />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}
export default App;