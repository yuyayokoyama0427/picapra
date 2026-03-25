import { forwardRef } from 'react'
import { BACKGROUNDS } from '../lib/backgrounds'
import type { FrameSettings } from './Settings'

interface Props {
  imageUrl: string
  settings: FrameSettings
}

function BrowserFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden" style={{ borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
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

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      border: '8px solid #1a1a1a',
      borderRadius: 32,
      overflow: 'hidden',
      boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
      background: '#1a1a1a',
    }}>
      <div style={{ height: 20, background: '#1a1a1a', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: 60, height: 6, borderRadius: 3, background: '#333' }} />
      </div>
      {children}
    </div>
  )
}

export const Preview = forwardRef<HTMLDivElement, Props>(({ imageUrl, settings }, ref) => {
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
      style={{ background, padding: settings.padding, display: 'inline-block' }}
    >
      {settings.frame === 'browser' ? (
        <BrowserFrame>{innerContent}</BrowserFrame>
      ) : settings.frame === 'phone' ? (
        <PhoneFrame>{innerContent}</PhoneFrame>
      ) : (
        innerContent
      )}
    </div>
  )
})
Preview.displayName = 'Preview'
