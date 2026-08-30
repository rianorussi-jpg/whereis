const KEY='where-is-kika-save-v2';
const defaults={coins:1250,unlocked:1,stars:{},best:{},inventory:{magnifier:3,bulb:2,clock:1},scenario:'room'};
export function loadSave(){
  try{const raw=JSON.parse(localStorage.getItem(KEY)||'{}');return {...structuredClone(defaults),...raw,inventory:{...defaults.inventory,...(raw.inventory||{})},stars:{...(raw.stars||{})},best:{...(raw.best||{})}}}catch{return structuredClone(defaults)}
}
export function saveGame(data){localStorage.setItem(KEY,JSON.stringify(data));}
export function resetSave(){localStorage.removeItem(KEY);}
