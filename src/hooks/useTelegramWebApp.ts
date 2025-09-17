import { useEffect, useState } from "react";
import { retrieveLaunchParams } from '@telegram-apps/sdk';
export const useTelegramWebApp = () => {
  const [isReady, setIsReady] = useState(false);
  let user = undefined;
  let initData = '';
  let initDataObj = undefined;
  try {
    const { initData: parsedInitData, initDataRaw } = retrieveLaunchParams();
    user = parsedInitData?.user;
    initData = initDataRaw || '';
    initDataObj = parsedInitData;
  } catch {
    if (process.env.NODE_ENV === 'development') {
      user = {
        firstName: "Dev",
        lastName: "User",
        username: 'frontiendo',
        photoUrl: "",
      };
      initData = 'dev';
      initDataObj = {};
    } else {
      user = undefined;
      initData = '';
      initDataObj = undefined;
    }
  }
  useEffect(() => {
    setIsReady(true);
  }, []);
  return {
    isReady,
    user,
    initData,     
    initDataObj,
  };
};