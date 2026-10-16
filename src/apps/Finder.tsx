import { useState } from 'react'
import { FolderIcon, FileIcon } from '../icons'
import { useOS } from '../os'
type Node = { name: string; children?: Node[]; size?: string }
const f = (name: string, children: Node[]): Node => ({ name, children })
const t = (name: string, size = '4 KB'): Node => ({ name, size })
const TREE: Record<string, Node> = {
  Recents: f('Recents', [t('Report.pdf', '1.2 MB'), t('todo.txt', '1 KB')]),
  Applications: f('Applications', ['Finder','Safari','Notes','Calculator','Terminal','Settings','Photos','Music'].map(n => t(n + '.app', '42 MB'))),
  Desktop: f('Desktop', [t('Screenshot.png', '820 KB'), f('Projects', [t('index.ts'), t('README.md')])]),
  Documents: f('Documents', [f('Work', [t('Q4.xlsx', '88 KB'), t('Plan.docx', '40 KB')]), f('Personal', [t('Recipe.txt')]), t('Resume.pdf', '210 KB')]),
  Downloads: f('Downloads', [t('installer.dmg', '120 MB'), t('photo.jpg', '2.4 MB')]),
  Pictures: f('Pictures', [t('Vacation.jpg', '3.1 MB'), t('Family.png', '1.9 MB')]),
}
export default function Finder() {
  const [side, setSide] = useState('Documents')
  const [path, setPath] = useState<string[]>([])
  const [sel, setSel] = useState<string | null>(null)
  const { setTrash, trash } = useOS()
  let node = TREE[side]
  for (const p of path) node = node.children!.find(c => c.name === p)!
  const go = (s: string) => { setSide(s); setPath([]); setSel(null) }
  return <div className="finder">
    <div className="sidebar">
      <h6>Favorites</h6>
      {Object.keys(TREE).map(k => <div key={k} className={'side-item' + (k === side ? ' on' : '')} onClick={() => go(k)}><FolderIcon size={16} />{k}</div>)}
      <h6>Locations</h6><div className="side-item">💽 Macintosh HD</div>
    </div>
    <div className="fmain">
      <div className="ftool"><button disabled={!path.length} onClick={() => setPath(path.slice(0, -1))}>‹</button>
        <b>{path.length ? path[path.length - 1] : side}</b><span className="crumb">{[side, ...path].join(' › ')}</span></div>
      <div className="grid" onClick={() => setSel(null)}>
        {node.children!.map(c => <div key={c.name} className={'fitem' + (sel === c.name ? ' on' : '')}
          onClick={e => { e.stopPropagation(); setSel(c.name) }}
          onDoubleClick={() => c.children && setPath([...path, c.name])}
          onKeyDown={e => { if (e.key === 'Backspace') setTrash([...trash, c.name]) }} tabIndex={0}>
          {c.children ? <FolderIcon /> : <FileIcon />}<span>{c.name}</span></div>)}
        {!node.children!.length && <i>Empty</i>}
      </div>
      <div className="fstat">{node.children!.length} items{sel ? ` — “${sel}” selected` : ''}</div>
    </div>
  </div>
}
