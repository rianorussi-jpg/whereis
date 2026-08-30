import Phaser from 'phaser';

const P = {
  ink:0x51351f, cream:0xf6e4bd, orange:0xe97a32, yellow:0xf5bd35,
  blue:0x3e89a8, teal:0x4da6a1, green:0x6b9d50, red:0xc9533e,
  brown:0x8a5b35, dark:0x39474b, pink:0xd98779, tan:0xcaa46e,
  navy:0x315b73, white:0xfff8e9
};

function base(scene,x,y,scale=1,angle=0,depth=4){
  const c=scene.add.container(x,y).setScale(scale).setAngle(angle).setDepth(depth);
  const g=scene.add.graphics(); c.add(g); return {c,g};
}
function shadow(g,x,y,w,h,r=5){g.fillStyle(0x000000,.17);g.fillRoundedRect(x+2,y+4,w,h,r)}
function outline(g,color=P.ink,width=2){g.lineStyle(width,color,1)}

function ball(scene,x,y,s,a,d){const {c,g}=base(scene,x,y,s,a,d);shadow(g,-17,-17,34,34,17);g.fillStyle(P.yellow);g.fillCircle(0,0,17);outline(g);g.strokeCircle(0,0,17);g.beginPath();g.arc(0,0,13,-1.1,1.1);g.strokePath();g.beginPath();g.arc(0,0,13,2.05,4.25);g.strokePath();return c}
function box(scene,x,y,s,a,d){const {c,g}=base(scene,x,y,s,a,d);shadow(g,-19,-14,38,29,4);g.fillStyle(P.tan);g.fillRoundedRect(-19,-14,38,29,4);outline(g);g.strokeRoundedRect(-19,-14,38,29,4);g.lineBetween(-19,-5,19,-5);g.fillStyle(P.cream);g.fillRect(-5,-14,10,9);return c}
function plant(scene,x,y,s,a,d){const {c,g}=base(scene,x,y,s,a,d);shadow(g,-14,7,28,22,4);g.fillStyle(P.orange);g.fillRoundedRect(-14,5,28,25,5);outline(g);g.strokeRoundedRect(-14,5,28,25,5);g.fillStyle(P.green);[[0,-14,10,22],[-10,-7,10,21],[10,-8,10,22],[2,-26,9,20]].forEach(v=>g.fillEllipse(...v));outline(g,P.ink,1.7);g.lineBetween(0,5,0,-22);return c}
function backpack(scene,x,y,s,a,d){const {c,g}=base(scene,x,y,s,a,d);shadow(g,-19,-19,38,45,9);g.fillStyle(P.blue);g.fillRoundedRect(-19,-18,38,45,10);outline(g);g.strokeRoundedRect(-19,-18,38,45,10);g.fillStyle(P.navy);g.fillRoundedRect(-13,4,26,13,5);g.strokeRoundedRect(-13,4,26,13,5);g.beginPath();g.arc(0,-19,9,Math.PI,0);g.strokePath();return c}
function camera(scene,x,y,s,a,d){const {c,g}=base(scene,x,y,s,a,d);shadow(g,-20,-12,40,28,5);g.fillStyle(P.dark);g.fillRoundedRect(-20,-12,40,28,5);outline(g);g.strokeRoundedRect(-20,-12,40,28,5);g.fillStyle(P.blue);g.fillRect(-9,-18,18,8);g.fillStyle(0x9fd1d8);g.fillCircle(2,2,10);outline(g);g.strokeCircle(2,2,10);g.fillStyle(P.dark);g.fillCircle(2,2,5);return c}
function mug(scene,x,y,s,a,d){const {c,g}=base(scene,x,y,s,a,d);shadow(g,-13,-15,27,31,6);g.fillStyle(P.cream);g.fillRoundedRect(-13,-15,27,31,6);outline(g);g.strokeRoundedRect(-13,-15,27,31,6);g.beginPath();g.arc(15,0,9,-1.25,1.25);g.strokePath();g.fillStyle(P.brown);g.fillEllipse(0,-11,18,5);return c}
function books(scene,x,y,s,a,d){const {c,g}=base(scene,x,y,s,a,d);shadow(g,-22,8,44,12,3);[[P.red,-17,8,35,10],[P.blue,-21,-2,42,10],[P.yellow,-16,-12,34,10]].forEach(v=>{g.fillStyle(v[0]);g.fillRoundedRect(v[1],v[2],v[3],v[4],3);outline(g);g.strokeRoundedRect(v[1],v[2],v[3],v[4],3)});return c}
function lamp(scene,x,y,s,a,d){const {c,g}=base(scene,x,y,s,a,d);shadow(g,-18,18,36,8,4);g.fillStyle(P.brown);g.fillRect(-3,-4,6,26);g.fillRoundedRect(-18,20,36,8,4);outline(g);g.strokeRoundedRect(-18,20,36,8,4);g.fillStyle(P.yellow);g.fillTriangle(-18,-4,18,-4,10,-26);g.fillTriangle(-18,-4,-10,-26,10,-26);outline(g);g.strokeTriangle(-18,-4,18,-4,10,-26);g.strokeTriangle(-18,-4,-10,-26,10,-26);return c}
function shoe(scene,x,y,s,a,d){const {c,g}=base(scene,x,y,s,a,d);shadow(g,-22,-8,44,20,7);g.fillStyle(P.red);g.beginPath();g.moveTo(-20,-8);g.lineTo(-4,-7);g.lineTo(7,2);g.lineTo(20,4);g.lineTo(22,10);g.lineTo(-19,10);g.closePath();g.fillPath();outline(g);g.strokePath();g.lineBetween(-7,-4,3,4);g.lineBetween(-2,-5,8,3);return c}
function toycar(scene,x,y,s,a,d){const {c,g}=base(scene,x,y,s,a,d);shadow(g,-23,-7,46,18,5);g.fillStyle(P.orange);g.fillRoundedRect(-22,-7,44,17,5);g.fillStyle(P.yellow);g.fillRoundedRect(-8,-17,22,12,4);outline(g);g.strokeRoundedRect(-22,-7,44,17,5);g.fillStyle(P.dark);g.fillCircle(-13,11,6);g.fillCircle(13,11,6);g.fillStyle(P.cream);g.fillCircle(-13,11,2);g.fillCircle(13,11,2);return c}
function pillow(scene,x,y,s,a,d){const {c,g}=base(scene,x,y,s,a,d);shadow(g,-20,-17,40,34,9);g.fillStyle(P.pink);g.fillRoundedRect(-20,-17,40,34,9);outline(g);g.strokeRoundedRect(-20,-17,40,34,9);g.fillStyle(P.cream,.8);g.fillCircle(0,0,5);return c}
function basket(scene,x,y,s,a,d){const {c,g}=base(scene,x,y,s,a,d);shadow(g,-21,-11,42,28,5);g.fillStyle(P.tan);g.fillRoundedRect(-21,-11,42,28,5);outline(g);g.strokeRoundedRect(-21,-11,42,28,5);for(let i=-12;i<=12;i+=8)g.lineBetween(i,-10,i,16);g.beginPath();g.arc(0,-8,14,Math.PI,0);g.strokePath();return c}
function bottle(scene,x,y,s,a,d){const {c,g}=base(scene,x,y,s,a,d);shadow(g,-10,-21,20,43,6);g.fillStyle(P.teal);g.fillRoundedRect(-10,-15,20,37,6);g.fillStyle(P.dark);g.fillRoundedRect(-6,-23,12,10,3);outline(g);g.strokeRoundedRect(-10,-15,20,37,6);g.fillStyle(P.cream,.75);g.fillRoundedRect(-7,-1,14,10,2);return c}
function radio(scene,x,y,s,a,d){const {c,g}=base(scene,x,y,s,a,d);shadow(g,-22,-14,44,30,5);g.fillStyle(P.navy);g.fillRoundedRect(-22,-14,44,30,5);outline(g);g.strokeRoundedRect(-22,-14,44,30,5);g.fillStyle(P.dark);g.fillCircle(-10,1,9);g.fillCircle(12,1,9);g.fillStyle(P.cream);g.fillRoundedRect(-12,-10,24,5,2);return c}
function frame(scene,x,y,s,a,d){const {c,g}=base(scene,x,y,s,a,d);shadow(g,-19,-22,38,44,3);g.fillStyle(P.brown);g.fillRect(-19,-22,38,44);g.fillStyle(P.cream);g.fillRect(-14,-17,28,34);g.fillStyle(P.blue);g.fillRect(-11,-14,22,14);g.fillStyle(P.green);g.fillTriangle(-11,15,1,-4,11,15);outline(g);g.strokeRect(-19,-22,38,44);return c}
function stool(scene,x,y,s,a,d){const {c,g}=base(scene,x,y,s,a,d);shadow(g,-20,-10,40,14,6);g.fillStyle(P.orange);g.fillRoundedRect(-20,-11,40,14,6);outline(g);g.strokeRoundedRect(-20,-11,40,14,6);g.fillStyle(P.brown);g.fillRect(-14,3,5,27);g.fillRect(9,3,5,27);return c}
function plush(scene,x,y,s,a,d){const {c,g}=base(scene,x,y,s,a,d);g.fillStyle(0x000000,.14);g.fillEllipse(2,13,34,16);g.fillStyle(P.tan);g.fillCircle(-11,-13,8);g.fillCircle(11,-13,8);g.fillCircle(0,-4,17);g.fillEllipse(0,14,28,24);outline(g);g.strokeCircle(0,-4,17);g.fillStyle(P.dark);g.fillCircle(-6,-6,2);g.fillCircle(6,-6,2);g.fillCircle(0,0,3);return c}
function hat(scene,x,y,s,a,d){const {c,g}=base(scene,x,y,s,a,d);g.fillStyle(0x000000,.14);g.fillEllipse(2,10,45,10);g.fillStyle(P.red);g.fillEllipse(0,6,42,12);g.fillRoundedRect(-13,-15,26,22,8);outline(g);g.strokeEllipse(0,6,42,12);g.strokeRoundedRect(-13,-15,26,22,8);return c}
function headphones(scene,x,y,s,a,d){const {c,g}=base(scene,x,y,s,a,d);outline(g,P.dark,6);g.beginPath();g.arc(0,0,18,Math.PI,0);g.strokePath();g.fillStyle(P.blue);g.fillRoundedRect(-22,-2,9,22,5);g.fillRoundedRect(13,-2,9,22,5);outline(g);g.strokeRoundedRect(-22,-2,9,22,5);g.strokeRoundedRect(13,-2,9,22,5);return c}
function clock(scene,x,y,s,a,d){const {c,g}=base(scene,x,y,s,a,d);shadow(g,-17,-17,34,34,17);g.fillStyle(P.cream);g.fillCircle(0,0,17);outline(g);g.strokeCircle(0,0,17);g.lineBetween(0,0,0,-10);g.lineBetween(0,0,8,4);g.fillCircle(0,0,2);return c}

const makers=[ball,box,plant,backpack,camera,mug,books,lamp,shoe,toycar,pillow,basket,bottle,radio,frame,stool,plush,hat,headphones,clock];

export function drawDetailedRoom(scene){
  const g=scene.add.graphics().setDepth(0);
  g.fillGradientStyle(0xb9d9c8,0x9bc7bf,0xd8b687,0xc69d6b,1);g.fillRect(0,0,430,932);
  g.fillStyle(0xe8cfa6);g.fillRect(0,116,430,360);
  // wallpaper vertical panels
  g.lineStyle(2,0xd9bb91,.45);for(let x=24;x<430;x+=48)g.lineBetween(x,120,x,475);
  // windows / art
  g.fillStyle(0x765236);g.fillRoundedRect(28,145,106,96,7);g.fillStyle(0xaed8e4);g.fillRoundedRect(36,153,90,80,4);g.fillStyle(0x5e9a70);g.fillCircle(95,193,18);g.fillStyle(0xf0c769);g.fillCircle(62,176,11);
  g.fillStyle(0x765236);g.fillRoundedRect(298,142,92,70,7);g.fillStyle(0xe4a865);g.fillRoundedRect(306,150,76,54,4);
  // sofa back
  g.fillStyle(0x4c8790);g.fillRoundedRect(38,345,184,105,20);g.fillStyle(0x3e737c);g.fillRoundedRect(52,364,156,70,15);g.fillStyle(0xdda55c);g.fillRoundedRect(61,374,45,36,9);g.fillStyle(0xc85f43);g.fillRoundedRect(147,371,43,40,9);
  // cabinet
  g.fillStyle(0x8a5a37);g.fillRoundedRect(276,314,126,145,10);g.fillStyle(0xa66b40);g.fillRect(286,330,106,52);g.fillRect(286,390,106,55);g.fillStyle(0x4a3428);g.fillCircle(337,356,3);g.fillCircle(337,416,3);
  // floor
  g.fillStyle(0x9a683f);g.fillRect(0,476,430,294);for(let y=500;y<770;y+=36){g.lineStyle(2,0x7b4d30,.3);g.lineBetween(0,y,430,y)}
  // rug
  g.fillStyle(0xc16042);g.fillEllipse(218,649,312,142);g.fillStyle(0xe2a857);g.fillEllipse(218,649,256,108);g.fillStyle(0x467985);g.fillEllipse(218,649,196,76);
  // shelves
  g.fillStyle(0x765036);g.fillRect(238,226,150,12);g.fillRect(238,277,150,12);for(let x=245;x<380;x+=25){g.fillStyle([P.red,P.blue,P.yellow,P.green][Math.floor(x/25)%4]);g.fillRect(x,240,15,34)}
  return g;
}

export function populateClutter(scene,{count=80,minY=130,maxY=748,seed=1,behindDepthMax=10}={}){
  const rng=new Phaser.Math.RandomDataGenerator([String(seed)]);
  const created=[];
  for(let i=0;i<count;i++){
    const maker=makers[rng.integerInRange(0,makers.length-1)];
    const x=rng.integerInRange(15,415), y=rng.integerInRange(minY,maxY);
    const s=rng.realInRange(.72,1.35), a=rng.integerInRange(-24,24), d=rng.integerInRange(2,behindDepthMax);
    created.push(maker(scene,x,y,s,a,d));
  }
  return created;
}

export function addForegroundClutter(scene,{count=18,minY=145,maxY=740,seed=99,depthMin=12,depthMax=16}={}){
  const rng=new Phaser.Math.RandomDataGenerator([String(seed)]);
  for(let i=0;i<count;i++){
    const maker=makers[rng.integerInRange(0,makers.length-1)];
    maker(scene,rng.integerInRange(10,420),rng.integerInRange(minY,maxY),rng.realInRange(.8,1.32),rng.integerInRange(-24,24),rng.integerInRange(depthMin,depthMax));
  }
}
