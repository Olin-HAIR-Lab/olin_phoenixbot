import {GLTFLoader} from 'GLTFLoader';
import * as THREE from 'three';

// Scene setup
let scene = new THREE.Scene();
let renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#canvas'),
});
renderer.setSize(500, 500);

// Camera setup
let camera = new THREE.PerspectiveCamera(30, 1, 0.1, 1000);
camera.position.set(0, 0, 5);

// Set background color
scene.background = new THREE.Color('white');

// Lighting
let light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1).normalize();
scene.add(light);

// Load GLTF model
let loader = new GLTFLoader();
loader.load('phoenixbot/scene.gltf', function(gltf) {
  scene.add(gltf.scene);
  function animate() {
    requestAnimationFrame(animate);
    gltf.scene.rotation.y -= 0.005;
    renderer.render(scene, camera);
  }
  animate();
});
