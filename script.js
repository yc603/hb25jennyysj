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
let photos = [
"img/1.jpg","img/2.jpg","img/3.jpg","img/4.jpg","img/5.jpg",
"img/6.jpg","img/7.jpg","img/8.jpg","img/9.jpg","img/10.jpg",
"img/11.jpg","img/12.jpg","img/13.jpg","img/14.jpg","img/15.jpg",
"img/16.jpg","img/17.jpg","img/18.jpg","img/19.jpg","img/20.jpg",
"img/21.jpg","img/22.jpg","img/23.jpg","img/24.jpg","img/25.jpg",
"img/26.jpg","img/27.jpg","img/28.jpg","img/29.jpg","img/30.jpg",
"img/31.jpg","img/32.jpg","img/33.jpg","img/34.jpg","img/35.jpg",
"img/36.jpg","img/37.jpg","img/38.jpg","img/39.jpg","img/40.jpg",
"img/41.jpg","img/42.jpg","img/43.jpg","img/44.jpg","img/45.jpg",
"img/46.jpg","img/47.jpg","img/48.jpg","img/49.jpg","img/50.jpg"
];

let index = 0;
let perPage = 6;

function startPhotos(){
    renderPage();

    setInterval(()=>{
        flipPage();
    },3500);
}

/* 渲染当前页 */
function renderPage(){
    let grid = document.getElementById("photoGrid");
    grid.innerHTML = "";

    let start = index * perPage;
    let pagePhotos = photos.slice(start, start + perPage);

    pagePhotos.forEach(src=>{
        let div = document.createElement("div");
        div.className = "photo";
        div.style.backgroundImage = `url('${src}')`;
        grid.appendChild(div);
    });
}

/* 翻页动画 */
function flipPage(){

    let page = document.getElementById("page");
    page.classList.add("flip");

    setTimeout(()=>{
        index++;
        if(index * perPage >= photos.length){
            index = 0;
        }

        renderPage();
        page.classList.remove("flip");

    },600);
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
