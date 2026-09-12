import React from 'react';
import './extensions.css';

const sections=[
 {id:'built',name:'项目拍摄',en:'PROJECT PHOTOGRAPHY',note:'空间落成之后，生活开始之前。',images:['/assets/built/project-4-0.jpg','/assets/built/project-4-1.jpg','/assets/built/project-4-10.jpg','/assets/built/project-4-12.jpg']},
 {id:'photo',name:'摄影作品',en:'PHOTOGRAPHY',note:'山野、街巷，与偶然停留的瞬间。',images:['/assets/photography/photo-7.jpg','/assets/photography/photo-0.jpg','/assets/photography/photo-2.jpg','/assets/photography/photo-10.jpg']},
 {id:'drawing',name:'手绘',en:'HAND DRAWING',note:'让思绪，落在纸上。',images:Array(4).fill('/assets/practice-drawing-cover-v2.png')}
];
export default function Extensions({imageProps}) {
 return <main id="practice" className="work-archive-page extensions-index" aria-labelledby="practice-title">
  <div className="wrap extensions-index-intro">
   <div className="archive-intro-top"><span>03 / EXTENDED PRACTICE</span><span>ZHANG HONGZHI — PERSONAL ARCHIVE</span></div>
   <div className="extensions-heading"><div><p>BEYOND THE PLAN</p><h1 id="practice-title">创作延展<span>另一种观看。</span></h1></div><p>从项目现场到个人创作，<br/>记录空间之外的爱好与表达。</p></div>
  </div>
  <div className="archive-strips archive-view-image">
   {sections.map((section,index)=><a key={section.id} href={'#practice/'+section.id} className={'archive-strip extension-strip-'+section.id} aria-label={'打开'+section.name}>
    <div className="archive-strip-meta wrap"><span>{String(index+1).padStart(3,'0')}.</span><h2>{section.name}</h2><p>{section.en}</p><p>{section.note}</p><b aria-hidden="true">↗</b></div>
    <div className="archive-filmstrip"><div className="archive-filmtrack">{[0,1].map(copy=><div className="archive-filmgroup" key={copy} aria-hidden={copy===1?true:undefined}>{section.images.map((src,i)=><div key={i}><img {...imageProps(src,{width:1200,sizes:'(max-width:700px) 80vw,40vw',quality:88})} alt={copy===0&&i===0?section.name:''} loading={index===0?'eager':'lazy'}/></div>)}</div>)}</div></div>
   </a>)}
  </div>
  <div className="wrap extensions-colophon"><span>空间 / 观察 / 表达</span><span>A CONTINUING EXPLORATION</span></div>
 </main>;
}
