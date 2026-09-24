import "./style.css";
import * as THREE from "three";

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1);

const material = new THREE.MeshBasicMaterial({ color: 0xff0011 });

const box = new THREE.Mesh(geometry, material);

scene.add(box);

// box.rotation.x = 3

// box.scale.x = 3
box.scale.set(4, 0.5, 0);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100,
);

camera.position.z = 2.5;

const canvas = document.querySelector("#canvas");

const rendere = new THREE.WebGLRenderer({ canvas });

rendere.setSize(window.innerWidth, window.innerHeight);

rendere.render(scene, camera);

const timer = new THREE.Timer();

function animate() {
  timer.update();
  const delta = timer.getDelta();
  box.rotation.x += delta * 1;
  box.rotation.y += delta * 1;
  rendere.render(scene, camera);
  requestAnimationFrame(animate);
}
// animate();
