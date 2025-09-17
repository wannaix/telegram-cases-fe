export async function uploadTestImage() {
  const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  const canvas = document.createElement('canvas');
  canvas.width = 350;
  canvas.height = 450;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const gradient = ctx.createLinearGradient(0, 0, 350, 450);
  gradient.addColorStop(0, '#3b82f6');
  gradient.addColorStop(1, '#8b5cf6');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 350, 450);
  ctx.fillStyle = 'white';
  ctx.font = 'bold 40px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('TEST CASE', 175, 225);
  const blob = await new Promise<Blob>((resolve) => {
    canvas.toBlob((blob) => resolve(blob!), 'image/png');
  });
  const formData = new FormData();
  formData.append('file', blob);
  formData.append('upload_preset', UPLOAD_PRESET);
  formData.append('folder', 'telegram-cases/test');
  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData
      }
    );
    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }
    const data = await response.json();
    console.log('✅ Тестовое изображение загружено успешно!');
    console.log('URL:', data.secure_url);
    console.log('Public ID:', data.public_id);
    return data;
  } catch (error) {
    console.error('❌ Ошибка загрузки:', error);
    throw error;
  }
}