import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.117.1/build/three.module.js";

/* import { OrbitControls } from 'https://unpkg.com/three@<version>/examples/jsm/controls/OrbitControls.js';
const controls = new OrbitControls( camera, renderer.domElement );
 */

// Canvas
const canvas = document.querySelector("canvas.webgl");
const canvas1 = document.querySelector("canvas1.webgl");

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.SphereGeometry(15, 30, 16);
const particlesGeometry = new THREE.BufferGeometry();
const particlesCont = 5000;

const posArray = new Float32Array(particlesCont * 3);
for (let i = 0; i < particlesCont * 3; i++) {
  //posArray[i] = (Math.random() - 0.5) *  50;
  posArray[i] = (Math.random() - 0.5) *  (Math.random() * 50);
}
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))



//Materials
const material = new THREE.PointsMaterial({
  size: 0.025,
  color: "white",
});

//Mesh
const mesh = new THREE.Points(geometry, material);
const particlesMesh = new THREE.Points(particlesGeometry, material);

scene.add(mesh, particlesMesh);

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener('resize',()=>
{
  //update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  //update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  //update renderer
  renderer.setSize(sizes.width,sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
})

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 2;
scene.add(camera);


// Renderer
const renderer = new THREE.WebGLRenderer({
  alpha:true,
  canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
//renderer.setClearColor(new THREE.Color('#010628',1))
//scene.background = new THREE.Color( 0x652bb3 ); background color purpura
scene.background = null;
//mouse
document.addEventListener('mousemove', animateParticles);
let mouseX = 0
let mouseY = 0

function animateParticles(event) {
  mouseY = event.clientY
  mouseX = event.clientX
}

const clock = new THREE.Clock()

//Animations
const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  //Update objects
  mesh.rotation.y = 0.5 * elapsedTime;
  particlesMesh.rotation.y =-.1 * elapsedTime;

  if (mouseX>0){
    particlesMesh.rotation.x =- mouseY * (elapsedTime * 0.000008)
    particlesMesh.rotation.y =- mouseX * (elapsedTime * 0.000008)
  }

  //Render
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};
tick();