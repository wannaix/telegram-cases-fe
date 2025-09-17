import React from "react";
import { useTranslation } from "react-i18next";
interface UpgradeControlsProps {
  selectedCoef: number | null;
  setSelectedCoef: (coef: number | null) => void;
  selectedTab: "inventory" | "desired";
  setSelectedTab: (tab: "inventory" | "desired") => void;
  isStarted: boolean;
  setIsStarted: (started: boolean) => void;
  selectedCase: {
    id: number;
    name: string;
    price: number;
    image: string;
  } | null;
}
const COEFS = [1.5, 2, 3, 5, 10, 20];
export const UpgradeControls: React.FC<UpgradeControlsProps> = ({
  selectedCoef,
  setSelectedCoef,
  selectedTab,
  setSelectedTab,
  isStarted,
  setIsStarted,
  selectedCase,
}) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-row justify-between items-center p-0 gap-6 w-[358px] h-14">
        <div className="flex flex-col items-start p-0 gap-1 w-[81px] h-14">
          <div className="w-[72px] h-4 text-white text-[13px] font-normal leading-4 text-left -tracking-[0.08px]">
            {t("upgradePage.bet_amount")}
          </div>
          <div className="box-border flex flex-row items-center py-1 px-2 gap-1 w-[81px] h-9 border border-black/5 backdrop-blur-sm rounded-[10px]">
            <div className="w-[37px] h-[22px] text-white text-[17px] font-semibold leading-[22px] -tracking-[0.4px] text-shadow-[0_4px_16px_rgba(0,0,0,0.75)]">
              0.00
            </div>
            <img src="/icons/coin.png" alt="Coin" className="w-7 h-7" />
          </div>
        </div>
        <div className="flex flex-col items-end p-0 gap-1 w-[81px] h-14">
          <div className="w-[81px] h-4 text-white text-[13px] font-normal leading-4 text-right -tracking-[0.08px]">
            {t("upgradePage.desired_prize")}
          </div>
          <div className="box-border flex flex-row items-center py-1 px-2 gap-1 w-[81px] h-9 border border-black/5 backdrop-blur-sm rounded-[10px]">
            <div className="w-[37px] h-[22px] text-white text-[17px] font-semibold leading-[22px] -tracking-[0.4px]">
              0.00
            </div>
            <img src="/icons/coin.png" alt="Coin" className="w-7 h-7" />
          </div>
        </div>
      </div>
      <div className="flex flex-row items-start p-0 gap-3 w-[358px] h-11 mt-5">
        {COEFS.map((coef) => (
          <button
            key={coef}
            className={`box-border flex flex-row justify-center items-center py-[10px] px-3 gap-2 flex-1 h-11 rounded backdrop-blur-sm transition-colors border ${
              selectedCoef === coef
                ? "bg-[rgba(41,144,255,0.2)] border-[#2990FF]"
                : "bg-[#1A2242] border-transparent"
            }`}
            onClick={() => setSelectedCoef(selectedCoef === coef ? null : coef)}
          >
            <span className="text-white text-base font-semibold leading-6 tracking-[0.15px]">
              x{coef}
            </span>
          </button>
        ))}
      </div>
      <button
        className="flex flex-row justify-center items-center py-[15px] px-3 gap-[10px] w-[358px] min-w-[50px] h-[50px] bg-[#007AFF] rounded-[10px] disabled:opacity-50 disabled:cursor-not-allowed transition-opacity mt-5"
        disabled={!selectedCoef || !selectedCase || isStarted}
        onClick={() => setIsStarted(true)}
      >
        <span className="w-[70px] h-[22px] text-white text-[17px] font-semibold leading-[22px] text-center -tracking-[0.4px]">
          {t("upgradePage.upgrade")}
        </span>
      </button>
      <div className="relative flex flex-row items-end p-1 gap-1 w-[358px] h-14 bg-[#1A2242] backdrop-blur-sm rounded-[10px] mt-5">
        <div
          className={`absolute top-1 h-12 w-[calc(50%-2px)] bg-[rgba(41,144,255,0.2)] border border-[#2990FF] rounded-xl shadow-[0px_0px_2px_1px_rgba(0,0,0,0.02)] drop-shadow-[0px_32px_64px_rgba(0,0,0,0.04)] transition-transform duration-300 ease-in-out ${
            selectedTab === "inventory"
              ? "translate-x-0"
              : "translate-x-[calc(100%+4px)]"
          }`}
        />
        <button
          className="relative flex flex-row items-center justify-center p-0 gap-[10px] flex-1 h-12 rounded-xl z-10"
          onClick={() => setSelectedTab("inventory")}
        >
          <span className="text-white text-[19px] font-semibold leading-6 text-center -tracking-[0.45px] text-shadow-[0px_4px_16px_rgba(0,0,0,0.75)]">
            {t("upgradePage.your_inventory")}
          </span>
        </button>
        <button
          className="relative flex flex-row items-center justify-center p-0 gap-[10px] flex-1 h-12 rounded-xl z-10"
          onClick={() => setSelectedTab("desired")}
        >
          <span className="text-white text-[19px] font-semibold leading-6 text-center -tracking-[0.45px] text-shadow-[0px_4px_16px_rgba(0,0,0,0.75)]">
            {t("upgradePage.desired_gift")}
          </span>
        </button>
      </div>
    </div>
  );
};
