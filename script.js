let qIndex = 0;

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

/* 页面 */
function go(n){
document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
document.getElementById('p'+n).classList.add('active');

if(n===2) loadQ();
if(n===3) initCake3D();
}

/* ===== 第二幕（核心规则） ===== */
function loadQ(){
let q = questions[qIndex];

document.getElementById("qtitle").innerText =
"第 " + (qIndex+1) + " 题：" + q.q;

let html="";

q.options.forEach(opt=>{
html += `
<label onclick="selectAnswer(this,'${opt}')">${opt}</label>
`;
});

document.getElementById("options").innerHTML = html;
}

/* ❗关键：必须答对才前进 */
function selectAnswer(el,value){

let correct = questions[qIndex].answer;

/* 错：不提示答案、不跳 */
if(value !== correct){
el.style.background="red";
setTimeout(()=>{ el.style.background=""; },400);
return;
}

/* 对：直接下一题 */
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

/* ===== 第三幕：WebGL 3D蛋糕 ===== */
function initCake3D(){

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,1,0.1,1000);

const renderer = new THREE.WebGLRenderer({alpha:true});
renderer.setSize(300,300);
document.getElementById("cake3d").appendChild(renderer.domElement);

/* 蛋糕 */
const geometry = new THREE.CylinderGeometry(1,1,2,32);
const material = new THREE.MeshBasicMaterial({color:0xffb6c1});
const cake = new THREE.Mesh(geometry,material);
scene.add(cake);

camera.position.z = 5;

function animate(){
requestAnimationFrame(animate);
cake.rotation.y += 0.01;
cake.rotation.x += 0.005;
renderer.render(scene,camera);
}
animate();
}

/* ===== 信封 ===== */
function openEnvelope(){

let env=document.getElementById("env");
env.classList.add("open");

/* 纸张弹出 */
let paper=document.getElementById("paper");
paper.classList.add("show");
}
