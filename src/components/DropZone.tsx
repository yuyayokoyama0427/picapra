import { useCallback, useState } from 'react'

interface Props {
  onImage: (dataUrl: string) => void
}

export function DropZone({ onImage }: Props) {
  const [dragging, setDragging] = useState(false)

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = e => {
      if (e.target?.result) onImage(e.target.result as string)
    }
    reader.readAsDataURL(file)
  }, [onImage])

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }, [handleFile])

  const onPaste = useCallback((e: React.ClipboardEvent) => {
    const item = Array.from(e.clipboardData.items).find(i => i.type.startsWith('image/'))
    if (item) handleFile(item.getAsFile()!)
  }, [handleFile])

  return (
    <div
      onDrop={onDrop}
      onDragOver={e => { e.preventDefault(); setDragging(true) }}
      onDragLeave={() => setDragging(false)}
      onPaste={onPaste}
      tabIndex={0}
      className={`flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed transition-colors cursor-pointer min-h-64 outline-none
        ${dragging ? 'border-purple-400 bg-purple-50' : 'border-gray-200 bg-gray-50 hover:border-purple-300 hover:bg-purple-50/50'}`}
      onClick={() => document.getElementById('file-input')?.click()}
    >
      <span className="text-5xl">🖼️</span>
      <div className="text-center">
        <p className="text-sm font-medium text-gray-700">スクリーンショットをドロップ</p>
        <p className="text-xs text-gray-400 mt-1">クリック・ペースト（Cmd+V）でも追加できます</p>
      </div>
      <input
        id="file-input"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={e => { if (e.target.files?.[0]) handleFile(e.target.files[0]) }}
      />
    </div>
  )
}
