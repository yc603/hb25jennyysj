let qIndex = 0;

/* ===== 题库 ===== */
const questions = [
{q:"1+1=?", options:["1","2","3","4"], answer:"2"},
{q:"太阳从哪边升起？", options:["西","北","东","南"], answer:"东"},
{q:"水的化学式？", options:["CO2","O2","H2O","NaCl"], answer:"H2O"},
{q:"一年有多少个月？", options:["10","11","12","13"], answer:"12"},
{q:"5+3=?", options:["5","8","9","6"], answer:"8"},
{q:"地球是？", options:["方","圆","三角","不规则"], answer:"圆"},
{q:"猫英文？", options:["dog","cat","cow","pig"], answer:"cat"},
{q:"10-7=?", options:["2","3","4","5"], answer:"3"},
{q:"红色英文？", options:["blue","green","red","yellow"], answer:"red"},
{q:"生日快乐英文？", options:["Happy Day","Happy Birth","Happy Birthday","Birth Happy"], answer:"Happy Birthday"}
];

/* ===== 页面切换 ===== */
function go(n){
document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
document.getElementById('p'+n).classList.add('active');

if(n===2) loadQ();
if(n===3) initCake3D();
if(n===5) startPhotos();
}

/* ===== 第二幕 ===== */
function loadQ(){
let q = questions[qIndex];

document.getElementById("qtitle").innerText =
"第 " + (qIndex+1) + " 题：" + q.q;

let html="";

q.options.forEach(opt=>{
html += `<label onclick="check(this,'${opt}')">${opt}</label>`;
});

document.getElementById("options").innerHTML = html;
}

function check(el,val){
let correct = questions[qIndex].answer;

if(val !== correct){
el.style.background="red";
setTimeout(()=>el.style.background="",400);
return;
}

el.style.background="green";

setTimeout(()=>{
qIndex++;
if(qIndex>=questions.length){
go(3);
}else{
loadQ();
}
},500);
}

/* ===== 3D蛋糕 ===== */
let flame;

function initCake3D(){

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,1,0.1,1000);
const renderer = new THREE.WebGLRenderer({alpha:true});
renderer.setSize(300,300);

document.getElementById("cake3d").innerHTML="";
document.getElementById("cake3d").appendChild(renderer.domElement);

/* 蛋糕 */
const cake = new THREE.Mesh(
new THREE.CylinderGeometry(1.2,1.2,2,32),
new THREE.MeshBasicMaterial({color:0xffc0cb})
);
scene.add(cake);

/* 蜡烛 */
const candle = new THREE.Mesh(
new THREE.CylinderGeometry(0.05,0.05,1,16),
new THREE.MeshBasicMaterial({color:0xffffff})
);
candle.position.y = 1.5;
scene.add(candle);

/* 火焰 */
flame = new THREE.Mesh(
new THREE.SphereGeometry(0.1,16,16),
new THREE.MeshBasicMaterial({color:0xff6600})
);
flame.position.y = 2.1;
scene.add(flame);

camera.position.z = 5;

function animate(){
requestAnimationFrame(animate);
cake.rotation.y += 0.01;
renderer.render(scene,camera);
}
animate();
}

/* 吹蜡烛 */
function blowCandle(){
flame.material.opacity = 0;
flame.visible = false;

setTimeout(()=>go(4),1000);
}

/* ===== 信封 ===== */
function openEnvelope(){
document.getElementById("env").classList.add("open");

typeLetter();
}

/* 打字信 */
function typeLetter(){
let text="生日快乐 🎉\n愿你被世界温柔以待\n愿你所有愿望实现";
let el=document.getElementById("letterText");

el.innerHTML="";
let i=0;

let t=setInterval(()=>{
el.innerHTML += text[i]==="\n" ? "<br>" : text[i];
i++;
if(i>=text.length) clearInterval(t);
},60);
}

/* ===== 第五幕 ===== */
function startPhotos(){

for(let i=0;i<25;i++){
let d=document.createElement("div");
d.className="photo";
d.style.left=Math.random()*100+"vw";
d.style.animationDuration=(3+Math.random()*3)+"s";
document.getElementById("photos").appendChild(d);
}

/* 打字 */
let text="生日快乐";
let el=document.getElementById("typeText");

let i=0;
el.innerHTML="";

let t=setInterval(()=>{
el.innerHTML += text[i];
i++;
if(i>=text.length) clearInterval(t);
},200);
}
