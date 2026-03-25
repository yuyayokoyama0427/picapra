import { useRef, useState } from 'react'
import { toPng } from 'html-to-image'
import { Analytics } from '@vercel/analytics/react'
import { DropZone } from './components/DropZone'
import { Preview } from './components/Preview'
import { Settings } from './components/Settings'
import { LicenseModal } from './components/LicenseModal'
import { usePro } from './hooks/usePro'
import type { FrameSettings } from './components/Settings'
import './index.css'

const CHECKOUT_URL = 'https://yomiyasu.lemonsqueezy.com/checkout/buy/6204b298-aa72-4afd-8fa9-909d816b9870'

const DEFAULT_SETTINGS: FrameSettings = {
  backgroundId: 'purple',
  customColor1: '#667eea',
  customColor2: '#764ba2',
  useCustom: false,
  padding: 48,
  radius: 16,
  shadow: '0 8px 32px rgba(0,0,0,0.18)',
  frame: 'none',
}

export default function App() {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [settings, setSettings] = useState<FrameSettings>(DEFAULT_SETTINGS)
  const [showModal, setShowModal] = useState(false)
  const [exporting, setExporting] = useState(false)
  const { isPro, activate, loading, error } = usePro()
  const previewRef = useRef<HTMLDivElement>(null)

  async function handleExport() {
    if (!previewRef.current) return
    setExporting(true)
    try {
      const dataUrl = await toPng(previewRef.current, { pixelRatio: 2 })
      const a = document.createElement('a')
      a.href = dataUrl
      a.download = `picapra_${Date.now()}.png`
      a.click()
    } finally {
      setExporting(false)
    }
  }

  async function handleActivate(key: string) {
    await activate(key)
    setShowModal(false)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-900">Picapra</span>
            <span className="text-xs text-gray-400">スクリーンショット美化ツール</span>
            <span className="hidden sm:inline-flex items-center gap-1 text-xs bg-emerald-50 text-emerald-600 border border-emerald-200 px-2 py-0.5 rounded-full">
              🔒 画像はサーバーに送信されません
            </span>
          </div>
          <div className="flex items-center gap-2">
            {isPro ? (
              <span className="text-xs bg-purple-100 text-purple-700 font-semibold px-2 py-1 rounded-full">✨ Pro</span>
            ) : (
              <div className="flex items-center gap-2">
                <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer"
                  className="text-xs bg-purple-600 hover:bg-purple-700 text-white font-medium px-3 py-1.5 rounded-full transition">
                  Pro版を購入（750円）
                </a>
                <button className="text-xs text-purple-600 hover:underline" onClick={() => setShowModal(true)}>
                  キー認証
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {!imageUrl ? (
          <div className="max-w-xl mx-auto mt-8 space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">スクショを映える画像に</h1>
              <p className="text-gray-500 text-sm">グラデーション背景・影・フレームを追加して、SNS映えする画像に仕上げます</p>
            </div>
            <DropZone onImage={setImageUrl} />
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { icon: '🎨', title: '背景を選ぶ', desc: 'グラデーション12種' },
                { icon: '✨', title: '影・角丸', desc: 'ワンクリックで調整' },
                { icon: '📥', title: 'PNG書き出し', desc: '2倍解像度で保存' },
              ].map(f => (
                <div key={f.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                  <div className="text-2xl mb-1">{f.icon}</div>
                  <div className="text-xs font-semibold text-gray-800">{f.title}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{f.desc}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 min-w-0">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-600">プレビュー</span>
                  <div className="flex gap-2">
                    <button onClick={() => setImageUrl(null)}
                      className="text-xs text-gray-400 hover:text-gray-600 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition">
                      画像を変更
                    </button>
                    <button onClick={handleExport} disabled={exporting}
                      className="text-xs bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 py-1.5 rounded-lg transition disabled:opacity-50">
                      {exporting ? '書き出し中...' : '📥 PNG保存'}
                    </button>
                  </div>
                </div>
                <div className="overflow-auto flex items-center justify-center bg-gray-50 rounded-xl min-h-64 p-2">
                  <Preview ref={previewRef} imageUrl={imageUrl} settings={settings} />
                </div>
              </div>
            </div>

            <div className="w-full lg:w-72 shrink-0">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <Settings settings={settings} onChange={setSettings} isPro={isPro} onUpgrade={() => setShowModal(true)} />
                <button onClick={() => setSettings(DEFAULT_SETTINGS)}
                  className="w-full mt-4 text-xs text-gray-400 hover:text-gray-600 py-2 transition">
                  デフォルトに戻す
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="text-center text-xs text-gray-400 py-8">© 2026 Picapra</footer>

      {showModal && (
        <LicenseModal onActivate={handleActivate} onClose={() => setShowModal(false)} loading={loading} error={error} />
      )}
      <Analytics />
    </div>
  )
}
