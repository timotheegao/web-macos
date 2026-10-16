import { useState } from 'react'
import { FolderIcon, FileIcon, Glyph } from '../icons'
import { useOS } from '../os'
import { Seg } from '../ui'
type Node = { name: string; children?: Node[]; size?: string; date?: string; kind?: string }
const f = (name: string, children: Node[]): Node => ({ name, children, date: 'Today at 9:41 AM', kind: 'Folder', size: '--' })
const t = (name: string, size = '4 KB', kind = 'Document'): Node => ({ name, size, date: 'Yesterday at 6:12 PM', kind })
const TREE: Record<string, Node> = {
  Recents: f('Recents', [t('Report.pdf', '1.2 MB', 'PDF Document'), t('todo.txt', '1 KB', 'Plain Text'), t('Screenshot.png', '820 KB', 'PNG image')]),
  Applications: f('Applications', ['Calculator', 'Finder', 'Music', 'Notes', 'Photos', 'Safari', 'System Settings', 'Terminal'].map(n => t(n + '.app', '42 MB', 'Application'))),
  Desktop: f('Desktop', [t('Screenshot.png', '820 KB', 'PNG image'), f('Projects', [t('index.ts', '2 KB', 'TypeScript'), t('README.md', '3 KB', 'Markdown')])]),
  Documents: f('Documents', [f('Work', [t('Q4.xlsx', '88 KB', 'Excel'), t('Plan.docx', '40 KB', 'Word')]), f('Personal', [t('Recipe.txt', '1 KB', 'Plain Text')]), t('Resume.pdf', '210 KB', 'PDF Document')]),
  Downloads: f('Downloads', [t('installer.dmg', '120 MB', 'Disk Image'), t('photo.jpg', '2.4 MB', 'JPEG image'), t('archive.zip', '14 MB', 'ZIP archive')]),
  Pictures: f('Pictures', [t('Vacation.jpg', '3.1 MB', 'JPEG image'), t('Family.png', '1.9 MB', 'PNG image')]),
}
const SIDE: [string, string, (s?: number) => JSX.Element][] = [['Recents', 'Recents', Glyph.clock], ['Applications', 'Applications', Glyph.app], ['Desktop', 'Desktop', Glyph.desktop], ['Documents', 'Documents', Glyph.doc], ['Downloads', 'Downloads', Glyph.dl], ['Pictures', 'Pictures', Glyph.pic]]
export default function Finder() {
  const [side, setSide] = useState('Documents'), [path, setPath] = useState<string[]>([]), [fwd, setFwd] = useState<string[]>([])
  const [sel, setSel] = useState<string | null>(null), [view, setView] = useState(0), [q, setQ] = useState('')
  const { setTrash, trash, notify } = useOS()
  let node = TREE[side]; for (const p of path) node = node.children!.find(c => c.name === p)!
  const items = node.children!.filter(c => c.name.toLowerCase().includes(q.toLowerCase()))
  const go = (s: string) => { setSide(s); setPath([]); setSel(null); setFwd([]) }
  const title = path.length ? path[path.length - 1] : side
  const ext = (n: string) => (n.includes('.') ? n.split('.').pop()! : '')
  const del = () => { if (sel) { setTrash([...trash, sel]); notify('Finder', `“${sel}” moved to Trash`) ; setSel(null) } }
  return <div className="split" tabIndex={0} onKeyDown={e => e.key === 'Backspace' && del()} style={{ outline: 0 }}>
    <div className="sidebar float">
      <div className="sb-space" data-drag />
      <h6>Favorites</h6>
      <div className="side-item"><span className="sg">{Glyph.airdrop(15)}</span>AirDrop</div>
      {SIDE.map(([k, l, g]) => <div key={k} className={'side-item' + (k === side ? ' on' : '')} onClick={() => go(k)}><span className="sg">{g(15)}</span>{l}</div>)}
      <h6>iCloud</h6><div className="side-item"><span className="sg">{Glyph.cloud(15)}</span>iCloud Drive</div>
      <h6>Locations</h6><div className="side-item"><span className="sg">{Glyph.disk(15)}</span>Macintosh HD</div>
    </div>
    <div className="main">
      <div className="toolbar" data-drag>
        <div className="tb-nav" data-nodrag><button className="tbtn" disabled={!path.length} onClick={() => { setFwd([path[path.length - 1], ...fwd]); setPath(path.slice(0, -1)) }}>{Glyph.chevL(15)}</button>
          <button className="tbtn" disabled={!fwd.length} onClick={() => { setPath([...path, fwd[0]]); setFwd(fwd.slice(1)) }}>{Glyph.chevR(15)}</button></div>
        <div className="tb-title" data-drag><FolderIcon size={18} />{title}</div>
        <div className="tb-right"><Seg items={[Glyph.grid(15), Glyph.list(15)]} value={view} onChange={setView} />
          <div className="searchpill" data-nodrag>{Glyph.search(12)}<input placeholder="Search" value={q} onChange={e => setQ(e.target.value)} /></div></div>
      </div>
      <div className="content" onClick={() => setSel(null)}>
        {view === 0 ? <div className="grid">{items.map(c => <div key={c.name} className={'fitem' + (sel === c.name ? ' on' : '')} onClick={e => { e.stopPropagation(); setSel(c.name) }}
          onDoubleClick={() => c.children && (setPath([...path, c.name]), setFwd([]))}><div className="fic">{c.children ? <FolderIcon size={62} /> : <FileIcon size={62} ext={ext(c.name)} />}</div><span>{c.name}</span></div>)}</div> :
          <table className="list"><thead><tr><th>Name</th><th>Date Modified</th><th>Size</th><th>Kind</th></tr></thead><tbody>
            {items.map(c => <tr key={c.name} className={sel === c.name ? 'on' : ''} onClick={e => { e.stopPropagation(); setSel(c.name) }} onDoubleClick={() => c.children && (setPath([...path, c.name]), setFwd([]))}>
              <td>{c.children ? <FolderIcon size={18} /> : <FileIcon size={18} />}{c.name}</td><td>{c.date}</td><td>{c.size}</td><td>{c.kind}</td></tr>)}</tbody></table>}
        {!items.length && <div className="empty">No items</div>}
      </div>
      <div className="pathbar">{['Macintosh HD', 'Users', 'guest', side, ...path].map((p, i, a) => <span key={i}>{p}{i < a.length - 1 && <em>›</em>}</span>)}</div>
      <div className="fstat">{items.length} items{sel ? ` · “${sel}” selected` : ''}</div>
    </div>
  </div>
}
