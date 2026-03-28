import { forwardRef } from 'react'
import { BACKGROUNDS } from '../lib/backgrounds'
import type { FrameSettings } from './Settings'

interface Props {
  imageUrl: string
  settings: FrameSettings
  isPro?: boolean
}

function BrowserFrame({ children, radius, shadow }: { children: React.ReactNode; radius: number; shadow: string }) {
  return (
    <div className="overflow-hidden" style={{ borderRadius: radius, boxShadow: shadow }}>
      <div className="flex items-center gap-1.5 px-3 py-2.5" style={{ background: '#e8e8e8' }}>
        <span className="w-3 h-3 rounded-full bg-red-400" />
        <span className="w-3 h-3 rounded-full bg-yellow-400" />
        <span className="w-3 h-3 rounded-full bg-green-400" />
        <div className="flex-1 mx-2 h-5 rounded bg-white/70 text-xs text-gray-400 flex items-center px-2">
          picapra.vercel.app
        </div>
      </div>
      {children}
    </div>
  )
}

function PhoneFrame({ children, radius, shadow }: { children: React.ReactNode; radius: number; shadow: string }) {
  return (
    <div style={{
      border: '8px solid #1a1a1a',
      borderRadius: radius,
      overflow: 'hidden',
      boxShadow: shadow,
      background: '#1a1a1a',
    }}>
      <div style={{ height: 20, background: '#1a1a1a', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: 60, height: 6, borderRadius: 3, background: '#333' }} />
      </div>
      {children}
    </div>
  )
}

export const Preview = forwardRef<HTMLDivElement, Props>(({ imageUrl, settings, isPro }, ref) => {
  const bg = BACKGROUNDS.find(b => b.id === settings.backgroundId)
  const background = settings.useCustom
    ? `linear-gradient(135deg, ${settings.customColor1} 0%, ${settings.customColor2} 100%)`
    : (bg?.value ?? BACKGROUNDS[0].value)

  const innerContent = (
    <img
      src={imageUrl}
      alt="screenshot"
      style={{
        display: 'block',
        maxWidth: '100%',
        borderRadius: settings.frame === 'none' ? settings.radius : 0,
        boxShadow: settings.frame === 'none' ? settings.shadow : 'none',
      }}
    />
  )

  return (
    <div
      ref={ref}
      style={{ background, padding: settings.padding, display: 'inline-block', position: 'relative' }}
    >
      {settings.frame === 'browser' ? (
        <BrowserFrame radius={settings.radius} shadow={settings.shadow}>{innerContent}</BrowserFrame>
      ) : settings.frame === 'phone' ? (
        <PhoneFrame radius={settings.radius} shadow={settings.shadow}>{innerContent}</PhoneFrame>
      ) : (
        innerContent
      )}
      {!isPro && (
        <div style={{
          position: 'absolute', bottom: 6, right: 10,
          fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.7)',
          letterSpacing: '0.05em', pointerEvents: 'none',
          textShadow: '0 1px 2px rgba(0,0,0,0.4)',
        }}>
          Picapra
        </div>
      )}
    </div>
  )
})
Preview.displayName = 'Preview'
