import { createContext, useContext } from 'react'
import type { AppId } from './icons'
export type Theme = 'light' | 'dark'
export const WALLPAPERS: { id: string; name: string; light: string; dark: string }[] = [
  { id: 'tahoe', name: 'Tahoe', light: 'radial-gradient(ellipse at 20% 15%,#ffd8b0 0,transparent 45%),radial-gradient(ellipse at 80% 20%,#a6c8ff 0,transparent 50%),radial-gradient(ellipse at 50% 100%,#6a7fe0 0,transparent 60%),linear-gradient(160deg,#9ab9f5,#c9a6f0 55%,#f4b6c8)', dark: 'radial-gradient(ellipse at 20% 15%,#5a3a6a 0,transparent 45%),radial-gradient(ellipse at 80% 20%,#1f3f8f 0,transparent 50%),radial-gradient(ellipse at 50% 100%,#2b2f7a 0,transparent 60%),linear-gradient(160deg,#101a3a,#2a1b4a 55%,#3a1a3a)' },
  { id: 'sunset', name: 'Sunset', light: 'linear-gradient(180deg,#ffb36b,#ff7a8a 50%,#7b5cd6)', dark: 'linear-gradient(180deg,#5b2a3a,#3a1c4a 50%,#12123a)' },
  { id: 'ocean', name: 'Ocean', light: 'radial-gradient(ellipse at 30% 80%,#3fe0d0 0,transparent 50%),linear-gradient(160deg,#6ec6ff,#1a6fd6 60%,#143a8f)', dark: 'radial-gradient(ellipse at 30% 80%,#0f6a70 0,transparent 50%),linear-gradient(160deg,#0a2a50,#0a2f6a 60%,#06143a)' },
  { id: 'meadow', name: 'Meadow', light: 'radial-gradient(ellipse at 70% 10%,#fff3a0 0,transparent 40%),linear-gradient(180deg,#a8e6a0,#3fae6a)', dark: 'radial-gradient(ellipse at 70% 10%,#4a5a20 0,transparent 40%),linear-gradient(180deg,#143a24,#0a2a1a)' },
  { id: 'graphite', name: 'Graphite', light: 'linear-gradient(160deg,#d6d9df,#8e949f)', dark: 'linear-gradient(160deg,#2a2c31,#0e0f12)' },
]
export interface OSCtx {
  theme: Theme; setTheme: (t: Theme) => void
  wallpaper: string; setWallpaper: (w: string) => void
  open: (a: AppId, arg?: string) => void
  notify: (title: string, body: string) => void
  trash: string[]; setTrash: (f: string[]) => void
}
export const OS = createContext<OSCtx>(null as unknown as OSCtx)
export const useOS = () => useContext(OS)
