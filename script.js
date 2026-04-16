let qIndex = 0;

/* ===== 题库 ===== */
const questions = [
{q:"我们是怎么认识的？", options:["上班🐄","实习🐎","搭讪😏","打乒乓球🏓","上课📖"], answer:"搭讪😏"},
{q:"我们认识的日期？", options:["6月12日","6月3日","4月17日","6月14日","不记得🤯"], answer:"不记得🤯"},
{q:"我们在中国最常吃的食物是？", options:["螺狮粉","臭豆腐","姥姥下碗面","烧仙草","清汤粉"], answer:"螺狮粉"},
{q:"回来马来西亚后我们吃的第一家餐厅是？", options:["太二酸菜鱼","中国兰州拉面","Uno Sushi","Mr Wu","Shin Zushi"], answer:"Uno Sushi"},
{q:"你陪我打游戏玩到凌晨的地方是？", options:["福州","龙岩","厦门","赣州","泉州"], answer:"龙岩"},
{q:"我们一起去过哪里旅行？", options:["泉州","厦门","漳州","福州","赣州"], answer:"赣州"},
{q:"你放工后最想干嘛？", options:["直奔老巢","狠狠睡觉","刷剧","啥也不干","跟我一起玩"], answer:"跟我一起玩"},
{q:"臭豆腐有几种口味？", options:["10","13","15","9","7"], answer:"15"},
{q:"白羊座跟哪个星座最合拍？", options:["白羊座♈","金牛座♉","双子座♊","水瓶座♒","射手座♐"], answer:"双子座♊"},
{q:"你最喜欢跟谁玩？", options:["晴"], answer:"晴"}
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
