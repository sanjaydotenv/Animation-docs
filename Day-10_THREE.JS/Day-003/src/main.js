import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const textureLoader = new THREE.TextureLoader();

const texture = textureLoader.load("./t1.jpg");

texture.colorSpace = THREE.SRGBColorSpace;
const scene = new THREE.Scene();

const geometry = new THREE.SphereGeometry(1, 30, 30);
const material = new THREE.MeshBasicMaterial({
  map: texture,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100,
);

camera.position.z = 3;

const canvas = document.querySelector("#canvas");

const renderer = new THREE.WebGLRenderer({ canvas });

renderer.setSize(window.innerWidth, window.innerHeight);

renderer.render(scene, camera);

const controls = new OrbitControls(camera, renderer.domElement);

controls.enableDamping = true;

const timer = new THREE.Timer();

function animate() {
  timer.update();
  controls.update();
  const delta = timer.getDelta();

  cube.rotation.x += delta * 1;
  cube.rotation.y += delta * 1;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();
