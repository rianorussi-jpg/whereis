import Phaser from 'phaser';

export const C={
  sky:0x55b9eb,sky2:0x279ad7,blue:0x2d98d4,blueDark:0x155f91,
  yellow:0xffbd17,yellowDark:0xcf7200,green:0x69b82c,greenDark:0x397d13,
  orange:0xef8a2c,brown:0x3a281d,brown2:0x6a4429,cream:0xfff3dd,
  cream2:0xecc998,navy:0x0d3c5d,white:0xffffff,text:0x3d281a
};

export function softPanel(scene,x,y,w,h,fill=0x3b291d,alpha=.94,depth=1,r=24,stroke=0xffffff,strokeAlpha=.12){
  const sh=scene.add.graphics().setDepth(depth);
  sh.fillStyle(0x000000,.22); sh.fillRoundedRect(x-w/2,y-h/2+7,w,h,r);
  const g=scene.add.graphics().setDepth(depth+1);
  g.fillStyle(fill,alpha); g.fillRoundedRect(x-w/2,y-h/2,w,h,r);
  g.lineStyle(2,stroke,strokeAlpha); g.strokeRoundedRect(x-w/2,y-h/2,w,h,r);
  g.fillStyle(0xffffff,.08); g.fillRoundedRect(x-w/2+5,y-h/2+5,w-10,Math.max(12,h*.18),Math.max(8,r-5));
  return {shadow:sh,g};
}

export function roundedButton(scene,x,y,w,h,label,fill=C.yellow,stroke=C.yellowDark,onClick=()=>{},options={}){
  const depth=options.depth||1,r=options.radius||Math.min(20,h*.34);
  const sh=scene.add.graphics().setDepth(depth);sh.fillStyle(0x000000,.24);sh.fillRoundedRect(x-w/2,y-h/2+6,w,h,r);
  const g=scene.add.graphics().setDepth(depth+1);g.fillStyle(fill,1);g.fillRoundedRect(x-w/2,y-h/2,w,h,r);g.lineStyle(3,stroke,1);g.strokeRoundedRect(x-w/2,y-h/2,w,h,r);
  g.fillStyle(0xffffff,.16);g.fillRoundedRect(x-w/2+5,y-h/2+5,w-10,Math.max(11,h*.25),Math.max(7,r-4));
  const t=scene.add.text(x,y-1,label,{fontFamily:'Arial Black,Arial',fontSize:`${options.fontSize||22}px`,color:options.color||'#fff',stroke:options.strokeColor||'#54310d',strokeThickness:options.strokeThickness??3,align:'center'}).setOrigin(.5).setDepth(depth+2);
  const z=scene.add.zone(x,y,w,h).setInteractive({useHandCursor:true}).setDepth(depth+3);
  z.on('pointerdown',()=>{g.setScale(.985);t.setScale(.985)});
  const reset=()=>{g.setScale(1);t.setScale(1)};z.on('pointerout',reset);z.on('pointerup',()=>{reset();onClick()});
  return {shadow:sh,g,t,zone:z};
}

export function icon(scene,type,x,y,size=28,color=0xffffff,depth=20){
  const g=scene.add.graphics().setDepth(depth);g.lineStyle(Math.max(2,size*.09),color,1);
  const s=size/2;
  switch(type){
    case 'search': g.strokeCircle(x-s*.2,y-s*.2,s*.62);g.lineBetween(x+s*.22,y+s*.22,x+s*.72,y+s*.72);break;
    case 'bulb': g.strokeCircle(x,y-s*.18,s*.58);g.lineBetween(x-s*.28,y+s*.45,x+s*.28,y+s*.45);g.lineBetween(x-s*.2,y+s*.68,x+s*.2,y+s*.68);g.lineBetween(x,y-s*.9,x,y-s*1.16);g.lineBetween(x-s*.88,y-s*.45,x-s*1.08,y-s*.58);g.lineBetween(x+s*.88,y-s*.45,x+s*1.08,y-s*.58);break;
    case 'target': g.strokeCircle(x,y,s*.82);g.strokeCircle(x,y,s*.48);g.fillStyle(color,1);g.fillCircle(x,y,s*.16);break;
    case 'trophy': g.strokeRoundedRect(x-s*.48,y-s*.65,s*.96,s*.78,s*.15);g.lineBetween(x,y+s*.13,x,y+s*.68);g.lineBetween(x-s*.35,y+s*.68,x+s*.35,y+s*.68);g.arc(x-s*.5,y-s*.35,s*.35,Math.PI*.5,Math.PI*1.5,false);g.arc(x+s*.5,y-s*.35,s*.35,-Math.PI*.5,Math.PI*.5,false);break;
    case 'paw': g.fillStyle(color,1);g.fillEllipse(x,y+s*.32,s*.9,s*.66);g.fillCircle(x-s*.55,y-s*.25,s*.25);g.fillCircle(x-s*.18,y-s*.55,s*.24);g.fillCircle(x+s*.2,y-s*.55,s*.24);g.fillCircle(x+s*.57,y-s*.23,s*.24);break;
    case 'shop': g.strokeRect(x-s*.62,y-s*.23,s*1.15,s*.72);g.lineBetween(x-s*.77,y-s*.75,x-s*.55,y-s*.75);g.lineBetween(x-s*.55,y-s*.75,x-s*.42,y-s*.23);g.strokeCircle(x-s*.28,y+s*.72,s*.16);g.strokeCircle(x+s*.38,y+s*.72,s*.16);break;
    case 'gear': g.strokeCircle(x,y,s*.45);g.strokeCircle(x,y,s*.15);for(let i=0;i<8;i++){const a=i*Math.PI/4;g.lineBetween(x+Math.cos(a)*s*.55,y+Math.sin(a)*s*.55,x+Math.cos(a)*s*.88,y+Math.sin(a)*s*.88)}break;
    case 'play': g.fillStyle(color,1);g.fillTriangle(x-s*.34,y-s*.58,x-s*.34,y+s*.58,x+s*.62,y);break;
    case 'back': g.lineBetween(x+s*.42,y-s*.62,x-s*.28,y);g.lineBetween(x-s*.28,y,x+s*.42,y+s*.62);break;
    case 'pause': g.lineStyle(Math.max(3,size*.13),color,1);g.lineBetween(x-s*.27,y-s*.58,x-s*.27,y+s*.58);g.lineBetween(x+s*.27,y-s*.58,x+s*.27,y+s*.58);break;
    case 'lock': g.strokeRoundedRect(x-s*.5,y-s*.05,s,s*.85,s*.12);g.arc(x,y-s*.12,s*.34,Math.PI,0,false);break;
    case 'coin': g.strokeCircle(x,y,s*.76);g.strokeCircle(x,y,s*.55);g.lineBetween(x,y-s*.3,x,y+s*.3);break;
    case 'clock': g.strokeCircle(x,y,s*.78);g.lineBetween(x,y,x,y-s*.45);g.lineBetween(x,y,x+s*.38,y+s*.12);break;
    default:g.strokeCircle(x,y,s*.7);
  }
  return g;
}

export function topBar(scene,title,right=''){
  softPanel(scene,215,48,410,64,C.brown,.97,20,20,0xffe3b4,.18);
  scene.add.text(215,47,title,{fontFamily:'Arial Black',fontSize:'21px',color:'#fff',stroke:'#21150e',strokeThickness:2}).setOrigin(.5).setDepth(23);
  if(right)scene.add.text(399,47,right,{fontFamily:'Arial Black',fontSize:'15px',color:'#ffe0a6'}).setOrigin(1,.5).setDepth(23);
}

export function backButton(scene,cb){
  const c=scene.add.circle(40,48,23,0xb9793e).setStrokeStyle(2,0xffe0a6,.8).setDepth(30).setInteractive({useHandCursor:true});icon(scene,'back',40,48,22,0xffffff,31);c.on('pointerup',cb);return c;
}

export function coinBadge(scene,x,y,value,depth=10,compact=false){
  const w=compact?102:138,h=compact?38:46;
  softPanel(scene,x,y,w,h,0x2d2018,.9,depth,20,0xffffff,.1);icon(scene,'coin',x-w/2+23,y,compact?20:24,0xffbd17,depth+3);
  scene.add.text(x+12,y,String(value),{fontFamily:'Arial Black',fontSize:compact?'16px':'20px',color:'#fff'}).setOrigin(.5).setDepth(depth+3);
}

export function drawLogo(scene,x,y,scale=1,depth=10){
  scene.add.text(x,y-40*scale,'Where is',{fontFamily:'Arial Black',fontSize:`${39*scale}px`,color:'#fff8ea',stroke:'#4a2b19',strokeThickness:8*scale}).setOrigin(.5).setDepth(depth);
  const k=scene.add.text(x,y+18*scale,'KIKA?',{fontFamily:'Arial Black',fontSize:`${66*scale}px`,color:'#ffc126',stroke:'#6c3308',strokeThickness:10*scale}).setOrigin(.5).setDepth(depth+1);k.setShadow(0,7*scale,'#3d1b00',2*scale);
  const paw=icon(scene,'paw',x+4*scale,y+18*scale,16*scale,0x8a430f,depth+2);paw.setAngle(-12);
}

export function bottomNavItem(scene,x,y,type,label,active=false,onClick=()=>{}){
  const c=scene.add.circle(x,y,31,active?C.orange:0x1b6d9f).setStrokeStyle(3,active?0xffc276:0x69c6f5,.85).setDepth(20).setInteractive({useHandCursor:true});
  scene.add.circle(x-7,y-9,18,0xffffff,.07).setDepth(21);icon(scene,type,x,y,25,0xffffff,22);
  scene.add.text(x,y+43,label,{fontFamily:'Arial Black',fontSize:'10px',color:'#fff',stroke:'#2a1a10',strokeThickness:3}).setOrigin(.5).setDepth(22);c.on('pointerup',onClick);return c;
}

export function framedArt(scene,key,x,y,w,h,depth=1,r=18){
  const sh=scene.add.graphics().setDepth(depth);sh.fillStyle(0x000000,.22);sh.fillRoundedRect(x-w/2,y-h/2+7,w,h,r);
  const frame=scene.add.graphics().setDepth(depth+1);frame.fillStyle(0x5b3a25,1);frame.fillRoundedRect(x-w/2,y-h/2,w,h,r);frame.lineStyle(2,0xf0c17f,.5);frame.strokeRoundedRect(x-w/2,y-h/2,w,h,r);
  const img=scene.add.image(x,y,key).setDisplaySize(w-10,h-10).setDepth(depth+2);
  const maskShape=scene.make.graphics({x:0,y:0,add:false});maskShape.fillStyle(0xffffff);maskShape.fillRoundedRect(x-(w-10)/2,y-(h-10)/2,w-10,h-10,r-5);img.setMask(maskShape.createGeometryMask());
  return {img,frame};
}
