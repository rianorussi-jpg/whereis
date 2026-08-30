import Phaser from 'phaser';

export const C = {
  sky: 0x55b9eb,
  blue: 0x278ed0,
  blueDark: 0x17679b,
  yellow: 0xffb80f,
  yellowDark: 0xe18400,
  green: 0x62b51f,
  greenDark: 0x3f8410,
  brown: 0x3b281a,
  cream: 0xfff3db,
  cream2: 0xf4dcb2,
  navy: 0x123b59,
  white: 0xffffff,
  text: 0x3d2617,
  shadow: 0x000000
};

export function roundedButton(scene, x, y, w, h, label, fill=C.yellow, stroke=C.yellowDark, onClick=()=>{}) {
  const shadow = scene.add.rectangle(x, y+5, w, h, 0x000000, .25).setOrigin(.5).setInteractive();
  shadow.setRounded = true;
  const g = scene.add.graphics();
  g.fillStyle(fill, 1);
  g.lineStyle(3, stroke, 1);
  g.fillRoundedRect(x-w/2, y-h/2, w, h, 18);
  g.strokeRoundedRect(x-w/2, y-h/2, w, h, 18);
  const t = scene.add.text(x, y, label, {fontFamily:'Arial Black, Arial',fontSize:'26px',color:'#ffffff',stroke:'#5d3b00',strokeThickness:3}).setOrigin(.5);
  const zone = scene.add.zone(x,y,w,h).setInteractive({useHandCursor:true});
  zone.on('pointerdown', ()=>{g.setAlpha(.8); t.setScale(.97);});
  zone.on('pointerup', ()=>{g.setAlpha(1); t.setScale(1); onClick();});
  zone.on('pointerout', ()=>{g.setAlpha(1); t.setScale(1);});
  return {g,t,zone,shadow};
}

export function pill(scene, x, y, w, h, text, fill=0x4a392a, fontSize=22) {
  const g=scene.add.graphics();
  g.fillStyle(fill,.92); g.fillRoundedRect(x-w/2,y-h/2,w,h,h/2);
  return scene.add.text(x,y,text,{fontFamily:'Arial Black, Arial',fontSize:`${fontSize}px`,color:'#fff'}).setOrigin(.5);
}

export function topBar(scene, title, right='') {
  const g=scene.add.graphics();
  g.fillStyle(C.brown,.94); g.fillRoundedRect(10,14,410,58,18);
  scene.add.text(215,43,title,{fontFamily:'Arial Black, Arial',fontSize:'23px',color:'#fff'}).setOrigin(.5);
  if(right) scene.add.text(392,43,right,{fontFamily:'Arial Black, Arial',fontSize:'18px',color:'#fff'}).setOrigin(1,.5);
  return g;
}

export function coinBadge(scene, x, y, value) {
  const g=scene.add.graphics();
  g.fillStyle(0x4a392a,.92); g.fillRoundedRect(x-64,y-22,128,44,20);
  g.fillStyle(C.yellow,1); g.fillCircle(x-42,y,14); g.lineStyle(2,0xffdc65); g.strokeCircle(x-42,y,14);
  scene.add.text(x-42,y,'●',{fontSize:'12px',color:'#fff2a0'}).setOrigin(.5);
  return scene.add.text(x+18,y,String(value),{fontFamily:'Arial Black, Arial',fontSize:'20px',color:'#fff'}).setOrigin(.5);
}

export function drawLogo(scene, x, y, scale=1) {
  const a = scene.add.text(x,y-36*scale,'Where is',{fontFamily:'Arial Black, Arial',fontSize:`${42*scale}px`,color:'#fff7e8',stroke:'#52301b',strokeThickness:7*scale}).setOrigin(.5);
  const b = scene.add.text(x,y+22*scale,'KIKA?',{fontFamily:'Arial Black, Arial',fontSize:`${62*scale}px`,color:'#ffb513',stroke:'#7b3b05',strokeThickness:9*scale}).setOrigin(.5);
  b.setShadow(0,6*scale,'#4f2600',2*scale);
  return [a,b];
}

export function dogSticker(scene, x, y, scale=1, interactive=false) {
  const c=scene.add.container(x,y);
  const g=scene.add.graphics();
  g.fillStyle(0xffffff,1); g.fillCircle(0,0,64*scale);
  g.fillStyle(0xd7973d,1); g.fillEllipse(-42*scale,-1*scale,40*scale,92*scale); g.fillEllipse(42*scale,-1*scale,40*scale,92*scale);
  g.fillStyle(0xe9ae55,1); g.fillCircle(0,0,52*scale);
  g.fillStyle(0xf1bd6d,1); g.fillEllipse(0,18*scale,56*scale,43*scale);
  g.fillStyle(0x2a1b14,1); g.fillCircle(-18*scale,-10*scale,6*scale); g.fillCircle(18*scale,-10*scale,6*scale);
  g.fillStyle(0x2d1d16,1); g.fillEllipse(0,8*scale,18*scale,13*scale);
  g.fillStyle(0x7e261d,1); g.fillEllipse(0,29*scale,28*scale,17*scale);
  g.fillStyle(0xff6b6b,1); g.fillEllipse(0,33*scale,16*scale,10*scale);
  c.add(g);
  if(interactive) c.setSize(130*scale,130*scale).setInteractive({useHandCursor:true});
  return c;
}

export function backButton(scene, cb) {
  const bg=scene.add.circle(38,42,24,0x2f81bb).setStrokeStyle(3,0xffffff,.8).setInteractive({useHandCursor:true});
  const t=scene.add.text(38,40,'‹',{fontFamily:'Arial Black',fontSize:'42px',color:'#fff'}).setOrigin(.5);
  bg.on('pointerup',cb); t.setDepth(bg.depth+1);
}
