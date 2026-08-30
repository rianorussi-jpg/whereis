import Phaser from 'phaser';

export const C = {
  sky: 0x55b9eb, sky2:0x2a9bd8,
  blue: 0x2f94d2, blueDark: 0x17689d,
  yellow: 0xffbd12, yellowDark: 0xd77a00,
  green: 0x65b624, greenDark: 0x3f8312,
  orange: 0xef8f28,
  brown: 0x3f2a1c, brown2:0x6c4529,
  cream: 0xfff4df, cream2: 0xf2d7aa,
  navy: 0x113d5b, navy2:0x0b2d46,
  white: 0xffffff, text: 0x3d281a,
};

export function addShadow(scene,x,y,w,h,r=20,alpha=.22,dy=6){
  const g=scene.add.graphics();
  g.fillStyle(0x000000,alpha); g.fillRoundedRect(x-w/2,y-h/2+dy,w,h,r);
  return g;
}

export function roundedButton(scene, x, y, w, h, label, fill=C.yellow, stroke=C.yellowDark, onClick=()=>{}, options={}) {
  const depth=options.depth||1;
  const sh=scene.add.graphics().setDepth(depth); sh.fillStyle(0x000000,.24); sh.fillRoundedRect(x-w/2,y-h/2+5,w,h,18);
  const g=scene.add.graphics().setDepth(depth+1);
  g.fillStyle(fill,1); g.fillRoundedRect(x-w/2,y-h/2,w,h,18);
  g.lineStyle(3,stroke,1); g.strokeRoundedRect(x-w/2,y-h/2,w,h,18);
  g.fillStyle(0xffffff,.14); g.fillRoundedRect(x-w/2+4,y-h/2+4,w-8,Math.max(10,h*.28),14);
  const t=scene.add.text(x,y-1,label,{fontFamily:'Arial Black, Arial',fontSize:`${options.fontSize||24}px`,color:'#fff',stroke:options.strokeColor||'#5a3508',strokeThickness:3,align:'center'}).setOrigin(.5).setDepth(depth+2);
  const z=scene.add.zone(x,y,w,h).setInteractive({useHandCursor:true}).setDepth(depth+3);
  z.on('pointerdown',()=>{g.setScale(.98);t.setScale(.98)});
  const reset=()=>{g.setScale(1);t.setScale(1)}; z.on('pointerout',reset); z.on('pointerup',()=>{reset();onClick()});
  return {shadow:sh,g,t,zone:z,setDepth(d){[sh,g,t,z].forEach((o,i)=>o.setDepth(d+i));return this}};
}

export function topBar(scene,title,right=''){
  const g=scene.add.graphics().setDepth(20);
  g.fillStyle(C.brown,.96);g.fillRoundedRect(10,14,410,62,19);
  g.fillStyle(0xffffff,.06);g.fillRoundedRect(14,18,402,22,15);
  scene.add.text(215,44,title,{fontFamily:'Arial Black',fontSize:'22px',color:'#fff',stroke:'#29180e',strokeThickness:2}).setOrigin(.5).setDepth(21);
  if(right) scene.add.text(400,44,right,{fontFamily:'Arial Black',fontSize:'16px',color:'#fff4ce',stroke:'#29180e',strokeThickness:2}).setOrigin(1,.5).setDepth(21);
  return g;
}

export function backButton(scene,cb){
  const c=scene.add.circle(39,44,24,C.blue).setStrokeStyle(3,0xffffff,.8).setInteractive({useHandCursor:true}).setDepth(30);
  scene.add.text(38,41,'‹',{fontFamily:'Arial Black',fontSize:'42px',color:'#fff'}).setOrigin(.5).setDepth(31);
  c.on('pointerup',cb); return c;
}

export function coinBadge(scene,x,y,value,depth=10){
  const g=scene.add.graphics().setDepth(depth);g.fillStyle(0x3a291e,.92);g.fillRoundedRect(x-69,y-23,138,46,23);g.lineStyle(2,0xffffff,.13);g.strokeRoundedRect(x-69,y-23,138,46,23);
  g.fillStyle(C.yellow);g.fillCircle(x-45,y,15);g.lineStyle(3,0xd77a00);g.strokeCircle(x-45,y,15);g.fillStyle(0xffeb82,.85);g.fillCircle(x-49,y-5,5);
  scene.add.text(x+16,y,String(value),{fontFamily:'Arial Black',fontSize:'20px',color:'#fff'}).setOrigin(.5).setDepth(depth+1);
  return g;
}

export function drawLogo(scene,x,y,scale=1,depth=10){
  const a=scene.add.text(x,y-38*scale,'Where is',{fontFamily:'Arial Black',fontSize:`${40*scale}px`,color:'#fff8e6',stroke:'#4a2d1d',strokeThickness:8*scale}).setOrigin(.5).setDepth(depth);
  const b=scene.add.text(x,y+18*scale,'KIKA?',{fontFamily:'Arial Black',fontSize:`${64*scale}px`,color:'#ffbc12',stroke:'#713608',strokeThickness:10*scale}).setOrigin(.5).setDepth(depth+1);
  b.setShadow(0,7*scale,'#4f2600',2*scale);
  const paw=scene.add.text(x+8*scale,y+22*scale,'🐾',{fontSize:`${17*scale}px`}).setOrigin(.5).setDepth(depth+2).setAngle(-10);
  return [a,b,paw];
}

export function panel(scene,x,y,w,h,fill=0xfff4df,stroke=0xc89a62,depth=1,r=22){
  const sh=scene.add.graphics().setDepth(depth);sh.fillStyle(0x000000,.16);sh.fillRoundedRect(x-w/2,y-h/2+6,w,h,r);
  const g=scene.add.graphics().setDepth(depth+1);g.fillStyle(fill,1);g.fillRoundedRect(x-w/2,y-h/2,w,h,r);g.lineStyle(2,stroke,1);g.strokeRoundedRect(x-w/2,y-h/2,w,h,r);g.fillStyle(0xffffff,.12);g.fillRoundedRect(x-w/2+4,y-h/2+4,w-8,22,r-3);
  return {shadow:sh,g};
}

export function sceneCard(scene,x,y,w,h,title,subtitle,type,locked=false,onClick=()=>{}){
  const p=panel(scene,x,y,w,h,0x8c5732,0x57331f,5,18);
  const gx=scene.add.graphics().setDepth(7);
  const left=x-w/2+8, top=y-h/2+8, iw=w-16, ih=h-52;
  if(type==='room') drawMiniRoom(gx,left,top,iw,ih);
  if(type==='park') drawMiniPark(gx,left,top,iw,ih);
  if(type==='beach') drawMiniBeach(gx,left,top,iw,ih);
  if(type==='kitchen') drawMiniKitchen(gx,left,top,iw,ih);
  if(type==='party') drawMiniParty(gx,left,top,iw,ih);
  scene.add.text(x,y+h/2-34,title,{fontFamily:'Arial Black',fontSize:'15px',color:'#fff'}).setOrigin(.5).setDepth(8);
  scene.add.text(x,y+h/2-15,subtitle,{fontFamily:'Arial Black',fontSize:'12px',color:'#ffd258'}).setOrigin(.5).setDepth(8);
  if(locked){scene.add.rectangle(x,y,w-8,h-8,0x24160e,.54).setDepth(9);scene.add.text(x,y,'🔒',{fontSize:'36px'}).setOrigin(.5).setDepth(10)}
  else scene.add.zone(x,y,w,h).setInteractive({useHandCursor:true}).setDepth(10).on('pointerup',onClick);
  return p;
}

function drawMiniRoom(g,x,y,w,h){g.fillStyle(0x69c2e5);g.fillRoundedRect(x,y,w,h,12);g.fillStyle(0xe4c094);g.fillRect(x,y+h*.58,w,h*.42);g.fillStyle(0xe96f48);g.fillRoundedRect(x+8,y+h*.44,w*.38,h*.28,8);g.fillStyle(0x2f7d9e);g.fillRoundedRect(x+w*.58,y+h*.4,w*.34,h*.3,8);g.fillStyle(0x83522f);g.fillRect(x+w*.46,y+h*.38,7,h*.32);g.fillStyle(0xffe4aa);g.fillCircle(x+w*.495,y+h*.34,13)}
function drawMiniPark(g,x,y,w,h){g.fillStyle(0x7cccf0);g.fillRoundedRect(x,y,w,h,12);g.fillStyle(0x65ae4e);g.fillRect(x,y+h*.58,w,h*.42);for(let i=0;i<4;i++){g.fillStyle(0x3e7f3a);g.fillCircle(x+18+i*31,y+h*.5-(i%2)*10,17);g.fillStyle(0x75502c);g.fillRect(x+16+i*31,y+h*.5,5,24)}g.fillStyle(0xe4b661);g.fillRect(x+12,y+h*.72,w-24,7)}
function drawMiniBeach(g,x,y,w,h){g.fillStyle(0x76cdf1);g.fillRoundedRect(x,y,w,h,12);g.fillStyle(0x3ba6d2);g.fillRect(x,y+h*.48,w,h*.2);g.fillStyle(0xf2d38a);g.fillRect(x,y+h*.68,w,h*.32);g.fillStyle(0xef6a42);g.fillTriangle(x+w*.52,y+h*.24,x+w*.37,y+h*.52,x+w*.67,y+h*.52);g.fillStyle(0xf6c948);g.fillTriangle(x+w*.52,y+h*.24,x+w*.52,y+h*.52,x+w*.67,y+h*.52);g.fillStyle(0x6e4a2d);g.fillRect(x+w*.505,y+h*.5,5,h*.28)}
function drawMiniKitchen(g,x,y,w,h){g.fillStyle(0xd8b98d);g.fillRoundedRect(x,y,w,h,12);g.fillStyle(0x8d5738);g.fillRect(x,y+h*.62,w,h*.38);g.fillStyle(0xf4e1bc);g.fillRoundedRect(x+8,y+12,w*.35,h*.28,5);g.fillRoundedRect(x+w*.56,y+12,w*.35,h*.28,5);g.fillStyle(0x414c51);g.fillRect(x+w*.41,y+h*.45,w*.18,h*.28);g.fillStyle(0xe47a46);g.fillCircle(x+w*.5,y+h*.58,5)}
function drawMiniParty(g,x,y,w,h){g.fillStyle(0x392b52);g.fillRoundedRect(x,y,w,h,12);for(let i=0;i<10;i++){g.fillStyle([0xf8c344,0xec5e66,0x55c8ce,0x7ecb58][i%4]);g.fillCircle(x+10+(i*19)%w,y+12+(i%3)*20,4)}g.fillStyle(0x7d4d2c);g.fillRect(x,y+h*.7,w,h*.3);g.fillStyle(0xef9253);g.fillTriangle(x+w*.5,y+h*.38,x+w*.39,y+h*.69,x+w*.61,y+h*.69)}

export function decorateRoom(scene,variant='room'){
  const g=scene.add.graphics();
  if(variant==='room'){
    g.fillGradientStyle(0x53b8e8,0x53b8e8,0xd8c297,0xd8c297,1);g.fillRect(0,0,430,932);
    g.fillStyle(0xf0d6a9);g.fillRect(0,370,430,245);g.fillStyle(0x8c5d37);g.fillRect(0,615,430,317);
    g.fillStyle(0x2d789c);g.fillRoundedRect(25,360,145,120,22);g.fillStyle(0x1d5f82);g.fillRoundedRect(40,380,115,80,15);g.fillStyle(0xdc7144);g.fillRoundedRect(285,370,120,105,20);g.fillStyle(0x9f4b2e);g.fillRoundedRect(300,390,90,65,14);
    g.fillStyle(0x80532f);g.fillRect(201,326,12,145);g.fillStyle(0xffe0a1);g.fillCircle(207,318,42);g.fillStyle(0xf4c87e,.8);g.fillCircle(207,318,31);
    g.fillStyle(0x3b773e);for(const [px,py,s] of [[52,315,1],[365,330,.8],[395,520,.7]]){g.fillEllipse(px,py,28*s,70*s);g.fillEllipse(px-15*s,py+18*s,24*s,55*s);g.fillStyle(0x9a6039);g.fillRect(px-4*s,py+35*s,8*s,45*s);g.fillStyle(0x3b773e)}
    // frames
    [[86,190,76,66,0xf3a54d],[310,170,90,72,0x6f9ac5]].forEach(([x,y,w,h,c])=>{g.fillStyle(0x7b5132);g.fillRoundedRect(x,y,w,h,8);g.fillStyle(c);g.fillRoundedRect(x+7,y+7,w-14,h-14,4)});
  }
  return g;
}
