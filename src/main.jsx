import React, {useEffect, useLayoutEffect, useState} from 'react';
import {createRoot} from 'react-dom/client';
import projectData from './projects.json';
import {selectProjectImages} from './project-image-selection';
import './style.css';
import Photography from './Photography';
import BuiltPhotography from './BuiltPhotography';
import Extensions from './Extensions';

const Arrow=()=> <span aria-hidden="true">↗</span>;
const projects=projectData.map(selectProjectImages);
const heroProjects=[
 {id:'space',city:'',name:'空间光影',images:['/assets/hero-space-hd.jpg'],ratio:3840/2160},
 {...projects.find(p=>p.id==='wangshan'),images:['/assets/hero-wangshan-hd.jpg'],ratio:3500/1520},
 {...projects.find(p=>p.id==='yosemite'),images:['/assets/hero-yosemite-hd.jpg'],ratio:3001/2014},
 {...projects.find(p=>p.id==='lighting'),images:['/assets/hero-lighting-hd.jpg'],ratio:4000/2354}
];
function heroImageProps(p){
 return imageProps(p.images[0]);
}
const DETAIL_SIZES='(max-width: 700px) calc(100vw - 40px), (max-width: 1050px) calc(100vw - 64px), 1700px';
const ARCHIVE_SIZES='(max-width: 390px) calc(100vw - 40px), (max-width: 700px) 50vw, (max-width: 1000px) 33vw, (max-width: 1250px) 25vw, 20vw';
// Serve static assets directly on ESA Pages.
function imageProps(src){
 return {src};
}
const practiceSections=[
 {id:'built',name:'项目拍摄',en:'PROJECT PHOTOGRAPHY',note:'项目名称 · 地点 · 年份',description:'已完成项目的现场记录。'},
 {id:'photo',name:'摄影作品',en:'PHOTOGRAPHY',note:'个人兴趣与视觉观察',description:'空间、城市与材质的观察。'},
 {id:'drawing',name:'手绘',en:'HAND DRAWING',note:'设计思考与表达练习',description:'概念草图与设计表达。'}
];
function PracticeDetail({section}){
 return <main className="practice-detail wrap"><a className="back" href="#practice">← 返回创作延展</a><div className="project-heading"><div><p className="kicker">03 / EXTENDED PRACTICE</p><h1>{section.name}</h1></div><p>{section.en}</p></div><div className={`practice-detail-empty practice-detail-empty-${section.id}`}><span className="practice-detail-label">{section.en}</span><strong>CONTENT TO BE ADDED</strong><p>{section.description}<br/>{section.note}</p></div></main>
}
function Home({slide,onNext}){
 const handleKeyDown=(event)=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();onNext()}}
 return <main className="home-page"><section className="hero hero-typographic" id="home" onClick={onNext} onKeyDown={handleKeyDown} role="button" tabIndex={0} aria-label="切换首页封面"><div className="hero-slideshow" aria-hidden="true">{heroProjects.map((item,index)=><img key={item.id} className={`hero-slide ${index===slide?'active':''}`} {...heroImageProps(item)} alt="" loading="eager" fetchPriority={index===0?'high':'auto'} decoding="async"/>)}</div><div className="hero-shade"/><div className="hero-art-copy wrap"><h1 aria-label="ZHANG HONGZHI"><span>ZHANG</span><span>HONGZHI</span></h1><p className="hero-art-meta">INTERIOR DESIGNER<br/>SPACE · LIGHT · MATERIAL<br/>SELECTED WORKS<br/>2022 — 2026</p></div><div className="hero-art-foot wrap"><span>FEATURED / {heroProjects[slide].name} <i/></span><span>{String(slide+1).padStart(2,'0')} / {String(heroProjects.length).padStart(2,'0')}</span></div></section></main>
}
function About(){return <main className="standalone-page"><section className="about wrap section resume-page" id="about" aria-labelledby="resume-title"><div className="resume-contact-line"><a href="tel:18366752050">183 6675 2050</a><a href="mailto:zhanghz0523@gmail.com">zhanghz0523@gmail.com</a><span>微信：z595654303</span></div><h2 className="resume-title" id="resume-title">ABOUT ME<span>关于我</span></h2><div className="resume-layout"><div className="resume-main"><img className="brand-mark resume-brand" src="/assets/hz-logo.png" alt="HZ"/><section className="resume-block"><h3>经历 <span>/ EXPERIENCE</span></h3><article className="resume-job"><h4>东易日盛｜设计师助理 · 效果图表现师</h4><p className="resume-date">2021.09 — 2022.05 / 青岛</p><p>协助主创完成家装全案方案。<br/>负责平面优化、SU 建模、效果图渲染、方案 PPT 排版，对接客户调整空间落地细节。</p></article><article className="resume-job"><h4>北京营造清美建筑设计有限公司｜空间设计师 · 效果图表现师</h4><p className="resume-date">2022.07 — 至今 / 北京</p><p>独立负责私宅、商业展厅、办公会所类项目。<br/>统筹前期概念推演、平面方案、效果图输出，配合施工团队完成落地跟进，兼顾手绘概念表达与写实渲染。</p></article></section><section className="resume-block"><h3>技能 <span>/ SKILLS</span></h3><ul className="resume-tool-list"><li>SketchUp <span>（Enscape）</span></li><li>SketchBook</li><li>AutoCAD</li><li>3ds Max <span>（Corona）</span></li><li>Photoshop</li><li>AI <span>（前期概念、分析、渲染）</span></li></ul></section><section className="resume-block"><h3>优势 <span>/ ADVANTAGES</span></h3><p>擅长全流程室内空间设计与方案创意思维。<br/>涵盖前期场地分析、平面方案规划、概念 PPT 方案输出；<br/>SU 三维建模推敲、3ds Max / Corona 写实渲染与手绘表达。<br/>参与并独立推进私宅、商业、展厅、办公、会所等多类型项目设计。</p></section></div><aside className="resume-person"><div><img className="resume-portrait" {...imageProps('/assets/portrait-clear.png',{width:600,sizes:'(max-width: 700px) 240px, 300px',quality:78})} alt="室内设计师张宏志"/><div className="resume-identity"><p>ZHANG HONGZHI</p><h3>张宏志</h3><time className="resume-birthday" dateTime="1997-05-23">1997.05.23</time><span>室内设计师 / 北京</span></div><div className="resume-education"><p>青岛农业大学（环艺 · 本科）</p><span>QINGDAO AGRICULTURAL UNIVERSITY</span></div><div className="resume-practice"><p>空间设计 / 视觉设计 / 绘画 / 摄影</p><span>SPACE DESIGN / VISUAL DESIGN PAINTING / PHOTOGRAPHY</span></div></div><blockquote className="resume-quote"><p>细节不仅是细节，<br/>它们构成了设计本身。</p><cite>— 查尔斯·伊姆斯</cite></blockquote></aside></div></section></main>}
function Work(){const groups=[{id:'residential',name:'私宅项目',en:'PRIVATE RESIDENCE',items:projects.filter(p=>p.kind==='私宅空间')},{id:'commercial',name:'工装项目',en:'COMMERCIAL & PUBLIC',items:projects.filter(p=>p.kind!=='私宅空间')}];return <main className="standalone-page"><section className="work wrap section" id="work"><div className="section-label"><span>02 / PROJECT ARCHIVE</span><span>2022 — 2026</span></div><div className="archive-heading"><h2>作品档案</h2><p>从居住的日常，到公共空间的体验。</p></div>{groups.map(group=><section className="project-group" key={group.id}><div className="group-heading"><h3>{group.name}<span>{group.en}</span></h3><span>{String(group.items.length).padStart(2,'0')} PROJECTS</span></div><div className="projects archive-grid">{group.items.map((p,i)=><a className="project-card" href={`#project/${p.id}`} key={p.id}><div className="project-image"><img {...imageProps(p.images[0],{width:800,sizes:ARCHIVE_SIZES,quality:76})} alt={`${p.city} · ${p.name}项目封面`} loading="lazy"/></div><div className="project-caption"><span className="index">{String(i+1).padStart(2,'0')}</span><div><h3>{p.name}</h3><p>{p.city} / {p.kind} · {p.area} m²</p><span className="archive-year">{p.year}</span></div></div></a>)}</div></section>)}</section></main>}
function PortfolioArchive(){
 const [view,setView]=useState('image');
 const [type,setType]=useState('all');
 const [order,setOrder]=useState('selected');
 const filtered=projects.filter(p=>type==='all'||(type==='residential'?p.kind==='私宅空间':p.kind!=='私宅空间'));
 const ordered=[...filtered].sort((a,b)=>order==='chronological'?(parseInt(b.year)-parseInt(a.year)):order==='alphabetical'?a.name.localeCompare(b.name,'zh-CN'):0);
 const controls=(label,items,value,setter)=><div className="archive-control"><span>{label}</span><div>{items.map(item=><button key={item.value} className={value===item.value?'active':''} onClick={()=>setter(item.value)} aria-pressed={value===item.value}>{item.label}</button>)}</div></div>;
 return <main className="standalone-page work-archive-page"><section className="work-archive" id="work">
  <div className="wrap archive-intro"><div className="archive-intro-top"><span>02 / PROJECT INDEX</span><span>ZHANG HONGZHI — 2022 / 2026</span></div><div className="archive-title"><p>INTERIOR / SPACE / EXPERIENCE</p><h1>SELECTED WORKS</h1><span>{String(ordered.length).padStart(2,'0')} PROJECTS</span></div>
   <div className="archive-controls">{controls('VIEW',[{value:'image',label:'IMAGE'},{value:'list',label:'LIST'}],view,setView)}{controls('TYPE',[{value:'all',label:'ALL'},{value:'residential',label:'RESIDENTIAL'},{value:'commercial',label:'COMMERCIAL'}],type,setType)}{controls('ORDER',[{value:'selected',label:'SELECTED'},{value:'chronological',label:'CHRONOLOGICAL'},{value:'alphabetical',label:'ALPHABETICAL'}],order,setOrder)}</div>
  </div>
  <div className={`archive-strips archive-view-${view}`}>{ordered.map((p,index)=>{
   const picks=p.archiveImages;
return <a className="archive-strip" href={`#project/${p.id}`} key={p.id}><div className="archive-strip-meta wrap"><span>{String(index+1).padStart(3,'0')}.</span><h2>{p.name}</h2><p><span>TYPE</span>{p.kind}</p><p><span>INFO</span>{p.city} · {p.area} m² · {p.year}</p><b aria-hidden="true">↗</b></div><div className="archive-filmstrip"><div className="archive-filmtrack">{[0,1].map(copy=><div className="archive-filmgroup" key={copy} aria-hidden={copy===1?true:undefined}>{picks.map((pick,i)=><div key={i}><img {...imageProps(pick,{width:i?900:1400,sizes:"(max-width: 700px) 80vw, 40vw",quality:80})} alt={copy===0&&i===0?`${p.name}项目封面`:""} loading={index<2?"eager":"lazy"}/></div>)}</div>)}</div></div></a>
  })}</div>
 </section></main>
}
const contactTiles=['/assets/hero-lighting-hd.jpg','/assets/hero-space-hd.jpg','/assets/future-11.webp','/assets/baochao-4.webp','/assets/poly-1.webp'];
function Contact({copied,copy}){return <main className="standalone-page"><section className="contact contact-editorial" id="contact"><div className="wrap contact-editorial-wrap"><div className="section-label"><span>04 / CONTACT</span><span>OPEN FOR SELECTED COLLABORATIONS</span></div><div className="contact-mosaic" aria-hidden="true">{contactTiles.map((src,index)=><figure key={src} className={'contact-tile contact-tile-'+(index+1)}><img src={src} alt=""/></figure>)}</div><div className="contact-editorial-content"><div className="contact-editorial-note"><span>ZHANG HONGZHI</span><span>INTERIOR DESIGN / SPACE / LIGHT</span></div><h1>LET’S<br/><span>MAKE SPACE.</span></h1><div className="contact-editorial-side"><p>从空间出发，讨论光、材质与人的关系。</p><p>Available for interior, visual and spatial collaborations.</p></div></div><div className="contact-editorial-email"><span>START A CONVERSATION</span><a href="mailto:zhanghz0523@gmail.com">zhanghz0523@gmail.com</a></div><div className="contact-baseline"><a href="tel:18366752050"><span>电话</span>183 6675 2050</a><button onClick={copy}><span>微信 / 点击复制</span>{copied?'已复制微信号':'z595654303'}</button></div></div></section></main>}
function App(){
 const [route,setRoute]=useState(location.hash||'#home'),[copied,setCopied]=useState(false),[slide,setSlide]=useState(0);
 const nextSlide=()=>setSlide(current=>(current+1)%heroProjects.length);
 useEffect(()=>{const update=()=>{setRoute(location.hash||'#home');window.scrollTo(0,0)};window.addEventListener('hashchange',update);return()=>window.removeEventListener('hashchange',update)},[]);
 const project=projects.find(p=>route===`#project/${p.id}`);
 const practiceSection=practiceSections.find(p=>(route===`#practice/${p.id}` || route.startsWith(`#practice/${p.id}/`)));
useLayoutEffect(()=>{const root=document.documentElement;const lightPage=route==='#work'||route==='#practice'||route==='#contact'||practiceSection?.id==='built';const theme=project?.theme||(lightPage?'light':'dark');root.dataset.projectTheme=project?theme:(lightPage?'light':'home');root.dataset.practiceTheme=practiceSection?.id==='built'?'built':'';root.style.setProperty('--project-background',project?.background||(theme==='light'?'#f5f5f3':'#101111'));const meta=document.querySelector('meta[name="theme-color"]');if(meta)meta.content=lightPage?'#f2f1ec':project?.background||(theme==='light'?'#f5f5f3':'#101111');return()=>{delete root.dataset.projectTheme;root.style.removeProperty('--project-background');delete root.dataset.practiceTheme}},[project,practiceSection,route]);

 useEffect(()=>{document.title=practiceSection?.id==='built'?'项目拍摄 — 张宏志 HZ':project?`${project.name} — 张宏志 HZ`:'张宏志 HZ — 室内设计师';document.documentElement.dataset.route=route==='#home'?'home':'page'},[route,project,practiceSection]);
 async function copy(){try{await navigator.clipboard.writeText('z595654303');setCopied(true);setTimeout(()=>setCopied(false),2500)}catch{setCopied(false)}}
 useEffect(()=>{if(route!=='#home')return;const timer=window.setInterval(()=>setSlide(current=>(current+1)%heroProjects.length),5200);return()=>window.clearInterval(timer)},[route]);
 const isHome=route==='#home';
 let content=isHome?<Home slide={slide} onNext={nextSlide}/>:route==='#about'?<About/>:route==='#work'?<PortfolioArchive/>:route==='#practice'?<Extensions imageProps={imageProps}/>:route==='#contact'?<Contact copied={copied} copy={copy}/>:project?<main className="detail wrap"><a className="back" href="#work">← 返回精选作品</a><div className="project-heading"><div><p className="kicker">PROJECT / {project.city.toUpperCase()}</p><h1>{project.name}</h1></div><p>{project.kind} / {project.area} m² / {project.year}</p></div>{project.note&&<p className="project-note">{project.note}</p>}<div className="detail-images">{project.images.map((image,i)=><figure key={image}><img {...imageProps(image,{width:1800,sizes:DETAIL_SIZES,quality:80})} alt={`${project.name} · 项目图 ${i+1}`} loading={i?'lazy':'eager'}/><figcaption>{String(i+1).padStart(2,'0')} / {String(project.images.length).padStart(2,'0')}<span>{project.name}</span></figcaption></figure>)}</div></main>:practiceSection?.id==='built'?<BuiltPhotography imageProps={imageProps} route={route}/>:practiceSection?.id==='photo'?<Photography imageProps={imageProps}/>:practiceSection?<PracticeDetail section={practiceSection}/>:<Home slide={slide} onNext={nextSlide}/>;
 return <><header className={isHome?'home-header':'solid'}><a className="logo" href="#home" aria-label="张宏志 首页"><img className="brand-mark" src="/assets/hz-logo.png" alt=""/><span>张宏志<br/>INTERIOR DESIGNER</span></a><nav aria-label="Primary navigation"><a className={route==='#about'?'active':''} href="#about">ABOUT <small>01</small></a><a className={route==='#work'?'active':''} href="#work">SELECTED WORK <small>02</small></a><a className={route.startsWith('#practice')?'active':''} href="#practice">EXTENSIONS <small>03</small></a><a className={route==='#contact'?'active':''} href="#contact">CONTACT <small>04</small></a></nav></header>{content}{!isHome&&<footer className="wrap"><a className="footer-logo" href="#home"><img className="brand-mark" src="/assets/hz-logo.png" alt="HZ"/></a><span>© 2026 · 室内设计 / 视觉表达</span><a href="#home">首页 ↑</a></footer>}</>
}
createRoot(document.getElementById('root')).render(<App/>);
