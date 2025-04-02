const container = document.getElementById("three-container");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 5);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

// Lights
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7.5);
scene.add(light);

// Ground
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(100, 100),
  new THREE.MeshStandardMaterial({ color: 0x222222 })
);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// Hover Vehicle
const hover = new THREE.Mesh(
  new THREE.BoxGeometry(1, 0.3, 2),
  new THREE.MeshStandardMaterial({ color: 0x00ffff })
);
hover.position.y = 1;
scene.add(hover);

let velocity = 0;
const keys = {};

window.addEventListener("keydown", e => keys[e.key.toLowerCase()] = true);
window.addEventListener("keyup", e => keys[e.key.toLowerCase()] = false);

function animate() {
  requestAnimationFrame(animate);

  // Controls
  if (keys["w"]) velocity = Math.min(velocity + 0.01, 0.2);
  else velocity = Math.max(velocity - 0.01, 0);

  if (keys["shift"]) velocity = Math.min(velocity + 0.02, 0.4);
  if (keys["a"]) hover.rotation.y += 0.03;
  if (keys["d"]) hover.rotation.y -= 0.03;

  // Move forward
  hover.position.x -= Math.sin(hover.rotation.y) * velocity;
  hover.position.z -= Math.cos(hover.rotation.y) * velocity;

  // Hover effect
  hover.position.y = 1 + Math.sin(Date.now() * 0.005) * 0.05;

  renderer.render(scene, camera);
}

animate();
