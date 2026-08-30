import Phaser from 'phaser';
import {C,roundedButton,topBar,backButton,coinBadge,drawLogo,softPanel,icon,bottomNavItem,framedArt} from './ui.js';
import {loadSave,saveGame} from './storage.js';
import {LEVELS,getLevel} from './levels.js';

export class BootScene extends Phaser.Scene{
  constructor(){super('Boot')}
  preload(){
    this.load.svg('kika','/assets/kika.svg',{width:240,height:240});
    this.load.image('menu-room','/assets/levels/sala-base.webp');
    LEVELS.slice(0,6).forEach(l=>{if(!this.textures.exists(l.key))this.load.image(l.key,l.image)});
  }
  create(){this.scene.start('Menu')}
}

export class MenuScene extends Phaser.Scene{
  constructor(){super('Menu')}
  create(){
    this.save=loadSave();
    this.add.image(215,466,'menu-room').setDisplaySize(430,932).setDepth(0);
    this.add.rectangle(215,466,430,932,0x1d130c,.18).setDepth(1);
    const fade=this.add.graphics().setDepth(2);fade.fillGradientStyle(0x0d0805,0x0d0805,0x000000,0x000000,.02,.02,.66,.66);fade.fillRect(0,520,430,412);
    coinBadge(this,350,54,this.save.coins,10,true);
    drawLogo(this,215,132,.9,12);
    const heroGlow=this.add.circle(215,337,112,0xffcb58,.19).setDepth(7);
    this.add.image(215,342,'kika').setDisplaySize(218,218).setDepth(9);
    softPanel(this,215,468,330,78,0x3c2b20,.88,10,24,0xffdf9f,.18);
    this.add.text(215,450,'¿DÓNDE ESTÁ KIKA?',{fontFamily:'Arial Black',fontSize:'17px',color:'#ffd565'}).setOrigin(.5).setDepth(13);
    this.add.text(215,481,'Encuéntrala entre cientos de objetos',{fontFamily:'Arial',fontSize:'14px',color:'#fff3dd'}).setOrigin(.5).setDepth(13);
    roundedButton(this,215,565,270,66,'JUGAR',C.yellow,C.yellowDark,()=>this.scene.start('Game',{level:Math.min(this.save.unlocked,30)}),{depth:12,fontSize:28});
    const playCircle=this.add.circle(318,565,20,0xffffff,.18).setDepth(16);icon(this,'play',318,565,18,0xffffff,17);
    roundedButton(this,215,640,270,54,'SELECCIONAR NIVEL',C.blue,C.blueDark,()=>this.scene.start('Levels'),{depth:12,fontSize:17,strokeThickness:2});
    softPanel(this,215,820,410,190,0x2f2118,.93,8,28,0xffd49a,.14);
    this.add.text(215,744,'TU PROGRESO',{fontFamily:'Arial Black',fontSize:'12px',color:'#eec38a',letterSpacing:1}).setOrigin(.5).setDepth(12);
    const completed=Object.values(this.save.stars).filter(v=>v>0).length,totalStars=Object.values(this.save.stars).reduce((a,b)=>a+b,0);
    const progress=Math.min(1,(this.save.unlocked-1)/30);const pg=this.add.graphics().setDepth(12);pg.fillStyle(0x130d09,.7);pg.fillRoundedRect(55,772,320,12,6);pg.fillStyle(C.green,1);pg.fillRoundedRect(55,772,320*progress,12,6);
    this.add.text(55,793,`${completed}/30 niveles`,{fontFamily:'Arial Black',fontSize:'11px',color:'#fff0d5'}).setDepth(13);
    this.add.text(375,793,`${totalStars} ★`,{fontFamily:'Arial Black',fontSize:'11px',color:'#ffd34f'}).setOrigin(1,0).setDepth(13);
    bottomNavItem(this,63,856,'gear','AJUSTES',false,()=>{});
    bottomNavItem(this,165,856,'trophy','RÉCORDS',false,()=>this.scene.start('Records'));
    bottomNavItem(this,267,856,'paw','ESCENARIOS',false,()=>this.scene.start('Scenarios'));
    bottomNavItem(this,369,856,'shop','TIENDA',true,()=>this.scene.start('Shop'));
  }
}

export class ScenarioScene extends Phaser.Scene{
  constructor(){super('Scenarios')}
  create(){
    this.save=loadSave();this.add.image(215,466,'menu-room').setDisplaySize(430,932).setDepth(0);this.add.rectangle(215,466,430,932,0x20140d,.58).setDepth(1);
    topBar(this,'ESCENARIOS',`${this.save.coins}`);backButton(this,()=>this.scene.start('Menu'));icon(this,'coin',352,47,19,0xffbd17,24);
    this.add.text(25,102,'ELIGE DÓNDE BUSCAR',{fontFamily:'Arial Black',fontSize:'15px',color:'#ffe0aa'}).setDepth(4);
    this.add.text(25,128,'Cada escenario tendrá 30 niveles únicos.',{fontFamily:'Arial',fontSize:'13px',color:'#f7ead8'}).setDepth(4);
    // Featured room card with actual game art
    softPanel(this,215,310,390,310,0x3a291e,.96,3,24,0xf3c786,.22);framedArt(this,'sala-02',215,273,360,214,5,18);
    this.add.text(44,394,'SALA',{fontFamily:'Arial Black',fontSize:'25px',color:'#fff'}).setDepth(9);this.add.text(44,427,'30 niveles • dificultad progresiva',{fontFamily:'Arial',fontSize:'13px',color:'#f4d6a8'}).setDepth(9);
    roundedButton(this,336,416,116,44,'ENTRAR',C.green,C.greenDark,()=>this.scene.start('Levels'),{depth:9,fontSize:14,strokeThickness:2});
    this.add.text(24,493,'PRÓXIMOS ESCENARIOS',{fontFamily:'Arial Black',fontSize:'13px',color:'#ffe0aa'}).setDepth(4);
    const cards=[['PARQUE',0x4d8d52],['PLAYA',0x2c91b9],['COCINA',0x9d6840],['FIESTA',0x6f4b86]];
    cards.forEach((d,i)=>{const x=113+(i%2)*204,y=605+Math.floor(i/2)*172;softPanel(this,x,y,184,148,d[1],.93,3,20,0xffffff,.14);const gg=this.add.graphics().setDepth(6);gg.fillStyle(0xffffff,.08);gg.fillCircle(x,y-17,44);icon(this,i===0?'paw':i===1?'target':i===2?'shop':'trophy',x,y-17,38,0xffffff,7);this.add.text(x,y+38,d[0],{fontFamily:'Arial Black',fontSize:'15px',color:'#fff'}).setOrigin(.5).setDepth(7);this.add.text(x,y+60,'PRÓXIMAMENTE',{fontFamily:'Arial Black',fontSize:'9px',color:'#ffe0aa'}).setOrigin(.5).setDepth(7);icon(this,'lock',x+66,y-54,18,0xffffff,7)});
  }
}

export class LevelScene extends Phaser.Scene{
  constructor(){super('Levels')}
  create(){
    this.save=loadSave();this.add.image(215,466,'menu-room').setDisplaySize(430,932).setDepth(0);this.add.rectangle(215,466,430,932,0xf0d4aa,.84).setDepth(1);
    topBar(this,'NIVELES',`${this.save.coins}`);backButton(this,()=>this.scene.start('Menu'));icon(this,'coin',352,47,19,0xffbd17,24);
    softPanel(this,215,132,390,82,0x5c3c27,.94,2,20,0xffe0a3,.2);this.add.text(38,111,'SALA',{fontFamily:'Arial Black',fontSize:'22px',color:'#fff'}).setDepth(5);this.add.text(38,140,'Encuentra a Kika antes de que se acabe el tiempo',{fontFamily:'Arial',fontSize:'12px',color:'#f8e4c2'}).setDepth(5);
    const unlocked=Math.min(this.save.unlocked,30);this.add.text(390,110,`${unlocked}/30`,{fontFamily:'Arial Black',fontSize:'17px',color:'#ffd465'}).setOrigin(1,0).setDepth(5);
    const bar=this.add.graphics().setDepth(5);bar.fillStyle(0x21150e,.5);bar.fillRoundedRect(250,144,140,9,5);bar.fillStyle(C.green);bar.fillRoundedRect(250,144,140*(unlocked/30),9,5);
    const tabs=[['FÁCIL',1,10,C.green],['MEDIO',11,20,C.blue],['DIFÍCIL',21,30,C.orange]];tabs.forEach((l,i)=>roundedButton(this,76+i*139,191,124,38,l[0],l[3],i===0?C.greenDark:i===1?C.blueDark:0xa94f18,()=>{},{depth:3,fontSize:13,strokeThickness:2}));
    softPanel(this,215,532,398,620,0xfff5e5,.97,2,22,0x9f7046,.45);
    for(let n=1;n<=30;n++){
      const col=(n-1)%5,row=Math.floor((n-1)/5),x=55+80*col,y=280+91*row,isOpen=n<=this.save.unlocked,stars=this.save.stars[n]||0;
      const gg=this.add.graphics().setDepth(5);gg.fillStyle(0x000000,.12);gg.fillRoundedRect(x-31,y-32+4,62,68,13);gg.fillStyle(isOpen?0xffffff:0xc7b9a5,isOpen?1:.75);gg.fillRoundedRect(x-31,y-32,62,68,13);gg.lineStyle(2,isOpen?0xc39155:0x9f9486,1);gg.strokeRoundedRect(x-31,y-32,62,68,13);
      if(isOpen){this.add.text(x,y-9,String(n),{fontFamily:'Arial Black',fontSize:'22px',color:'#4b2e1b'}).setOrigin(.5).setDepth(7);this.add.text(x,y+18,'★'.repeat(stars)+'☆'.repeat(3-stars),{fontFamily:'Arial Black',fontSize:'11px',color:'#f4a700',stroke:'#7c4900',strokeThickness:1}).setOrigin(.5).setDepth(7);this.add.zone(x,y,62,68).setInteractive({useHandCursor:true}).setDepth(8).on('pointerup',()=>this.scene.start('Game',{level:n}));}
      else icon(this,'lock',x,y-5,18,0x756c62,7);
    }
    this.add.text(215,843,'Completa un nivel para desbloquear el siguiente',{fontFamily:'Arial Black',fontSize:'11px',color:'#65442d'}).setOrigin(.5).setDepth(6);
    roundedButton(this,215,888,230,46,`CONTINUAR NIVEL ${Math.min(this.save.unlocked,30)}`,C.green,C.greenDark,()=>this.scene.start('Game',{level:Math.min(this.save.unlocked,30)}),{depth:6,fontSize:14,strokeThickness:2});
  }
}

export class GameScene extends Phaser.Scene{
  constructor(){super('Game')}
  init(data){this.level=data.level||1}
  create(){
    this.save=loadSave();this.found=false;this.levelData=getLevel(this.level);this.timeLeft=this.levelData.time;
    this.sceneTop=96;this.sceneBottom=789;this.sceneH=this.sceneBottom-this.sceneTop;
    const key=this.levelData.key;if(!this.textures.exists(key)){this.load.once(Phaser.Loader.Events.COMPLETE,()=>this.buildLevel(key));this.load.image(key,this.levelData.image);this.load.start()}else this.buildLevel(key);
  }
  buildLevel(key){
    this.cameras.main.setBackgroundColor('#23170f');this.levelArt=this.add.image(215,this.sceneTop+this.sceneH/2,key).setDisplaySize(430,this.sceneH).setDepth(1);
    const vg=this.add.graphics().setDepth(2);for(let i=0;i<7;i++){vg.lineStyle(10,0x120b07,.025+i*.017);vg.strokeRect(i*4,this.sceneTop+i*4,430-i*8,this.sceneH-i*8)}
    this.drawHud();this.drawBottomBar();this.playZone=this.add.zone(215,this.sceneTop+this.sceneH/2,430,this.sceneH).setInteractive({useHandCursor:true}).setDepth(25).on('pointerup',p=>this.checkTap(p.x,p.y));
    this.countdown=this.time.addEvent({delay:1000,loop:true,callback:()=>{if(this.found)return;this.timeLeft--;this.timerText.setText(this.formatTime(this.timeLeft));if(this.timeLeft<=10)this.timerText.setColor('#ff8e6b');if(this.timeLeft<=0)this.onLose()}});
  }
  drawHud(){
    const g=this.add.graphics().setDepth(40);g.fillStyle(0x352319,.98);g.fillRect(0,0,430,96);g.fillStyle(0xffffff,.07);g.fillRect(0,0,430,8);g.lineStyle(2,0xd09b59,.4);g.lineBetween(0,95,430,95);
    const pause=this.add.circle(38,48,24,0xd9a75a).setStrokeStyle(2,0xffe6b5,.9).setDepth(41).setInteractive({useHandCursor:true});icon(this,'pause',38,48,18,0x5b381d,42);pause.on('pointerup',()=>this.scene.start('Menu'));
    softPanel(this,215,44,108,42,0x5b3a25,.94,41,17,0xffddb0,.18);this.timerText=this.add.text(215,44,this.formatTime(this.timeLeft),{fontFamily:'Arial Black',fontSize:'18px',color:'#fff5dc'}).setOrigin(.5).setDepth(44);icon(this,'clock',177,44,17,0xffd37b,44);
    softPanel(this,367,44,104,42,0x5b3a25,.94,41,17,0xffddb0,.18);this.add.text(367,44,`Nivel ${this.level}`,{fontFamily:'Arial Black',fontSize:'14px',color:'#fff'}).setOrigin(.5).setDepth(44);
    this.add.text(215,78,'Encuentra a Kika',{fontFamily:'Arial Black',fontSize:'14px',color:'#ffd779'}).setOrigin(.5).setDepth(44);
  }
  drawBottomBar(){
    const g=this.add.graphics().setDepth(50);g.fillStyle(0x6a4328,.99);g.fillRect(0,789,430,143);g.lineStyle(3,0x2c1c12,.85);g.lineBetween(0,789,430,789);g.fillStyle(0xffffff,.08);g.fillRect(0,794,430,8);
    const defs=[['search',105,'magnifier'],['bulb',215,'bulb'],['target',325,'clock']];
    defs.forEach(([type,x,key])=>{const amt=this.save.inventory[key]||0;this.add.circle(x,858,45,0x000000,.24).setDepth(51);const c=this.add.circle(x,851,42,0x2b97d4).setStrokeStyle(4,0x145c8e).setDepth(52).setInteractive({useHandCursor:true});this.add.circle(x-8,841,26,0xffffff,.08).setDepth(53);icon(this,type,x,851,34,0xffffff,54);this.add.circle(x+31,818,13,C.green).setStrokeStyle(2,0xffffff,.7).setDepth(55);this.add.text(x+31,818,String(amt),{fontFamily:'Arial Black',fontSize:'12px',color:'#fff'}).setOrigin(.5).setDepth(56);c.on('pointerup',()=>this.usePower(key));});
    this.add.text(215,914,'PISTAS',{fontFamily:'Arial Black',fontSize:'9px',color:'#eac896',letterSpacing:2}).setOrigin(.5).setDepth(53);
  }
  targetPixels(){const t=this.levelData.target;return{x:t.x*430,y:this.sceneTop+t.y*this.sceneH,rx:t.rx*430,ry:t.ry*this.sceneH}}
  checkTap(x,y){if(this.found)return;const t=this.targetPixels(),dx=(x-t.x)/t.rx,dy=(y-t.y)/t.ry;if(dx*dx+dy*dy<=1){this.onFound();return}const ring=this.add.circle(x,y,14,0xffffff,.03).setStrokeStyle(3,0xffcf8b,.8).setDepth(32);this.tweens.add({targets:ring,scale:1.8,alpha:0,duration:350,onComplete:()=>ring.destroy()})}
  usePower(key){if(this.found||(this.save.inventory[key]||0)<=0)return;this.save.inventory[key]--;saveGame(this.save);const t=this.targetPixels();if(key==='magnifier'){const ring=this.add.circle(t.x,t.y,56,0xffdc55,.04).setStrokeStyle(7,0xffd737,1).setDepth(70);this.tweens.add({targets:ring,scale:1.55,alpha:0,duration:1700,onComplete:()=>ring.destroy()})}if(key==='bulb'){const shade=this.add.rectangle(215,this.sceneTop+this.sceneH/2,430,this.sceneH,0x000000,.58).setDepth(68);const ring=this.add.circle(t.x,t.y,70,0xffffff,.03).setStrokeStyle(7,0xffe05f,1).setDepth(70);this.time.delayedCall(1450,()=>{shade.destroy();ring.destroy()})}if(key==='clock'){this.timeLeft+=15;this.timerText.setText(this.formatTime(this.timeLeft))}}
  onFound(){if(this.found)return;this.found=true;if(this.countdown)this.countdown.remove();const ratio=this.timeLeft/this.levelData.time,stars=ratio>.62?3:ratio>.30?2:1;this.save.stars[this.level]=Math.max(this.save.stars[this.level]||0,stars);this.save.unlocked=Math.max(this.save.unlocked,Math.min(30,this.level+1));this.save.coins+=stars*this.levelData.reward;saveGame(this.save);const t=this.targetPixels();const ring=this.add.circle(t.x,t.y,35,0xffc928,.1).setStrokeStyle(8,0xffd344,1).setDepth(75);this.tweens.add({targets:ring,scale:2.25,duration:500,ease:'Back.Out'});this.time.delayedCall(420,()=>this.showWin(stars))}
  showWin(stars){
    this.add.rectangle(215,466,430,932,0x160d08,.76).setDepth(90);softPanel(this,215,480,360,470,0x412a1b,.98,91,30,0xf4b95e,.45);
    this.add.text(215,300,'¡ENCONTRASTE\nA KIKA!',{fontFamily:'Arial Black',fontSize:'32px',align:'center',color:'#ffd13e',stroke:'#713507',strokeThickness:6}).setOrigin(.5).setDepth(95);
    this.add.circle(215,446,92,0xc87b10,.35).setDepth(93);this.add.circle(215,446,78,0xffd25a,1).setDepth(94);this.add.image(215,446,'kika').setDisplaySize(145,145).setDepth(95);
    this.add.text(215,560,'★'.repeat(stars)+'☆'.repeat(3-stars),{fontFamily:'Arial Black',fontSize:'54px',color:'#ffbd12',stroke:'#8b4b00',strokeThickness:4}).setOrigin(.5).setDepth(95);icon(this,'coin',169,614,24,0xffbd17,95);this.add.text(225,614,`+${stars*this.levelData.reward} monedas`,{fontFamily:'Arial Black',fontSize:'16px',color:'#fff2c6'}).setOrigin(.5).setDepth(95);
    roundedButton(this,215,688,250,58,this.level<30?'SIGUIENTE NIVEL':'VOLVER A NIVELES',C.green,C.greenDark,()=>this.scene.start(this.level<30?'Game':'Levels',this.level<30?{level:this.level+1}:undefined),{depth:96,fontSize:17});
    roundedButton(this,215,757,200,44,'NIVELES',0x2b87bd,0x14577f,()=>this.scene.start('Levels'),{depth:96,fontSize:13,strokeThickness:2});
  }
  onLose(){if(this.found)return;this.found=true;if(this.countdown)this.countdown.remove();this.add.rectangle(215,466,430,932,0x160d08,.78).setDepth(90);softPanel(this,215,474,350,300,0x412a1b,.98,91,28,0xf4b95e,.4);this.add.text(215,393,'SE ACABÓ EL TIEMPO',{fontFamily:'Arial Black',fontSize:'24px',color:'#ffd05a'}).setOrigin(.5).setDepth(94);this.add.text(215,452,'Kika estaba muy bien escondida.',{fontFamily:'Arial',fontSize:'15px',color:'#fff'}).setOrigin(.5).setDepth(94);roundedButton(this,215,535,235,56,'INTENTAR OTRA VEZ',C.orange,0xa84c17,()=>this.scene.restart({level:this.level}),{depth:95,fontSize:15})}
  formatTime(v){const m=Math.floor(v/60),s=Math.max(0,v%60);return`${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`}
}

export class ShopScene extends Phaser.Scene{
  constructor(){super('Shop')}
  create(){
    this.save=loadSave();this.add.image(215,466,'menu-room').setDisplaySize(430,932).setDepth(0);this.add.rectangle(215,466,430,932,0x08273d,.84).setDepth(1);topBar(this,'TIENDA',`${this.save.coins}`);backButton(this,()=>this.scene.start('Menu'));icon(this,'coin',352,47,19,0xffbd17,24);
    this.add.text(28,102,'PISTAS Y AYUDAS',{fontFamily:'Arial Black',fontSize:'15px',color:'#bfe8ff'}).setDepth(3);this.add.text(28,127,'Úsalas cuando Kika se esconda demasiado bien.',{fontFamily:'Arial',fontSize:'12px',color:'#d7eaf5'}).setDepth(3);
    const products=[['search','Lupa','Muestra una zona aproximada.',100,'magnifier'],['bulb','Pista brillante','Señala la zona exacta por un instante.',150,'bulb'],['target','+15 segundos','Añade tiempo extra al nivel.',120,'clock']];
    products.forEach((p,i)=>{const y=235+i*172;softPanel(this,215,y,390,146,0x124c70,.97,3,22,0x55b8e9,.35);const ic=this.add.circle(74,y,48,0x2b97d4).setDepth(6);icon(this,p[0],74,y,38,0xffffff,7);this.add.text(133,y-34,p[1],{fontFamily:'Arial Black',fontSize:'18px',color:'#fff'}).setDepth(7);this.add.text(133,y-5,p[2],{fontFamily:'Arial',fontSize:'12px',color:'#cfe8f5',wordWrap:{width:185}}).setDepth(7);this.add.text(133,y+31,`Disponibles: ${this.save.inventory[p[4]]||0}`,{fontFamily:'Arial Black',fontSize:'11px',color:'#8ad7ff'}).setDepth(7);roundedButton(this,340,y+28,105,40,`${p[3]}`,C.green,C.greenDark,()=>this.buy(p[4],p[3]),{depth:7,fontSize:14,strokeThickness:2});icon(this,'coin',308,y+28,16,0xffd249,11)});
    softPanel(this,215,776,390,126,0x67417f,.96,3,22,0xd4a9eb,.35);this.add.text(35,733,'PAQUETE DETECTIVE',{fontFamily:'Arial Black',fontSize:'13px',color:'#fff'}).setDepth(7);this.add.text(35,766,'5 lupas + 5 pistas + 5 tiempos',{fontFamily:'Arial',fontSize:'13px',color:'#f3e5fa'}).setDepth(7);this.add.text(35,797,'Próximamente',{fontFamily:'Arial Black',fontSize:'11px',color:'#e3c2f2'}).setDepth(7);roundedButton(this,344,779,108,42,'VER MÁS',C.yellow,C.yellowDark,()=>{},{depth:7,fontSize:12});
    this.note=this.add.text(215,887,'',{fontFamily:'Arial Black',fontSize:'14px',color:'#ffd96b'}).setOrigin(.5).setDepth(10);
  }
  buy(key,cost){if(this.save.coins<cost){this.note.setText('Te faltan monedas');return}this.save.coins-=cost;this.save.inventory[key]=(this.save.inventory[key]||0)+1;saveGame(this.save);this.scene.restart()}
}

export class RecordsScene extends Phaser.Scene{
  constructor(){super('Records')}
  create(){
    this.save=loadSave();this.add.image(215,466,'menu-room').setDisplaySize(430,932).setDepth(0);this.add.rectangle(215,466,430,932,0x08273d,.85).setDepth(1);topBar(this,'RÉCORDS');backButton(this,()=>this.scene.start('Menu'));
    const completed=Object.values(this.save.stars).filter(v=>v>0).length,totalStars=Object.values(this.save.stars).reduce((a,b)=>a+b,0),max=Math.max(1,this.save.unlocked-1);
    softPanel(this,215,158,390,124,0x164f73,.97,3,24,0x55b8e9,.35);icon(this,'trophy',82,158,55,0xffd15b,7);this.add.text(137,126,'TU AVENTURA CON KIKA',{fontFamily:'Arial Black',fontSize:'14px',color:'#bfeaff'}).setDepth(7);this.add.text(137,157,totalStars>=60?'MAESTRO BUSCADOR':totalStars>=30?'DETECTIVE KIKA':'EXPLORADOR',{fontFamily:'Arial Black',fontSize:'21px',color:'#fff'}).setDepth(7);this.add.text(137,188,'Sigue encontrando a Kika para subir de rango',{fontFamily:'Arial',fontSize:'11px',color:'#c7e5f4'}).setDepth(7);
    const cards=[['trophy','Niveles completados',completed],['target','Estrellas conseguidas',totalStars],['coin','Monedas disponibles',this.save.coins],['paw','Nivel más alto',max]];
    cards.forEach((c,i)=>{const y=296+i*132;softPanel(this,215,y,370,102,0x12496b,.97,3,20,0x55b8e9,.28);this.add.circle(78,y,34,0x2b87bd).setDepth(6);icon(this,c[0],78,y,29,c[0]==='coin'?0xffd15b:0xffffff,7);this.add.text(130,y-20,c[1],{fontFamily:'Arial Black',fontSize:'13px',color:'#bfeaff'}).setDepth(7);this.add.text(130,y+6,String(c[2]),{fontFamily:'Arial Black',fontSize:'28px',color:'#fff'}).setDepth(7)});
    roundedButton(this,215,860,220,48,'VOLVER AL MENÚ',C.blue,C.blueDark,()=>this.scene.start('Menu'),{depth:6,fontSize:13});
  }
}
