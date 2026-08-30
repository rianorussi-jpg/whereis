const KEY='where-is-kika-save-v1';
const defaults={coins:1250,unlocked:1,stars:{},best:{},inventory:{magnifier:3,bulb:2,clock:1}};
export function loadSave(){
  try{return {...defaults,...JSON.parse(localStorage.getItem(KEY)||'{}')};}catch{return structuredClone(defaults)}
}
export function saveGame(data){localStorage.setItem(KEY,JSON.stringify(data));}
export function resetSave(){localStorage.removeItem(KEY);}
