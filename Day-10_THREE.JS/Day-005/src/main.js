import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// ==========================================
// 1. SCENE
// ==========================================

const scene = new THREE.Scene();

scene.background = new THREE.Color("#03040b");

// ==========================================
// 2. CAMERA
// ==========================================

const camera = new THREE.PerspectiveCamera(
  65,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

camera.position.set(0, 0, 50);

// ==========================================
// 3. RENDERER
// ==========================================

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: false,
});

renderer.setSize(window.innerWidth, window.innerHeight);

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

renderer.outputColorSpace = THREE.SRGBColorSpace;

document.body.appendChild(renderer.domElement);

// ==========================================
// 4. ORBIT CONTROLS
// ==========================================

const controls = new OrbitControls(camera, renderer.domElement);

controls.enableDamping = true;
controls.dampingFactor = 0.05;

controls.enableZoom = true;
controls.enablePan = true;
controls.enableRotate = true;

controls.autoRotate = false;

controls.minDistance = 5;
controls.maxDistance = 150;

// ==========================================
// 5. STARS
// ==========================================

const starGeometry = new THREE.BufferGeometry();

const starCount = 7000;

const starPositions = new Float32Array(starCount * 3);

for (let i = 0; i < starCount; i++) {
  const i3 = i * 3;

  starPositions[i3] = (Math.random() - 0.5) * 250;
  starPositions[i3 + 1] = (Math.random() - 0.5) * 180;
  starPositions[i3 + 2] = (Math.random() - 0.5) * 250;
}

starGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(starPositions, 3),
);

const starMaterial = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 0.15,
  sizeAttenuation: true,
  transparent: true,
  opacity: 0.85,
});

const stars = new THREE.Points(starGeometry, starMaterial);

scene.add(stars);

// ==========================================
// 6. CENTER GLOW
// ==========================================

const coreGeometry = new THREE.SphereGeometry(1, 32, 32);

const coreMaterial = new THREE.MeshBasicMaterial({
  color: 0x7865ff,
});

const core = new THREE.Mesh(coreGeometry, coreMaterial);

scene.add(core);

const coreLight = new THREE.PointLight(0x7865ff, 20, 60);

scene.add(coreLight);

// ==========================================
// 7. CODING LOGOS
// ==========================================

const logoFiles = [
  {
    name: "CSS",
    path: "./CSS.png",
  },
  {
    name: "Docker",
    path: "./DOCKER.png",
  },
  {
    name: "Express.js",
    path: "./EXPRESS.png",
  },
  {
    name: "HTML",
    path: "./HTML.png",
  },
  {
    name: "JavaScript",
    path: "./JAVA SCRIPT.png",
  },
  {
    name: "MongoDB",
    path: "./MONGO DB.png",
  },
  {
    name: "Node.js",
    path: "./NODE JS.png",
  },
  {
    name: "React",
    path: "/REACT.png",
  },
  {
    name: "Redis",
    path: "./REDIS.png",
  },
  {
    name: "Redux",
    path: "./redux.png",
  },
  {
    name: "Tailwind CSS",
    path: "./TAILWIND.png",
  },
  {
    name: "TypeScript",
    path: "./TYPE SCRIPT.png",
  },
];

const logoGroup = new THREE.Group();

scene.add(logoGroup);

const clickableLogos = [];

const animatedLogos = [];

const textureLoader = new THREE.TextureLoader();

// Random 3D position.

function randomPosition() {
  return new THREE.Vector3(
    (Math.random() - 0.5) * 45,
    (Math.random() - 0.5) * 32,
    (Math.random() - 0.5) * 45,
  );
}

// ==========================================
// 8. LOAD EVERY LOGO
// ==========================================

logoFiles.forEach((item, index) => {
  textureLoader.load(
    item.path,

    (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;

      // Main logo.

      const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        depthWrite: false,
      });

      const logo = new THREE.Sprite(material);

      const size = 2.8 + Math.random() * 0.8;

      logo.position.copy(randomPosition());

      logo.scale.set(size, size, 1);

      logo.userData.name = item.name;
      logo.userData.originalScale = size;

      logoGroup.add(logo);

      clickableLogos.push(logo);

      // Purple glow behind the logo.

      const glowMaterial = new THREE.SpriteMaterial({
        map: texture,
        color: 0x9b7bff,
        transparent: true,
        opacity: 0.45,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const glow = new THREE.Sprite(glowMaterial);

      glow.position.copy(logo.position);

      glow.scale.set(size * 1.6, size * 1.6, 1);

      logoGroup.add(glow);

      logo.userData.glow = glow;

      // Save animation data.

      animatedLogos.push({
        object: logo,
        originalPosition: logo.position.clone(),
        phase: Math.random() * Math.PI * 2,
        speed: 0.3 + Math.random() * 0.4,
        amplitude: 0.3 + Math.random() * 0.5,
      });

      console.log(`Loaded logo: ${item.name}`);
    },

    undefined,

    (error) => {
      console.error(`Failed to load ${item.name}: ${item.path}`, error);
    },
  );
});

// ==========================================
// 9. CLICK TO SHOW LOGO NAME
// ==========================================

const raycaster = new THREE.Raycaster();

const pointer = new THREE.Vector2();

let selectedLogo = null;

const tooltip = document.createElement("div");

tooltip.style.cssText = `  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 12px 22px;
  border: 1px solid rgba(155, 123, 255, 0.7);
  border-radius: 12px;
  background: rgba(10, 8, 25, 0.9);
  color: white;
  font: 600 16px sans-serif;
  display: none;
  pointer-events: none;
  z-index: 10;`;

document.body.appendChild(tooltip);

renderer.domElement.addEventListener("click", (event) => {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;

  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(pointer, camera);

  const intersects = raycaster.intersectObjects(clickableLogos, false);

  if (intersects.length > 0) {
    selectedLogo = intersects[0].object;

    ```
tooltip.textContent = selectedLogo.userData.name;

tooltip.style.display = "block";
```;
  } else {
    selectedLogo = null;

    ```
tooltip.style.display = "none";
```;
  }
});

// ==========================================
// 10. ANIMATION
// ==========================================

const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  const elapsedTime = clock.getElapsedTime();

  // Slow star movement.

  stars.rotation.y = elapsedTime * 0.008;

  // Rotate center object.

  core.rotation.y = elapsedTime * 0.3;

  // Floating logos.

  animatedLogos.forEach((item) => {
    const { object, originalPosition, phase, speed, amplitude } = item;

    object.position.y =
      originalPosition.y + Math.sin(elapsedTime * speed + phase) * amplitude;

    object.position.x =
      originalPosition.x +
      Math.cos(elapsedTime * speed * 0.5 + phase) * amplitude * 0.4;

    // Selected logo grows slightly.

    const originalSize = object.userData.originalScale;

    const targetSize =
      object === selectedLogo ? originalSize * 1.3 : originalSize;

    const currentSize = THREE.MathUtils.lerp(object.scale.x, targetSize, 0.1);

    object.scale.set(currentSize, currentSize, 1);

    // Glow follows the logo.

    const glow = object.userData.glow;

    if (glow) {
      glow.position.copy(object.position);

      const pulse = 1.55 + Math.sin(elapsedTime * 2 + phase) * 0.08;

      glow.scale.set(currentSize * pulse, currentSize * pulse, 1);

      glow.material.opacity =
        0.3 + (Math.sin(elapsedTime * 2 + phase) + 1) * 0.1;
    }
  });

  controls.update();

  renderer.render(scene, camera);
}

animate();

// ==========================================
// 11. RESPONSIVE RESIZE
// ==========================================

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
