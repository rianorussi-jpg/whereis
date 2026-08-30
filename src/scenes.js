import Phaser from 'phaser';
import {C,roundedButton,topBar,backButton,coinBadge,drawLogo,panel,sceneCard,decorateRoom} from './ui.js';
import {loadSave,saveGame} from './storage.js';

const stickerEmojis=['🧸','⚽','🎒','🪴','📷','👟','🧢','🍕','☕','🎧','🕶️','🧃','🎸','🛹','📚','🧩','🚗','🛼','🕹️','🍩','🧁','🪁','🧦','🔦','🧴','👜','🪑','🛋️','🪞','🧺','🎁','🧵','📦','🧯','🧹','🪣','🥎','🏀','🎾','🧲','📻','☎️','🥨','🧢','🌵','🪴','🧤','🧣','👓','🧴','🪥','🎈','🛴','🥁','🧱','🧸','🐻','🐱','🐰','🐼','🦊','🐶'];

export class BootScene extends Phaser.Scene{
  constructor(){super('Boot')}
  preload(){this.load.svg('kika','/assets/kika.svg',{width:180,height:180});}
  create(){this.scene.start('Menu')}
}

export class MenuScene extends Phaser.Scene{
  constructor(){super('Menu')}
  create(){
    this.save=loadSave(); decorateRoom(this,'room');
    // floor clutter
    for(let i=0;i<28;i++) this.makeSticker(Phaser.Math.Between(15,415),Phaser.Math.Between(640,900),Phaser.Math.Between(18,32),stickerEmojis[i%stickerEmojis.length],1,false);
    drawLogo(this,215,138,.94,15);
    const kika=this.add.image(215,350,'kika').setDisplaySize(190,190).setDepth(12);kika.setAngle(-1);
    roundedButton(this,215,520,240,64,'JUGAR',C.yellow,C.yellowDark,()=>this.scene.start('Game',{level:Math.min(this.save.unlocked,30)}),{depth:15,fontSize:27});
    roundedButton(this,215,596,240,58,'NIVELES',C.blue,C.blueDark,()=>this.scene.start('Levels'),{depth:15,fontSize:22});
    coinBadge(this,215,668,this.save.coins,15);
    const defs=[['⚙',55,'AJUSTES'],['🏆',155,'RÉCORDS'],['🐾',275,'ESCENARIOS'],['🛍️',375,'TIENDA']];
    defs.forEach(([icon,x,label],i)=>{
      const bg=this.add.circle(x,800,32,i===3?C.orange:C.blue).setStrokeStyle(3,0xffffff,.8).setDepth(15).setInteractive({useHandCursor:true});
      this.add.text(x,800,icon,{fontSize:'27px'}).setOrigin(.5).setDepth(16);
      this.add.text(x,844,label,{fontFamily:'Arial Black',fontSize:'10px',color:'#fff',stroke:'#3a281a',strokeThickness:3}).setOrigin(.5).setDepth(16);
      if(label==='RÉCORDS') bg.on('pointerup',()=>this.scene.start('Records'));
      if(label==='ESCENARIOS') bg.on('pointerup',()=>this.scene.start('Scenarios'));
      if(label==='TIENDA') bg.on('pointerup',()=>this.scene.start('Shop'));
    });
  }
  makeSticker(x,y,size,emoji,depth=2,interactive=false){
    const c=this.add.container(x,y).setDepth(depth);const g=this.add.graphics();g.fillStyle(0xffffff,.96);g.fillCircle(0,0,size*.64);g.lineStyle(2,0xd6c5a8,.8);g.strokeCircle(0,0,size*.64);const t=this.add.text(0,0,emoji,{fontSize:`${size}px`}).setOrigin(.5);c.add([g,t]);c.setAngle(Phaser.Math.Between(-18,18));if(interactive)c.setSize(size*1.35,size*1.35).setInteractive({useHandCursor:true});return c;
  }
}

export class ScenarioScene extends Phaser.Scene{
  constructor(){super('Scenarios')}
  create(){
    this.save=loadSave();this.cameras.main.setBackgroundColor('#b67a45');
    const g=this.add.graphics();g.fillGradientStyle(0x9b6037,0x9b6037,0x5d3924,0x5d3924,1);g.fillRect(0,0,430,932);
    topBar(this,'SELECCIÓN DE ESCENARIOS',`🪙 ${this.save.coins}`);backButton(this,()=>this.scene.start('Menu'));
    this.add.text(215,108,'Elige dónde buscar a Kika',{fontFamily:'Arial Black',fontSize:'18px',color:'#fff6e0'}).setOrigin(.5);
    const data=[['Sala','30 niveles','room',false],['Parque','Próximamente','park',true],['Playa','Próximamente','beach',true],['Cocina','Próximamente','kitchen',true],['Fiesta','Próximamente','party',true]];
    data.forEach((d,i)=>{const col=i%2,row=Math.floor(i/2);const x=112+205*col,y=230+225*row;sceneCard(this,x,y,180,190,d[0],d[1],d[2],d[3],()=>{this.save.scenario=d[2];saveGame(this.save);this.scene.start('Levels')})});
    this.add.text(215,820,'Completa niveles para desbloquear nuevos escenarios',{fontFamily:'Arial Black',fontSize:'13px',color:'#ffe5bb',align:'center',wordWrap:{width:340}}).setOrigin(.5);
  }
}

export class LevelScene extends Phaser.Scene{
  constructor(){super('Levels')}
  create(){
    this.save=loadSave();this.cameras.main.setBackgroundColor('#f2d9b1');
    const bg=this.add.graphics();bg.fillGradientStyle(0xf8ead1,0xf8ead1,0xd6ad77,0xd6ad77,1);bg.fillRect(0,0,430,932);
    topBar(this,'NIVELES',`🪙 ${this.save.coins}`);backButton(this,()=>this.scene.start('Scenarios'));
    const labels=[['FÁCIL',1,10,C.green],['MEDIO',11,20,C.blue],['DIFÍCIL',21,30,C.orange]];
    labels.forEach((l,i)=>roundedButton(this,76+i*139,110,124,42,l[0],l[3],i===0?C.greenDark:C.blueDark,()=>{},{depth:2,fontSize:15}));
    panel(this,215,515,398,700,0xfff4df,0xc79a63,1,24);
    for(let n=1;n<=30;n++){
      const col=(n-1)%5,row=Math.floor((n-1)/5),x=55+80*col,y=205+103*row,unlocked=n<=this.save.unlocked;
      const gg=this.add.graphics().setDepth(4);gg.fillStyle(unlocked?0xfff9ee:0xd5c5af,1);gg.fillRoundedRect(x-31,y-36,62,72,13);gg.lineStyle(2,unlocked?0xc99c5d:0xb2a28d,1);gg.strokeRoundedRect(x-31,y-36,62,72,13);gg.fillStyle(0xffffff,.32);gg.fillRoundedRect(x-27,y-32,54,16,9);
      this.add.text(x,y-10,unlocked?String(n):'🔒',{fontFamily:'Arial Black',fontSize:unlocked?'24px':'20px',color:unlocked?'#4a2d19':'#74685d'}).setOrigin(.5).setDepth(5);
      const stars=this.save.stars[n]||0;this.add.text(x,y+19,'★'.repeat(stars)+'☆'.repeat(3-stars),{fontFamily:'Arial Black',fontSize:'12px',color:'#f2a500',stroke:'#8d5500',strokeThickness:1}).setOrigin(.5).setDepth(5);
      if(unlocked)this.add.zone(x,y,62,72).setInteractive({useHandCursor:true}).setDepth(6).on('pointerup',()=>this.scene.start('Game',{level:n}));
    }
    this.add.text(215,854,'⭐ Consigue 3 estrellas encontrando a Kika rápido',{fontFamily:'Arial Black',fontSize:'12px',color:'#67482f'}).setOrigin(.5);
  }
}

export class GameScene extends Phaser.Scene{
  constructor(){super('Game')}
  init(data){this.level=data.level||1}
  create(){
    this.save=loadSave();this.found=false;this.timeLeft=Math.max(25,92-Math.floor((this.level-1)*1.8));decorateRoom(this,'room');
    // top HUD
    const top=this.add.graphics().setDepth(20);top.fillStyle(0x3d291c,.94);top.fillRoundedRect(8,10,414,104,20);top.fillStyle(0xffffff,.06);top.fillRoundedRect(12,14,406,25,15);
    const pause=this.add.circle(39,43,23,0xd8a75b).setStrokeStyle(2,0xffe0a5).setDepth(21).setInteractive({useHandCursor:true});this.add.text(39,43,'Ⅱ',{fontFamily:'Arial Black',fontSize:'18px',color:'#5a351a'}).setOrigin(.5).setDepth(22);pause.on('pointerup',()=>this.scene.start('Menu'));
    this.add.text(215,38,`Nivel ${this.level}`,{fontFamily:'Arial Black',fontSize:'19px',color:'#fff'}).setOrigin(.5).setDepth(22);
    this.timerText=this.add.text(370,40,this.formatTime(this.timeLeft),{fontFamily:'Arial Black',fontSize:'18px',color:'#fff4d6'}).setOrigin(.5).setDepth(22);
    this.add.text(215,82,'Encuentra a Kika',{fontFamily:'Arial Black',fontSize:'19px',color:'#ffd56b'}).setOrigin(.5).setDepth(22);
    // board warm veil
    const veil=this.add.rectangle(215,440,420,630,0xc58d4c,.18).setDepth(1);
    const count=Math.min(105,48+this.level*2);
    for(let i=0;i<count;i++) this.spawnSticker(i);
    this.kikaX=Phaser.Math.Between(55,375);this.kikaY=Phaser.Math.Between(160,720);
    const s=Math.max(.34,.58-this.level*.006);this.kika=this.add.image(this.kikaX,this.kikaY,'kika').setDisplaySize(180*s,180*s).setDepth(Phaser.Math.Between(4,8)).setInteractive({useHandCursor:true});this.kika.setAngle(Phaser.Math.Between(-18,18));this.kika.on('pointerup',()=>this.onFound());
    this.drawBottomBar();
    this.countdown=this.time.addEvent({delay:1000,loop:true,callback:()=>{if(this.found)return;this.timeLeft--;this.timerText.setText(this.formatTime(this.timeLeft));if(this.timeLeft<=0)this.onLose()}});
  }
  spawnSticker(i){
    const x=Phaser.Math.Between(18,412),y=Phaser.Math.Between(135,750),size=Phaser.Math.Between(22,40),emoji=stickerEmojis[i%stickerEmojis.length];
    const c=this.add.container(x,y).setDepth(Phaser.Math.Between(2,9));const g=this.add.graphics();g.fillStyle(0xffffff,.94);g.fillCircle(0,0,size*.7);g.lineStyle(2,0xb78e60,.65);g.strokeCircle(0,0,size*.7);g.fillStyle(0xffffff,.28);g.fillCircle(-size*.18,-size*.2,size*.22);const t=this.add.text(0,0,emoji,{fontSize:`${size}px`}).setOrigin(.5);c.add([g,t]);c.setAngle(Phaser.Math.Between(-24,24));
  }
  drawBottomBar(){
    const g=this.add.graphics().setDepth(30);g.fillStyle(0xefd9b4,.98);g.fillRect(0,770,430,162);g.lineStyle(3,0xa46f3e,.8);g.lineBetween(0,770,430,770);g.fillStyle(0xffffff,.22);g.fillRect(0,774,430,12);
    const defs=[['🔎',105,'magnifier'],['💡',215,'bulb'],['⏱️',325,'clock']];
    defs.forEach(([icon,x,key])=>{const amt=this.save.inventory[key]||0;const sh=this.add.circle(x,846,45,0x000000,.14).setDepth(31);const c=this.add.circle(x,841,43,0xfff8ea).setStrokeStyle(3,0xb3844d).setDepth(32).setInteractive({useHandCursor:true});this.add.text(x,841,icon,{fontSize:'39px'}).setOrigin(.5).setDepth(33);this.add.circle(x+31,808,14,C.green).setDepth(34);this.add.text(x+31,808,String(amt),{fontFamily:'Arial Black',fontSize:'13px',color:'#fff'}).setOrigin(.5).setDepth(35);c.on('pointerup',()=>this.usePower(key));});
    this.add.text(215,908,'Usa una ayuda si Kika está muy escondida',{fontFamily:'Arial Black',fontSize:'11px',color:'#6a4a33'}).setOrigin(.5).setDepth(33);
  }
  usePower(key){
    if(this.found||(this.save.inventory[key]||0)<=0)return;this.save.inventory[key]--;saveGame(this.save);
    if(key==='magnifier'){const ring=this.add.circle(this.kikaX,this.kikaY,88,0xffdc55,.08).setStrokeStyle(7,0xffd737,1).setDepth(40);this.tweens.add({targets:ring,scale:1.35,alpha:0,duration:1600,onComplete:()=>ring.destroy()});}
    if(key==='bulb'){const shade=this.add.rectangle(215,442,430,650,0x000000,.58).setDepth(38);const ring=this.add.circle(this.kikaX,this.kikaY,85,0xffffff,0).setStrokeStyle(6,0xffe05f,1).setDepth(40);this.kika.setDepth(41);this.time.delayedCall(1500,()=>{shade.destroy();ring.destroy();this.kika.setDepth(6)})}
    if(key==='clock'){this.timeLeft+=15;this.timerText.setText(this.formatTime(this.timeLeft));}
  }
  onFound(){
    if(this.found)return;this.found=true;this.countdown.remove(false);this.kika.setDepth(50);this.tweens.add({targets:this.kika,scale:1.18,duration:180,yoyo:true,repeat:2});
    const stars=this.timeLeft>52?3:this.timeLeft>25?2:1,reward=stars*20;this.save.coins+=reward;this.save.stars[this.level]=Math.max(this.save.stars[this.level]||0,stars);this.save.best[this.level]=Math.max(this.save.best[this.level]||0,this.timeLeft);this.save.unlocked=Math.min(30,Math.max(this.save.unlocked,this.level+1));saveGame(this.save);this.time.delayedCall(450,()=>this.showWin(stars,reward));
  }
  showWin(stars,reward){
    this.add.rectangle(215,466,430,932,0x17100b,.72).setDepth(60);const g=this.add.graphics().setDepth(61);g.fillStyle(0x3b281b,.98);g.fillRoundedRect(27,150,376,610,30);g.lineStyle(4,0xf2b72d);g.strokeRoundedRect(27,150,376,610,30);g.fillStyle(0xffffff,.06);g.fillRoundedRect(34,157,362,33,23);
    this.add.text(215,220,'¡ENCONTRASTE\nA KIKA!',{fontFamily:'Arial Black',fontSize:'37px',color:'#ffd33b',align:'center',stroke:'#693400',strokeThickness:7}).setOrigin(.5).setDepth(62);
    const glow=this.add.circle(215,390,103,0xffc528,.22).setDepth(62);this.add.circle(215,390,88,0xffc528,.18).setStrokeStyle(6,0xffc528).setDepth(63);this.add.image(215,390,'kika').setDisplaySize(175,175).setDepth(64);
    this.add.text(215,522,'★'.repeat(stars)+'☆'.repeat(3-stars),{fontFamily:'Arial Black',fontSize:'56px',color:'#ffbf17',stroke:'#7a4100',strokeThickness:4}).setOrigin(.5).setDepth(64);
    this.add.text(215,575,`+ ${reward} monedas`,{fontFamily:'Arial Black',fontSize:'20px',color:'#fff5d4'}).setOrigin(.5).setDepth(64);
    roundedButton(this,215,648,260,58,'SIGUIENTE NIVEL',C.green,C.greenDark,()=>this.scene.start('Game',{level:Math.min(30,this.level+1)}),{depth:64,fontSize:20});
    roundedButton(this,215,712,260,46,'VOLVER A NIVELES',C.blue,C.blueDark,()=>this.scene.start('Levels'),{depth:64,fontSize:15});
  }
  onLose(){
    if(this.found)return;this.found=true;this.countdown.remove(false);this.add.rectangle(215,466,430,932,0x140e0a,.72).setDepth(60);panel(this,215,430,340,270,0x3d291c,0xe6ad4e,61,28);this.add.text(215,355,'¡SE ACABÓ\nEL TIEMPO!',{fontFamily:'Arial Black',fontSize:'34px',color:'#ffd257',align:'center',stroke:'#552c08',strokeThickness:5}).setOrigin(.5).setDepth(64);this.add.text(215,440,'Kika estaba muy bien escondida 🐾',{fontFamily:'Arial Black',fontSize:'14px',color:'#fff4db'}).setOrigin(.5).setDepth(64);roundedButton(this,215,520,230,58,'REINTENTAR',C.yellow,C.yellowDark,()=>this.scene.restart({level:this.level}),{depth:64,fontSize:20});
  }
  formatTime(v){v=Math.max(0,v);return `${String(Math.floor(v/60)).padStart(2,'0')}:${String(v%60).padStart(2,'0')}`}
}

export class ShopScene extends Phaser.Scene{
  constructor(){super('Shop')}
  create(){
    this.save=loadSave();const g=this.add.graphics();g.fillGradientStyle(C.navy,C.navy,0x0b2940,0x0b2940,1);g.fillRect(0,0,430,932);topBar(this,'TIENDA',`🪙 ${this.save.coins}`);backButton(this,()=>this.scene.start('Menu'));
    const tabs=[['PISTAS',70],['MONEDAS',215],['ESPECIALES',360]];tabs.forEach((t,i)=>roundedButton(this,t[1],112,125,40,t[0],i===0?C.green:0x245a7d,i===0?C.greenDark:0x163f5a,()=>{},{depth:2,fontSize:13}));
    const products=[['🔎','Lupa','Revela la zona donde está Kika',100,'magnifier'],['💡','Pista brillante','Ilumina a Kika por un momento',150,'bulb'],['⏱️','+15 segundos','Añade tiempo al cronómetro',120,'clock']];
    products.forEach((p,i)=>{const y=235+i*170;panel(this,215,y,390,142,0x164d70,0x2c7ca6,2,20);this.add.text(64,y,p[0],{fontSize:'54px'}).setOrigin(.5).setDepth(5);this.add.text(115,y-28,p[1],{fontFamily:'Arial Black',fontSize:'19px',color:'#fff'}).setDepth(5);this.add.text(115,y+4,p[2],{fontSize:'13px',color:'#cfe9f7',wordWrap:{width:180}}).setDepth(5);this.add.text(115,y+38,`Tienes: ${this.save.inventory[p[4]]||0}`,{fontFamily:'Arial Black',fontSize:'12px',color:'#86d7ff'}).setDepth(5);roundedButton(this,337,y+27,112,40,`🪙 ${p[3]}`,C.green,C.greenDark,()=>this.buy(p[4],p[3]),{depth:5,fontSize:14});});
    panel(this,215,790,390,105,0x6f3d87,0x9d66b5,2,20);this.add.text(36,754,'OFERTA DE LANZAMIENTO',{fontFamily:'Arial Black',fontSize:'14px',color:'#fff'}).setDepth(5);this.add.text(36,794,'🔎 x10   💡 x10   🪙 x1000',{fontFamily:'Arial Black',fontSize:'19px',color:'#fff'}).setDepth(5);roundedButton(this,342,806,112,42,'PRÓXIMO',C.yellow,C.yellowDark,()=>{},{depth:5,fontSize:13});
    this.note=this.add.text(215,890,'',{fontFamily:'Arial Black',fontSize:'15px',color:'#ffd96b'}).setOrigin(.5).setDepth(10);
  }
  buy(key,cost){if(this.save.coins<cost){this.note.setText('Te faltan monedas');return}this.save.coins-=cost;this.save.inventory[key]=(this.save.inventory[key]||0)+1;saveGame(this.save);this.scene.restart()}
}

export class RecordsScene extends Phaser.Scene{
  constructor(){super('Records')}
  create(){
    this.save=loadSave();const g=this.add.graphics();g.fillGradientStyle(0x174f75,0x174f75,0x09283d,0x09283d,1);g.fillRect(0,0,430,932);topBar(this,'RÉCORDS');backButton(this,()=>this.scene.start('Menu'));
    this.add.text(215,115,'TU AVENTURA CON KIKA',{fontFamily:'Arial Black',fontSize:'18px',color:'#a9e2ff'}).setOrigin(.5);
    const completed=Object.keys(this.save.stars).filter(k=>this.save.stars[k]>0).length,totalStars=Object.values(this.save.stars).reduce((a,b)=>a+b,0),max=Math.max(1,this.save.unlocked-1);
    const cards=[['🏆','Niveles completados',completed],['⭐','Estrellas conseguidas',totalStars],['🪙','Monedas disponibles',this.save.coins],['🐾','Nivel más alto',max]];
    cards.forEach((c,i)=>{const y=205+i*140;panel(this,215,y,370,108,0x1a5b82,0x2c80ab,2,20);this.add.text(75,y,c[0],{fontSize:'42px'}).setOrigin(.5).setDepth(5);this.add.text(125,y-19,c[1],{fontFamily:'Arial Black',fontSize:'15px',color:'#bfeaff'}).setDepth(5);this.add.text(125,y+13,String(c[2]),{fontFamily:'Arial Black',fontSize:'29px',color:'#fff'}).setDepth(5);});
    panel(this,215,785,370,120,0x103c59,0x2c80ab,2,20);this.add.text(215,758,'MEJOR BUSCADOR',{fontFamily:'Arial Black',fontSize:'14px',color:'#9edcff'}).setOrigin(.5).setDepth(5);this.add.text(215,800,totalStars>=60?'Maestro de Kika 🥇':totalStars>=30?'Detective Kika 🕵️':'Explorador Kika 🔎',{fontFamily:'Arial Black',fontSize:'22px',color:'#fff'}).setOrigin(.5).setDepth(5);
  }
}
