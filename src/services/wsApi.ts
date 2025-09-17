import type { LiveDrop } from "../types";
const WS_LIVE_DROPS_URL = "wss://telegram-cases-be.onrender.com/api/live-drops/";
export function subscribeToLiveDrops(onDrop: (drop: LiveDrop) => void) {
  const ws = new window.WebSocket(WS_LIVE_DROPS_URL);
  ws.onmessage = (event) => {
    try {
      const drop: LiveDrop = JSON.parse(event.data);
      onDrop(drop);
    } catch {
      return;
    }
  };
  return () => ws.close();
}
const WS_DEPOSIT_URL = "wss://telegram-cases-be.onrender.com/api/deposit";
export function subscribeToDepositEvents(onDeposit: (event: { type: string; amount: number }) => void) {
  const token = localStorage.getItem("token");
  const ws = new window.WebSocket(WS_DEPOSIT_URL);
  ws.onopen = () => {
    if (token) {
      ws.send(JSON.stringify({ type: "auth", token }));
    }
  };
  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      if (data.type === "deposit_credited") {
        onDeposit(data);
      }
    } catch {}
  };
  return () => ws.close();
} 