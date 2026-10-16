import { useOS, WALLPAPERS } from '../os'
export default function Settings() {
  const { theme, setTheme, wallpaper, setWallpaper } = useOS()
  return <div className="settings"><div className="sidebar"><h6>System Settings</h6>
    {['Appearance', 'Wallpaper'].map(x => <div key={x} className="side-item">{x}</div>)}</div>
    <div className="spane"><h3>Appearance</h3>
      <div className="appear">{(['light', 'dark'] as const).map(t => <div key={t} className={theme === t ? 'on' : ''} onClick={() => setTheme(t)}><div className={'thumb ' + t} />{t === 'light' ? 'Light' : 'Dark'}</div>)}</div>
      <h3>Wallpaper</h3>
      <div className="wps">{WALLPAPERS.map(w => <div key={w.id} className={wallpaper === w.id ? 'on' : ''} onClick={() => setWallpaper(w.id)}><div style={{ background: theme === 'dark' ? w.dark : w.light }} />{w.name}</div>)}</div></div></div>
}
