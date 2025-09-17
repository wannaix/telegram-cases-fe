import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { UpgradeWheel } from "./components/UpgradeWheel";
import { ResultBottomSheet } from "./components/ResultBottomSheet";
import { UpgradeControls } from "./components/UpgradeControls";
import { CaseList } from "./components/CaseList";
import { generateCases } from "./utils/generateCases";
export const UpgradePage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCoef, setSelectedCoef] = useState<number | null>(null);
  const [selectedTab, setSelectedTab] = useState<"inventory" | "desired">(
    "inventory"
  );
  const [isStarted, setIsStarted] = useState(false);
  const [selectedCase, setSelectedCase] = useState<{
    id: number;
    name: string;
    price: number;
    image: string;
  } | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [finalResult, setFinalResult] = useState<"success" | "fail" | null>(
    null
  );
  const cases = generateCases();
  useEffect(() => {
    setIsStarted(false);
  }, [selectedCoef]);
  const handleResult = useCallback((result: "success" | "fail") => {
    setFinalResult(result);
    setShowResult(true);
  }, []);
  return (
    <>
      <div className="max-w-md mx-auto">
        <div className="rounded-xl text-center flex flex-col items-center">
          <UpgradeWheel
            chance={0.39}
            imageUrl=""
            selectedCoef={selectedCoef}
            isStarted={isStarted}
            selectedCase={selectedCase}
            onResult={handleResult}
          />
          <UpgradeControls
            selectedCoef={selectedCoef}
            setSelectedCoef={setSelectedCoef}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            isStarted={isStarted}
            setIsStarted={setIsStarted}
            selectedCase={selectedCase}
          />
          <CaseList
            cases={cases}
            selectedCase={selectedCase}
            onSelectCase={setSelectedCase}
          />
        </div>
      </div>
      <ResultBottomSheet
        isVisible={showResult}
        result={finalResult}
        selectedCase={selectedCase}
        onClose={() => {
          setShowResult(false);
          setFinalResult(null);
          setIsStarted(false);
        }}
        onInventoryNavigate={() => {
          navigate('/profile');
        }}
      />
    </>
  );
};
