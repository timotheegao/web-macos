import { createContext, useContext } from 'react'
import type { AppId } from './icons'
export type Theme = 'light' | 'dark'
export interface WP { id: string; name: string; sky: [string, string, string, string]; blobs: [string, number, number, number][]; ridges: [string, string, string]; sun: string }
export const WALLPAPERS: WP[] = [
  { id: 'tahoe', name: 'Tahoe', sky: ['#3b5bd9', '#7f86f0', '#e9a6d6', '#ffcfa8'], blobs: [['#ffb9a0', 20, 78, 34], ['#8fc4ff', 78, 22, 36], ['#c58bff', 55, 55, 30], ['#5ea0ff', 10, 20, 26]], ridges: ['#7a6fd8', '#4e4bb8', '#2e2f86'], sun: '#fff0d8' },
  { id: 'sunset', name: 'Sunset', sky: ['#3a2a7a', '#c0508c', '#ff8a6b', '#ffd08a'], blobs: [['#ffb36b', 50, 85, 36], ['#ff6b9a', 20, 40, 28], ['#7b5cff', 85, 15, 30]], ridges: ['#a8407e', '#6b2a78', '#35205e'], sun: '#fff1c8' },
  { id: 'ocean', name: 'Ocean', sky: ['#0b3a8f', '#1f78d8', '#5fc5f0', '#c8f4ff'], blobs: [['#3fe0d0', 30, 80, 34], ['#8fd4ff', 80, 25, 30], ['#5a8cff', 15, 20, 26]], ridges: ['#2a8fd0', '#1a5fae', '#0e3a7a'], sun: '#ffffff' },
  { id: 'meadow', name: 'Meadow', sky: ['#4a8fe0', '#8ec8f0', '#cdeec4', '#fff6c0'], blobs: [['#fff3a0', 72, 18, 30], ['#a8e6a0', 25, 80, 34]], ridges: ['#6cc27a', '#3a9a62', '#1f6b4a'], sun: '#fffbe0' },
  { id: 'graphite', name: 'Graphite', sky: ['#5a606c', '#8a909c', '#b4bac4', '#d8dce4'], blobs: [['#ffffff', 30, 30, 30], ['#9aa2b2', 80, 70, 30]], ridges: ['#7c8392', '#575d6b', '#363a46'], sun: '#ffffff' },
]
export const ACCENTS = ['#0a84ff', '#8e5af7', '#ff4fa3', '#ff453a', '#ff9f0a', '#ffd60a', '#30d158', '#8e8e93']
export interface OSCtx {
  theme: Theme; setTheme: (t: Theme) => void
  wallpaper: string; setWallpaper: (w: string) => void
  accent: string; setAccent: (a: string) => void
  open: (a: AppId) => void
  notify: (title: string, body: string, app?: AppId) => void
  trash: string[]; setTrash: (f: string[]) => void
}
export const OS = createContext<OSCtx>(null as unknown as OSCtx)
export const useOS = () => useContext(OS)
