import { GLTFLoader } from 'GLTFLoader';
import * as THREE from 'three';

// Scene setup
let scene = new THREE.Scene();
let renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#canvas'),
  alpha: true
});
renderer.setSize(800, 800);
renderer.shadowMap.enabled = true; // Enable shadows
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Optionally use soft shadows

// Camera setup
let camera = new THREE.PerspectiveCamera(30, 1, 0.1, 1000);
camera.position.set(0, 0, 5);

// Set background color
// scene.background = new THREE.Color('white');
scene.background = null;

// Lighting
let light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7.5);
light.castShadow = true; // Light can cast shadows
light.shadow.mapSize.width = 1024; // Shadow map resolution
light.shadow.mapSize.height = 1024;
light.shadow.camera.near = 0.5;
light.shadow.camera.far = 50;
scene.add(light);

// Add an ambient light for better visibility
let ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

// Add a ground plane to receive shadows
let planeGeometry = new THREE.PlaneGeometry(200, 200);
let planeMaterial = new THREE.ShadowMaterial({ opacity: 0.5 });
let plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -65 * (Math.PI / 180);
plane.position.x = -5;
plane.position.y = 0;
plane.receiveShadow = true; // Plane can receive shadows
scene.add(plane);

// Load GLTF model
let loader = new GLTFLoader();
loader.load('models/Phoenixbot_Full.gltf', function(gltf) {
  gltf.scene.traverse(function(node) {
    if (node.isMesh) {
      node.castShadow = true; // Enable shadow casting for the model
      node.receiveShadow = true; // Enable shadow receiving for the model
    }
  });

  // Scale the model down
  gltf.scene.scale.set(1.5,1.5,1.5); // Adjust the scale factor as needed

  gltf.scene.rotation.x = 25 * (Math.PI / 180);
  gltf.scene.rotation.y = -240 * (Math.PI/180);
  scene.add(gltf.scene);

  function animate() {
    requestAnimationFrame(animate);
    gltf.scene.rotation.y -= 0.004;
    renderer.render(scene, camera);
  }
  animate();
});
