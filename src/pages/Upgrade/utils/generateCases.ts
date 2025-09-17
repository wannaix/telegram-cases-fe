export const generateCases = () => {
  const caseNames = [
    "FREE Case", "Legendary Box", "Epic Chest", "Rare Container", "Common Pack",
    "Mystery Box", "Special Crate", "Premium Case", "Golden Package", "Silver Box",
    "Bronze Chest", "Diamond Case"
  ];
  const cases = [];
  for (let i = 1; i <= 56; i++) {
    let imageName = `Property 1=FREE - ${i}.png`;
    if (i === 2) imageName = 'Property 1=REE - 2.png';
    cases.push({
      id: i,
      name: caseNames[i % caseNames.length],
      price: Math.floor(Math.random() * 50) + 5,
      image: `/images/${imageName}`,
    });
  }
  return cases;
};