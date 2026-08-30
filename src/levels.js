// Premium illustrated-level metadata.
// Level 1 uses a full editorial illustration from the approved visual direction.
const variants = [
  { key:'sala-premium-01', image:'/assets/levels/sala-premium-01.webp', x:.505, y:.405, rx:.105, ry:.075 },
  { key:'sala-02', image:'/assets/levels/sala-02.webp', x:.497, y:.522, rx:.105, ry:.078 },
  { key:'sala-03', image:'/assets/levels/sala-03.webp', x:.515, y:.524, rx:.098, ry:.074 },
  { key:'sala-04', image:'/assets/levels/sala-04.webp', x:.574, y:.541, rx:.094, ry:.071 },
  { key:'sala-05', image:'/assets/levels/sala-05.webp', x:.456, y:.507, rx:.090, ry:.068 },
  { key:'sala-06', image:'/assets/levels/sala-06.webp', x:.544, y:.507, rx:.086, ry:.066 },
];

export function illustratedLevels(count=30){
  return Array.from({length:count},(_,i)=>{
    const n=i+1, v=variants[i%variants.length];
    const cycle=Math.floor(i/variants.length);
    const shrink=Math.min(.032,cycle*.007);
    return {
      id:n,title:`Nivel ${n}`,scenario:'Sala',key:v.key,image:v.image,
      target:{x:v.x,y:v.y,rx:Math.max(.058,v.rx-shrink),ry:Math.max(.048,v.ry-shrink)},
      time:Math.max(35,100-Math.floor(i*1.45)),reward:25,
    };
  });
}
export const LEVELS=illustratedLevels(30);
export function getLevel(n){return LEVELS[Math.max(0,Math.min(LEVELS.length-1,(n||1)-1))]}
