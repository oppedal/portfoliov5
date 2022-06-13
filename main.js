import './style.css';
import * as THREE from 'three';
import { GLTFLoader } from './node_modules/three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

//SCENE CAMERA RENDERER
let size = { width: 0, height: 0 };
const bg = document.getElementById('bg');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.01,
  1000
);
// camera.position.set(0, 1, 2);
let cameraTarget = new THREE.Vector3(0, 1, 0);

const renderer = new THREE.WebGLRenderer({
  canvas: bg,
  alpha: true,
  antialias: true,
});

renderer.physicallyCorrectLights = true;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = 5;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
function resizeCanvasToDisplaySize() {
  const canvas = renderer.domElement;
  const pixelRatio = window.devicePixelRatio;
  const width = (canvas.clientWidth * pixelRatio) | 0;
  const height = (canvas.clientHeight * pixelRatio) | 0;

  renderer.setSize(width, height, false);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}
camera.position.setX(0.5);
camera.position.setY(0.5);
camera.position.setZ(4);

renderer.render(scene, camera);
//Geometry
let head;
const loader = new GLTFLoader();
loader.load('./3d/simplehead3.gltf', (gltf) => {
  head = gltf.scene;
  head.rotation.y = -1;
  head.rotation.z = 1;

  scene.add(gltf.scene);
});

// const geo = new THREE.TorusGeometry(5, 3, 16, 100);
// const material = new THREE.MeshBasicMaterial({ color: 0xff6347 });
// const torus = new THREE.Mesh(geo, material);
// scene.add(torus);

//Lights

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(2, 3, 5);
const hemi = new THREE.HemisphereLight(0xffffff, 0x000000, 1);

scene.add(pointLight, hemi);
// const pointLightHelper = new THREE.PointLightHelper(pointLight);
// scene.add(pointLightHelper, );

// const controls = new OrbitControls(camera, renderer.domElement);

//Animation
const moveCam = () => {
  head.rotation.x += 0.01;
  head.rotation.y -= 0.01;
};
const moveCamMouse = (e) => {
  head.rotation.y = e.clientX / -3000;
  head.rotation.x = e.clientY / 3000;
};

document.body.onscroll = moveCam;
window.addEventListener('mousemove', moveCamMouse);
const animate = () => {
  requestAnimationFrame(animate);
  // controls.update();

  renderer.render(scene, camera);
};
console.log(head);
animate();
const resizeObserver = new ResizeObserver(resizeCanvasToDisplaySize);
resizeObserver.observe(renderer.domElement, { box: 'content-box' });
