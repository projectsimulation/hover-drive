import * as THREE from 'https://cdn.skypack.dev/three';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x101010);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 10);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Hovercraft
const geometry = new THREE.BoxGeometry(2, 1, 3);
const material = new THREE.MeshStandardMaterial({ color: 0x00b3b3 });
const hovercraft = new THREE.Mesh(geometry, material);
hovercraft.position.y = 1;
scene.add(hovercraft);

// Light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 10, 10);
scene.add(light);

// Ground (a long plane for scrolling)
const groundGeo = new THREE.PlaneGeometry(200, 400);
const groundMat = new THREE.MeshStandardMaterial({ color: 0x222222, side: THREE.DoubleSide });
const ground = new THREE.Mesh(groundGeo, groundMat);
ground.rotation.x = -Math.PI / 2;
ground.position.y = 0;
ground.position.z = -200;
scene.add(ground);

// Movement
let moveLeft = false;
let moveRight = false;
let boost = false;
let speed = 0.3;

document.addEventListener('keydown', (e) => {
    if (e.key === 'a' || e.key === 'A') moveLeft = true;
    if (e.key === 'd' || e.key === 'D') moveRight = true;
    if (e.key === 'Shift') boost = true;
});
document.addEventListener('keyup', (e) => {
    if (e.key === 'a' || e.key === 'A') moveLeft = false;
    if (e.key === 'd' || e.key === 'D') moveRight = false;
    if (e.key === 'Shift') boost = false;
});

function animate() {
    requestAnimationFrame(animate);

    // Hover left/right
    if (moveLeft) hovercraft.position.x -= 0.2;
    if (moveRight) hovercraft.position.x += 0.2;

    // Scroll ground to simulate movement
    ground.position.z += boost ? speed * 3 : speed;

    // Reset ground to loop
    if (ground.position.z > 0) {
        ground.position.z = -200;
    }

    renderer.render(scene, camera);
}

animate();
