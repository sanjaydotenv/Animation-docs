import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { HDRLoader } from "three/addons/loaders/HDRLoader.js";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100,
);

camera.position.z = 4;

scene.add(camera);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);

ambientLight.position.set(1, 1, 1);
scene.add(ambientLight);

const hdrLoader = new HDRLoader();

hdrLoader.load("./env.hdr", (env) => {
  env.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = env;
  scene.background = env;
});

const geoMatery = new THREE.BoxGeometry(1, 1, 1);

const material = new THREE.MeshStandardMaterial({
  color: "red",
  envMapIntensity: 2,
  roughness: 0,
  metalness: 0.9,
});

const cube = new THREE.Mesh(geoMatery, material);

scene.add(cube);

const canvas = document.querySelector("#canvas");
const rendere = new THREE.WebGLRenderer({ canvas });

const controls = new OrbitControls(camera, rendere.domElement);

rendere.setSize(window.innerWidth, window.innerHeight);
function animate() {
  controls.update();
  rendere.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
