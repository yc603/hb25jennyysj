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
{q:"白羊座跟哪个星座最合拍？", options:["白羊座♈","水瓶座♒","金牛座♉","双子座♊","射手座♐"], answer:"双子座♊"},
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

const camera = new THREE.PerspectiveCamera(45,1,0.1,1000);
camera.position.set(0,2,7);

const renderer = new THREE.WebGLRenderer({
alpha:true,
antialias:true
});
renderer.setSize(320,320);

document.getElementById("cake3d").innerHTML="";
document.getElementById("cake3d").appendChild(renderer.domElement);

/* 光线 */
const light1 = new THREE.PointLight(0xffffff,1.5);
light1.position.set(4,6,5);
scene.add(light1);

const light2 = new THREE.AmbientLight(0xffffff,1);
scene.add(light2);

/* ===== 金色底盘 ===== */
const plate = new THREE.Mesh(
new THREE.CylinderGeometry(2.2,2.2,0.2,64),
new THREE.MeshPhongMaterial({
color:0xffd700,
shininess:100
})
);
plate.position.y=-1.7;
scene.add(plate);

/* ===== 第一层 ===== */
const layer1 = new THREE.Mesh(
new THREE.CylinderGeometry(1.6,1.6,0.9,64),
new THREE.MeshPhongMaterial({
color:0xff9ec4,
shininess:60
})
);
layer1.position.y=-1.1;
scene.add(layer1);

/* ===== 第二层 ===== */
const layer2 = new THREE.Mesh(
new THREE.CylinderGeometry(1.25,1.25,0.8,64),
new THREE.MeshPhongMaterial({
color:0xffd166,
shininess:60
})
);
layer2.position.y=-0.15;
scene.add(layer2);

/* ===== 第三层 ===== */
const layer3 = new THREE.Mesh(
new THREE.CylinderGeometry(0.9,0.9,0.7,64),
new THREE.MeshPhongMaterial({
color:0xa0e7ff,
shininess:60
})
);
layer3.position.y=0.7;
scene.add(layer3);

/* ===== 奶油球装饰 ===== */
const creamColors = [
0xffffff,
0xff4d6d,
0xffd166,
0x7bd389,
0x6ecbff
];

for(let i=0;i<12;i++){

const ball = new THREE.Mesh(
new THREE.SphereGeometry(0.09,16,16),
new THREE.MeshPhongMaterial({
color:creamColors[i%creamColors.length]
})
);

let angle=(i/12)*Math.PI*2;

ball.position.x=Math.cos(angle)*0.82;
ball.position.z=Math.sin(angle)*0.82;
ball.position.y=1.1;

scene.add(ball);
}

/* ===== 草莓装饰 ===== */
for(let i=0;i<5;i++){

const berry = new THREE.Mesh(
new THREE.SphereGeometry(0.13,16,16),
new THREE.MeshPhongMaterial({
color:0xff0033
})
);

let angle=(i/5)*Math.PI*2;

berry.position.x=Math.cos(angle)*0.45;
berry.position.z=Math.sin(angle)*0.45;
berry.position.y=1.25;

scene.add(berry);
}

/* ===== 蜡烛 ===== */
const candle = new THREE.Mesh(
new THREE.CylinderGeometry(0.07,0.07,0.65,16),
new THREE.MeshPhongMaterial({
color:0xffffff
})
);
candle.position.y=1.65;
scene.add(candle);

/* ===== 火焰 ===== */
flame = new THREE.Mesh(
new THREE.SphereGeometry(0.12,16,16),
new THREE.MeshBasicMaterial({
color:0xff6600
})
);
flame.position.y=2.05;
scene.add(flame);

/* ===== 动画 ===== */
function animate(){

requestAnimationFrame(animate);

scene.rotation.y += 0.005;

if(flame){
flame.scale.y = 1 + Math.sin(Date.now()*0.015)*0.3;
flame.scale.x = 1 + Math.cos(Date.now()*0.02)*0.08;
}

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
go(6);
setTimeout(typeLetter,300);
}

/* 打字信 */
function typeLetter(){

let text = "2026年4月17日，本人一边修改代码一边躲避老板的目光，要是被抓现行就完犊子了😵\n不过放心，这种事情将不被允许发生✋🏿，我可是很谨慎的人😏\n祝你生日快乐🎂\n谢谢你一直这么包容我，愿你每天都开心💖\n很可惜今天不能陪你过生日，虽然可能也没有很可惜😯~\n但是我的心意还是有的，请务必查收✉";

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

let old = document.querySelector(".photos");
if(old) old.remove();

const wrap = document.createElement("div");
wrap.className = "photos";
document.getElementById("p5").appendChild(wrap);

/* 50张照片 */
const photos = [
"img/1.jpg","2.jpg","3.jpg","4.jpg","5.jpg",
"6.jpg","7.jpg","8.jpg","9.jpg","10.jpg",
"11.jpg","12.jpg","13.jpg","14.jpg","15.jpg",
"16.jpg","17.jpg","18.jpg","19.jpg","20.jpg",
"21.jpg","22.jpg","23.jpg","24.jpg","25.jpg",
"26.jpg","27.jpg","28.jpg","29.jpg","30.jpg",
"31.jpg","32.jpg","33.jpg","34.jpg","35.jpg",
"36.jpg","37.jpg","38.jpg","39.jpg","40.jpg",
"41.jpg","42.jpg","43.jpg","44.jpg","45.jpg",
"46.jpg","47.jpg","48.jpg","49.jpg","50.jpg"
];

/* 掉落50张 */
for(let i=0;i<50;i++){

let box = document.createElement("div");
box.className = "photo";

box.style.left = Math.random()*100 + "vw";
box.style.animationDuration = (6 + Math.random()*5)+"s";
box.style.animationDelay = (Math.random()*4)+"s";
box.style.transform = `rotate(${Math.random()*40-20}deg)`;

box.innerHTML = `
<div class="photo-inner"
style="background-image:url('images/${photos[i]}')">
</div>
`;

wrap.appendChild(box);
}

/* 打字 */
let text="生日快乐🎂\n绿老头🥸";
let el=document.getElementById("typeText");

let n=0;
el.innerHTML="";

let t=setInterval(()=>{
el.innerHTML += text[n]==="\n" ? "<br>" : text[n];
n++;
if(n>=text.length) clearInterval(t);
},120);

}

window.onload = function(){

document.getElementById("startBtn").addEventListener("click",function(){

go(2);

let music = document.getElementById("bgm");

if(music){
music.play().catch(()=>{});
}

});

};
