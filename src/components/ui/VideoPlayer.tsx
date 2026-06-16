'use client'

interface VideoPlayerProps {
  src: string
  poster?: string
  controls?: boolean
  autoPlay?: boolean
  muted?: boolean
  loop?: boolean
  playsInline?: boolean
  className?: string
  style?: React.CSSProperties
}

/** Универсальный плеер для видео из админки (товары, баннер, блог). */
export default function VideoPlayer({
  src,
  poster,
  controls = true,
  autoPlay = false,
  muted,
  loop = false,
  playsInline = true,
  className,
  style,
}: VideoPlayerProps) {
  // Автовоспроизведение в браузерах разрешено только без звука
  const isMuted = muted ?? autoPlay

  return (
    <video
      src={src}
      poster={poster}
      controls={controls}
      autoPlay={autoPlay}
      muted={isMuted}
      loop={loop}
      playsInline={playsInline}
      preload="metadata"
      className={className}
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', ...style }}
    />
  )
}
