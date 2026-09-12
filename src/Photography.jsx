import React,{useState,useEffect,useRef} from 'react';
import photos from './photography.json';
import './photography.css';
const groups=[{id:'all',name:'全部',en:'ALL'},{id:'landscape',name:'山野之间',en:'LANDSCAPES'},{id:'city',name:'城市切片',en:'URBAN FRAGMENTS'},{id:'daily',name:'日常片刻',en:'EVERYDAY'}];
const order=[8,18,7,20,9,13,17,19,14,11,22,30,31,32,25,29,26,28,6,10,21,2,3,4,5,0,1,23,24,27,16,12];
const collection=order.map(id=>photos.find(p=>p.id===id)).filter(Boolean);
export default function Photography({imageProps}){
 const [filter,setFilter]=useState('all');
 const [active,setActive]=useState(null);
 const dialog=useRef(null);
 const selected=collection.filter(p=>filter==='all'||p.category===filter);
 const current=selected.findIndex(p=>p.id===active?.id);
 const step=direction=>setActive(selected[(current+direction+selected.length)%selected.length]);
 useEffect(()=>{window.scrollTo(0,0);document.title='摄影作品 — 张宏志 HZ';},[]);
 useEffect(()=>{if(active){dialog.current.showModal();const previous=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{document.body.style.overflow=previous;};}else dialog.current?.close();},[active]);
 const label=p=>`${groups.find(g=>g.id===p.category).name} · ${String(collection.indexOf(p)+1).padStart(2,'0')}`;
 return <main className="photo-page wrap">
  <a className="back" href="#practice">← 返回创作延展</a>
  <div className="photo-heading"><div><p>PHOTOGRAPHY / PERSONAL OBSERVATIONS</p><h1>摄影作品</h1></div><p>山野、街巷与日常，<br/>一些驻足的瞬间。</p></div>
  <figure className="photo-opening"><img {...imageProps(photos.find(p=>p.id===7).src,{width:1600,sizes:'100vw',quality:85})} alt="云层下的山脉与蓝色湖面" fetchPriority="high"/><figcaption><span>光影之间，目之所及。</span><span>ZHANG HONGZHI / PHOTOGRAPHY</span></figcaption></figure>
  <div className="photo-toolbar"><div className="photo-filters" aria-label="摄影分类">{groups.map(g=><button key={g.id} aria-pressed={filter===g.id} onClick={()=>setFilter(g.id)}>{g.name}<small>{g.en}</small></button>)}</div><span>{String(selected.length).padStart(2,'0')} PHOTOGRAPHS</span></div>
  <div className="photo-gallery">{selected.map(p=><figure key={p.id}><button onClick={()=>setActive(p)} aria-label={`放大查看 ${label(p)}`}><img {...imageProps(p.src,{width:1000,sizes:'(max-width: 700px) 90vw, (max-width: 1050px) 45vw, 30vw',quality:85})} width={p.width} height={p.height} alt={label(p)} loading="lazy" decoding="async"/></button><figcaption><span>{label(p)}</span><span>{String(collection.indexOf(p)+1).padStart(2,'0')}</span></figcaption></figure>)}</div>
  <a className="photo-return" href="#practice">返回创作延展</a>
  <dialog ref={dialog} className="photo-lightbox" onCancel={()=>setActive(null)} onClick={e=>{if(e.target===e.currentTarget)setActive(null);}} onKeyDown={e=>{if(e.key==='ArrowRight'){e.preventDefault();step(1);}if(e.key==='ArrowLeft'){e.preventDefault();step(-1);}}} aria-label="摄影大图浏览">
   <button className="photo-close" onClick={()=>setActive(null)} autoFocus aria-label="关闭大图">关闭 ×</button>
   {active&&<><img {...imageProps(active.src,{width:2000,sizes:'95vw',quality:90})} alt={label(active)}/><div className="photo-controls"><button onClick={()=>step(-1)}>← 上一张</button><span>{current+1} / {selected.length}</span><button onClick={()=>step(1)}>下一张 →</button></div></>}
  </dialog>
 </main>;
}
