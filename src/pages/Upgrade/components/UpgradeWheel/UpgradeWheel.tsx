import React, { useEffect, useState } from "react";
import { upgradeApi } from "../../../../services/api";
import styles from './UpgradeWheel.module.css';
const SUCCESS_COLOR = "#3bff7a";
const FAIL_COLOR = "#ff3b3b";
const BASE_COLOR = "#3bc6ff";
interface UpgradeWheelProps {
  chance: number;
  imageUrl: string;
  selectedCoef: number | null;
  isStarted: boolean;
  selectedCase?: {id: number, name: string, price: number, image: string} | null;
  onResult?: (result: "success" | "fail") => void;
}
export const UpgradeWheel: React.FC<UpgradeWheelProps> = ({
  chance,
  selectedCoef,
  isStarted,
  selectedCase,
  onResult,
}) => {
  const [angle, setAngle] = useState(0);
  const [result, setResult] = useState<null | "success" | "fail">(null);
  const [dynamicOpacity, setDynamicOpacity] = useState(1);
  const targetChance = selectedCoef ? chance / selectedCoef : chance;
  const [displayChance, setDisplayChance] = useState(targetChance);
  useEffect(() => {
    let frame: number;
    const duration = 400;
    const start = performance.now();
    const initial = displayChance;
    const delta = targetChance - initial;
    if (Math.abs(delta) < 0.0001) return;
    function animate(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 0.5 - 0.5 * Math.cos(Math.PI * progress);
      setDisplayChance(initial + delta * eased);
      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      } else {
        setDisplayChance(targetChance);
      }
    }
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [targetChance]);
  useEffect(() => {
    if (!isStarted || result !== null) return;
    let cancelled = false;
    async function startRoll() {
      try {
        const apiRes = await upgradeApi.roll(chance, selectedCoef!);
        if (!apiRes) {
          return;
        }
        const finalSectorAngle = apiRes.rolled * 360;
        const fullSpins = 5;
        const endAngle = 360 * fullSpins + finalSectorAngle;
        const duration = 5000;
        const start = performance.now();
        function animate(now: number) {
          if (cancelled) return;
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const ease = 0.5 - 0.5 * Math.cos(Math.PI * progress);
          const currentAngle = endAngle * ease;
          const opacity =
            0.85 + 0.15 * Math.sin((currentAngle * Math.PI) / 180);
          setAngle(currentAngle);
          setDynamicOpacity(opacity);
          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            setAngle(endAngle);
            setDynamicOpacity(1);
            const finalResult = apiRes.success ? "success" : "fail";
            setResult(finalResult);
            setTimeout(() => {
              onResult?.(finalResult);
            }, 500);
          }
        }
        setAngle(0);
        requestAnimationFrame(animate);
      } catch {
        setResult("fail");
        setTimeout(() => {
          onResult?.("fail");
        }, 500);
      }
    }
    startRoll();
    return () => {
      cancelled = true;
    };
  }, [isStarted, chance, selectedCoef]);
  useEffect(() => {
    setResult(null);
    setAngle(0);
    setDynamicOpacity(1);
  }, [selectedCoef]);
  const startAngle = 0;
  const endAngle = startAngle + 360 * displayChance;
  const polarToCartesian = (cx: number, cy: number, r: number, deg: number) => {
    const rad = ((deg - 90) * Math.PI) / 180.0;
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
    };
  };
  const describeArc = (
    cx: number,
    cy: number,
    r: number,
    start: number,
    end: number
  ) => {
    const s = polarToCartesian(cx, cy, r, end);
    const e = polarToCartesian(cx, cy, r, start);
    const largeArc = end - start <= 180 ? 0 : 1;
    return ["M", e.x, e.y, "A", r, r, 0, largeArc, 1, s.x, s.y].join(" ");
  };
  const pointerAngle = angle % 360;
  const color =
    result === "success"
      ? SUCCESS_COLOR
      : result === "fail"
      ? FAIL_COLOR
      : BASE_COLOR;
  return (
    <div className="flex flex-col items-center justify-center">
      <div className={styles.wheelContainer}>
        <div>
          <svg
            width="308"
            height="308"
            viewBox="0 0 308 308"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M154 0.5C238.625 0.500074 307.23 69.2235 307.23 154C307.23 238.776 238.625 307.5 154 307.5C69.3747 307.5 0.77063 238.777 0.77063 154C0.77063 69.2235 69.3747 0.5 154 0.5Z"
              fill="#1A2242"
              opacity={isStarted ? dynamicOpacity : 1}
              stroke={color}
            />
            <circle
              opacity="0.1"
              cx="154"
              cy="154"
              r="119.5"
              fill="#2990FF"
              stroke="#1A2242"
            />
            <path
              stroke={color}
              opacity={isStarted ? dynamicOpacity : 1}
              d="M143.223 239.294L142.03 248.747L143.226 239.294C143.391 239.315 143.556 239.335 143.722 239.355L142.526 248.81L141.534 248.685L142.728 239.228C142.893 239.25 143.058 239.273 143.223 239.294ZM166.466 248.685L165.474 248.81L164.286 239.42C164.452 239.401 164.617 239.38 164.782 239.359L165.97 248.747L164.784 239.359C164.95 239.339 165.115 239.32 165.28 239.299L166.466 248.685ZM122.369 233.885L118.844 242.794L122.371 233.886C122.526 233.948 122.681 234.01 122.836 234.071L119.309 242.978L118.844 242.794L118.379 242.609L121.905 233.698C122.06 233.761 122.214 233.823 122.369 233.885ZM189.621 242.609L189.156 242.794L188.692 242.978L185.235 234.253C185.391 234.193 185.546 234.133 185.701 234.072L189.156 242.794L185.704 234.071C185.859 234.01 186.013 233.948 186.168 233.886L189.621 242.609ZM103.54 223.448L97.8663 231.261L103.542 223.45C103.677 223.549 103.812 223.646 103.947 223.743L98.2716 231.555L98.2706 231.554V231.555L97.462 230.967L103.138 223.151C103.272 223.251 103.406 223.35 103.54 223.448ZM210.538 230.967L209.73 231.555H209.729L207.971 229.135L204.238 223.999C204.374 223.902 204.509 223.805 204.644 223.707L210.134 231.261L204.646 223.705C204.781 223.607 204.916 223.51 205.05 223.411L210.538 230.967ZM87.8947 208.685L80.4161 214.874L87.8956 208.687C88.0017 208.815 88.1092 208.942 88.2159 209.07L80.7345 215.26L80.0978 214.488L87.5782 208.297C87.6836 208.426 87.7885 208.556 87.8947 208.685ZM227.902 214.488L227.266 215.26L220.102 209.335C220.209 209.207 220.316 209.079 220.423 208.951L227.584 214.874L220.424 208.949C220.531 208.821 220.637 208.693 220.743 208.564L227.902 214.488ZM76.1779 190.066C76.2478 190.218 76.318 190.369 76.3888 190.52L67.589 194.662L76.3898 190.521C76.4606 190.672 76.532 190.822 76.6036 190.973L67.8019 195.114L67.3761 194.21L76.1779 190.066ZM240.624 194.21L240.198 195.114L231.837 191.181C231.909 191.031 231.981 190.88 232.052 190.729L240.411 194.662L232.053 190.728C232.124 190.577 232.196 190.427 232.267 190.275L240.624 194.21ZM69.7687 170.065L60.1915 171.895L69.7697 170.068C69.8006 170.232 69.8325 170.396 69.8644 170.56L60.2853 172.386L60.0978 171.403L69.6779 169.574C69.7078 169.738 69.7378 169.902 69.7687 170.065ZM247.902 171.403L247.715 172.386L238.655 170.658C238.687 170.495 238.72 170.332 238.751 170.168L247.809 171.895L238.752 170.165C238.783 170.002 238.813 169.838 238.843 169.674L247.902 171.403ZM68.4689 148.116C68.4576 148.282 68.446 148.449 68.4357 148.615L58.6886 148.004L68.4357 148.618C68.4254 148.784 68.4167 148.951 68.4073 149.117L58.6573 148.503L58.7198 147.505L68.4689 148.116ZM249.343 148.503L240.13 149.083C240.121 148.917 240.112 148.75 240.102 148.584L249.312 148.004L240.102 148.582C240.091 148.416 240.08 148.249 240.068 148.083L249.28 147.505L249.343 148.503ZM64.423 124.369L72.588 127.021C72.5358 127.179 72.4831 127.337 72.4318 127.495L63.174 124.489L72.4308 127.498C72.3795 127.657 72.3298 127.816 72.2794 127.975L63.0197 124.965L63.3282 124.014H63.3292L64.423 124.369ZM244.981 124.965L236.21 127.815C236.159 127.657 236.109 127.497 236.058 127.339L244.826 124.489L236.057 127.337C236.005 127.178 235.952 127.02 235.9 126.862L244.672 124.014L244.981 124.965ZM81.839 107.611C81.7489 107.752 81.6607 107.893 81.5714 108.034L73.3663 102.828L81.5704 108.036C81.4812 108.177 81.3913 108.318 81.3029 108.459L73.0988 103.251L73.3663 102.828L73.6349 102.406L81.839 107.611ZM234.634 102.828L234.901 103.251L227.082 108.214C226.993 108.073 226.904 107.932 226.815 107.791L234.634 102.828L226.814 107.789C226.724 107.648 226.633 107.508 226.542 107.368L234.365 102.406L234.634 102.828ZM95.6202 91.0996C95.4983 91.2133 95.3772 91.328 95.256 91.4424L88.6261 84.3838L95.254 91.4443C95.1329 91.5586 95.0112 91.6721 94.8907 91.7871L88.2609 84.7256L88.9904 84.041L95.6202 91.0996ZM219.739 84.7256L213.362 91.5166C213.241 91.4022 213.121 91.2876 212.999 91.1738L219.374 84.3838L212.997 91.1719C212.875 91.058 212.752 90.9452 212.63 90.832L219.01 84.041L219.739 84.7256ZM113.063 78.4951C112.916 78.5751 112.771 78.6565 112.625 78.7373L107.992 70.3125L112.623 78.7383C112.477 78.8191 112.332 78.8998 112.187 78.9814L107.555 70.5537L107.992 70.3125L108.431 70.0723L113.063 78.4951ZM200.008 70.3125L200.445 70.5537L195.94 78.751C195.794 78.6702 195.648 78.5897 195.502 78.5098L200.008 70.3125L195.5 78.5088C195.354 78.4287 195.207 78.3488 195.061 78.2695L199.569 70.0723L200.008 70.3125ZM133.109 70.6211C132.948 70.662 132.786 70.7033 132.625 70.7451L130.25 61.5L132.622 70.7451C132.461 70.787 132.3 70.8303 132.139 70.873L129.766 61.625L130.25 61.5L130.734 61.376L133.109 70.6211ZM177.75 61.5L178.234 61.625L175.895 70.7393C175.733 70.6975 175.572 70.657 175.41 70.6162L177.75 61.5L175.407 70.6152C175.246 70.5745 175.085 70.534 174.923 70.4941L177.266 61.376L177.75 61.5ZM154.501 67.999C154.424 67.9988 154.347 67.998 154.271 67.998C154.181 67.998 154.091 67.9987 154.001 67.999L154 58.5L153.998 67.999C153.831 67.9995 153.665 68.0005 153.498 68.002L153.5 58.5H154.5L154.501 67.999Z"
              fill="#2990FF"
            />
          </svg>
        </div>
        <div className={styles.wheelSvgLayer}>
          <svg width="308" height="308" viewBox="0 0 308 308" fill="none">
            <circle
              cx="154"
              cy="154"
              r="137"
              stroke="#23242a"
              strokeWidth="16"
              fill="none"
              opacity="0"
            />
            <path
              d={describeArc(154, 154, 137, startAngle, endAngle)}
              stroke={color}
              strokeWidth="16"
              fill="none"
              strokeLinecap="round"
              className={styles.circle}
              opacity={isStarted ? dynamicOpacity : 1}
            />
          </svg>
        </div>
        <div className={styles.wheelSvgLayer}>
          <svg width="308" height="308" viewBox="0 0 308 308" fill="none">
            <g transform={`rotate(${pointerAngle} 154 154)`}>
              <path
                d="M152.616 36.1787C153.41 35.0095 155.132 35.0094 155.926 36.1787L160.35 42.6982C164.67 44.9103 167.628 49.4072 167.628 54.5947C167.628 61.9714 161.647 67.9521 154.271 67.9521C146.894 67.9519 140.914 61.9713 140.914 54.5947C140.914 49.4075 143.871 44.9104 148.191 42.6982L152.616 36.1787Z"
                fill="white"
              />
              <path
                d="M153.424 40.5371C153.815 39.9108 154.727 39.9108 155.119 40.5371L159.329 47.2685C159.745 47.9346 159.267 48.7988 158.481 48.7988H150.061C149.276 48.7988 148.797 47.9345 149.213 47.2685L153.424 40.5371Z"
                fill={color}
              />
              <path
                d="M151.857 45.7702C153.248 44.5844 155.294 44.5844 156.686 45.7702C157.282 46.2783 158.024 46.5854 158.804 46.6477C160.627 46.7931 162.074 48.2402 162.219 50.0625C162.282 50.8434 162.589 51.5848 163.097 52.181C164.283 53.5725 164.283 55.619 163.097 57.0104C162.589 57.6066 162.282 58.348 162.219 59.1289C162.074 60.9512 160.627 62.3983 158.804 62.5437C158.024 62.6061 157.282 62.9131 156.686 63.4213C155.294 64.607 153.248 64.607 151.857 63.4213C151.26 62.9131 150.519 62.6061 149.738 62.5437C147.916 62.3983 146.469 60.9512 146.323 59.1289C146.261 58.348 145.954 57.6066 145.446 57.0104C144.26 55.619 144.26 53.5725 145.446 52.181C145.954 51.5848 146.261 50.8434 146.323 50.0625C146.469 48.2402 147.916 46.7931 149.738 46.6477C150.519 46.5854 151.26 46.2783 151.857 45.7702Z"
                fill={color}
              />
            </g>
          </svg>
        </div>
        <div 
          className={styles.wheelCenterContent}
          style={{ "--wheel-color": color } as React.CSSProperties}
        >
          {selectedCase && (
            <div className={styles.wheelCaseImageContainer}>
              <img
                src={selectedCase.image}
                alt={selectedCase.name}
                className={styles.wheelCaseImage}
              />
            </div>
          )}
          <div
            className={`${styles.wheelChanceText} ${
              selectedCase ? styles.wheelChanceTextWithImage : styles.wheelChanceTextDefault
            }`}
          >
            {(displayChance * 100).toFixed(1)}%
          </div>
        </div>
      </div>
    </div>
  );
};