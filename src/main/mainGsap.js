import * as THREE from 'three';
//导入轨道控制器
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
//导入动画库
import { gsap } from 'gsap';
//导入dat.gui
import * as dat from 'dat.gui';

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

const gui = new dat.GUI();
gui.add(cube.position,'x')
.min(0)
.max(5)
.step(0.01)
.name('移动x')
.onChange((val)=>{
    // console.log('修改x的值',val)
})
.onFinishChange((val)=>{
    console.log('完成修改的值',val)
})

//改变物体的颜色

const params = {
    color:"#ffff00"
};
gui.addColor(params,'color').onChange((val)=>{
    console.log('颜色被修改',val)
    cube.material.color.set(val)
})
gui.add(cube,'visible').name('是否显示')

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
controls.enableDamping = true
//添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)
//设置时钟
const clock = new THREE.Clock()

//设置动画
// let animate1=gsap.to(cube.position,{x:5,duration:5,repeat:-1,yoyo:true,delay:2})
// gsap.to(cube.rotation,{x:2*Math.PI,easy:'power1.inOut',duration:5,onComplete:()=>{console.log(123)}})

window.addEventListener('dblclick',()=>{
    // if(animate1.isActive()){
    //     animate1.pause()
    // }else{
    //     animate1.resume()
    // }

    const fullScreenElement = document.fullscreenElement;
    if(fullScreenElement){
        document.exitFullscreen()
    }else{
        renderer.domElement.requestFullscreen()
    }

    //双击屏幕进入全屏 退出全屏
    
})

function render(){
    controls.update()
    renderer.render(scene,camera);
    //下一帧的时候调用render
    requestAnimationFrame(render);
}

render()

//监听画面变化 更新渲染画面
window.addEventListener("resize",()=>{
    // console.log('画面变化了')
    //更新摄像头
    camera.aspect = window.innerWidth/window.innerHeight;
    //更新摄像机的投影矩阵
    camera.updateProjectionMatrix();
    //更新渲染器
    renderer.setSize(window.innerWidth,window.innerHeight)
    //设置渲染器的像素比例
    renderer.setPixelRatio(window.devicePixelRatio)

})


 