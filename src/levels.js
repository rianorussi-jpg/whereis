// Illustrated-level metadata. Coordinates are normalized to the artwork itself,
// so the same level works on phones with different aspect ratios.
const variants = [
  { key:'sala-01', image:'/assets/levels/sala-01.webp', x:.503, y:.522, rx:.115, ry:.085 },
  { key:'sala-02', image:'/assets/levels/sala-02.webp', x:.497, y:.522, rx:.115, ry:.085 },
  { key:'sala-03', image:'/assets/levels/sala-03.webp', x:.515, y:.524, rx:.105, ry:.080 },
  { key:'sala-04', image:'/assets/levels/sala-04.webp', x:.574, y:.541, rx:.100, ry:.077 },
  { key:'sala-05', image:'/assets/levels/sala-05.webp', x:.456, y:.507, rx:.095, ry:.073 },
  { key:'sala-06', image:'/assets/levels/sala-06.webp', x:.544, y:.507, rx:.090, ry:.070 },
];

export function illustratedLevels(count=30){
  return Array.from({length:count},(_,i)=>{
    const n=i+1, v=variants[i%variants.length];
    const cycle=Math.floor(i/variants.length);
    const shrink=Math.min(.038,cycle*.009);
    return {
      id:n,
      title:`Nivel ${n}`,
      scenario:'Sala',
      key:v.key,
      image:v.image,
      target:{x:v.x,y:v.y,rx:Math.max(.062,v.rx-shrink),ry:Math.max(.052,v.ry-shrink)},
      time:Math.max(35,100-Math.floor(i*1.45)),
      reward:25,
    };
  });
}

export const LEVELS=illustratedLevels(30);
export function getLevel(n){return LEVELS[Math.max(0,Math.min(LEVELS.length-1,(n||1)-1))]}
