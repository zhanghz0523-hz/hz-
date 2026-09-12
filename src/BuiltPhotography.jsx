import React,{useEffect,useLayoutEffect,useRef,useState} from 'react';
import archive from './built.json';
import './built-photography.css';

// Each spread is composed from the actual images, preserving the supplied groups.
const editions=[
 {id:'project-4',en:'YOSEMITE',cover:0,detail:5,chapters:[{title:'曲线与光',en:'CURVES & LIGHT',spreads:[[0],[11,14],[5,1],[12],[3,4],[9,10],[13,6],[2,7,8]]}]},
 {id:'project-0',en:'PARK AVENUE',cover:2,detail:7,chapters:[{title:'居住的日常',en:'EVERYDAY LIVING',spreads:[[2],[8,4],[1,3],[7],[5,10],[6,9],[0]]}]},
 {id:'project-3',en:'TIANRUI CHENZHANG',cover:9,detail:10,chapters:[{title:'材质与温度',en:'MATERIAL & WARMTH',spreads:[[9,13],[5,0],[3,6,7],[10],[1,4],[8,11],[12,2]]}]},
 {id:'project-2',en:'TIANJIN',cover:0,detail:10,chapters:[{title:'光的路径',en:'PATHS OF LIGHT',spreads:[[0],[1,3],[2,4],[5],[6,7],[8,11],[10,14],[9,12,13]]}]},
 {id:'project-1',en:'SHIJIAZHUANG',cover:11,detail:22,chapters:[
  {title:'空间 01',en:'RESIDENCE / 01',spreads:[[0],[1,4],[3],[2,10],[5],[6,7],[8,9]]},
  {title:'空间 02',en:'RESIDENCE / 02',spreads:[[11],[12,17],[13,14],[15,16],[20],[18],[19,21]]},
  {title:'空间 03',en:'RESIDENCE / 03',spreads:[[27],[22,25],[23,24],[26]]}
 ]}
].map(e=>({...archive.find(p=>p.id===e.id),...e}));
const number=n=>String(n).padStart(2,'0');
export default function BuiltPhotography({imageProps,route}){
 const project=editions.find(p=>route===`#practice/built/${p.id}`);
 const [active,setActive]=useState(null);
 const dialog=useRef(null);
 const collection=project?project.chapters.flatMap(c=>c.spreads.flat()).map(id=>project.photos.find(p=>p.id===id)):[];
 const current=collection.findIndex(p=>p.id===active?.id);
 const step=direction=>setActive(collection[(current+direction+collection.length)%collection.length]);
 useLayoutEffect(()=>{window.scrollTo({top:0,behavior:'instant'});setActive(null);},[route]);
 useEffect(()=>{if(active){dialog.current.showModal();const prev=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{document.body.style.overflow=prev;};}dialog.current?.close();},[active]);
 const renderPhoto=(id,priority=false)=>{
  const photo=project.photos.find(p=>p.id===id);
  return <figure key={id} className={photo.width>photo.height?'landscape':'portrait'}><button onClick={()=>setActive(photo)} aria-label={`放大查看 ${project.name} 照片 ${id+1}`}><img {...imageProps(photo.src,{width:1600,sizes:'(max-width: 700px) 92vw, 75vw',quality:88})} width={photo.width} height={photo.height} alt={`${project.name} · 现场影像 ${number(id+1)}`} loading={priority?'eager':'lazy'} fetchPriority={priority?'high':'auto'} decoding="async"/></button><figcaption><span>{project.name}</span><span>{number(collection.findIndex(p=>p.id===id)+1)} / {number(collection.length)}</span></figcaption></figure>;
 };
 return <main className="built-page">
  <div className="built-topline"><a href={project?'#practice/built':'#practice'}>← {project?'全部项目拍摄':'创作延展'}</a><span>HZ / PHOTOGRAPHIC ARCHIVE</span></div>
  {!project?<>
   <section className="built-intro"><p className="built-eyebrow">EXTENDED PRACTICE — PROJECT PHOTOGRAPHY</p><h1>空间，<br/><span>在生活之中。</span></h1><div className="built-intro-bottom"><p>项目拍摄</p><p>从整体到细节，记录空间落成后的光、材质与日常。</p><span>05 COLLECTIONS</span></div></section>
   <nav className="built-index" aria-label="项目拍摄索引">{editions.map((p,i)=><a key={p.id} href={`#practice/built/${p.id}`}><span>{number(i+1)}</span>{p.name}</a>)}</nav>
   <div className="built-collections">{editions.map((p,i)=>{
    const cover=p.photos.find(x=>x.id===p.cover),detail=p.photos.find(x=>x.id===p.detail);
    return <article key={p.id} className={`built-collection collection-${i}`}><a className="built-main-image" href={`#practice/built/${p.id}`} aria-label={`浏览${p.name}项目拍摄`}><img {...imageProps(cover.src,{width:1600,sizes:'(max-width: 700px) 92vw, 58vw',quality:88})} width={cover.width} height={cover.height} alt={`${p.name}空间实景`} loading={i?'lazy':'eager'}/></a><div className="built-collection-note"><p className="built-eyebrow">{number(i+1)} / {p.en}</p><h2><a href={`#practice/built/${p.id}`}>{p.name}</a></h2><p>{number(p.photos.length)} PHOTOGRAPHS{p.chapters.length>1?' / 03 SERIES':''}</p><a className="built-view" href={`#practice/built/${p.id}`}>浏览影像 <span>↗</span></a></div><a className="built-detail-image" href={`#practice/built/${p.id}`} aria-label={`浏览${p.name}影像集`}><img {...imageProps(detail.src,{width:768,sizes:'(max-width: 700px) 42vw, 22vw',quality:86})} width={detail.width} height={detail.height} alt={`${p.name}空间细节`} loading="lazy"/></a></article>;
   })}</div>
  </>:<>
   <section className="built-project-intro"><p className="built-eyebrow">PROJECT PHOTOGRAPHY / {number(editions.indexOf(project)+1)}</p><div><h1>{project.name}</h1><p>{project.en}<br/>{number(collection.length)} PHOTOGRAPHS</p></div></section>
   {project.chapters.length>1&&<nav className="built-chapter-nav" aria-label="空间分组">{project.chapters.map((c,i)=><button key={c.title} onClick={()=>document.getElementById(`built-chapter-${i}`).scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})}>{c.title}</button>)}</nav>}
   {project.chapters.map((chapter,ci)=><section key={chapter.title} className="built-chapter" id={`built-chapter-${ci}`}><div className="built-chapter-heading"><h2>{chapter.title}</h2><span>{chapter.en}</span></div>{chapter.spreads.map((ids,i)=><div key={i} className={`built-spread spread-${ids.length} spread-position-${i%3}`}>{ids.map((id,j)=>renderPhoto(id,ci===0&&i===0&&j===0))}</div>)}</section>)}
   <a className="built-next" href={`#practice/built/${editions[(editions.indexOf(project)+1)%editions.length].id}`}><span>下一个影像集 / NEXT COLLECTION</span><strong>{editions[(editions.indexOf(project)+1)%editions.length].name}</strong><span>↗</span></a>
  </>}
  <div className="built-end"><a href={project?'#practice/built':'#practice'}>{project?'返回全部项目拍摄':'返回创作延展'} ↑</a><span>ZHANG HONGZHI</span></div>
  <dialog ref={dialog} className="built-lightbox" aria-label="项目拍摄大图浏览" onCancel={()=>setActive(null)} onClick={e=>{if(e.target===e.currentTarget)setActive(null);}} onKeyDown={e=>{if(e.key==='ArrowRight'){e.preventDefault();step(1);}if(e.key==='ArrowLeft'){e.preventDefault();step(-1);}}}>
   <button className="built-close" onClick={()=>setActive(null)} autoFocus aria-label="关闭大图">关闭 ×</button>
   {active&&<><img {...imageProps(active.src,{width:2000,sizes:'95vw',quality:92})} alt={`${project?.name} · 现场影像 ${number(active.id+1)}`}/><div className="built-lightbox-controls"><button onClick={()=>step(-1)} aria-label="上一张">←</button><span>{number(current+1)} / {number(collection.length)}</span><button onClick={()=>step(1)} aria-label="下一张">→</button></div></>}
  </dialog>
 </main>;
}
