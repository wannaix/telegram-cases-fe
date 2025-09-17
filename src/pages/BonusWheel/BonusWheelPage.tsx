import React, { useState, useRef } from 'react';
import styles from './BonusWheelPage.module.css';
import { useTranslation } from 'react-i18next';
const BonusWheelPage: React.FC = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentRotation, setCurrentRotation] = useState(0);
  const wheelRef = useRef<SVGSVGElement>(null);
  const { t } = useTranslation();
  const wheelItems = [
    { image: '/images/Property 1=FREE - 1.png', text: 'Free case' },
    { image: '/images/Property 1=FREE - 3.png', text: 'x10 coins' },
    { image: '/images/Property 1=FREE - 5.png', text: 'Cashback bonus' },
    { image: '/images/Property 1=FREE - 7.png', text: 'x200 race points' },
    { image: '/images/Property 1=FREE - 9.png', text: 'Locked case free' },
    { image: '/images/Property 1=FREE - 11.png', text: 'Bonus letter' },
    { image: '/images/Property 1=FREE - 13.png', text: 'x50 points' },
    { image: '/images/Property 1=FREE - 15.png', text: 'Epic drop' },
    { image: '/images/Property 1=FREE - 17.png', text: 'Free upgrade' },
    { image: '/images/Property 1=FREE - 19.png', text: 'Promo +10%' },
    { image: '/images/Property 1=FREE - 21.png', text: 'Extra water' },
    { image: '/images/Property 1=FREE - 23.png', text: 'x100 race points' },
  ];
  const segmentAngle = 360 / 12;
  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    const spins = Math.floor(Math.random() * 3) + 5;
    const randomSegment = Math.floor(Math.random() * 12);
    const additionalRotation = spins * 360 + randomSegment * segmentAngle;
    const newTotalRotation = currentRotation + additionalRotation;
    if (wheelRef.current) {
      wheelRef.current.classList.remove(styles.spinning);
      wheelRef.current.style.transform = `rotate(${currentRotation}deg)`;
      wheelRef.current.getBoundingClientRect();
      wheelRef.current.style.setProperty('--start-rotation', `${currentRotation}deg`);
      wheelRef.current.style.setProperty('--final-rotation', `${newTotalRotation}deg`);
      wheelRef.current.classList.add(styles.spinning);
    }
    setTimeout(() => {
      setIsSpinning(false);
      setCurrentRotation(newTotalRotation % 360);
      if (wheelRef.current) {
        wheelRef.current.classList.remove(styles.spinning);
        wheelRef.current.style.transform = `rotate(${newTotalRotation % 360}deg)`;
      }
    }, 3000);
  };
  return (
    <div className={styles.container}>
      <div className={styles.wheelContainer}>
        <div className={styles.wheelWrapper}>
          <svg 
            ref={wheelRef}
            className={`${styles.wheel} ${isSpinning ? styles.spinning : ''}`}
            width="344" 
            height="344" 
            viewBox="0 0 356 356" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
          <path d="M177.753 0.490234C190.65 0.490237 203.226 1.86841 215.341 4.48444C218.183 5.09799 219.88 7.9846 219.127 10.7923L180.26 155.693C179.572 158.258 175.933 158.258 175.245 155.693L136.379 10.7916C135.626 7.98397 137.323 5.09736 140.164 4.48383C152.279 1.86795 164.855 0.490234 177.753 0.490234Z" fill="url(#paint0_linear_14921_95798)"/>
          <path d="M168.895 157.395C169.582 159.96 166.43 161.78 164.552 159.903L58.4674 53.8727C56.4127 51.819 56.4377 48.4732 58.5878 46.5196C77.1261 29.6761 99.2481 16.707 123.675 8.89089C126.441 8.00575 129.35 9.65711 130.101 12.4627L168.895 157.395Z" fill="url(#paint1_linear_14921_95798)"/>
          <path d="M159.903 164.551C161.78 166.429 159.96 169.581 157.395 168.894L12.4632 130.1C9.65763 129.349 8.00626 126.44 8.89141 123.674C16.7076 99.2477 29.6766 77.1259 46.5201 58.5878C48.4737 56.4377 51.8195 56.4127 53.8732 58.4674L159.903 164.551Z" fill="url(#paint2_linear_14921_95798)"/>
          <path d="M159.903 164.551C161.78 166.429 159.96 169.581 157.395 168.894L12.4632 130.1C9.65763 129.349 8.00626 126.44 8.89141 123.674C16.7076 99.2477 29.6766 77.1259 46.5201 58.5878C48.4737 56.4377 51.8195 56.4127 53.8732 58.4674L159.903 164.551Z" fill="url(#paint3_linear_14921_95798)"/>
          <path d="M155.695 175.244C158.26 175.932 158.26 179.571 155.695 180.259L10.7922 219.125C7.98457 219.878 5.09798 218.181 4.48446 215.34C1.86864 203.225 0.490845 190.649 0.490845 177.752C0.490859 164.854 1.86894 152.278 4.48504 140.163C5.09859 137.321 7.9852 135.624 10.7928 136.377L155.695 175.244Z" fill="url(#paint4_linear_14921_95798)"/>
          <path d="M130.101 343.041C129.35 345.846 126.441 347.498 123.674 346.613C99.2476 338.796 77.1254 325.828 58.587 308.984C56.4368 307.03 56.4118 303.685 58.4666 301.631L164.552 195.601C166.43 193.723 169.581 195.543 168.895 198.108L130.101 343.041Z" fill="url(#paint5_linear_14921_95798)"/>
          <path d="M53.8726 297.037C51.8189 299.092 48.473 299.067 46.5195 296.917C29.6761 278.378 16.7074 256.256 8.89137 231.83C8.00624 229.064 9.6576 226.155 12.4632 225.404L157.396 186.609C159.961 185.923 161.78 189.074 159.903 190.952L53.8726 297.037Z" fill="url(#paint6_linear_14921_95798)"/>
          <path d="M219.126 344.712C219.879 347.519 218.182 350.406 215.341 351.019C203.226 353.636 190.65 355.014 177.753 355.014C164.855 355.014 152.279 353.636 140.164 351.02C137.323 350.407 135.626 347.52 136.379 344.712L175.246 199.809C175.934 197.245 179.573 197.245 180.261 199.809L219.126 344.712Z" fill="url(#paint7_linear_14921_95798)"/>
          <path d="M297.038 301.631C299.093 303.684 299.068 307.03 296.918 308.984C278.379 325.828 256.257 338.797 231.831 346.613C229.065 347.498 226.155 345.847 225.405 343.041L186.611 198.109C185.924 195.544 189.076 193.724 190.954 195.602L297.038 301.631Z" fill="url(#paint8_linear_14921_95798)"/>
          <path d="M343.041 225.403C345.847 226.154 347.498 229.063 346.613 231.829C338.797 256.256 325.828 278.378 308.985 296.917C307.031 299.067 303.685 299.092 301.631 297.037L195.601 190.952C193.724 189.074 195.544 185.922 198.109 186.609L343.041 225.403Z" fill="url(#paint9_linear_14921_95798)"/>
          <path d="M344.713 136.378C347.52 135.625 350.407 137.322 351.021 140.164C353.637 152.279 355.015 164.855 355.015 177.752C355.015 190.65 353.637 203.225 351.021 215.34C350.407 218.182 347.52 219.879 344.713 219.126L199.812 180.259C197.247 179.571 197.247 175.932 199.812 175.244L344.713 136.378Z" fill="url(#paint10_linear_14921_95798)"/>
          <path d="M301.631 58.4664C303.684 56.4117 307.03 56.4367 308.984 58.5868C325.828 77.1252 338.797 99.2474 346.613 123.674C347.498 126.44 345.847 129.35 343.041 130.101L198.109 168.894C195.544 169.581 193.724 166.43 195.602 164.551L301.631 58.4664Z" fill="url(#paint11_linear_14921_95798)"/>
          <path d="M225.404 12.4627C226.155 9.65711 229.064 8.00574 231.83 8.89087C256.257 16.707 278.379 29.6759 296.918 46.5196C299.068 48.4732 299.093 51.8191 297.038 53.8727L190.953 159.903C189.075 161.78 185.923 159.961 186.61 157.395L225.404 12.4627Z" fill="url(#paint12_linear_14921_95798)"/>
          <g opacity="0.3">
            <path d="M177.753 92.0039C182.063 92.0039 186.283 92.3965 190.376 93.1476C192.664 93.5673 194.021 95.8831 193.418 98.1292L179.759 149.055C179.208 151.107 176.297 151.107 175.747 149.055L162.087 98.129C161.484 95.8828 162.842 93.567 165.129 93.1474C169.223 92.3964 173.442 92.0039 177.753 92.0039Z" fill="url(#paint13_linear_14921_95798)"/>
            <path d="M164.962 150.925C165.511 152.977 162.99 154.432 161.487 152.931L124.203 115.665C122.559 114.023 122.576 111.34 124.343 109.831C130.734 104.375 138.126 100.056 146.206 97.1897C148.396 96.4128 150.726 97.7397 151.327 99.9842L164.962 150.925Z" fill="url(#paint14_linear_14921_95798)"/>
            <path d="M153.579 161.487C155.081 162.989 153.625 165.51 151.573 164.961L100.633 151.326C98.3886 150.725 97.0616 148.395 97.8385 146.205C100.705 138.126 105.024 130.734 110.48 124.343C111.989 122.575 114.671 122.559 116.314 124.203L153.579 161.487Z" fill="url(#paint15_linear_14921_95798)"/>
            <path d="M149.056 175.558C151.108 176.108 151.108 179.02 149.056 179.57L98.129 193.23C95.8828 193.832 93.567 192.475 93.1474 190.187C92.3964 186.094 92.0039 181.875 92.0039 177.564C92.0039 173.253 92.3965 169.034 93.1476 164.94C93.5673 162.653 95.8831 161.295 98.1292 161.898L149.056 175.558Z" fill="url(#paint16_linear_14921_95798)"/>
            <path d="M148.599 259.812C148.304 260.912 147.164 261.56 146.079 261.213C136.5 258.148 127.824 253.062 120.554 246.457C119.711 245.69 119.701 244.378 120.507 243.573L162.109 201.992C162.846 201.256 164.082 201.97 163.812 202.976L148.599 259.812Z" fill="url(#paint17_linear_14921_95798)"/>
            <path d="M115.016 232.119C113.373 233.763 110.691 233.747 109.182 231.979C103.725 225.588 99.4069 218.196 96.5403 210.117C95.7634 207.927 97.0903 205.597 99.3348 204.996L150.275 191.361C152.327 190.811 153.783 193.333 152.281 194.835L115.016 232.119Z" fill="url(#paint18_linear_14921_95798)"/>
            <path d="M193.23 260.095C193.832 262.341 192.475 264.657 190.188 265.076C186.094 265.828 181.875 266.22 177.564 266.22C173.253 266.22 169.034 265.828 164.941 265.077C162.653 264.657 161.296 262.341 161.898 260.095L175.558 209.168C176.109 207.116 179.02 207.116 179.57 209.168L193.23 260.095Z" fill="url(#paint19_linear_14921_95798)"/>
            <path d="M235.297 244.871C236.103 245.677 236.093 246.989 235.25 247.755C227.98 254.36 219.305 259.446 209.726 262.512C208.641 262.859 207.5 262.211 207.206 261.111L191.992 204.275C191.723 203.269 192.959 202.555 193.695 203.291L235.297 244.871Z" fill="url(#paint20_linear_14921_95798)"/>
            <path d="M256.865 204.996C259.109 205.596 260.436 207.927 259.659 210.116C256.793 218.196 252.475 225.588 247.018 231.979C245.509 233.747 242.827 233.763 241.184 232.119L203.919 194.835C202.417 193.332 203.872 190.811 205.925 191.36L256.865 204.996Z" fill="url(#paint21_linear_14921_95798)"/>
            <path d="M260.095 161.898C262.341 161.295 264.657 162.653 265.076 164.94C265.828 169.034 266.22 173.253 266.22 177.564C266.22 181.874 265.828 186.093 265.076 190.187C264.657 192.474 262.341 193.832 260.095 193.229L209.169 179.569C207.117 179.019 207.117 176.108 209.169 175.558L260.095 161.898Z" fill="url(#paint22_linear_14921_95798)"/>
            <path d="M241.832 122.905C243.475 121.261 246.158 121.277 247.667 123.045C253.123 129.436 257.442 136.828 260.308 144.908C261.085 147.098 259.758 149.428 257.514 150.029L206.574 163.664C204.522 164.213 203.066 161.692 204.568 160.189L241.832 122.905Z" fill="url(#paint23_linear_14921_95798)"/>
            <path d="M204.347 99.9842C204.947 97.7398 207.278 96.4128 209.467 97.1897C217.547 100.056 224.939 104.375 231.33 109.831C233.098 111.34 233.114 114.022 231.47 115.665L194.186 152.931C192.684 154.432 190.162 152.977 190.712 150.925L204.347 99.9842Z" fill="url(#paint24_linear_14921_95798)"/>
          </g>
          <defs>
            <linearGradient id="paint0_linear_14921_95798" x1="177.753" y1="0.490234" x2="177.753" y2="165.042" gradientUnits="userSpaceOnUse">
              <stop stopColor="#956F56"/>
              <stop offset="1" stopColor="#956F56" stopOpacity="0"/>
            </linearGradient>
            <linearGradient id="paint1_linear_14921_95798" x1="91.6795" y1="23.206" x2="168.265" y2="160.801" gradientUnits="userSpaceOnUse">
              <stop stopColor="#8FA54C"/>
              <stop offset="1" stopColor="#8FA54C" stopOpacity="0"/>
            </linearGradient>
            <linearGradient id="paint2_linear_14921_95798" x1="25.4781" y1="88.7588" x2="160.152" y2="168.265" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1FBA1F"/>
              <stop offset="1" stopColor="#1FBA1F" stopOpacity="0"/>
            </linearGradient>
            <linearGradient id="paint3_linear_14921_95798" x1="25.4781" y1="88.7588" x2="160.152" y2="168.265" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1FBA1F"/>
              <stop offset="1" stopColor="#1FBA1F" stopOpacity="0"/>
            </linearGradient>
            <linearGradient id="paint4_linear_14921_95798" x1="159.179" y1="177.675" x2="0.490842" y2="177.675" gradientUnits="userSpaceOnUse">
              <stop stopColor="#579B7E" stopOpacity="0"/>
              <stop offset="1" stopColor="#579B7E"/>
            </linearGradient>
            <linearGradient id="paint5_linear_14921_95798" x1="169.238" y1="194.55" x2="88.7586" y2="327.601" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2B6EFF" stopOpacity="0"/>
              <stop offset="1" stopColor="#2B6EFF"/>
            </linearGradient>
            <linearGradient id="paint6_linear_14921_95798" x1="161.45" y1="186.762" x2="24.5046" y2="262.698" gradientUnits="userSpaceOnUse">
              <stop stopColor="#025972" stopOpacity="0"/>
              <stop offset="1" stopColor="#025972"/>
            </linearGradient>
            <linearGradient id="paint7_linear_14921_95798" x1="177.752" y1="190.461" x2="177.752" y2="355.014" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0233FF" stopOpacity="0"/>
              <stop offset="1" stopColor="#0233FF"/>
            </linearGradient>
            <linearGradient id="paint8_linear_14921_95798" x1="186.762" y1="194.55" x2="267.891" y2="329.224" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1E0DCD" stopOpacity="0"/>
              <stop offset="1" stopColor="#1E0DCD"/>
            </linearGradient>
            <linearGradient id="paint9_linear_14921_95798" x1="196.822" y1="187.411" x2="331.172" y2="263.023" gradientUnits="userSpaceOnUse">
              <stop stopColor="#743DCC" stopOpacity="0"/>
              <stop offset="1" stopColor="#743DCC"/>
            </linearGradient>
            <linearGradient id="paint10_linear_14921_95798" x1="354.861" y1="175.404" x2="194.875" y2="177.676" gradientUnits="userSpaceOnUse">
              <stop stopColor="#501AA5"/>
              <stop offset="1" stopColor="#501AA5" stopOpacity="0"/>
            </linearGradient>
            <linearGradient id="paint11_linear_14921_95798" x1="331.172" y1="87.4604" x2="195.849" y2="167.616" gradientUnits="userSpaceOnUse">
              <stop stopColor="#7D311D"/>
              <stop offset="1" stopColor="#7D311D" stopOpacity="0"/>
            </linearGradient>
            <linearGradient id="paint12_linear_14921_95798" x1="264.646" y1="23.5305" x2="186.113" y2="165.019" gradientUnits="userSpaceOnUse">
              <stop stopColor="#9F4A4A"/>
              <stop offset="1" stopColor="#9F4A4A" stopOpacity="0"/>
            </linearGradient>
            <linearGradient id="paint13_linear_14921_95798" x1="177.753" y1="92.0039" x2="177.753" y2="156.534" gradientUnits="userSpaceOnUse">
              <stop stopColor="#956F56"/>
              <stop offset="1" stopColor="#956F56" stopOpacity="0"/>
            </linearGradient>
            <linearGradient id="paint14_linear_14921_95798" x1="135.702" y1="102.114" x2="165.735" y2="156.073" gradientUnits="userSpaceOnUse">
              <stop stopColor="#8FA54C"/>
              <stop offset="1" stopColor="#8FA54C" stopOpacity="0"/>
            </linearGradient>
            <linearGradient id="paint15_linear_14921_95798" x1="103.654" y1="134.556" x2="156.467" y2="165.735" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1FBA1F"/>
              <stop offset="1" stopColor="#1FBA1F" stopOpacity="0"/>
            </linearGradient>
            <linearGradient id="paint16_linear_14921_95798" x1="154.235" y1="177.534" x2="92.0039" y2="177.534" gradientUnits="userSpaceOnUse">
              <stop stopColor="#579B7E" stopOpacity="0"/>
              <stop offset="1" stopColor="#579B7E"/>
            </linearGradient>
            <linearGradient id="paint17_linear_14921_95798" x1="163.947" y1="201.58" x2="132.386" y2="253.757" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2B6EFF" stopOpacity="0"/>
              <stop offset="1" stopColor="#2B6EFF"/>
            </linearGradient>
            <linearGradient id="paint18_linear_14921_95798" x1="155.678" y1="190.4" x2="101.974" y2="220.179" gradientUnits="userSpaceOnUse">
              <stop stopColor="#025972" stopOpacity="0"/>
              <stop offset="1" stopColor="#025972"/>
            </linearGradient>
            <linearGradient id="paint19_linear_14921_95798" x1="177.564" y1="201.689" x2="177.564" y2="266.22" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0233FF" stopOpacity="0"/>
              <stop offset="1" stopColor="#0233FF"/>
            </linearGradient>
            <linearGradient id="paint20_linear_14921_95798" x1="192.052" y1="202.879" x2="223.867" y2="255.692" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1E0DCD" stopOpacity="0"/>
              <stop offset="1" stopColor="#1E0DCD"/>
            </linearGradient>
            <linearGradient id="paint21_linear_14921_95798" x1="201.607" y1="190.654" x2="254.293" y2="220.306" gradientUnits="userSpaceOnUse">
              <stop stopColor="#743DCC" stopOpacity="0"/>
              <stop offset="1" stopColor="#743DCC"/>
            </linearGradient>
            <linearGradient id="paint22_linear_14921_95798" x1="266.16" y1="176.643" x2="203.42" y2="177.534" gradientUnits="userSpaceOnUse">
              <stop stopColor="#501AA5"/>
              <stop offset="1" stopColor="#501AA5" stopOpacity="0"/>
            </linearGradient>
            <linearGradient id="paint23_linear_14921_95798" x1="254.942" y1="132.749" x2="201.874" y2="164.183" gradientUnits="userSpaceOnUse">
              <stop stopColor="#7D311D"/>
              <stop offset="1" stopColor="#7D311D" stopOpacity="0"/>
            </linearGradient>
            <linearGradient id="paint24_linear_14921_95798" x1="220.293" y1="102.242" x2="189.496" y2="157.728" gradientUnits="userSpaceOnUse">
              <stop stopColor="#9F4A4A"/>
              <stop offset="1" stopColor="#9F4A4A" stopOpacity="0"/>
            </linearGradient>
          </defs>
          {wheelItems.map((item, index) => {
            const centerAngle = index * segmentAngle;
            const imageRadius = 145;
            const centerX = 178;
            const centerY = 178;
            const angleInRadians = ((centerAngle - 90) * Math.PI) / 180;
            const x = centerX + imageRadius * Math.cos(angleInRadians);
            const y = centerY + imageRadius * Math.sin(angleInRadians);
            const imageRotation = centerAngle;
            const textRadius = 105;
            const textAngleInRadians = ((centerAngle - 90) * Math.PI) / 180;
            const textX = centerX + textRadius * Math.cos(textAngleInRadians);
            const textY = centerY + textRadius * Math.sin(textAngleInRadians);
            return (
              <g key={index}>
                <image
                  href={item.image}
                  x={x - 30}
                  y={y - 30}
                  width="60"
                  height="60"
                  transform={`rotate(${imageRotation} ${x} ${y})`}
                />
                <g transform={`rotate(${imageRotation} ${textX} ${textY})`}>
                  {item.text.split(' ').map((word, wordIndex) => (
                    <text
                      key={wordIndex}
                      x={textX}
                      y={textY + wordIndex * 10}
                      fill="white"
                      fontSize="8"
                      fontWeight="400"
                      textAnchor="middle"
                    >
                      {word}
                    </text>
                  ))}
                </g>
              </g>
            );
          })}
        </svg>
        <img 
          src="/icons/wheel-arrow.svg"
          className={styles.centerArrow}
          alt="Wheel arrow"
        />
        </div>
      </div>
      <button 
        className={styles.claimButton}
        onClick={handleSpin}
      >
        {isSpinning ? t('bonusWheelPage.spinning') : t('bonusWheelPage.spin_again')}
      </button>
      <div className={styles.collectLetters}>
        <p className={styles.collectTitle}>Collect all letters</p>
        <div className={styles.lettersContainer}>
          <div className={`${styles.letterBox} ${styles.letterActive}`}>
            <span className={styles.letter}>G</span>
          </div>
          <div className={`${styles.letterBox} ${styles.letterActive}`}>
            <span className={styles.letter}>I</span>
          </div>
          <div className={`${styles.letterBox} ${styles.letterActive}`}>
            <span className={styles.letter}>F</span>
          </div>
          <div className={styles.letterBox}>
            <span className={styles.letter}>T</span>
          </div>
          <div className={styles.letterBox}>
            <span className={styles.letter}>O</span>
          </div>
          <div className={styles.letterBox}>
            <span className={styles.letter}>M</span>
          </div>
          <div className={styles.letterBox}>
            <span className={styles.letter}>U</span>
          </div>
          <div className={styles.letterBox}>
            <span className={styles.letter}>S</span>
          </div>
        </div>
      </div>
      <div className={styles.prizesSection}>
        <h2 className={styles.prizesTitle}>Prizes</h2>
        <div className={styles.prizesGrid}>
          <div className={styles.prizeCard}>
            <div className={styles.prizeImageContainer}>
              <img src="/images/Property 1=FREE - 48.png" alt="Prize" className={styles.prizeImage} />
            </div>
            <div className={styles.prizeTitle}>Free case</div>
          </div>
          <div className={styles.prizeCard}>
            <div className={styles.prizeImageContainer}>
              <img src="/images/Property 1=REE - 2.png" alt="Prize" className={styles.prizeImage} />
            </div>
            <div className={styles.prizeTitle}>x10 coins</div>
          </div>
          <div className={styles.prizeCard}>
            <div className={styles.prizeImageContainer}>
              <img src="/images/Property 1=FREE - 39.png" alt="Prize" className={styles.prizeImage} />
            </div>
            <div className={styles.prizeTitle}>Cashback bonus</div>
          </div>
          <div className={styles.prizeCard}>
            <div className={styles.prizeImageContainer}>
              <img src="/images/Property 1=FREE - 26.png" alt="Prize" className={styles.prizeImage} />
            </div>
            <div className={styles.prizeTitle}>x200 race points</div>
          </div>
          <div className={styles.prizeCard}>
            <div className={styles.prizeImageContainer}>
              <img src="/images/Property 1=FREE - 36.png" alt="Prize" className={styles.prizeImage} />
            </div>
            <div className={styles.prizeTitle}>Bonus letter</div>
          </div>
          <div className={styles.prizeCard}>
            <div className={styles.prizeImageContainer}>
              <img src="/images/Property 1=FREE - 47.png" alt="Prize" className={styles.prizeImage} />
            </div>
            <div className={styles.prizeTitle}>x50 points</div>
          </div>
          <div className={styles.prizeCard}>
            <div className={styles.prizeImageContainer}>
              <img src="/images/Property 1=FREE - 42.png" alt="Prize" className={styles.prizeImage} />
            </div>
            <div className={styles.prizeTitle}>Epic drop</div>
          </div>
          <div className={styles.prizeCard}>
            <div className={styles.prizeImageContainer}>
              <img src="/images/Property 1=FREE - 55.png" alt="Prize" className={styles.prizeImage} />
            </div>
            <div className={styles.prizeTitle}>Free upgrade</div>
          </div>
          <div className={styles.prizeCard}>
            <div className={styles.prizeImageContainer}>
              <img src="/images/Property 1=FREE - 52.png" alt="Prize" className={styles.prizeImage} />
            </div>
            <div className={styles.prizeTitle}>Promo +10%</div>
          </div>
          <div className={styles.prizeCard}>
            <div className={styles.prizeImageContainer}>
              <img src="/images/Property 1=FREE - 16.png" alt="Prize" className={styles.prizeImage} />
            </div>
            <div className={styles.prizeTitle}>Extra water</div>
          </div>
          <div className={styles.prizeCard}>
            <div className={styles.prizeImageContainer}>
              <img src="/images/Property 1=FREE - 55.png" alt="Prize" className={styles.prizeImage} />
            </div>
            <div className={styles.prizeTitle}>x100 race points</div>
          </div>
          <div className={styles.prizeCard}>
            <div className={styles.prizeImageContainer}>
              <img src="/images/Property 1=FREE - 18.png" alt="Prize" className={styles.prizeImage} />
            </div>
            <div className={styles.prizeTitle}>Locked case free</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BonusWheelPage;