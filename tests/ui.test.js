// Lightweight interaction smoke test. A fake DOM checks event wiring, not layout.
// Run with: gjs -m tests/ui.test.js
const elements=new Map();
function element(){return {innerHTML:'',textContent:'',value:'',checked:false,open:false,dataset:{},classList:{add(){},remove(){}},addEventListener(t,f){this[t]=f;},focus(){},setSelectionRange(){},reset(){get('#reason').value='';get('#verified').checked=false;},showModal(){this.open=true;},close(){this.open=false;}};}
function get(s){if(!elements.has(s))elements.set(s,element());return elements.get(s);}
globalThis.document={querySelector:get,querySelectorAll(s){const key=s.slice(1,-1),items=[];const regex=new RegExp(key+'="([^"]+)"','g');for(const match of get('#app').innerHTML.matchAll(regex)){const item=get(get('#app').innerHTML+'|'+key+'|'+items.length);item.dataset[key.slice(5)]=match[1];items.push(item);}return items;}};
function storage(){const map=new Map();return {getItem:k=>map.get(k)||null,setItem:(k,v)=>map.set(k,v),removeItem:k=>map.delete(k)};}
globalThis.localStorage=storage();globalThis.sessionStorage=storage();globalThis.setTimeout=()=>0;globalThis.confirm=()=>true;
let passed=0;function check(ok,name){if(!ok)throw Error(name);passed++;}const event={preventDefault(){}};
await import('../dist/app.js');
check(get('#app').innerHTML.includes('login-form'),'Tamil login renders');
get('#email').value='wrong@example.com';get('#password').value='wrong';get('#login-form').onsubmit(event);check(get('#login-error').textContent.length>0,'invalid credentials show error');
get('#email').value='officer@arasu.demo';get('#password').value='Demo@123';get('#login-form').onsubmit(event);
check(get('#app').innerHTML.includes('விண்ணப்பப் பட்டியல்'),'queue renders after login');check(get('#app').innerHTML.includes('AI ஆய்வு உதவி'),'assistance panel renders');
function click(attr,value){const b=document.querySelectorAll(`[data-${attr}]`).find(b=>b.dataset[attr]===value);check(!!b,`button ${attr}=${value} exists`);b.onclick();}
click('tab','documents');check(get('#app').innerHTML.includes('data-doc="address"'),'document tab lists evidence');click('doc','address');check(get('#document').open,'document preview opens');check(get('#document-content').innerHTML.includes('மாதிரி / SAMPLE'),'sample watermark');get('#close-document').onclick();
click('action','returned');check(get('#decision').open,'decision confirmation opens');get('#reason').value='வருமான ஆதாரம் இணைக்கப்படாததால் ஆவணத்தை கோருகிறேன்.';get('#verified').checked=true;get('#decision-form').onsubmit(event);
check(!get('#decision').open,'decision confirmation closes');const saved=JSON.parse(localStorage.getItem('arasu-demo-v1'));check(saved[0].status==='returned'&&saved[0].history.length===1,'decision and reason saved');
click('view','history');check(get('#app').innerHTML.includes('வருமான ஆதாரம் இணைக்கப்படாததால்'),'history displays reason');
click('view','guide');check(get('#app').innerHTML.includes('OCR'),'guide explains limitations');
get('#logout').onclick();check(get('#app').innerHTML.includes('login-form'),'logout returns to login');
console.log(`${passed} UI interaction assertions passed (mock DOM; not browser QA)`);
