export interface Background {
  id: string
  label: string
  value: string
  pro: boolean
}

export const BACKGROUNDS: Background[] = [
  // 無料（6種）
  { id: 'purple', label: 'Purple', value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', pro: false },
  { id: 'ocean', label: 'Ocean', value: 'linear-gradient(135deg, #2af598 0%, #009efd 100%)', pro: false },
  { id: 'sunset', label: 'Sunset', value: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', pro: false },
  { id: 'night', label: 'Night', value: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 100%)', pro: false },
  { id: 'peach', label: 'Peach', value: 'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)', pro: false },
  { id: 'mint', label: 'Mint', value: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)', pro: false },
  // Pro（6種）
  { id: 'rose', label: 'Rose', value: 'linear-gradient(135deg, #f43f5e 0%, #fb923c 100%)', pro: true },
  { id: 'indigo', label: 'Indigo', value: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)', pro: true },
  { id: 'dark-purple', label: 'Dark', value: 'linear-gradient(135deg, #1e1b4b 0%, #4c1d95 100%)', pro: true },
  { id: 'golden', label: 'Golden', value: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)', pro: true },
  { id: 'white', label: 'White', value: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', pro: true },
  { id: 'twitter', label: 'X/Twitter', value: 'linear-gradient(135deg, #000000 0%, #1d1d1d 100%)', pro: true },
]

export const PADDING_OPTIONS = [
  { id: 'sm', label: '小', value: 24 },
  { id: 'md', label: '中', value: 48 },
  { id: 'lg', label: '大', value: 72 },
  { id: 'xl', label: '特大', value: 96 },
]

export const RADIUS_OPTIONS = [
  { id: 'none', label: 'なし', value: 0 },
  { id: 'sm', label: '小', value: 8 },
  { id: 'md', label: '中', value: 16 },
  { id: 'lg', label: '大', value: 24 },
]

export const SHADOW_OPTIONS = [
  { id: 'none', label: 'なし', value: 'none' },
  { id: 'soft', label: 'ソフト', value: '0 8px 32px rgba(0,0,0,0.18)' },
  { id: 'strong', label: 'ストロング', value: '0 20px 60px rgba(0,0,0,0.4)' },
]
