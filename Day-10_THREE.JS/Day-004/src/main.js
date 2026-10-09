import "./style.css";

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import GUI from "lil-gui";

// ===================================
// 1. SCENE
// ===================================

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x111827);

// ===================================
// 2. CAMERA
// ===================================

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100,
);

camera.position.set(4, 3, 6);
camera.lookAt(0, 0, 0);

scene.add(camera);

// ===================================
// 3. RENDERER
// ===================================

const canvas = document.querySelector("#canvas");

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;

// ===================================
// 4. OBJECTS
// ===================================

// Main cube

const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);

const material = new THREE.MeshStandardMaterial({
  color: 0x00ff88,
  roughness: 0.4,
  metalness: 0.1,
});

const cube = new THREE.Mesh(geometry, material);

cube.castShadow = true;
cube.position.y = 0.8;

scene.add(cube);

// Ground

const groundGeometry = new THREE.PlaneGeometry(20, 20);

const groundMaterial = new THREE.MeshStandardMaterial({
  color: 0x333344,
  roughness: 0.8,
});

const ground = new THREE.Mesh(groundGeometry, groundMaterial);

ground.rotation.x = -Math.PI / 2;
ground.position.y = -0.01;
ground.receiveShadow = true;

scene.add(ground);

// ===================================
// 5. AMBIENT LIGHT
// ===================================

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);

scene.add(ambientLight);

// ===================================
// 6. DIRECTIONAL LIGHT
// ===================================

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);

directionalLight.position.set(3, 5, 3);

directionalLight.castShadow = true;

directionalLight.shadow.mapSize.set(1024, 1024);

directionalLight.shadow.camera.left = -5;
directionalLight.shadow.camera.right = 5;
directionalLight.shadow.camera.top = 5;
directionalLight.shadow.camera.bottom = -5;

scene.add(directionalLight);

// ===================================
// 7. POINT LIGHT
// ===================================

const pointLight = new THREE.PointLight(0xff4444, 20, 15, 2);

pointLight.position.set(-3, 3, 2);

pointLight.castShadow = true;

scene.add(pointLight);

// Point light helper

const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2);

scene.add(pointLightHelper);

// ===================================
// 8. SPOT LIGHT
// ===================================

const spotLight = new THREE.SpotLight(
  0x4488ff,
  50,
  20,
  Math.PI / 6,
  0.3,
  2,
);

spotLight.position.set(3, 5, 3);

spotLight.target.position.set(0, 0, 0);

spotLight.castShadow = true;

scene.add(spotLight);
scene.add(spotLight.target);

// Spot light helper

const spotLightHelper = new THREE.SpotLightHelper(spotLight);

scene.add(spotLightHelper);

// ===================================
// 9. LIL-GUI
// ===================================

const gui = new GUI();

// General controls

const generalFolder = gui.addFolder("General");

generalFolder.add(renderer, "toneMappingExposure", 0.1, 2, 0.1)
  .name("Exposure");

generalFolder.add(cube.rotation, "x", 0, Math.PI * 2, 0.01)
  .name("Cube Rotation X");

generalFolder.add(cube.rotation, "y", 0, Math.PI * 2, 0.01)
  .name("Cube Rotation Y");

// ===================================
// AMBIENT LIGHT CONTROLS
// ===================================

const ambientFolder = gui.addFolder("Ambient Light");

ambientFolder.add(ambientLight, "intensity", 0, 3, 0.1)
  .name("Intensity");

ambientFolder.addColor(
  {
    color: `#${ambientLight.color.getHexString()}`,
  },
  "color",
).onChange((value) => {
  ambientLight.color.set(value);
});

// ===================================
// DIRECTIONAL LIGHT CONTROLS
// ===================================

const directionalFolder = gui.addFolder("Directional Light");

directionalFolder.add(directionalLight, "intensity", 0, 10, 0.1)
  .name("Intensity");

directionalFolder.add(directionalLight.position, "x", -10, 10, 0.1)
  .name("Position X");

directionalFolder.add(directionalLight.position, "y", 0, 10, 0.1)
  .name("Position Y");

directionalFolder.add(directionalLight.position, "z", -10, 10, 0.1)
  .name("Position Z");

directionalFolder.addColor(
  {
    color: `#${directionalLight.color.getHexString()}`,
  },
  "color",
).onChange((value) => {
  directionalLight.color.set(value);
});

// ===================================
// POINT LIGHT CONTROLS
// ===================================

const pointFolder = gui.addFolder("Point Light");

pointFolder.add(pointLight, "intensity", 0, 100, 1)
  .name("Intensity");

pointFolder.add(pointLight, "distance", 0, 30, 0.5)
  .name("Distance");

pointFolder.add(pointLight, "decay", 0, 4, 0.1)
  .name("Decay");

pointFolder.add(pointLight.position, "x", -10, 10, 0.1)
  .name("Position X");

pointFolder.add(pointLight.position, "y", 0, 10, 0.1)
  .name("Position Y");

pointFolder.add(pointLight.position, "z", -10, 10, 0.1)
  .name("Position Z");

pointFolder.addColor(
  {
    color: `#${pointLight.color.getHexString()}`,
  },
  "color",
).onChange((value) => {
  pointLight.color.set(value);
});

// ===================================
// SPOT LIGHT CONTROLS
// ===================================

const spotFolder = gui.addFolder("Spot Light");

spotFolder.add(spotLight, "intensity", 0, 100, 1)
  .name("Intensity");

spotFolder.add(spotLight, "distance", 0, 30, 0.5)
  .name("Distance");

spotFolder.add(spotLight, "angle", 0.05, Math.PI / 2, 0.01)
  .name("Angle")
  .onChange(() => spotLightHelper.update());

spotFolder.add(spotLight, "penumbra", 0, 1, 0.01)
  .name("Penumbra");

spotFolder.add(spotLight, "decay", 0, 4, 0.1)
  .name("Decay");

spotFolder.add(spotLight.position, "x", -10, 10, 0.1)
  .name("Position X");

spotFolder.add(spotLight.position, "y", 0, 10, 0.1)
  .name("Position Y");

spotFolder.add(spotLight.position, "z", -10, 10, 0.1)
  .name("Position Z");

spotFolder.addColor(
  {
    color: `#${spotLight.color.getHexString()}`,
  },
  "color",
).onChange((value) => {
  spotLight.color.set(value);
});

// ===================================
// SHADOW CONTROLS
// ===================================

const shadowSettings = {
  enabled: true,
};

const shadowFolder = gui.addFolder("Shadows");

shadowFolder.add(shadowSettings, "enabled")
  .name("Enable Shadows")
  .onChange((value) => {
    renderer.shadowMap.enabled = value;

    directionalLight.castShadow = value;
    pointLight.castShadow = value;
    spotLight.castShadow = value;

    ground.receiveShadow = value;
    cube.castShadow = value;
  });

// Open useful folders

ambientFolder.open();
directionalFolder.open();

// ===================================
// 10. ORBIT CONTROLS
// ===================================

const controls = new OrbitControls(camera, renderer.domElement);

controls.enableDamping = true;

// ===================================
// 11. ANIMATION LOOP
// ===================================

function animate() {
  controls.update();

  spotLightHelper.update();

  renderer.render(scene, camera);

  requestAnimationFrame(animate);
}

animate();

// ===================================
// 12. RESPONSIVE RESIZE
// ===================================

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
