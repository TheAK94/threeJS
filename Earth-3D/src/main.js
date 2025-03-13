import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import getStarfield from './getStarfield';
import * as lil from 'lil-gui';


// Renderer, Camera, Scene
const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
renderer.physicallyCorrectLights = true;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w/h, 0.1, 1000);
camera.position.set(0, 2, 3); 


// Orbit Controls
const orbit = new OrbitControls(camera, renderer.domElement);
orbit.enableDamping = true;
orbit.dampingFactor = 0.03;
orbit.enablePan = false;


// Earth Model
const earthGroup = new THREE.Group();
earthGroup.rotation.z = -23.4 * Math.PI / 180;
scene.add(earthGroup);

const loader = new THREE.TextureLoader();
let color = loader.load("./text/earthmap10k.jpg");
let lights = loader.load("./text/earthlights4k.jpg");
let clouds = loader.load("./text/earthcloudmap.jpg");
let cloundmaptrans = loader.load("./text/earthcloudmaptrans.jpg");

const geometry = new THREE.IcosahedronGeometry(1, 12);
const material = new THREE.MeshStandardMaterial({
	map: color,
	roughness: 1,
	metalness: 0
});
const earthMesh = new THREE.Mesh(geometry, material);
earthGroup.add(earthMesh);

const lightsMat = new THREE.MeshBasicMaterial({
	map: lights,
	blending: THREE.AdditiveBlending
});
const lightMesh = new THREE.Mesh(geometry, lightsMat);
earthGroup.add(lightMesh);

const cloudsMat = new THREE.MeshStandardMaterial({
	transparent: true,
	opacity: 0.8,
	map: clouds,
	blending: THREE.AdditiveBlending,
	alphaMap: cloundmaptrans
});
const cloudMesh = new THREE.Mesh(geometry, cloudsMat);
cloudMesh.scale.setScalar(1.005);
earthGroup.add(cloudMesh);


// Sunlight and Stars
const sunLight = new THREE.DirectionalLight(0xfafafa, 2);
sunLight.position.set(-5, 3, 5)
scene.add(sunLight);

const stars = getStarfield({numStars: 3000});
scene.add(stars);


// Helpers
const axesHelper = new THREE.AxesHelper(5);
axesHelper.visible = false;
scene.add(axesHelper);

const sunLighthelper = new THREE.DirectionalLightHelper(sunLight, 3);
sunLighthelper.visible = false;
scene.add(sunLighthelper);


// GUI
const gui = new lil.GUI();

const helpersFolder = gui.addFolder('Helpers');
helpersFolder.add(axesHelper, 'visible').name('Show Axes Helper');
helpersFolder.add(sunLighthelper, 'visible').name('Show Sunlight Helper');
helpersFolder.close();


// Responsive
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
})


// Animation
function animate() {
	requestAnimationFrame(animate);

	orbit.update();
	earthMesh.rotation.y += 0.002;
	lightMesh.rotation.y += 0.002;
	cloudMesh.rotation.y += 0.0023;
	stars.rotation.y -= 0.001;
	renderer.render(scene, camera);
}
animate();