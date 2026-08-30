import Phaser from 'phaser';
import {C,roundedButton,topBar,backButton,coinBadge,drawLogo,panel,sceneCard,decorateRoom} from './ui.js';
import {loadSave,saveGame} from './storage.js';
import {drawDetailedRoom,populateClutter,addForegroundClutter} from './clutter.js';

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
    this.save=loadSave(); this.found=false;
    this.timeLeft=Math.max(28,96-Math.floor((this.level-1)*1.55));
    drawDetailedRoom(this);

    // HUD superior como el primer mockup
    const top=this.add.graphics().setDepth(40);top.fillStyle(0x3b291d,.96);top.fillRoundedRect(8,10,414,104,20);top.fillStyle(0xffffff,.07);top.fillRoundedRect(12,14,406,24,15);
    const pause=this.add.circle(39,43,23,0xd8a75b).setStrokeStyle(2,0xffe0a5).setDepth(41).setInteractive({useHandCursor:true});
    this.add.text(39,43,'Ⅱ',{fontFamily:'Arial Black',fontSize:'18px',color:'#5a351a'}).setOrigin(.5).setDepth(42);pause.on('pointerup',()=>this.scene.start('Menu'));
    this.add.text(215,38,`Nivel ${this.level}`,{fontFamily:'Arial Black',fontSize:'19px',color:'#fff'}).setOrigin(.5).setDepth(42);
    this.timerText=this.add.text(370,40,this.formatTime(this.timeLeft),{fontFamily:'Arial Black',fontSize:'18px',color:'#fff4d6'}).setOrigin(.5).setDepth(42);
    this.add.text(215,82,'Encuentra a Kika',{fontFamily:'Arial Black',fontSize:'19px',color:'#ffd56b'}).setOrigin(.5).setDepth(42);

    // Cada nivel tiene una composición fija, pero progresivamente más cargada.
    const count=Math.min(128,52+Math.floor(this.level*2.6));
    populateClutter(this,{count,seed:this.level*271+17,behindDepthMax:10});

    const rng=new Phaser.Math.RandomDataGenerator([String(this.level*9187+33)]);
    this.kikaX=rng.integerInRange(48,382); this.kikaY=rng.integerInRange(160,710);
    const size=Math.max(50,88-this.level*1.15);
    this.kika=this.add.image(this.kikaX,this.kikaY,'kika').setDisplaySize(size,size).setDepth(11).setInteractive({useHandCursor:true});
    this.kika.setAngle(rng.integerInRange(-13,13));
    this.kika.on('pointerup',()=>this.onFound());

    // Distractores tipo golden en niveles más altos.
    const decoys=this.level<8?0:this.level<18?1:2;
    for(let i=0;i<decoys;i++){
      let x=rng.integerInRange(45,385),y=rng.integerInRange(155,720);
      if(Math.abs(x-this.kikaX)<70 && Math.abs(y-this.kikaY)<70){x=(x+150)%360+35;y=(y+180)%540+155}
      const dog=this.add.image(x,y,'kika').setDisplaySize(size*rng.realInRange(.78,1.12),size*rng.realInRange(.78,1.12)).setDepth(rng.integerInRange(5,10)).setAngle(rng.integerInRange(-20,20));
      dog.setTint([0xe6b26a,0xd5a04f,0xf0c988][i%3]);dog.setAlpha(.93);
    }

    // Objetos delante de Kika: ocultan partes de su cuerpo y vuelven la búsqueda mucho más difícil.
    addForegroundClutter(this,{count:Math.min(31,8+Math.floor(this.level*.8)),seed:this.level*613+9,depthMin:12,depthMax:18});

    this.drawBottomBar();
    this.countdown=this.time.addEvent({delay:1000,loop:true,callback:()=>{if(this.found)return;this.timeLeft--;this.timerText.setText(this.formatTime(this.timeLeft));if(this.timeLeft<=0)this.onLose()}});
  }
  drawBottomBar(){
    const g=this.add.graphics().setDepth(50);g.fillStyle(0xefd9b4,.99);g.fillRect(0,770,430,162);g.lineStyle(3,0xa46f3e,.8);g.lineBetween(0,770,430,770);g.fillStyle(0xffffff,.22);g.fillRect(0,774,430,12);
    const defs=[['🔎',105,'magnifier'],['💡',215,'bulb'],['⏱️',325,'clock']];
    defs.forEach(([icon,x,key])=>{const amt=this.save.inventory[key]||0;this.add.circle(x,846,45,0x000000,.14).setDepth(51);const c=this.add.circle(x,841,43,0xfff8ea).setStrokeStyle(3,0xb3844d).setDepth(52).setInteractive({useHandCursor:true});this.add.text(x,841,icon,{fontSize:'39px'}).setOrigin(.5).setDepth(53);this.add.circle(x+31,808,14,C.green).setDepth(54);this.add.text(x+31,808,String(amt),{fontFamily:'Arial Black',fontSize:'13px',color:'#fff'}).setOrigin(.5).setDepth(55);c.on('pointerup',()=>this.usePower(key));});
    this.add.text(215,908,'Mira entre muebles, juguetes y objetos',{fontFamily:'Arial Black',fontSize:'11px',color:'#6a4a33'}).setOrigin(.5).setDepth(53);
  }
  usePower(key){
    if(this.found||(this.save.inventory[key]||0)<=0)return;this.save.inventory[key]--;saveGame(this.save);
    if(key==='magnifier'){const ring=this.add.circle(this.kikaX,this.kikaY,72,0xffdc55,.08).setStrokeStyle(7,0xffd737,1).setDepth(70);this.tweens.add({targets:ring,scale:1.45,alpha:0,duration:1600,onComplete:()=>ring.destroy()});}
    if(key==='bulb'){const shade=this.add.rectangle(215,442,430,650,0x000000,.58).setDepth(68);const ring=this.add.circle(this.kikaX,this.kikaY,70,0xffffff,0).setStrokeStyle(6,0xffe05f,1).setDepth(70);this.kika.setDepth(71);this.time.delayedCall(1500,()=>{shade.destroy();ring.destroy();this.kika.setDepth(11)})}
    if(key==='clock'){this.timeLeft+=15;this.timerText.setText(this.formatTime(this.timeLeft));}
  }
  onFound(){
    if(this.found)return;this.found=true;if(this.countdown)this.countdown.remove();
    const max=Math.max(28,96-Math.floor((this.level-1)*1.55));const ratio=this.timeLeft/max;const stars=ratio>.62?3:ratio>.3?2:1;
    this.save.stars[this.level]=Math.max(this.save.stars[this.level]||0,stars);this.save.unlocked=Math.max(this.save.unlocked,Math.min(30,this.level+1));this.save.coins+=stars*25;saveGame(this.save);
    const shade=this.add.rectangle(215,466,430,932,0x21140d,.72).setDepth(90);const p=panel(this,215,476,350,430,0x4b301e,0xdda64e,91,28);
    this.add.text(215,335,'¡ENCONTRASTE\nA KIKA!',{fontFamily:'Arial Black',fontSize:'34px',align:'center',color:'#ffd245',stroke:'#6f3507',strokeThickness:6}).setOrigin(.5).setDepth(93);
    this.add.circle(215,475,90,0xf2a900,.95).setDepth(93);this.add.circle(215,475,76,0xffdd65,1).setDepth(94);this.add.image(215,475,'kika').setDisplaySize(135,135).setDepth(95);
    this.add.text(215,595,'★'.repeat(stars)+'☆'.repeat(3-stars),{fontFamily:'Arial Black',fontSize:'56px',color:'#ffbd12',stroke:'#8b4b00',strokeThickness:4}).setOrigin(.5).setDepth(95);
    this.add.text(215,645,`+${stars*25} monedas`,{fontFamily:'Arial Black',fontSize:'17px',color:'#fff2c6'}).setOrigin(.5).setDepth(95);
    roundedButton(this,215,705,246,58,this.level<30?'SIGUIENTE NIVEL':'VOLVER A NIVELES',C.green,C.greenDark,()=>this.scene.start(this.level<30?'Game':'Levels',this.level<30?{level:this.level+1}:undefined),{depth:96,fontSize:18});
  }
  onLose(){if(this.found)return;this.found=true;if(this.countdown)this.countdown.remove();const sh=this.add.rectangle(215,466,430,932,0x21140d,.72).setDepth(90);panel(this,215,475,345,300,0x4b301e,0xdda64e,91,28);this.add.text(215,400,'¡SE ACABÓ EL TIEMPO!',{fontFamily:'Arial Black',fontSize:'25px',color:'#ffd05a',stroke:'#6f3507',strokeThickness:4}).setOrigin(.5).setDepth(94);this.add.text(215,457,'Kika estaba muy bien escondida 🐾',{fontFamily:'Arial Black',fontSize:'14px',color:'#fff',align:'center',wordWrap:{width:280}}).setOrigin(.5).setDepth(94);roundedButton(this,215,540,235,58,'INTENTAR OTRA VEZ',C.orange,0xa84c17,()=>this.scene.restart({level:this.level}),{depth:95,fontSize:16});}
  formatTime(v){const m=Math.floor(v/60),s=v%60;return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`}
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
