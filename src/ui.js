import Phaser from 'phaser';

export const C={
  ink:0x20150f,ink2:0x352319,brown:0x5b3923,brown2:0x7f512e,
  cream:0xfff4de,cream2:0xe7c38f,gold:0xffc32e,gold2:0xe08a14,
  blue:0x2388bd,blue2:0x12597f,green:0x62b832,green2:0x347c19,
  orange:0xef7f2d,red:0xd85a40,white:0xffffff,navy:0x0e344e
};

export function panel(scene,x,y,w,h,{fill=C.ink2,alpha=.92,depth=1,r=24,stroke=0xffffff,strokeAlpha=.14,shadow=.24,shine=.07}={}){
  const sh=scene.add.graphics().setDepth(depth);sh.fillStyle(0x000000,shadow);sh.fillRoundedRect(x-w/2,y-h/2+7,w,h,r);
  const g=scene.add.graphics().setDepth(depth+1);g.fillStyle(fill,alpha);g.fillRoundedRect(x-w/2,y-h/2,w,h,r);g.lineStyle(2,stroke,strokeAlpha);g.strokeRoundedRect(x-w/2,y-h/2,w,h,r);
  if(shine){g.fillStyle(0xffffff,shine);g.fillRoundedRect(x-w/2+5,y-h/2+5,w-10,Math.max(12,h*.16),Math.max(8,r-6));}
  return {g,shadow:sh};
}

export function softPanel(scene,x,y,w,h,fill=C.ink2,alpha=.92,depth=1,r=24,stroke=0xffffff,strokeAlpha=.14){return panel(scene,x,y,w,h,{fill,alpha,depth,r,stroke,strokeAlpha});}

export function roundedButton(scene,x,y,w,h,label,fill=C.gold,stroke=C.gold2,onClick=()=>{},options={}){
  const depth=options.depth||1,r=options.radius||Math.min(22,h*.35);
  const sh=scene.add.graphics().setDepth(depth);sh.fillStyle(0x000000,.30);sh.fillRoundedRect(x-w/2,y-h/2+7,w,h,r);
  const g=scene.add.graphics().setDepth(depth+1);g.fillStyle(fill,1);g.fillRoundedRect(x-w/2,y-h/2,w,h,r);g.lineStyle(2.5,stroke,1);g.strokeRoundedRect(x-w/2,y-h/2,w,h,r);
  g.fillStyle(0xffffff,.16);g.fillRoundedRect(x-w/2+5,y-h/2+5,w-10,h*.25,Math.max(7,r-5));
  g.fillStyle(0x000000,.08);g.fillRoundedRect(x-w/2+5,y+h/2-h*.18,w-10,h*.13,Math.max(6,r-7));
  const t=scene.add.text(x,y-1,label,{fontFamily:'Arial Black, Arial',fontSize:`${options.fontSize||21}px`,color:options.color||'#fff',stroke:options.strokeColor||'#4d2d12',strokeThickness:options.strokeThickness??2,align:'center'}).setOrigin(.5).setDepth(depth+2);
  const z=scene.add.zone(x,y,w,h).setInteractive({useHandCursor:true}).setDepth(depth+3);
  z.on('pointerdown',()=>{g.setScale(.985);t.setScale(.985)});const reset=()=>{g.setScale(1);t.setScale(1)};z.on('pointerout',reset);z.on('pointerup',()=>{reset();onClick()});
  return {g,t,zone:z,shadow:sh};
}

export function icon(scene,type,x,y,size=28,color=0xffffff,depth=20){
  const g=scene.add.graphics().setDepth(depth);g.lineStyle(Math.max(2,size*.085),color,1);const s=size/2;
  switch(type){
    case 'search':g.strokeCircle(x-s*.2,y-s*.2,s*.62);g.lineBetween(x+s*.22,y+s*.22,x+s*.74,y+s*.74);break;
    case 'bulb':g.strokeCircle(x,y-s*.18,s*.56);g.lineBetween(x-s*.28,y+s*.43,x+s*.28,y+s*.43);g.lineBetween(x-s*.19,y+s*.66,x+s*.19,y+s*.66);break;
    case 'target':g.strokeCircle(x,y,s*.82);g.strokeCircle(x,y,s*.46);g.fillStyle(color,1);g.fillCircle(x,y,s*.14);break;
    case 'trophy':g.strokeRoundedRect(x-s*.46,y-s*.62,s*.92,s*.72,s*.14);g.lineBetween(x,y+s*.08,x,y+s*.62);g.lineBetween(x-s*.34,y+s*.62,x+s*.34,y+s*.62);break;
    case 'paw':g.fillStyle(color,1);g.fillEllipse(x,y+s*.30,s*.88,s*.64);g.fillCircle(x-s*.53,y-s*.24,s*.23);g.fillCircle(x-s*.17,y-s*.53,s*.22);g.fillCircle(x+s*.19,y-s*.53,s*.22);g.fillCircle(x+s*.55,y-s*.22,s*.23);break;
    case 'shop':g.strokeRect(x-s*.6,y-s*.20,s*1.12,s*.68);g.lineBetween(x-s*.75,y-s*.7,x-s*.52,y-s*.7);g.lineBetween(x-s*.52,y-s*.7,x-s*.4,y-s*.2);g.strokeCircle(x-s*.26,y+s*.65,s*.15);g.strokeCircle(x+s*.36,y+s*.65,s*.15);break;
    case 'gear':g.strokeCircle(x,y,s*.45);g.strokeCircle(x,y,s*.14);for(let i=0;i<8;i++){const a=i*Math.PI/4;g.lineBetween(x+Math.cos(a)*s*.58,y+Math.sin(a)*s*.58,x+Math.cos(a)*s*.85,y+Math.sin(a)*s*.85)}break;
    case 'play':g.fillStyle(color,1);g.fillTriangle(x-s*.3,y-s*.55,x-s*.3,y+s*.55,x+s*.58,y);break;
    case 'back':g.lineBetween(x+s*.38,y-s*.58,x-s*.28,y);g.lineBetween(x-s*.28,y,x+s*.38,y+s*.58);break;
    case 'pause':g.lineStyle(Math.max(3,size*.13),color,1);g.lineBetween(x-s*.25,y-s*.54,x-s*.25,y+s*.54);g.lineBetween(x+s*.25,y-s*.54,x+s*.25,y+s*.54);break;
    case 'lock':g.strokeRoundedRect(x-s*.48,y-s*.02,s*.96,s*.80,s*.12);g.arc(x,y-s*.1,s*.32,Math.PI,0,false);break;
    case 'coin':g.strokeCircle(x,y,s*.75);g.strokeCircle(x,y,s*.53);g.lineBetween(x,y-s*.28,x,y+s*.28);break;
    case 'clock':g.strokeCircle(x,y,s*.76);g.lineBetween(x,y,x,y-s*.42);g.lineBetween(x,y,x+s*.33,y+s*.14);break;
    case 'star':{const pts=[];for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,r=i%2? s*.42:s*.88;pts.push(new Phaser.Geom.Point(x+Math.cos(a)*r,y+Math.sin(a)*r));}g.fillStyle(color,1);g.fillPoints(pts,true);break;}
    default:g.strokeCircle(x,y,s*.7);
  }return g;
}

export function drawLogo(scene,x,y,scale=1,depth=10){
  scene.add.text(x,y-36*scale,'Where is',{fontFamily:'Arial Black',fontSize:`${38*scale}px`,color:'#fff9ea',stroke:'#4d2c16',strokeThickness:7*scale}).setOrigin(.5).setDepth(depth);
  const k=scene.add.text(x,y+17*scale,'KIKA?',{fontFamily:'Arial Black',fontSize:`${64*scale}px`,color:'#ffc127',stroke:'#6c3509',strokeThickness:9*scale}).setOrigin(.5).setDepth(depth+1);k.setShadow(0,6*scale,'#2b1406',3*scale);icon(scene,'paw',x+4*scale,y+18*scale,15*scale,0x8b4810,depth+2);
}

export function topBar(scene,title,right=''){
  const g=scene.add.graphics().setDepth(20);g.fillGradientStyle(0x2e2119,0x2e2119,0x5b3923,0x5b3923,1,1,1,1);g.fillRoundedRect(10,12,410,70,22);g.lineStyle(2,0xffdfaa,.18);g.strokeRoundedRect(10,12,410,70,22);
  scene.add.text(215,46,title,{fontFamily:'Arial Black',fontSize:'20px',color:'#fff9ee',stroke:'#21150e',strokeThickness:2}).setOrigin(.5).setDepth(23);
  if(right)scene.add.text(398,46,right,{fontFamily:'Arial Black',fontSize:'14px',color:'#ffe1a7'}).setOrigin(1,.5).setDepth(23);
}

export function backButton(scene,cb){const c=scene.add.circle(42,47,22,0x8a5a34).setStrokeStyle(2,0xffdc9e,.55).setDepth(30).setInteractive({useHandCursor:true});icon(scene,'back',42,47,20,0xffffff,31);c.on('pointerup',cb);return c;}

export function coinBadge(scene,x,y,value,depth=10,compact=false){const w=compact?98:132,h=compact?36:44;panel(scene,x,y,w,h,{fill:0x241a14,alpha:.88,depth,r:18,stroke:0xffd990,strokeAlpha:.15});icon(scene,'coin',x-w/2+22,y,compact?18:22,0xffc32e,depth+3);scene.add.text(x+11,y,String(value),{fontFamily:'Arial Black',fontSize:compact?'15px':'18px',color:'#fff4d8'}).setOrigin(.5).setDepth(depth+3);}

export function bottomNavItem(scene,x,y,type,label,active=false,onClick=()=>{}){const w=86,h=68;const p=panel(scene,x,y,w,h,{fill:active?0x8c4c20:0x263949,alpha:.94,depth:20,r:20,stroke:active?0xffc57d:0x8bd8ff,strokeAlpha:.28,shadow:.20});icon(scene,type,x,y-8,24,active?0xffd36a:0xffffff,23);scene.add.text(x,y+22,label,{fontFamily:'Arial Black',fontSize:'9px',color:'#fff'}).setOrigin(.5).setDepth(23);scene.add.zone(x,y,w,h).setInteractive({useHandCursor:true}).setDepth(24).on('pointerup',onClick);return p;}

export function framedArt(scene,key,x,y,w,h,depth=1,r=18){
  const sh=scene.add.graphics().setDepth(depth);sh.fillStyle(0x000000,.25);sh.fillRoundedRect(x-w/2,y-h/2+8,w,h,r);
  const frame=scene.add.graphics().setDepth(depth+1);frame.fillStyle(0x4f3322,1);frame.fillRoundedRect(x-w/2,y-h/2,w,h,r);frame.lineStyle(2,0xffd59b,.35);frame.strokeRoundedRect(x-w/2,y-h/2,w,h,r);
  const img=scene.add.image(x,y,key).setDisplaySize(w-10,h-10).setDepth(depth+2);const maskShape=scene.make.graphics({x:0,y:0,add:false});maskShape.fillStyle(0xffffff);maskShape.fillRoundedRect(x-(w-10)/2,y-(h-10)/2,w-10,h-10,r-5);img.setMask(maskShape.createGeometryMask());return{img,frame};
}

export function sectionTitle(scene,text,x,y,color='#fff1d3',depth=5){return scene.add.text(x,y,text,{fontFamily:'Arial Black',fontSize:'12px',color,letterSpacing:1}).setDepth(depth);}
