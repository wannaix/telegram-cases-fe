import { getCaseImageUrl, getItemImageUrl } from './cloudinary';
export function getImageSrc(
  imageUrl: string | undefined | null, 
  imageBase64: string | undefined | null,
  options?: {
    type?: 'case' | 'item';
    id?: string;
  }
): string {
  if (imageUrl && (imageUrl.startsWith('http://') || imageUrl.startsWith('https://'))) {
    return imageUrl;
  }
  if (options?.id) {
    if (options.type === 'case') {
      return getCaseImageUrl(options.id);
    } else if (options.type === 'item') {
      return getItemImageUrl(options.id);
    }
  }
  if (imageBase64) {
    if (imageBase64.startsWith('data:image/')) {
      return imageBase64;
    }
    return `data:image/png;base64,${imageBase64}`;
  }
  return '/temporary-case-image.png';
}
export function getImageUrl(imageUrl: string | undefined | null): string {
  return getImageSrc(imageUrl, null);
}