import { useState } from 'react'
export default function Calculator() {
  const [d, setD] = useState('0'), [acc, setAcc] = useState<number | null>(null), [op, setOp] = useState<string | null>(null), [fresh, setFresh] = useState(true)
  const calc = (a: number, b: number, o: string) => o === '+' ? a + b : o === '−' ? a - b : o === '×' ? a * b : b === 0 ? NaN : a / b
  const fmt = (n: number) => isNaN(n) ? 'Error' : String(+n.toPrecision(10))
  const press = (k: string) => {
    if (/\d/.test(k)) { setD(fresh || d === '0' ? k : d + k); setFresh(false) }
    else if (k === '.') { if (fresh) { setD('0.'); setFresh(false) } else if (!d.includes('.')) setD(d + '.') }
    else if (k === 'AC') { setD('0'); setAcc(null); setOp(null); setFresh(true) }
    else if (k === '±') setD(fmt(-parseFloat(d)))
    else if (k === '%') setD(fmt(parseFloat(d) / 100))
    else { const v = parseFloat(d); const r = acc !== null && op && !fresh ? calc(acc, v, op) : v
      setD(fmt(r)); setAcc(r); setOp(k === '=' ? null : k); setFresh(true) }
  }
  const keys = ['AC','±','%','÷','7','8','9','×','4','5','6','−','1','2','3','+','0','.','=']
  return <div className="calc"><div className="cdisp">{d}</div><div className="ckeys">
    {keys.map(k => <button key={k} className={'k' + ('÷×−+='.includes(k) ? ' op' : 'AC±%'.includes(k) && k.length < 3 && !/\d/.test(k) ? ' fn' : '') + (k === '0' ? ' zero' : '')} onClick={() => press(k)}>{k}</button>)}</div></div>
}
