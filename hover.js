import * as THREE from 'https://cdn.skypack.dev/three';

// Scene Setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x101010);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 5, 10);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// Resize Handling
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Hovercraft
const geometry = new THREE.BoxGeometry(2, 1, 3);
const material = new THREE.MeshStandardMaterial({ color: 0x00b3b3 });
const hovercraft = new THREE.Mesh(geometry, material);
hovercraft.position.y = 1;
hovercraft.castShadow = true;
scene.add(hovercraft);

// Light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 10, 10);
light.castShadow = true;
scene.add(light);

// Ambient light
const ambient = new THREE.AmbientLight(0x404040, 1.2);
scene.add(ambient);

// Ground
const groundGeo = new THREE.PlaneGeometry(200, 200);
const groundMat = new THREE.MeshStandardMaterial({
  color: 0x222222,
  side: THREE.DoubleSide,
});
const ground = new THREE.Mesh(groundGeo, groundMat);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  hovercraft.rotation.y += 0.005;
  renderer.render(scene, camera);
}
animate();
