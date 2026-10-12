import "./style.css";

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ================================
// SCENE
// ================================

const scene = new THREE.Scene();

scene.background = new THREE.Color("#101010");

// ================================
// CAMERA
// ================================

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  100,
);

camera.position.set(0, 0, 4);

scene.add(camera);

// ================================
// RENDERER
// ================================

const canvas = document.querySelector("#canvas");

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: false,
});

renderer.setSize(window.innerWidth, window.innerHeight);

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

renderer.outputColorSpace = THREE.SRGBColorSpace;

renderer.toneMapping = THREE.ACESFilmicToneMapping;

renderer.toneMappingExposure = 1.2;

// ================================
// LIGHTING
// ================================

const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);

scene.add(ambientLight);

const keyLight = new THREE.DirectionalLight(0xffffff, 3);

keyLight.position.set(3, 5, 5);

scene.add(keyLight);

const fillLight = new THREE.DirectionalLight(0xb8c9ff, 1.5);

fillLight.position.set(-4, 2, 3);

scene.add(fillLight);

const rimLight = new THREE.DirectionalLight(0xffffff, 2);

rimLight.position.set(0, 4, -4);

scene.add(rimLight);

// ================================
// LOADERS
// ================================

const textureLoader = new THREE.TextureLoader();

const gltfLoader = new GLTFLoader();

// ================================
// TEXTURES
// ================================

const colorTexture = textureLoader.load("/textures/marble_bust_01_diff_1k.jpg");

const normalTexture = textureLoader.load(
  "/textures/marble_bust_01_nor_gl_1k.jpg",
);

const roughnessTexture = textureLoader.load(
  "/textures/marble_bust_01_rough_1k.jpg",
);

colorTexture.colorSpace = THREE.SRGBColorSpace;

// ================================
// MODEL
// ================================

let model = null;

gltfLoader.load(
  "/model.gltf",

  (gltf) => {
    model = gltf.scene;

    // Initial position: top-right
    model.position.set(1.5, 0.8, 0);

    // Initial scale: small
    model.scale.setScalar(0.45);

    model.traverse((child) => {
      if (child.isMesh) {
        const materials = Array.isArray(child.material)
          ? child.material
          : [child.material];

        materials.forEach((material) => {
          material.map = colorTexture;
          material.normalMap = normalTexture;
          material.roughnessMap = roughnessTexture;

          material.roughness = 1;

          material.needsUpdate = true;
        });

        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    scene.add(model);

    console.log("GLTF model loaded successfully!");

    // ================================
    // GSAP SCROLL ANIMATION
    // ================================

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "main",
        start: "top top",
        end: "bottom bottom",
        scrub: 2,
      },
    });

    // Move model from top-right to center
    timeline.to(
      model.position,
      {
        x: 0,
        y: -0.2,
        z: 3,
        ease: "none",
      },
      0,
    );

    // Increase model size
    timeline.to(
      model.scale,
      {
        x: 1,
        y: 1,
        z: 1,
        ease: "none",
      },
      0,
    );

    // Rotate model 360 degrees
    timeline.to(
      model.rotation,
      {
        y: Math.PI * 2,
        ease: "none",
      },
      0,
    );

    ScrollTrigger.refresh();
  },

  undefined,

  (error) => {
    console.error("GLTF model loading failed:", error);
  },
);

// ================================
// ORBIT CONTROLS
// ================================

// ================================
// ORBIT CONTROLS
// ================================

const controls = new OrbitControls(camera, renderer.domElement);

controls.enabled = true;

// Mouse drag se camera rotate hoga
controls.enableRotate = true;

// Page scroll ko GSAP animation ke liye use karna hai,
// isliye mouse wheel se camera zoom disable rakho
controls.enableZoom = false;

// Camera pan disable
controls.enablePan = false;

controls.enableDamping = true;
controls.dampingFactor = 0.05;

controls.update();

// ================================
// ANIMATION LOOP
// ================================

function animate() {
  requestAnimationFrame(animate);
  controls.update();

  renderer.render(scene, camera);
}

animate();

// ================================
// RESPONSIVE RESIZE
// ================================

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  ScrollTrigger.refresh();
});