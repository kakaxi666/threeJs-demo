import * as THREE from 'three';
//导入轨道控制器
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

console.log(THREE)
//创建场景
const  scene = new THREE.Scene()

//创建相机
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth/window.innerHeight,
    0.1,
    1000
);
//设置相机位置
camera.position.set(0,0,10)
scene.add(camera);

//添加物体
//创建几何体
const cubeGeometry = new THREE.BoxGeometry();
const cubeMaterial = new THREE.MeshBasicMaterial({color:0xffff00});

//根据几何体和材质创建物体
const cube = new THREE.Mesh(cubeGeometry,cubeMaterial);

//修改物体的位置
// cube.position.set(5,0,0)
//物体的缩放
// cube.scale.set(1,2,3)
// cube.scale.x = 5
//物体旋转
cube.rotation.set(Math.PI/4,0,0,"XYZ")

//将几何体添加到场景中
scene.add(cube);

//初始化渲染器
const renderer = new THREE.WebGLRenderer();
//设置渲染的尺寸大小
renderer.setSize(window.innerWidth,window.innerHeight);
// console.log(renderer)
//将webgl渲染的canvas内容添加到body
document.body.appendChild(renderer.domElement)

//使用渲染器 通过
// renderer.render(scene,camera)
//创建轨道控制器
const controls = new OrbitControls(camera,renderer.domElement)

//控制3d物体的移动

//添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)
//设置时钟
const clock = new THREE.Clock()
function render(){
    // console.log('time',time)
    // cube.position.x += 0.01
    // cube.rotation.x += 0.01
    // if(cube.position.x > 5){
    //     cube.position.x = 0
    // }

    // let t = (time / 1000) %5;
    // cube.position.x = t*1

    //获取时钟的总时长
    let time = clock.getElapsedTime()
    //获取间隔时间
    let deltaTime = clock.getDelta()



    let t = time %5;
    cube.position.x = t*1

    // console.log('时钟的总时长',time,'获取两次获取时间的间隔时间',deltaTime)
    // console.log('获取两次获取时间的间隔时间',deltaTime)
    renderer.render(scene,camera);
    //下一帧的时候调用render
    requestAnimationFrame(render);
}

render()