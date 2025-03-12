import * as THREE from 'three';
import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import * as lil from 'lil-gui';

const renderer = new THREE.WebGLRenderer({antialias: true});   // Allocates space on web browser for animations

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75, // fov
    window.innerWidth / window.innerHeight,  // aspect
    0.1, // near
    1000 // far
);

//Lighting
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

const pointLight = new THREE.PointLight( 0xffffff, 10, 100 );
pointLight.position.set(0, 10, 0);
scene.add(pointLight);

// Light Helpers
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 3);
scene.add(directionalLightHelper);

const sphereSize = 2;
const pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
scene.add(pointLightHelper);

// display Axes (Only for Understanding) - No practical use
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// Orbit Controls
const orbit = new OrbitControls(camera, renderer.domElement);
orbit.enableDamping = true;   // smooth movement of cube

camera.position.set(0, 2, 5); 


const texture = new THREE.TextureLoader();
let color = texture.load("./text/BaseColor.jpg");
let metalness = texture.load("./text/Metallic.jpg");
let roughness = texture.load("./text/Roughness.jpg");
let normal = texture.load("./text/Normal.png");

// Creating an object (cube)
const boxGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
const boxMaterial = new THREE.MeshStandardMaterial({map: color, roughnessMap: roughness, normalMap: normal});
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);
boxMaterial.metalness = 0.5;


const gui = new lil.GUI();

const materialFolder = gui.addFolder('Material');
materialFolder.add(boxMaterial, 'roughness', 0, 1).name('Roughness');
materialFolder.add(boxMaterial, 'metalness', 0, 1).name('Metalness');
materialFolder.addColor(boxMaterial, 'color').name('Color');

const meshFolder = gui.addFolder('Mesh');
meshFolder.add(box.scale, 'x', 0.1, 5).name('Scale X');
meshFolder.add(box.scale, 'y', 0.1, 5).name('Scale Y');
meshFolder.add(box.scale, 'z', 0.1, 5).name('Scale Z');
meshFolder.add(box.position, 'x', -10, 10).name('Position X');
meshFolder.add(box.position, 'y', -10, 10).name('Position Y');
meshFolder.add(box.position, 'z', -10, 10).name('Position Z');
meshFolder.close();

const helpersFolder = gui.addFolder('Helpers');
helpersFolder.add(axesHelper, 'visible').name('Show Axes Helper');
helpersFolder.add(pointLightHelper, 'visible').name('Show Point Light Helper');
helpersFolder.add(directionalLightHelper, 'visible').name('Show Directional Light Helper');
helpersFolder.close();

// Responsive
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
})

// Rotation
function animate() {
    box.rotation.x += 0.01;
    box.rotation.y += 0.01;

    orbit.update();

    renderer.render(scene, camera);

}

renderer.setAnimationLoop(animate);
