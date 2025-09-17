# Настройка Cloudinary для хранения изображений

## Почему Cloudinary?

- **Бесплатный план** с 25GB хранилища или 25K трансформаций в месяц
- **Автоматическая оптимизация** изображений
- **Глобальный CDN** для быстрой загрузки
- **Не теряет файлы** при перезапуске сервера (в отличие от Render.com)

## Шаги настройки

### 1. Создайте аккаунт Cloudinary

1. Перейдите на https://cloudinary.com/
2. Нажмите "Sign Up Free"
3. Заполните форму регистрации

### 2. Получите данные для подключения

После регистрации на дашборде вы увидите:
- **Cloud Name**: `dvrbedyme` (уже настроено)
- **API Key**: `351442185274921` (уже настроено)
- **API Secret**: хранится в .env файле

### 3. Создайте Upload Preset

1. Перейдите в Settings → Upload
2. Нажмите "Add upload preset"
3. Установите:
   - **Preset name**: `telegram-cases`
   - **Signing Mode**: `Unsigned` (для загрузки с frontend)
   - **Folder**: `telegram-cases`
4. Сохраните preset

### 4. Обновите конфигурацию

Конфигурация уже настроена в файле `.env`:
```
VITE_CLOUDINARY_CLOUD_NAME=dvrbedyme
```

### 5. Загрузите изображения

Загрузите изображения кейсов и предметов в Cloudinary:

1. Перейдите в Media Library
2. Создайте папки:
   - `telegram-cases/cases/` - для изображений кейсов
   - `telegram-cases/items/` - для изображений предметов
3. Загрузите изображения

### 6. Обновите маппинг изображений

В файле `src/utils/cloudinary.ts` обновите объекты CASE_IMAGES и ITEM_IMAGES с вашими public_id:

```typescript
export const CASE_IMAGES = {
  surfboard: 'telegram-cases/cases/surfboard',
  premium: 'telegram-cases/cases/premium',
  // и т.д.
};
```

## Использование в коде

```typescript
import { getCaseImageUrl, getItemImageUrl } from '@/utils/cloudinary';

// Для кейса
const imageUrl = getCaseImageUrl('surfboard');

// Для предмета
const itemUrl = getItemImageUrl('flower_pink');
```

## Миграция существующих изображений

Если у вас есть base64 изображения в БД, их можно мигрировать:

1. Создайте скрипт миграции на backend
2. Конвертируйте base64 в файлы
3. Загрузите в Cloudinary через API
4. Сохраните public_id в БД вместо base64

## Альтернативы Cloudinary

- **Supabase Storage** - если используете Supabase для БД
- **Firebase Storage** - от Google
- **AWS S3** - более сложный, но мощный
- **Imgur API** - простой, но с ограничениями