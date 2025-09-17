import React, { useState, useEffect } from "react";
import styles from './DepositModal.module.css';
import { useTonConnectUI } from "@tonconnect/ui-react";
import { createCryptoBotInvoice } from "../../services/api";
import { subscribeToDepositEvents } from "../../services/wsApi";
import { useTranslation } from "react-i18next";
interface DepositModalProps {
  open: boolean;
  onClose: () => void;
}
type Step = "select" | "ton" | "cryptobot";
type Method = "ton" | "cryptobot" | "gifts";
const DepositModal: React.FC<DepositModalProps> = ({ open, onClose }) => {
  const [tonConnectUI] = useTonConnectUI();
  const [step, setStep] = useState<Step>("select");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [, setSelectedMethod] = useState<Method | null>(null);
  const [waitDeposit, setWaitDeposit] = useState(false);
  const [depositSuccess, setDepositSuccess] = useState(false);
  const { t } = useTranslation();
  useEffect(() => {
    if (!waitDeposit) return;
    const unsub = subscribeToDepositEvents(() => {
      setDepositSuccess(true);
      setTimeout(() => {
        setWaitDeposit(false);
        setDepositSuccess(false);
        onClose();
      }, 1200);
    });
    return () => {
      unsub();
    };
  }, [waitDeposit]);
  if (!open) return null;
  const handleSelect = (method: Method) => {
    if (method === "ton" || method === "cryptobot") {
      setSelectedMethod(method);
      setStep(method);
    } else {
    }
  };
  const handleBack = () => {
    setStep("select");
    setAmount("");
    setSelectedMethod(null);
  };
  const handleDeposit = async () => {
    setLoading(true);
    if (step === "ton") {
      try {
        const nanoAmount = Math.floor(Number(amount) * 1e9);
        await tonConnectUI.sendTransaction({
          validUntil: Math.floor(Date.now() / 1000) + 600,
          messages: [
            {
              address: "UQB48BKzQc_Z2yeaxcao_gvxRiJ4FGnqsW30ORzaXxcUX0bY",
              amount: nanoAmount.toString(),
            },
          ],
        });
        setWaitDeposit(true);
        setLoading(false);
        return;
      } catch {
        setLoading(false);
        return;
      }
    }
    if (step === "cryptobot") {
      try {
        const { invoiceUrl } = await createCryptoBotInvoice(amount);
        if (invoiceUrl) {
          window.open(invoiceUrl, "_blank");
          setWaitDeposit(true);
        } else {
          alert("Ошибка создания инвойса CryptoBot");
        }
        setLoading(false);
        return;
      } catch {
        setLoading(false);
        alert("Ошибка создания инвойса CryptoBot");
        return;
      }
    }
    setTimeout(() => {
      setLoading(false);
      onClose();
    }, 1000);
  };
  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40">
      <div className="bg-gray-900 rounded-t-2xl w-full max-w-md p-6 pb-8 shadow-lg mx-[15px]">
        <div className="flex justify-between items-center mb-4">
          {step !== "select" ? (
            <button className="text-white text-2xl mr-2" onClick={handleBack}>
              ←
            </button>
          ) : (
            <div className={styles.spacer} />
          )}{" "}
          <h2 className="text-xl font-bold text-center flex-1 text-white">
            {step === "select" && t('profilePage.deposit')}
            {step === "ton" && "TON Deposit"}
            {step === "cryptobot" && "CryptoBot Deposit"}
          </h2>
          <button
            className="text-gray-400 hover:text-white text-2xl ml-2"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        {step === "select" && (
          <>
            <p className="text-gray-400 mb-6 text-center">
              {t('profilePage.select_a_deposit_method')}
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => handleSelect("ton")}
                className="flex flex-col items-center justify-center rounded-2xl p-5 w-28 h-36 bg-gradient-to-b from-blue-500 to-blue-800 shadow-lg hover:scale-105 transition-transform"
              >
                <img
                  src="/icons/coin.png"
                  alt="Ton"
                  className="w-12 h-12 mb-4"
                />
                <span className="text-white font-semibold text-lg">Ton</span>
              </button>
              <button
                onClick={() => handleSelect("cryptobot")}
                className="flex flex-col items-center justify-center rounded-2xl p-5 w-28 h-36 bg-gradient-to-b from-blue-400 to-blue-700 shadow-lg hover:scale-105 transition-transform"
              >
                <span className="text-5xl mb-4">🤖</span>
                <span className="text-white font-semibold text-lg">
                  CryptoBot
                </span>
              </button>
              <button
                onClick={() => handleSelect("gifts")}
                className="flex flex-col items-center justify-center rounded-2xl p-5 w-28 h-36 bg-gradient-to-b from-green-400 to-green-700 shadow-lg hover:scale-105 transition-transform"
              >
                <span className="text-5xl mb-4">🎁</span>
                <span className="text-white font-semibold text-lg">Gifts</span>
              </button>
            </div>
          </>
        )}
        {(step === "ton" || step === "cryptobot") && !waitDeposit && (
          <>
            <p className="text-gray-400 mb-6 text-center">
              {t('profile.enter_the_deposit_amount')}
            </p>
            <div className="relative mb-6">
              <input
                type="number"
                min="0"
                step="any"
                className="w-full rounded-lg bg-gray-800 text-white placeholder-gray-500 border border-gray-600 py-4 pl-4 pr-12 text-lg outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Введите сумму"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled={loading}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2">
                <img src="/icons/coin.png" alt="TON" className="w-6 h-6" />
              </span>
            </div>
            <button
              className={`w-full py-3 rounded-xl text-lg font-semibold transition ${
                amount
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-blue-900 text-blue-400 cursor-not-allowed"
              }`}
              disabled={!amount || loading}
              onClick={handleDeposit}
            >
              {loading ? "Загрузка..." : "Deposit"}
            </button>
          </>
        )}
        {waitDeposit && (
          <div className="flex flex-col items-center justify-center gap-6 py-8">
            {depositSuccess ? (
              <>
                <div className="text-green-400 text-3xl">✓</div>
                <div className="text-white text-lg">
                  {t('profile.deposit_has_been_credited')}
                </div>
              </>
            ) : (
              <>
                <div className="text-white text-lg text-center">{t('profile.waiting_for_deposit_to_be_credited')}</div>
                <div className="text-gray-400 text-center text-sm">{t('profile.this_may_take_up_to_2_minutes')}</div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default DepositModal;
declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        openTelegramLink?: (url: string) => void;
      };
    };
  }
}
