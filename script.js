let qIndex = 0;

/* ===== 题库 ===== */
const questions = [
{q:"我们是怎么认识的？", options:["上班🐄","实习🐎","搭讪😏","打乒乓球🏓","上课📖"], answer:"搭讪😏"},
{q:"我们认识的日期？", options:["6月12日","6月3日","4月17日","6月14日","不记得🤯"], answer:"不记得🤯"},
{q:"我们在中国最常吃的食物是？", options:["螺狮粉","臭豆腐","姥姥下碗面","烧仙草","清汤粉"], answer:"螺狮粉"},
{q:"回来马来西亚后我们吃的第一家餐厅是？", options:["太二酸菜鱼","中国兰州拉面","Mr Wu","Uno Sushi","Shin Zushi"], answer:"Uno Sushi"},
{q:"你陪我打游戏玩到凌晨的地方是？", options:["福州","龙岩","厦门","赣州","泉州"], answer:"龙岩"},
{q:"我们一起去过哪里旅行？", options:["泉州","厦门","漳州","福州","赣州"], answer:"赣州"},
{q:"你放工后最想干嘛？", options:["直奔老巢","跟我一起玩","看Netflix","啥也不干","狠狠睡觉"], answer:"跟我一起玩"},
{q:"臭豆腐有几种口味？", options:["15","13","10","9","7"], answer:"15"},
{q:"白羊座跟哪个星座最合拍？", options:["白羊座♈","双子座♊","金牛座♉","水瓶座♒","射手座♐"], answer:"双子座♊"},
{q:"你最喜欢跟谁玩？", options:["晴"], answer:"晴"}
];

/* ===== 页面切换 ===== */
function go(n){

/* 先切页 */
document.querySelectorAll('.page').forEach(p=>{
p.classList.remove('active');
});

document.getElementById('p'+n).classList.add('active');

/* 再播放音乐（失败也不中断） */
if(n === 2){
let music = document.getElementById("bgm");

if(music){
music.play().catch(err=>{
console.log("音乐播放失败，但不影响跳转");
});
}
}

/* 各页面功能 */
if(n === 2){
loadQ();
}

if(n === 3){
initCake3D();
}

if(n === 5){
startPhotos();
}
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
const renderer = new THREE.WebGLRenderer({alpha:true, antialias:true});
renderer.setSize(300,300);

document.getElementById("cake3d").innerHTML="";
document.getElementById("cake3d").appendChild(renderer.domElement);

/* 光线 */
const light = new THREE.PointLight(0xffffff,1.2);
light.position.set(3,5,5);
scene.add(light);

const ambient = new THREE.AmbientLight(0xffffff,0.8);
scene.add(ambient);

/* ===== 蛋糕底层（粉色） ===== */
const layer1 = new THREE.Mesh(
new THREE.CylinderGeometry(1.4,1.4,0.8,32),
new THREE.MeshPhongMaterial({color:0xff8fb1})
);
layer1.position.y = -0.8;
scene.add(layer1);

/* ===== 中层（黄色） ===== */
const layer2 = new THREE.Mesh(
new THREE.CylinderGeometry(1.1,1.1,0.7,32),
new THREE.MeshPhongMaterial({color:0xffe066})
);
layer2.position.y = 0;
scene.add(layer2);

/* ===== 顶层（蓝色） ===== */
const layer3 = new THREE.Mesh(
new THREE.CylinderGeometry(0.8,0.8,0.6,32),
new THREE.MeshPhongMaterial({color:0x7ed6ff})
);
layer3.position.y = 0.75;
scene.add(layer3);

/* ===== 彩色奶油球装饰 ===== */
const creamColors = [
0xff4d6d, // 红
0xffd166, // 黄
0x06d6a0, // 绿
0x118ab2, // 蓝
0xffffff  // 白
];

for(let i=0;i<10;i++){

const ball = new THREE.Mesh(
new THREE.SphereGeometry(0.08,16,16),
new THREE.MeshPhongMaterial({
color: creamColors[i % creamColors.length]
})
);

let angle = (i / 10) * Math.PI * 2;
ball.position.x = Math.cos(angle) * 0.7;
ball.position.z = Math.sin(angle) * 0.7;
ball.position.y = 1.1;

scene.add(ball);
}

/* ===== 蜡烛 ===== */
const candle = new THREE.Mesh(
new THREE.CylinderGeometry(0.06,0.06,0.6,16),
new THREE.MeshPhongMaterial({color:0xffffff})
);
candle.position.y = 1.55;
scene.add(candle);

/* ===== 火焰 ===== */
flame = new THREE.Mesh(
new THREE.SphereGeometry(0.09,16,16),
new THREE.MeshBasicMaterial({color:0xff6600})
);
flame.position.y = 1.95;
scene.add(flame);

camera.position.z = 5;

/* 动画 */
function animate(){
requestAnimationFrame(animate);

layer1.rotation.y += 0.005;
layer2.rotation.y += 0.005;
layer3.rotation.y += 0.005;

flame.scale.y = 1 + Math.sin(Date.now()*0.01)*0.15;

renderer.render(scene,camera);
}

animate();
}
}

/* 吹蜡烛 */
function blowCandle(){
flame.material.opacity = 0;
flame.visible = false;

setTimeout(()=>go(4),1000);
}

/* ===== 信封 ===== */
function openEnvelope(){
go(6);
typeLetter();
}

/* 打字信 */
function typeLetter(){

let text = "祝你生日快乐 🎂\n愿你每天都开心\n愿所有美好都属于你 💖";

let el = document.getElementById("letterText");
let btn = document.getElementById("nextBtn");

el.innerHTML="";
btn.style.display="none";

let i=0;

let t=setInterval(()=>{
el.innerHTML += text[i]==="\n" ? "<br>" : text[i];
i++;

if(i>=text.length){
clearInterval(t);
btn.style.display="inline-block";
}
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
