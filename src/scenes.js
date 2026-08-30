import Phaser from 'phaser';
import { C, roundedButton, pill, topBar, coinBadge, drawLogo, dogSticker, backButton } from './ui.js';
import { loadSave, saveGame } from './storage.js';

const items=['🧸','⚽','🎒','🪴','📷','👟','🧢','🍕','☕','🎧','🕶️','🧃','🎸','🛹','📚','🧩','🚗','🛼','🕹️','🍩','🧁','🪁','🧦','🔦','🧴','👜','🪑','🛋️','🪞','🧺','🎁','🧵','📦','🧯','🧹','🪣','🥎','🏀','🎾','🧲','📻','☎️','🧃','🥨'];

export class BootScene extends Phaser.Scene {
  constructor(){super('Boot')}
  create(){this.scene.start('Menu')}
}

export class MenuScene extends Phaser.Scene {
  constructor(){super('Menu')}
  create(){
    this.save=loadSave();
    const g=this.add.graphics();
    g.fillGradientStyle(0x48b9ee,0x48b9ee,0xe8d4af,0xe8d4af,1); g.fillRect(0,0,430,932);
    g.fillStyle(0x72bd69,1); g.fillEllipse(95,460,250,120); g.fillEllipse(350,490,280,140);
    // room blocks
    g.fillStyle(0xe88943,1); g.fillRoundedRect(32,392,145,102,16); g.fillStyle(0x317ba7,1); g.fillRoundedRect(270,402,130,92,16);
    g.fillStyle(0x8d5b32,1); g.fillRect(0,595,430,337);
    for(let i=0;i<24;i++){g.fillStyle(Phaser.Display.Color.RandomRGB(80,220).color,.9); g.fillCircle(Phaser.Math.Between(15,415),Phaser.Math.Between(625,850),Phaser.Math.Between(6,15));}
    drawLogo(this,215,130,.9);
    dogSticker(this,215,315,1.25,false);
    roundedButton(this,215,520,230,62,'JUGAR',C.yellow,C.yellowDark,()=>this.scene.start('Game',{level:this.save.unlocked}));
    roundedButton(this,215,595,230,58,'NIVELES',C.blue,C.blueDark,()=>this.scene.start('Levels'));
    coinBadge(this,215,665,this.save.coins);
    const buttons=[['⚙',60,'Ajustes'],['🏆',160,'Récords'],['🐾',270,'Mascotas'],['🎁',370,'Tienda']];
    buttons.forEach(([icon,x,label],i)=>{
      const c=this.add.circle(x,790,32,i===3?0xf3922b:0x278ed0).setStrokeStyle(3,0xffffff,.8).setInteractive({useHandCursor:true});
      this.add.text(x,790,icon,{fontSize:'28px'}).setOrigin(.5);
      this.add.text(x,836,label,{fontFamily:'Arial Black',fontSize:'12px',color:'#fff',stroke:'#3d2617',strokeThickness:3}).setOrigin(.5);
      if(label==='Récords') c.on('pointerup',()=>this.scene.start('Records'));
      if(label==='Tienda') c.on('pointerup',()=>this.scene.start('Shop'));
    });
  }
}

export class LevelScene extends Phaser.Scene {
  constructor(){super('Levels')}
  create(){
    this.save=loadSave();
    this.cameras.main.setBackgroundColor('#f7e5c6');
    topBar(this,'SELECCIÓN DE NIVELES',`🪙 ${this.save.coins}`); backButton(this,()=>this.scene.start('Menu'));
    const tabs=[['FÁCIL',1,10],['MEDIO',11,20],['DIFÍCIL',21,30]];
    tabs.forEach((t,i)=>roundedButton(this,75+i*140,110,120,44,t[0],i===0?C.green:C.blue,i===0?C.greenDark:C.blueDark,()=>{}));
    for(let n=1;n<=30;n++){
      const col=(n-1)%5,row=Math.floor((n-1)/5); const x=55+80*col,y=185+108*row;
      const unlocked=n<=Math.max(this.save.unlocked,1);
      const g=this.add.graphics(); g.fillStyle(unlocked?0xfff8eb:0xd9cbb9,1); g.lineStyle(2,unlocked?0xc99b58:0xb5a58f,1); g.fillRoundedRect(x-31,y-39,62,78,13); g.strokeRoundedRect(x-31,y-39,62,78,13);
      this.add.text(x,y-10,unlocked?String(n):'🔒',{fontFamily:'Arial Black',fontSize:'24px',color:unlocked?'#4b2d18':'#766a5f'}).setOrigin(.5);
      const stars=this.save.stars[n]||0; this.add.text(x,y+20,'★'.repeat(stars)+'☆'.repeat(3-stars),{fontSize:'13px',color:'#f4a800'}).setOrigin(.5);
      if(unlocked) this.add.zone(x,y,62,78).setInteractive({useHandCursor:true}).on('pointerup',()=>this.scene.start('Game',{level:n}));
    }
  }
}

export class GameScene extends Phaser.Scene {
  constructor(){super('Game')}
  init(data){this.level=data.level||1}
  create(){
    this.save=loadSave(); this.found=false; this.timeLeft=Math.max(20,75-Math.floor((this.level-1)*1.5));
    this.cameras.main.setBackgroundColor('#d7b06b');
    this.drawRoom();
    topBar(this,`Nivel ${this.level}`,`⏱ ${this.formatTime(this.timeLeft)}`); this.timerText=this.add.text(370,42,this.formatTime(this.timeLeft),{fontFamily:'Arial Black',fontSize:'18px',color:'#fff'}).setOrigin(.5);
    this.add.text(215,88,'Encuentra a Kika',{fontFamily:'Arial Black',fontSize:'23px',color:'#3c2617',stroke:'#fff1db',strokeThickness:4}).setOrigin(.5);
    const objectCount=Math.min(75,28+this.level*2);
    for(let i=0;i<objectCount;i++) this.spawnItem(i);
    this.kikaX=Phaser.Math.Between(55,375); this.kikaY=Phaser.Math.Between(170,735);
    const scale=Math.max(.42,.72-this.level*.008);
    this.kika=dogSticker(this,this.kikaX,this.kikaY,scale,true).setDepth(4);
    this.kika.on('pointerup',()=>this.onFound());
    this.drawBottomBar();
    this.countdown=this.time.addEvent({delay:1000,loop:true,callback:()=>{ if(this.found)return; this.timeLeft--; this.timerText.setText(this.formatTime(this.timeLeft)); if(this.timeLeft<=0)this.onLose(); }});
  }
  drawRoom(){
    const g=this.add.graphics();
    g.fillStyle(0xd4a45f,1); g.fillRect(0,120,430,650); g.fillStyle(0x9d6d3d,.45); g.fillRect(0,430,430,340);
    g.fillStyle(0x426f73,1); g.fillRoundedRect(15,160,140,110,15); g.fillStyle(0xb76236,1); g.fillRoundedRect(285,158,125,115,15);
    g.fillStyle(0x705038,1); g.fillRect(180,180,74,120); g.fillStyle(0xf2dfb8,1); g.fillCircle(215,174,42);
    for(let i=0;i<8;i++){g.fillStyle(0x355d38,1);g.fillEllipse(Phaser.Math.Between(20,410),Phaser.Math.Between(125,300),Phaser.Math.Between(8,18),Phaser.Math.Between(20,42));}
  }
  spawnItem(i){
    const x=Phaser.Math.Between(18,412), y=Phaser.Math.Between(135,750); const size=Phaser.Math.Between(22,39);
    const bg=this.add.circle(x,y,size*.72,0xfff3db,.92).setStrokeStyle(2,0x9b7048,.55).setDepth(2);
    const t=this.add.text(x,y,items[i%items.length],{fontSize:`${size}px`}).setOrigin(.5).setDepth(3);
    const rot=Phaser.Math.FloatBetween(-.28,.28); bg.setRotation(rot); t.setRotation(rot);
  }
  drawBottomBar(){
    const g=this.add.graphics(); g.fillStyle(0xead0a0,.97); g.fillRoundedRect(0,770,430,162,0); g.lineStyle(2,0x9f7346,1); g.lineBetween(0,770,430,770);
    const tools=[['🔎',105,'magnifier'],['💡',215,'bulb'],['⏱',325,'clock']];
    tools.forEach(([icon,x,key])=>{
      const amount=this.save.inventory[key]||0;
      const b=this.add.circle(x,842,42,0xfff8ea).setStrokeStyle(3,0xb1834c).setInteractive({useHandCursor:true}); this.add.text(x,842,icon,{fontSize:'40px'}).setOrigin(.5);
      this.add.circle(x+30,810,14,0x5cab22); this.add.text(x+30,810,String(amount),{fontFamily:'Arial Black',fontSize:'13px',color:'#fff'}).setOrigin(.5);
      b.on('pointerup',()=>this.usePower(key));
    });
  }
  usePower(key){
    if(this.found || (this.save.inventory[key]||0)<=0)return;
    this.save.inventory[key]--; saveGame(this.save); this.scene.restart({level:this.level});
    // restart is intentional for inventory refresh only if clock? replaced below in next version
  }
  revealHint(){
    const r=this.add.circle(this.kikaX,this.kikaY,85,0xffdf53,.12).setStrokeStyle(6,0xffdf53,.95).setDepth(8);
    this.tweens.add({targets:r,scale:1.35,alpha:0,duration:1400,onComplete:()=>r.destroy()});
  }
  onFound(){
    if(this.found)return; this.found=true; this.countdown.remove(false); this.kika.setDepth(10); this.tweens.add({targets:this.kika,scale:1.18,duration:180,yoyo:true,repeat:1});
    const stars=this.timeLeft>45?3:this.timeLeft>20?2:1; const reward=stars*20;
    this.save.coins+=reward; this.save.stars[this.level]=Math.max(this.save.stars[this.level]||0,stars); this.save.best[this.level]=Math.max(this.save.best[this.level]||0,this.timeLeft); this.save.unlocked=Math.max(this.save.unlocked,this.level+1); saveGame(this.save);
    this.time.delayedCall(400,()=>this.showWin(stars,reward));
  }
  showWin(stars,reward){
    const shade=this.add.rectangle(215,466,430,932,0x000000,.72).setDepth(20);
    const card=this.add.graphics().setDepth(21); card.fillStyle(0x3a2719,.96); card.fillRoundedRect(35,205,360,490,28); card.lineStyle(4,0xf2b734,1); card.strokeRoundedRect(35,205,360,490,28);
    this.add.text(215,258,'¡ENCONTRASTE\nA KIKA!',{fontFamily:'Arial Black',fontSize:'38px',align:'center',color:'#ffd338',stroke:'#653200',strokeThickness:6}).setOrigin(.5).setDepth(22);
    dogSticker(this,215,390,1.0,false).setDepth(22);
    this.add.text(215,505,'★'.repeat(stars)+'☆'.repeat(3-stars),{fontSize:'58px',color:'#ffbc15',stroke:'#7f4200',strokeThickness:4}).setOrigin(.5).setDepth(22);
    this.add.text(215,558,`+ ${reward} 🪙`,{fontFamily:'Arial Black',fontSize:'24px',color:'#fff'}).setOrigin(.5).setDepth(22);
    const next=roundedButton(this,215,622,250,58,'SIGUIENTE NIVEL',C.green,C.greenDark,()=>this.scene.start('Game',{level:this.level+1})); Object.values(next).forEach(o=>o?.setDepth?.(23));
  }
  onLose(){
    this.found=true; this.countdown.remove(false); const sh=this.add.rectangle(215,466,430,932,0x000000,.65).setDepth(20); pill(this,215,350,320,80,'¡Se acabó el tiempo!',0x4a2c20,25).setDepth(21);
    const b=roundedButton(this,215,455,230,58,'REINTENTAR',C.yellow,C.yellowDark,()=>this.scene.restart({level:this.level})); Object.values(b).forEach(o=>o?.setDepth?.(22));
  }
  formatTime(v){return `${String(Math.floor(v/60)).padStart(2,'0')}:${String(Math.max(0,v%60)).padStart(2,'0')}`}
}

// Patch powerups after class definition to avoid restarting the level.
GameScene.prototype.usePower=function(key){
  if(this.found || (this.save.inventory[key]||0)<=0)return;
  this.save.inventory[key]--; saveGame(this.save);
  if(key==='magnifier') this.revealHint();
  if(key==='bulb'){
    const mask=this.add.rectangle(215,445,430,650,0x000000,.58).setDepth(7); const ring=this.add.circle(this.kikaX,this.kikaY,80,0xffffff,0).setStrokeStyle(5,0xffdc55,1).setDepth(8); this.kika.setDepth(9);
    this.time.delayedCall(1300,()=>{mask.destroy();ring.destroy();this.kika.setDepth(4)});
  }
  if(key==='clock'){this.timeLeft+=15; this.timerText.setText(this.formatTime(this.timeLeft));}
};

export class ShopScene extends Phaser.Scene {
  constructor(){super('Shop')}
  create(){
    this.save=loadSave(); this.cameras.main.setBackgroundColor('#f4dfbd'); topBar(this,'TIENDA',`🪙 ${this.save.coins}`); backButton(this,()=>this.scene.start('Menu'));
    this.add.text(30,108,'PISTAS Y AYUDAS',{fontFamily:'Arial Black',fontSize:'20px',color:'#3d2617'});
    const products=[['🔎','Lupa','Muestra dónde buscar',100,'magnifier'],['💡','Pista brillante','Ilumina a Kika',150,'bulb'],['⏱','+15 segundos','Más tiempo para encontrarla',120,'clock']];
    products.forEach((p,i)=>{
      const y=185+i*160; const g=this.add.graphics(); g.fillStyle(0xfff8eb,1); g.lineStyle(2,0xcfaa76,1); g.fillRoundedRect(22,y-60,386,125,18); g.strokeRoundedRect(22,y-60,386,125,18);
      this.add.text(65,y,p[0],{fontSize:'52px'}).setOrigin(.5); this.add.text(120,y-24,p[1],{fontFamily:'Arial Black',fontSize:'20px',color:'#3d2617'}); this.add.text(120,y+8,p[2],{fontSize:'14px',color:'#6c563f'});
      roundedButton(this,330,y+25,125,42,`🪙 ${p[3]}`,C.green,C.greenDark,()=>this.buy(p[4],p[3]));
    });
    this.note=this.add.text(215,700,'',{fontFamily:'Arial Black',fontSize:'18px',color:'#3d2617'}).setOrigin(.5);
  }
  buy(key,cost){if(this.save.coins<cost){this.note.setText('Te faltan monedas');return;} this.save.coins-=cost; this.save.inventory[key]=(this.save.inventory[key]||0)+1; saveGame(this.save); this.scene.restart();}
}

export class RecordsScene extends Phaser.Scene {
  constructor(){super('Records')}
  create(){
    this.save=loadSave(); this.cameras.main.setBackgroundColor('#123b59'); topBar(this,'RÉCORDS'); backButton(this,()=>this.scene.start('Menu'));
    const completed=Object.keys(this.save.stars).length; const totalStars=Object.values(this.save.stars).reduce((a,b)=>a+b,0);
    const cards=[['Niveles completados',completed,'🏆'],['Estrellas conseguidas',totalStars,'⭐'],['Monedas',this.save.coins,'🪙'],['Nivel máximo',Math.max(1,this.save.unlocked-1),'🐾']];
    cards.forEach((c,i)=>{const y=165+i*145; const g=this.add.graphics(); g.fillStyle(0x1d587e,1); g.fillRoundedRect(35,y-50,360,105,20); this.add.text(85,y,c[2],{fontSize:'42px'}).setOrigin(.5); this.add.text(145,y-16,c[0],{fontFamily:'Arial Black',fontSize:'17px',color:'#ccecff'}); this.add.text(145,y+18,String(c[1]),{fontFamily:'Arial Black',fontSize:'28px',color:'#fff'});});
  }
}
