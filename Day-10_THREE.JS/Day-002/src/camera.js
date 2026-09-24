import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1);

const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
});

const box = new THREE.Mesh(geometry, material);

scene.add(box);

// Orthographic Camera
// const camera = new THREE.OrthographicCamera(
//   -2, // left
//   2, // right
//   2, // top
//   -2, // bottom
//   0.1, // near
//   100, // far
// );

// PerspectiveCamera Camera

const camera = new THREE.PerspectiveCamera(
  75,
  size.width / size.height,
  0.1,
  100,
);

// Camera ko object se door rakho
camera.position.z = 3;

// Camera kis point ko dekhe

const canvas = document.querySelector("#canvas");

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas });

renderer.setSize(size.width, size.height);

// Render
renderer.render(scene, camera);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true

const timer = new THREE.Timer();
function animate() {
  timer.update();
  controls.update()
  const delta = timer.getDelta();
  // box.rotation.x += delta;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
  size.width = window.innerWidth;
  size.height = window.innerHeight;

  camera.aspect = size.width / size.height;

  renderer.setSize(size.width, size.height);

  camera.updateProjectionMatrix();
  renderer.render(scene, camera);
});
