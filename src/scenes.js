import Phaser from 'phaser';
import {C,roundedButton,topBar,backButton,coinBadge,drawLogo,softPanel,icon,bottomNavItem,framedArt,panel,sectionTitle} from './ui.js';
import {loadSave,saveGame} from './storage.js';
import {LEVELS,getLevel} from './levels.js';

function vignette(scene,top=0,bottom=932,depth=2,alpha=.65){const g=scene.add.graphics().setDepth(depth);g.fillGradientStyle(0x000000,0x000000,0x000000,0x000000,.02,.02,alpha,alpha);g.fillRect(0,top,430,bottom-top);return g;}
function starsText(scene,x,y,stars,size=18,depth=20){return scene.add.text(x,y,'★'.repeat(stars)+'☆'.repeat(3-stars),{fontFamily:'Arial Black',fontSize:`${size}px`,color:'#ffc32e',stroke:'#6a3a09',strokeThickness:1}).setOrigin(.5).setDepth(depth);}

export class BootScene extends Phaser.Scene{
  constructor(){super('Boot')}
  preload(){
    this.load.image('menu-room','/assets/levels/menu-premium.webp');
    this.load.image('kika-portrait','/assets/kika-portrait.webp');
    LEVELS.slice(0,6).forEach(l=>{if(!this.textures.exists(l.key))this.load.image(l.key,l.image)});
  }
  create(){this.scene.start('Menu')}
}

export class MenuScene extends Phaser.Scene{
  constructor(){super('Menu')}
  create(){
    this.save=loadSave();
    this.add.image(215,466,'menu-room').setDisplaySize(430,932).setDepth(0);
    this.add.rectangle(215,466,430,932,0x25160d,.10).setDepth(1);
    const topFade=this.add.graphics().setDepth(2);topFade.fillGradientStyle(0x1b110b,0x1b110b,0x1b110b,0x1b110b,.72,.72,0,0);topFade.fillRect(0,0,430,300);
    vignette(this,500,932,3,.86);
    coinBadge(this,360,45,this.save.coins,12,true);
    drawLogo(this,215,126,.98,13);
    this.add.text(215,218,'BUSCA • DESCUBRE • ENCUENTRA',{fontFamily:'Arial Black',fontSize:'11px',color:'#ffe0a5',letterSpacing:1}).setOrigin(.5).setDepth(16);

    // No floating dog sticker: the dog remains naturally integrated in the illustrated room.
    panel(this,215,638,386,248,{fill:0x24170f,alpha:.84,depth:10,r:30,stroke:0xffd494,strokeAlpha:.18,shadow:.35});
    this.add.text(215,539,'¿LISTO PARA ENCONTRARLA?',{fontFamily:'Arial Black',fontSize:'16px',color:'#fff4df'}).setOrigin(.5).setDepth(14);
    this.add.text(215,568,'Cada habitación está llena de detalles y trampas visuales.',{fontFamily:'Arial',fontSize:'12px',color:'#e9cfac',align:'center',wordWrap:{width:330}}).setOrigin(.5).setDepth(14);
    roundedButton(this,215,625,310,62,'JUGAR',C.gold,C.gold2,()=>this.scene.start('Game',{level:Math.min(this.save.unlocked,30)}),{depth:14,fontSize:25});icon(this,'play',325,625,17,0xffffff,18);
    roundedButton(this,215,695,310,48,'ELEGIR NIVEL',C.blue,C.blue2,()=>this.scene.start('Levels'),{depth:14,fontSize:14,strokeThickness:1});

    const completed=Object.values(this.save.stars).filter(v=>v>0).length,totalStars=Object.values(this.save.stars).reduce((a,b)=>a+b,0),progress=Math.min(1,(this.save.unlocked-1)/30);
    panel(this,215,778,386,82,{fill:0x4e321f,alpha:.90,depth:10,r:22,stroke:0xffd697,strokeAlpha:.18});
    this.add.text(38,753,'PROGRESO',{fontFamily:'Arial Black',fontSize:'10px',color:'#e9bd7f'}).setDepth(14);this.add.text(392,751,`${totalStars} ★`,{fontFamily:'Arial Black',fontSize:'13px',color:'#ffd24d'}).setOrigin(1,0).setDepth(14);
    const pg=this.add.graphics().setDepth(14);pg.fillStyle(0x160e09,.70);pg.fillRoundedRect(38,778,354,10,5);pg.fillStyle(C.green,1);pg.fillRoundedRect(38,778,354*progress,10,5);this.add.text(38,796,`${completed}/30 niveles completados`,{fontFamily:'Arial',fontSize:'10px',color:'#f5e7d1'}).setDepth(14);

    bottomNavItem(this,63,873,'trophy','RÉCORDS',false,()=>this.scene.start('Records'));
    bottomNavItem(this,164,873,'paw','ESCENARIOS',false,()=>this.scene.start('Scenarios'));
    bottomNavItem(this,266,873,'shop','TIENDA',true,()=>this.scene.start('Shop'));
    bottomNavItem(this,367,873,'gear','AJUSTES',false,()=>{});
  }
}

export class ScenarioScene extends Phaser.Scene{
  constructor(){super('Scenarios')}
  create(){
    this.save=loadSave();this.add.image(215,466,'menu-room').setDisplaySize(430,932).setDepth(0);this.add.rectangle(215,466,430,932,0x1c130e,.62).setDepth(1);vignette(this,350,932,2,.78);
    topBar(this,'ESCENARIOS',`${this.save.coins}`);backButton(this,()=>this.scene.start('Menu'));icon(this,'coin',348,46,18,C.gold,24);
    sectionTitle(this,'ELIGE DÓNDE BUSCAR',24,105);this.add.text(24,128,'Cada mundo tendrá su propio estilo y dificultad.',{fontFamily:'Arial',fontSize:'12px',color:'#eed9bc'}).setDepth(5);
    panel(this,215,330,392,350,{fill:0x2e2118,alpha:.95,depth:3,r:28,stroke:0xffd69c,strokeAlpha:.22});framedArt(this,'sala-02',215,285,366,232,6,20);
    this.add.text(40,421,'SALA',{fontFamily:'Arial Black',fontSize:'28px',color:'#fff8eb'}).setDepth(10);this.add.text(40,454,'30 niveles • escenario disponible',{fontFamily:'Arial',fontSize:'12px',color:'#efcf9e'}).setDepth(10);roundedButton(this,336,441,116,44,'ENTRAR',C.green,C.green2,()=>this.scene.start('Levels'),{depth:10,fontSize:13,strokeThickness:1});
    sectionTitle(this,'PRÓXIMOS MUNDOS',24,530);
    const cards=[['PARQUE','Naturaleza',0x486d45],['PLAYA','Verano',0x2d6e8d],['COCINA','Caos gourmet',0x7f5738],['FIESTA','Luces y color',0x6d476d]];
    cards.forEach((d,i)=>{const x=111+(i%2)*207,y=634+Math.floor(i/2)*164;panel(this,x,y,188,142,{fill:d[2],alpha:.94,depth:4,r:22,stroke:0xffffff,strokeAlpha:.12});icon(this,'lock',x+67,y-49,18,0xffe7c2,8);this.add.text(x-70,y-38,d[0],{fontFamily:'Arial Black',fontSize:'15px',color:'#fff'}).setDepth(8);this.add.text(x-70,y-14,d[1],{fontFamily:'Arial',fontSize:'11px',color:'#f1dfca'}).setDepth(8);this.add.text(x-70,y+38,'PRÓXIMAMENTE',{fontFamily:'Arial Black',fontSize:'9px',color:'#ffd89d'}).setDepth(8);});
  }
}

export class LevelScene extends Phaser.Scene{
  constructor(){super('Levels')}
  create(){
    this.save=loadSave();this.add.image(215,466,'menu-room').setDisplaySize(430,932).setDepth(0);this.add.rectangle(215,466,430,932,0x2b1a10,.72).setDepth(1);vignette(this,220,932,2,.62);
    topBar(this,'NIVELES',`${this.save.coins}`);backButton(this,()=>this.scene.start('Menu'));icon(this,'coin',348,46,18,C.gold,24);
    panel(this,215,145,392,105,{fill:0x4b3020,alpha:.95,depth:3,r:24,stroke:0xffd496,strokeAlpha:.2});this.add.text(38,111,'SALA',{fontFamily:'Arial Black',fontSize:'25px',color:'#fff6e7'}).setDepth(6);this.add.text(38,145,'Encuentra a Kika antes de que termine el tiempo.',{fontFamily:'Arial',fontSize:'11px',color:'#ecd1aa'}).setDepth(6);
    const unlocked=Math.min(this.save.unlocked,30);this.add.text(389,112,`${unlocked}/30`,{fontFamily:'Arial Black',fontSize:'16px',color:'#ffd15c'}).setOrigin(1,0).setDepth(6);const p=this.add.graphics().setDepth(6);p.fillStyle(0x170e09,.6);p.fillRoundedRect(250,148,138,9,5);p.fillStyle(C.green);p.fillRoundedRect(250,148,138*(unlocked/30),9,5);
    const tabs=[['FÁCIL',C.green,C.green2],['MEDIO',C.blue,C.blue2],['DIFÍCIL',C.orange,0x9b4a16]];tabs.forEach((d,i)=>roundedButton(this,76+i*139,216,124,37,d[0],d[1],d[2],()=>{},{depth:4,fontSize:12,strokeThickness:1}));
    panel(this,215,544,400,594,{fill:0xf8e8cf,alpha:.97,depth:3,r:28,stroke:0x6f4528,strokeAlpha:.28,shadow:.30,shine:.03});
    for(let n=1;n<=30;n++){
      const col=(n-1)%5,row=Math.floor((n-1)/5),x=55+80*col,y=320+82*row,isOpen=n<=this.save.unlocked,stars=this.save.stars[n]||0;
      const gg=this.add.graphics().setDepth(6);gg.fillStyle(0x000000,.13);gg.fillRoundedRect(x-31,y-29+5,62,62,16);gg.fillStyle(isOpen?0xfffbf4:0xb9aa96,isOpen?1:.78);gg.fillRoundedRect(x-31,y-29,62,62,16);gg.lineStyle(2,isOpen?0xb97e42:0x887b6c,.65);gg.strokeRoundedRect(x-31,y-29,62,62,16);
      if(isOpen){this.add.text(x,y-7,String(n),{fontFamily:'Arial Black',fontSize:'20px',color:'#4b2f1e'}).setOrigin(.5).setDepth(8);starsText(this,x,y+18,stars,9,8);this.add.zone(x,y,62,62).setInteractive({useHandCursor:true}).setDepth(9).on('pointerup',()=>this.scene.start('Game',{level:n}));}else icon(this,'lock',x,y,17,0x6f665d,8);
    }
    roundedButton(this,215,866,260,49,`CONTINUAR • NIVEL ${Math.min(this.save.unlocked,30)}`,C.green,C.green2,()=>this.scene.start('Game',{level:Math.min(this.save.unlocked,30)}),{depth:7,fontSize:13,strokeThickness:1});
  }
}

export class GameScene extends Phaser.Scene{
  constructor(){super('Game')}
  init(data){this.level=data.level||1}
  create(){this.save=loadSave();this.found=false;this.levelData=getLevel(this.level);this.timeLeft=this.levelData.time;this.sceneTop=0;this.sceneBottom=932;this.sceneH=this.sceneBottom-this.sceneTop;const key=this.levelData.key;if(!this.textures.exists(key)){this.load.once(Phaser.Loader.Events.COMPLETE,()=>this.buildLevel(key));this.load.image(key,this.levelData.image);this.load.start()}else this.buildLevel(key);}
  buildLevel(key){
    this.cameras.main.setBackgroundColor('#1c120c');this.levelArt=this.add.image(215,this.sceneTop+this.sceneH/2,key).setDisplaySize(430,this.sceneH).setDepth(1);
    const frame=this.add.graphics().setDepth(3);
    this.drawHud();this.drawBottomBar();this.playZone=this.add.zone(215,this.sceneTop+this.sceneH/2,430,this.sceneH).setInteractive({useHandCursor:true}).setDepth(25).on('pointerup',p=>this.checkTap(p.x,p.y));
    this.countdown=this.time.addEvent({delay:1000,loop:true,callback:()=>{if(this.found)return;this.timeLeft--;this.timerText.setText(this.formatTime(this.timeLeft));if(this.timeLeft<=10)this.timerText.setColor('#ff9c80');if(this.timeLeft<=0)this.onLose();}});
  }
  drawHud(){
    const glass=(x,y,w,h,r=18)=>{
      const g=this.add.graphics().setDepth(40);
      g.fillStyle(0x1c120c,.78);g.fillRoundedRect(x-w/2,y-h/2,w,h,r);
      g.lineStyle(2,0xffe0ae,.40);g.strokeRoundedRect(x-w/2,y-h/2,w,h,r);
      g.fillStyle(0xffffff,.07);g.fillRoundedRect(x-w/2+4,y-h/2+4,w-8,Math.max(8,h*.22),Math.max(6,r-5));
      return g;
    };
    glass(39,48,52,52,19);
    const pause=this.add.zone(39,48,52,52).setInteractive({useHandCursor:true}).setDepth(45);
    icon(this,'pause',39,48,18,0xfff3dc,46);pause.on('pointerup',()=>this.scene.start('Menu'));
    glass(215,48,116,48,18);
    icon(this,'clock',180,48,15,0xffc94a,46);
    this.timerText=this.add.text(224,48,this.formatTime(this.timeLeft),{fontFamily:'Trebuchet MS',fontStyle:'bold',fontSize:'19px',color:'#fff8eb'}).setOrigin(.5).setDepth(46);
    glass(369,48,102,48,18);
    this.add.text(369,48,`NIVEL ${this.level}`,{fontFamily:'Trebuchet MS',fontStyle:'bold',fontSize:'13px',color:'#fff8eb'}).setOrigin(.5).setDepth(46);
    const label=this.add.text(215,91,'ENCUENTRA A KIKA',{fontFamily:'Trebuchet MS',fontStyle:'bold',fontSize:'12px',color:'#fff3cf',stroke:'#2a1609',strokeThickness:4}).setOrigin(.5).setDepth(46);
  }
  drawBottomBar(){
    const base=this.add.graphics().setDepth(50);
    base.fillGradientStyle(0x1c120c,0x1c120c,0x4a2a16,0x4a2a16,.86,.86,.94,.94);
    base.fillRoundedRect(18,817,394,96,30);
    base.lineStyle(2,0xffd28a,.26);base.strokeRoundedRect(18,817,394,96,30);
    const defs=[['search',105,'magnifier'],['bulb',215,'bulb'],['target',325,'clock']];
    defs.forEach(([type,x,key])=>{
      const amt=this.save.inventory[key]||0;
      this.add.circle(x,865,38,0x000000,.34).setDepth(51).setScale(1,1.08).y+=5;
      this.add.circle(x,865,36,0x1684bd).setStrokeStyle(3,0x92ddff,.72).setDepth(52);
      this.add.circle(x-8,855,21,0xffffff,.10).setDepth(53);
      icon(this,type,x,865,29,0xffffff,54);
      this.add.circle(x+27,837,12,0x5fbd35).setStrokeStyle(2,0xfff3d4,.9).setDepth(55);
      this.add.text(x+27,837,String(amt),{fontFamily:'Trebuchet MS',fontStyle:'bold',fontSize:'11px',color:'#fff'}).setOrigin(.5).setDepth(56);
      this.add.zone(x,865,76,76).setInteractive({useHandCursor:true}).setDepth(57).on('pointerup',()=>this.usePower(key));
    });
  }
  targetPixels(){const t=this.levelData.target;return{x:t.x*430,y:this.sceneTop+t.y*this.sceneH,rx:t.rx*430,ry:t.ry*this.sceneH}}
  checkTap(x,y){if(this.found)return;const t=this.targetPixels(),dx=(x-t.x)/t.rx,dy=(y-t.y)/t.ry;if(dx*dx+dy*dy<=1){this.onFound();return;}const ring=this.add.circle(x,y,13,0xffffff,.02).setStrokeStyle(2,0xffd7a0,.72).setDepth(32);this.tweens.add({targets:ring,scale:1.8,alpha:0,duration:330,onComplete:()=>ring.destroy()});}
  usePower(key){if(this.found||(this.save.inventory[key]||0)<=0)return;this.save.inventory[key]--;saveGame(this.save);const t=this.targetPixels();if(key==='magnifier'){const ring=this.add.circle(t.x,t.y,54,0xffdc55,.03).setStrokeStyle(6,0xffd737,1).setDepth(70);this.tweens.add({targets:ring,scale:1.65,alpha:0,duration:1650,onComplete:()=>ring.destroy()});}if(key==='bulb'){const shade=this.add.rectangle(215,this.sceneTop+this.sceneH/2,430,this.sceneH,0x000000,.55).setDepth(68);const ring=this.add.circle(t.x,t.y,68,0xffffff,.02).setStrokeStyle(6,0xffdf59,1).setDepth(70);this.time.delayedCall(1450,()=>{shade.destroy();ring.destroy();});}if(key==='clock'){this.timeLeft+=15;this.timerText.setText(this.formatTime(this.timeLeft));}}
  onFound(){if(this.found)return;this.found=true;if(this.countdown)this.countdown.remove();const ratio=this.timeLeft/this.levelData.time,stars=ratio>.62?3:ratio>.30?2:1;this.save.stars[this.level]=Math.max(this.save.stars[this.level]||0,stars);this.save.unlocked=Math.max(this.save.unlocked,Math.min(30,this.level+1));this.save.coins+=stars*this.levelData.reward;saveGame(this.save);const t=this.targetPixels();const ring=this.add.circle(t.x,t.y,38,0xffc928,.08).setStrokeStyle(7,0xffd344,1).setDepth(75);this.tweens.add({targets:ring,scale:2.1,duration:520,ease:'Back.Out'});this.time.delayedCall(420,()=>this.showWin(stars));}
  showWin(stars){
    this.add.rectangle(215,466,430,932,0x140c08,.78).setDepth(90);panel(this,215,480,370,510,{fill:0x372318,alpha:.985,depth:91,r:32,stroke:0xffc96a,strokeAlpha:.42,shadow:.45});
    this.add.text(215,276,'¡ENCONTRASTE A KIKA!',{fontFamily:'Arial Black',fontSize:'25px',color:'#ffd347',stroke:'#63310b',strokeThickness:4}).setOrigin(.5).setDepth(95);
    // Portrait is cropped from the illustrated level art, not a sticker asset.
    panel(this,215,420,190,190,{fill:0x6d431f,alpha:1,depth:93,r:95,stroke:0xffdc7e,strokeAlpha:.8,shadow:.35,shine:.03});const img=this.add.image(215,420,'kika-portrait').setDisplaySize(174,174).setDepth(96);const m=this.make.graphics({x:0,y:0,add:false});m.fillStyle(0xffffff);m.fillCircle(215,420,87);img.setMask(m.createGeometryMask());
    starsText(this,215,542,stars,49,96);this.add.text(215,590,`+${stars*this.levelData.reward} monedas`,{fontFamily:'Arial Black',fontSize:'15px',color:'#fff0ca'}).setOrigin(.5).setDepth(96);icon(this,'coin',141,590,19,C.gold,96);
    roundedButton(this,215,661,260,58,this.level<30?'SIGUIENTE NIVEL':'VOLVER A NIVELES',C.green,C.green2,()=>this.scene.start(this.level<30?'Game':'Levels',this.level<30?{level:this.level+1}:undefined),{depth:96,fontSize:16,strokeThickness:1});roundedButton(this,215,729,200,43,'NIVELES',C.blue,C.blue2,()=>this.scene.start('Levels'),{depth:96,fontSize:12,strokeThickness:1});
  }
  onLose(){if(this.found)return;this.found=true;if(this.countdown)this.countdown.remove();this.add.rectangle(215,466,430,932,0x140c08,.80).setDepth(90);panel(this,215,474,350,300,{fill:0x372318,alpha:.985,depth:91,r:28,stroke:0xffc96a,strokeAlpha:.35});this.add.text(215,393,'SE ACABÓ EL TIEMPO',{fontFamily:'Arial Black',fontSize:'23px',color:'#ffd25e'}).setOrigin(.5).setDepth(94);this.add.text(215,451,'Kika estaba muy bien escondida.',{fontFamily:'Arial',fontSize:'14px',color:'#fff1dc'}).setOrigin(.5).setDepth(94);roundedButton(this,215,535,235,55,'INTENTAR OTRA VEZ',C.orange,0x9f4717,()=>this.scene.restart({level:this.level}),{depth:95,fontSize:14,strokeThickness:1});}
  formatTime(v){const m=Math.floor(v/60),s=Math.max(0,v%60);return`${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;}
}

export class ShopScene extends Phaser.Scene{
  constructor(){super('Shop')}
  create(){this.save=loadSave();this.add.image(215,466,'menu-room').setDisplaySize(430,932).setDepth(0);this.add.rectangle(215,466,430,932,0x0c2534,.82).setDepth(1);topBar(this,'TIENDA',`${this.save.coins}`);backButton(this,()=>this.scene.start('Menu'));icon(this,'coin',348,46,18,C.gold,24);sectionTitle(this,'PISTAS Y AYUDAS',24,105,'#ccecff');this.add.text(24,129,'Úsalas solo cuando Kika se esconda demasiado bien.',{fontFamily:'Arial',fontSize:'12px',color:'#d7e9f2'}).setDepth(5);
    const products=[['search','Lupa','Muestra una zona aproximada.',100,'magnifier'],['bulb','Pista brillante','Marca la zona durante un instante.',150,'bulb'],['clock','+15 segundos','Añade tiempo al cronómetro.',120,'clock']];products.forEach((p,i)=>{const y=235+i*170;panel(this,215,y,392,144,{fill:0x123f59,alpha:.96,depth:3,r:24,stroke:0x7bc9ea,strokeAlpha:.25});this.add.circle(72,y,45,0x1f80b1).setDepth(6);icon(this,p[0],72,y,35,0xffffff,7);this.add.text(129,y-34,p[1],{fontFamily:'Arial Black',fontSize:'17px',color:'#fff'}).setDepth(7);this.add.text(129,y-6,p[2],{fontFamily:'Arial',fontSize:'11px',color:'#cce4ef',wordWrap:{width:180}}).setDepth(7);this.add.text(129,y+30,`Tienes: ${this.save.inventory[p[4]]||0}`,{fontFamily:'Arial Black',fontSize:'10px',color:'#8fd8f7'}).setDepth(7);roundedButton(this,342,y+25,104,40,`${p[3]}`,C.green,C.green2,()=>this.buy(p[4],p[3]),{depth:7,fontSize:13,strokeThickness:1});icon(this,'coin',309,y+25,15,C.gold,11);});this.note=this.add.text(215,875,'',{fontFamily:'Arial Black',fontSize:'13px',color:'#ffd96b'}).setOrigin(.5).setDepth(10);}
  buy(key,cost){if(this.save.coins<cost){this.note.setText('Te faltan monedas');return;}this.save.coins-=cost;this.save.inventory[key]=(this.save.inventory[key]||0)+1;saveGame(this.save);this.scene.restart();}
}

export class RecordsScene extends Phaser.Scene{
  constructor(){super('Records')}
  create(){this.save=loadSave();this.add.image(215,466,'menu-room').setDisplaySize(430,932).setDepth(0);this.add.rectangle(215,466,430,932,0x0b2432,.84).setDepth(1);topBar(this,'RÉCORDS');backButton(this,()=>this.scene.start('Menu'));const completed=Object.values(this.save.stars).filter(v=>v>0).length,totalStars=Object.values(this.save.stars).reduce((a,b)=>a+b,0),max=Math.max(1,this.save.unlocked-1);panel(this,215,160,390,128,{fill:0x123e57,alpha:.97,depth:3,r:25,stroke:0x7bc9ea,strokeAlpha:.26});icon(this,'trophy',75,160,49,C.gold,7);this.add.text(128,126,'TU AVENTURA CON KIKA',{fontFamily:'Arial Black',fontSize:'12px',color:'#bfeaff'}).setDepth(7);this.add.text(128,156,totalStars>=60?'MAESTRO BUSCADOR':totalStars>=30?'DETECTIVE KIKA':'EXPLORADOR',{fontFamily:'Arial Black',fontSize:'20px',color:'#fff'}).setDepth(7);this.add.text(128,186,'Sigue encontrándola para subir de rango',{fontFamily:'Arial',fontSize:'11px',color:'#c7e5f4'}).setDepth(7);const cards=[['trophy','Niveles completados',completed],['star','Estrellas conseguidas',totalStars],['coin','Monedas disponibles',this.save.coins],['paw','Nivel más alto',max]];cards.forEach((c,i)=>{const y=300+i*130;panel(this,215,y,370,100,{fill:0x123f59,alpha:.96,depth:3,r:22,stroke:0x6fc1e5,strokeAlpha:.22});this.add.circle(76,y,32,0x1f7ba7).setDepth(6);icon(this,c[0],76,y,27,c[0]==='coin'||c[0]==='star'?C.gold:0xffffff,7);this.add.text(128,y-19,c[1],{fontFamily:'Arial Black',fontSize:'12px',color:'#bfeaff'}).setDepth(7);this.add.text(128,y+5,String(c[2]),{fontFamily:'Arial Black',fontSize:'27px',color:'#fff'}).setDepth(7);});roundedButton(this,215,860,220,48,'VOLVER AL MENÚ',C.blue,C.blue2,()=>this.scene.start('Menu'),{depth:6,fontSize:13,strokeThickness:1});}
}
