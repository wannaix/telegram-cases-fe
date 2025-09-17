const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dvrbedyme';
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'telegram-cases';
export function getCloudinaryUrl(publicId: string, options?: {
  width?: number;
  height?: number;
  quality?: 'auto' | number;
  format?: 'auto' | 'webp' | 'jpg' | 'png';
}) {
  const transformations = [];
  if (options?.width) transformations.push(`w_${options.width}`);
  if (options?.height) transformations.push(`h_${options.height}`);
  if (options?.quality) transformations.push(`q_${options.quality}`);
  if (options?.format) transformations.push(`f_${options.format}`);
  transformations.push('c_fill', 'g_auto');
  const transformation = transformations.join(',');
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${transformation}/${publicId}`;
}
export async function uploadToCloudinary(file: File | Blob): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: 'POST',
      body: formData
    }
  );
  if (!response.ok) {
    throw new Error('Failed to upload image to Cloudinary');
  }
  const data = await response.json();
  return data.public_id; 
}
export const CASE_IMAGES = {
  surfboard: 'cases/surfboard',
  premium: 'cases/premium',
  starter: 'cases/starter',
  legendary: 'cases/legendary',
};
export const ITEM_IMAGES = {
  flower_pink: 'items/flower_pink',
  ton_balance: 'items/ton_balance',
};
export function getCaseImageUrl(caseId: string): string {
  const publicId = CASE_IMAGES[caseId as keyof typeof CASE_IMAGES];
  if (publicId) {
    return getCloudinaryUrl(publicId, {
      width: 350,
      height: 450,
      quality: 'auto',
      format: 'auto'
    });
  }
  return '/temporary-case-image.png';
}
export function getItemImageUrl(itemId: string): string {
  const publicId = ITEM_IMAGES[itemId as keyof typeof ITEM_IMAGES];
  if (publicId) {
    return getCloudinaryUrl(publicId, {
      width: 200,
      height: 200,
      quality: 'auto',
      format: 'auto'
    });
  }
  return '/temporary-case-image.png';
}