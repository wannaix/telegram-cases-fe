import React, { useState, useRef } from "react";
import styles from "./BattlePage.module.css";
const BattlePage: React.FC = () => {
  const [isSpinningLeft, setIsSpinningLeft] = useState(false);
  const [isSpinningRight, setIsSpinningRight] = useState(false);
  const [scrollPositionLeft, setScrollPositionLeft] = useState(0);
  const [scrollPositionRight, setScrollPositionRight] = useState(0);
  const animationRefLeft = useRef<number>(undefined);
  const animationRefRight = useRef<number>(undefined);
  const [leftInventoryPrices] = useState(() => [
    Math.floor(Math.random() * 10) + 1,
    Math.floor(Math.random() * 10) + 1
  ]);
  const [rightInventoryPrices] = useState(() => [
    Math.floor(Math.random() * 10) + 1,
    Math.floor(Math.random() * 10) + 1
  ]);
  const caseImages = [
    "/images/Property 1=FREE - 1.png",
    "/images/Property 1=FREE - 3.png", 
    "/images/Property 1=FREE - 6.png",
    "/images/Property 1=FREE - 10.png",
    "/images/Property 1=FREE - 15.png",
    "/images/Property 1=FREE - 20.png",
    "/images/Property 1=FREE - 25.png",
  ];
  const handleSpinLeft = async () => {
    if (isSpinningLeft) return;
    setIsSpinningLeft(true);
    const mockApiResponse = {
      winningCaseIndex: Math.floor(Math.random() * caseImages.length),
      spins: 3 + Math.random() * 2
    };
    const caseHeight = 90;
    const fullSpins = 3;
    const cycleLength = caseImages.length * caseHeight;
    const targetCasePosition = mockApiResponse.winningCaseIndex * caseHeight;
    const finalPosition = scrollPositionLeft + (fullSpins * cycleLength) + targetCasePosition;
    const duration = 3000;
    const startTime = performance.now();
    const startPosition = scrollPositionLeft;
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 0.5 - 0.5 * Math.cos(Math.PI * progress);
      const currentPosition = startPosition + (finalPosition - startPosition) * ease;
      setScrollPositionLeft(currentPosition);
      if (progress < 1) {
        animationRefLeft.current = requestAnimationFrame(animate);
      } else {
        setIsSpinningLeft(false);
        console.log(`Left winning case: ${caseImages[mockApiResponse.winningCaseIndex]}`);
        const cycleLength = caseImages.length * caseHeight;
        const finalCyclePosition = currentPosition % cycleLength;
        setScrollPositionLeft(finalCyclePosition);
      }
    };
    animationRefLeft.current = requestAnimationFrame(animate);
  };
  const handleSpinRight = async () => {
    if (isSpinningRight) return;
    setIsSpinningRight(true);
    const mockApiResponse = {
      winningCaseIndex: Math.floor(Math.random() * caseImages.length),
      spins: 3 + Math.random() * 2
    };
    const caseHeight = 90;
    const fullSpins = 3;
    const cycleLength = caseImages.length * caseHeight;
    const targetCasePosition = mockApiResponse.winningCaseIndex * caseHeight;
    const finalPosition = scrollPositionRight + (fullSpins * cycleLength) + targetCasePosition;
    const duration = 3000;
    const startTime = performance.now();
    const startPosition = scrollPositionRight;
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 0.5 - 0.5 * Math.cos(Math.PI * progress);
      const currentPosition = startPosition + (finalPosition - startPosition) * ease;
      setScrollPositionRight(currentPosition);
      if (progress < 1) {
        animationRefRight.current = requestAnimationFrame(animate);
      } else {
        setIsSpinningRight(false);
        console.log(`Right winning case: ${caseImages[mockApiResponse.winningCaseIndex]}`);
        const cycleLength = caseImages.length * caseHeight;
        const finalCyclePosition = currentPosition % cycleLength;
        setScrollPositionRight(finalCyclePosition);
      }
    };
    animationRefRight.current = requestAnimationFrame(animate);
  };
  const renderCaseReel = (scrollPosition: number) => {
    const repeats = 6; 
    const totalCases = caseImages.length * repeats;
    const reelCases = Array.from({ length: totalCases }, (_, index) => 
      caseImages[index % caseImages.length]
    );
    return (
      <>
        {}
        <div className={styles.mainCaseFrame} />
        {}
        <div className={styles.spinningReel}>
          <div 
            className={styles.spinningContainer}
            style={{ 
              transform: `translateX(-50%) translateY(${-scrollPosition}px)`,
              transition: 'none'
            }}
          >
            {reelCases.map((caseSrc, index) => (
              <img 
                key={index}
                src={caseSrc} 
                alt={`Case ${index}`} 
                className={styles.spinningCase}
              />
            ))}
          </div>
        </div>
      </>
    );
  };
  return (
    <div className={styles.container}>
      {}
      <div className={styles.battleContainer}>
        {}
        <div className={styles.battleSide}>
          {}
          <div className={styles.backgroundColumn}>
            {renderCaseReel(scrollPositionLeft)}
            {}
            <div className={styles.playerCard}>
              <div className={styles.playerInfo}>
                <img src="/images/avatar.png" alt="Player" className={styles.avatar} />
                <span className={styles.username}>@user123</span>
              </div>
              <button className={styles.betButton} onClick={handleSpinLeft}>
                <img src="/icons/ton.png" alt="TON" className={styles.coinIcon} />
                <span>19</span>
              </button>
            </div>
          </div>
        </div>
        {}
        <div className={styles.centerDivider}>
          <div className={styles.dividerLine} />
          <div className={styles.roundCounter}>1</div>
          <div className={styles.dividerLine} />
        </div>
        {}
        <div className={styles.battleSide}>
          {}
          <div className={styles.backgroundColumn}>
            {renderCaseReel(scrollPositionRight)}
            {}
            <div className={styles.playerCard}>
              <div className={styles.playerInfo}>
                <img src="/images/avatar.png" alt="Player" className={styles.avatar} />
                <span className={styles.username}>@user123</span>
              </div>
              <button className={styles.betButton} onClick={handleSpinRight}>
                <img src="/icons/ton.png" alt="TON" className={styles.coinIcon} />
                <span>23</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {}
      <div className={styles.inventoryContainer}>
        {}
        <div className={styles.inventorySection}>
          <div className={styles.inventoryGrid}>
            {Array.from({ length: 9 }, (_, index) => 
              index < 2 ? (
                <div 
                  key={`left-${index}`} 
                  className={styles.inventoryCard}
                >
                  <img 
                    src={caseImages[index % caseImages.length]} 
                    alt="Item" 
                    className={styles.inventoryItem} 
                  />
                  <div className={styles.inventoryPrice}>
                    <img src="/icons/coin.png" alt="Coin" className={styles.inventoryIcon} />
                    <span>{leftInventoryPrices[index]}</span>
                  </div>
                </div>
              ) : (
                <div 
                  key={`left-${index}`} 
                  className={styles.inventoryEmptyCard}
                  style={{ 
                    opacity: 1 - (index - 2) * (1/6)
                  }}
                >
                  <img 
                    src="/images/empty_case_plate.png" 
                    alt="Empty" 
                    className={styles.inventoryEmptyItem} 
                  />
                </div>
              )
            )}
          </div>
        </div>
        {}
        <div className={styles.inventorySection}>
          <div className={styles.inventoryGrid}>
            {Array.from({ length: 9 }, (_, index) => 
              index < 2 ? (
                <div 
                  key={`right-${index}`} 
                  className={styles.inventoryCard}
                >
                  <img 
                    src={caseImages[(index + 3) % caseImages.length]} 
                    alt="Item" 
                    className={styles.inventoryItem} 
                  />
                  <div className={styles.inventoryPrice}>
                    <img src="/icons/coin.png" alt="Coin" className={styles.inventoryIcon} />
                    <span>{rightInventoryPrices[index]}</span>
                  </div>
                </div>
              ) : (
                <div 
                  key={`right-${index}`} 
                  className={styles.inventoryEmptyCard}
                  style={{ 
                    opacity: 1 - (index - 2) * (1/6)
                  }}
                >
                  <img 
                    src="/images/empty_case_plate.png" 
                    alt="Empty" 
                    className={styles.inventoryEmptyItem} 
                  />
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default BattlePage;