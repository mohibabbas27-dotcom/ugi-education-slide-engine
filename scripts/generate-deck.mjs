import pptxgen from 'pptxgenjs';
import fs from 'node:fs';
import path from 'node:path';
import { parseArgs, assertContent, readJson, ensureDir, root } from './lib.mjs';

const args=parseArgs(process.argv);
if (!args.input || !args.output) throw new Error('Use --input <lecture.json> --output <deck.pptx>');
const input=path.resolve(args.input), output=path.resolve(args.output);
const data=JSON.parse(fs.readFileSync(input,'utf8')); assertContent(data);
const design=readJson('config/design-system.json');
const subject=readJson(`config/subjects/${data.metadata.subject}.json`);
const pptx=new pptxgen(); pptx.layout=design.ratio; pptx.author='Unique Group of Institutions'; pptx.subject=data.metadata.unit; pptx.title=data.metadata.title; pptx.lang='en-US'; pptx.theme={headFontFace:design.fonts.display,bodyFontFace:design.fonts.body,lang:'en-US'};
const C=design.colors, accent=subject.accent;

function addChrome(slide, index) {
  slide.background={color:C.paper};
  slide.addShape(pptx.ShapeType.line,{x:.55,y:.76,w:12.2,h:0,line:{color:C.line,width:1}});
  slide.addText(`${subject.label.toUpperCase()}  •  CLASS ${data.metadata.class}  •  LECTURE ${String(data.metadata.lecture).padStart(2,'0')}`,{x:.58,y:.19,w:7.5,h:.3,fontFace:design.fonts.body,fontSize:11,bold:true,color:C.blue,margin:0});
  slide.addText(String(index).padStart(2,'0'),{x:12.05,y:7.12,w:.65,h:.2,fontSize:10,color:C.muted,align:'right',margin:0});
  slide.addText('Unique Group of Institutions',{x:.58,y:7.10,w:3.2,h:.22,fontSize:9,color:C.muted,margin:0});
}
function title(slide,text){slide.addText(text,{x:.58,y:.92,w:12.1,h:.58,fontFace:design.fonts.display,fontSize:design.sizes.slideTitle,bold:true,color:C.navy,margin:0,breakLine:false,fit:'shrink'});}
function bullets(slide,items,x=.78,y=2.0,w=5.6,h=4.4){slide.addText(items.map((t,i)=>({text:t,options:{bullet:{indent:18},breakLine:i<items.length-1}})),{x,y,w,h,fontSize:design.sizes.body,color:C.ink,breakLine:false,paraSpaceAfterPt:14,margin:.05,breakLineOnOverflow:false,fit:'shrink',valign:'mid'});}
function addNotes(slide, sources=[]){slide.addNotes(`[Sources]\n${sources.join('\n') || `Uploaded textbook: ${data.metadata.textbookPages}; LMS scope: ${data.metadata.lmsScope}`}`);}
let n=1;

{
 const s=pptx.addSlide(); s.background={color:C.navy};
 s.addShape(pptx.ShapeType.rect,{x:0,y:0,w:13.333,h:.18,fill:{color:C.gold},line:{color:C.gold}});
 s.addText(`${subject.label.toUpperCase()} • CLASS ${data.metadata.class}`,{x:.72,y:.78,w:7,h:.35,fontSize:15,bold:true,color:C.gold,margin:0});
 s.addText(data.metadata.title,{x:.72,y:1.55,w:10.9,h:1.25,fontFace:design.fonts.display,fontSize:design.sizes.deckTitle,bold:true,color:C.white,margin:0,fit:'shrink'});
 s.addText(`Unit ${data.metadata.unit}\nLecture ${String(data.metadata.lecture).padStart(2,'0')}  |  ${data.metadata.lmsScope}`,{x:.76,y:3.0,w:8.5,h:.8,fontSize:20,color:'DCE5FF',breakLine:false,margin:0});
 s.addShape(pptx.ShapeType.rect,{x:.75,y:5.55,w:4.1,h:.08,fill:{color:accent},line:{color:accent}});
 s.addText('TEXTBOOK-ALIGNED • LMS-ALIGNED • TEACHER-READY',{x:.75,y:5.8,w:7.5,h:.35,fontSize:12,bold:true,color:C.white,margin:0}); addNotes(s); n++;
}
{
 const s=pptx.addSlide(); addChrome(s,n++); title(s,'Introduction');
 s.addText(data.introduction,{x:.78,y:1.85,w:7.2,h:3.9,fontSize:27,bold:true,color:C.ink,margin:.05,fit:'shrink',valign:'mid'});
 s.addShape(pptx.ShapeType.arc,{x:9.2,y:2.0,w:2.6,h:2.6,adjustPoint:.35,rotate:20,fill:{color:accent,transparency:5},line:{color:accent}});
 s.addShape(pptx.ShapeType.arc,{x:9.8,y:2.6,w:2.6,h:2.6,adjustPoint:.35,rotate:200,fill:{color:C.gold,transparency:8},line:{color:C.gold}}); addNotes(s);
}
{
 const s=pptx.addSlide(); addChrome(s,n++); title(s,'Student Learning Objectives');
 s.addText('By the end of this lecture, students will be able to:',{x:.78,y:1.65,w:8.5,h:.4,fontSize:22,color:C.muted,margin:0});
 bullets(s,data.slos,.9,2.15,10.9,4.45); addNotes(s);
}
if(data.previousKnowledge){const s=pptx.addSlide();addChrome(s,n++);title(s,'Let’s Connect');s.addText(data.previousKnowledge,{x:1.0,y:2.05,w:11.2,h:2.6,fontSize:30,bold:true,color:C.ink,align:'center',valign:'mid',margin:.1,fit:'shrink'});s.addShape(pptx.ShapeType.line,{x:3.2,y:5.25,w:6.9,h:0,line:{color:accent,width:5,beginArrowType:'none',endArrowType:'triangle'}});addNotes(s);}

for(const item of data.slides){const s=pptx.addSlide();addChrome(s,n++);title(s,item.title);
 if(item.type==='comparison' && item.columns){item.columns.slice(0,2).forEach((col,i)=>{const x=.72+i*6.08;s.addShape(pptx.ShapeType.rect,{x,y:1.75,w:5.72,h:4.85,rectRadius:.08,fill:{color:i? 'FFF7D6':'EAF2F8'},line:{color:i?C.gold:accent,width:2}});s.addText(col.title,{x:x+.28,y:2.0,w:5.1,h:.45,fontSize:27,bold:true,color:i?C.navy:accent,margin:0});bullets(s,col.items,x+.35,2.65,4.95,3.45);});}
 else {if(item.lead)s.addText(item.lead,{x:.78,y:1.65,w:11.6,h:1.0,fontSize:25,bold:true,color:C.ink,margin:.02,fit:'shrink'}); if(item.bullets)bullets(s,item.bullets,.9,item.lead?2.85:1.85,10.9,item.lead?3.35:4.4); if(item.answer)addNotes(s,[`Answer: ${item.answer}`]);}
 addNotes(s);
}
{
 const s=pptx.addSlide();addChrome(s,n++);title(s,'Lecture Recap');bullets(s,data.recap,.9,1.9,10.9,4.5);addNotes(s);
}
{
 const s=pptx.addSlide();addChrome(s,n++);title(s,'Review Questions');bullets(s,data.reviewQuestions,.9,1.85,10.9,4.65);if(data.nextLectureBridge)s.addText(data.nextLectureBridge,{x:.78,y:6.3,w:11.65,h:.45,fontSize:15,italic:true,color:C.blue,margin:.05,fit:'shrink'});addNotes(s);
}

ensureDir(output); await pptx.writeFile({fileName:output}); console.log(`Created ${output}`);

