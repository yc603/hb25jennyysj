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
/* 切页 */
document.querySelectorAll('.page').forEach(p=>{
    p.classList.remove('active');
});

document.getElementById('p'+n).classList.add('active');

let music = document.getElementById("bgm");

/* 第二幕开始播放音乐 */
if(n === 2){
    if(music){
        music.play().catch(()=>{});
    }
}

/* 第五幕暂停音乐（视频页） */
if(n === 5){
    if(music){
        music.pause();
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
    let video = document.getElementById("finalVideo");
    if(video){
        video.play().catch(()=>{});
    }
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
camera.position.set(0,3.2,8.5);   // 拉远镜头

const renderer = new THREE.WebGLRenderer({
alpha:true,
antialias:true
});

renderer.setSize(320,320);

document.getElementById("cake3d").innerHTML="";
document.getElementById("cake3d").appendChild(renderer.domElement);

/* 光线 */
const light1 = new THREE.PointLight(0xffffff,2.2);
light1.position.set(4,6,5);
scene.add(light1);

const light2 = new THREE.PointLight(0xffddee,1.4);
light2.position.set(-4,4,4);
scene.add(light2);

scene.add(new THREE.AmbientLight(0xffffff,2.4));

/* 金盘 */
const plate = new THREE.Mesh(
new THREE.CylinderGeometry(2.5,2.5,0.25,64),
new THREE.MeshStandardMaterial({
color:0xfff8ee,
roughness:0.45,
metalness:0
})
);
plate.position.y=-1.05;
scene.add(plate);

/* ===== 三层奶白蛋糕 ===== */

const sizes=[1.75,1.35,1.0];
const heights=[-0.15,0.8,1.75];

const colors=[
0xffb6d9,   // 粉色
0xffe38a,   // 黄色
0xaee8ff    // 蓝色
];

for(let i=0;i<3;i++){

let cake = new THREE.Mesh(
new THREE.CylinderGeometry(sizes[i],sizes[i],0.9,64),
new THREE.MeshPhongMaterial({
color:colors[i],
shininess:55
})
);

cake.position.y=heights[i];
scene.add(cake);

/* 顶部奶油 */
let cream = new THREE.Mesh(
new THREE.CylinderGeometry(sizes[i]+0.03,sizes[i]+0.03,0.22,64),
new THREE.MeshPhongMaterial({
color:0xffffff,
shininess:90
})
);

cream.position.y=heights[i]+0.45;
scene.add(cream);

/* 奶油滴落 */
for(let j=0;j<18;j++){

let drip = new THREE.Mesh(
new THREE.CylinderGeometry(0.08,0.08,0.25+Math.random()*0.2,8),
new THREE.MeshPhongMaterial({
color:0xffffff
})
);

let angle=(j/18)*Math.PI*2;

drip.position.x=Math.cos(angle)*(sizes[i]-0.02);
drip.position.z=Math.sin(angle)*(sizes[i]-0.02);
drip.position.y=heights[i]+0.28;

scene.add(drip);
}
}

/* 粉色奶油球 */
for(let i=0;i<14;i++){

let deco = new THREE.Mesh(
new THREE.SphereGeometry(0.12,16,16),
new THREE.MeshPhongMaterial({
color:i%2==0?0xff7eb3:0xffffff
})
);

let angle=(i/14)*Math.PI*2;

deco.position.x=Math.cos(angle)*1.05;
deco.position.z=Math.sin(angle)*1.05;
deco.position.y=1.42;

scene.add(deco);
}

/* 草莓 */
for(let i=0;i<6;i++){

let berry = new THREE.Mesh(
new THREE.SphereGeometry(0.16,18,18),
new THREE.MeshPhongMaterial({
color:0xff0033,
shininess:100
})
);

let angle=(i/6)*Math.PI*2;

berry.position.x=Math.cos(angle)*0.55;
berry.position.z=Math.sin(angle)*0.55;
berry.position.y=1.62;

scene.add(berry);
}

/* 蜡烛 */
const candle = new THREE.Mesh(
new THREE.CylinderGeometry(0.07,0.07,0.7,16),
new THREE.MeshPhongMaterial({
color:0xff69b4
})
);

candle.position.y=2.0;
scene.add(candle);

/* 火焰 */
flame = new THREE.Mesh(
new THREE.SphereGeometry(0.14,16,16),
new THREE.MeshBasicMaterial({
color:0xff9900
})
);

flame.position.y=2.45;
scene.add(flame);

/* 动画 */
function animate(){

requestAnimationFrame(animate);

scene.rotation.y += 0.005;

if(flame){
flame.scale.y = 1 + Math.sin(Date.now()*0.02)*0.35;
flame.scale.x = 1 + Math.cos(Date.now()*0.02)*0.15;
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



window.onload = function(){

document.getElementById("startBtn").addEventListener("click",function(){

go(2);

let music = document.getElementById("bgm");

if(music){
music.play().catch(()=>{});
}

});

};
