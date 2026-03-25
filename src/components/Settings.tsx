import { BACKGROUNDS, PADDING_OPTIONS, RADIUS_OPTIONS, SHADOW_OPTIONS } from '../lib/backgrounds'

export interface FrameSettings {
  backgroundId: string
  customColor1: string
  customColor2: string
  useCustom: boolean
  padding: number
  radius: number
  shadow: string
  frame: 'none' | 'browser' | 'phone'
}

interface Props {
  settings: FrameSettings
  onChange: (s: FrameSettings) => void
  isPro: boolean
  onUpgrade: () => void
}

export function Settings({ settings, onChange, isPro, onUpgrade }: Props) {
  const set = (patch: Partial<FrameSettings>) => onChange({ ...settings, ...patch })

  return (
    <div className="space-y-5">
      {/* 背景 */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">背景</p>
        <div className="grid grid-cols-6 gap-2">
          {BACKGROUNDS.map(bg => {
            const locked = bg.pro && !isPro
            return (
              <button
                key={bg.id}
                title={bg.label + (locked ? '（Pro）' : '')}
                onClick={() => locked ? onUpgrade() : set({ backgroundId: bg.id, useCustom: false })}
                className={`relative h-10 rounded-xl transition-all ${
                  settings.backgroundId === bg.id && !settings.useCustom
                    ? 'ring-2 ring-purple-500 ring-offset-2 scale-110'
                    : 'hover:scale-105'
                }`}
                style={{ background: bg.value }}
              >
                {locked && (
                  <span className="absolute inset-0 flex items-center justify-center text-white/80 text-xs">🔒</span>
                )}
              </button>
            )
          })}
        </div>

        {/* カスタムカラー（Pro） */}
        <div className="mt-3">
          {isPro ? (
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" checked={settings.useCustom}
                  onChange={e => set({ useCustom: e.target.checked })}
                  className="accent-purple-600" />
                <span className="text-xs text-gray-600">カスタムカラー</span>
              </label>
              {settings.useCustom && (
                <>
                  <input type="color" value={settings.customColor1}
                    onChange={e => set({ customColor1: e.target.value, useCustom: true })}
                    className="w-8 h-8 rounded cursor-pointer border-0" />
                  <span className="text-xs text-gray-400">→</span>
                  <input type="color" value={settings.customColor2}
                    onChange={e => set({ customColor2: e.target.value, useCustom: true })}
                    className="w-8 h-8 rounded cursor-pointer border-0" />
                </>
              )}
            </div>
          ) : (
            <button onClick={onUpgrade} className="text-xs text-purple-600 hover:underline mt-1">
              🔒 カスタムカラーはPro版で
            </button>
          )}
        </div>
      </div>

      {/* パディング */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">余白</p>
        <div className="flex gap-2">
          {PADDING_OPTIONS.map(p => (
            <button key={p.id}
              onClick={() => set({ padding: p.value })}
              className={`flex-1 py-2 rounded-xl text-xs font-medium transition-colors ${
                settings.padding === p.value
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* 角丸 */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">角丸</p>
        <div className="flex gap-2">
          {RADIUS_OPTIONS.map(r => (
            <button key={r.id}
              onClick={() => set({ radius: r.value })}
              className={`flex-1 py-2 rounded-xl text-xs font-medium transition-colors ${
                settings.radius === r.value
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* 影 */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">影</p>
        <div className="flex gap-2">
          {SHADOW_OPTIONS.map(s => (
            <button key={s.id}
              onClick={() => set({ shadow: s.value })}
              className={`flex-1 py-2 rounded-xl text-xs font-medium transition-colors ${
                settings.shadow === s.value
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* フレーム */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
          フレーム {!isPro && <span className="text-purple-500 font-normal">（Pro）</span>}
        </p>
        <div className="flex gap-2">
          {(['none', 'browser', 'phone'] as const).map(f => (
            <button key={f}
              onClick={() => isPro ? set({ frame: f }) : onUpgrade()}
              className={`flex-1 py-2 rounded-xl text-xs font-medium transition-colors ${
                settings.frame === f && isPro
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {f === 'none' ? 'なし' : f === 'browser' ? '🌐 ブラウザ' : '📱 スマホ'}
              {!isPro && f !== 'none' && ' 🔒'}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
