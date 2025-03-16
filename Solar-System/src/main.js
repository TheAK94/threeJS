import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import getStarfield from './getStarfield';
import * as lil from 'lil-gui';
import gsap from "gsap";

// Renderer, Camera, Scene
const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w/h, 0.1, 2000);
camera.position.set(0, 0, 300);

const orbit = new OrbitControls(camera, renderer.domElement);
orbit.enableDamping = true;
orbit.dampingFactor = 0.03;


const loader = new THREE.TextureLoader();


// Sun Model
const sunGroup = new THREE.Group();
scene.add(sunGroup);

const sunGeometry = new THREE.IcosahedronGeometry(54, 10);
const sunMaterial = new THREE.MeshBasicMaterial({
  map: loader.load("/text/Sun/2k_sun.jpg")
});
const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
sunGroup.add(sunMesh);

const sunGlowGeometry = new THREE.SphereGeometry(57, 32, 16);
const sunGlowMaterial = new THREE.MeshBasicMaterial({
  color: 0xffaa00,
  transparent: true,
  opacity: 0.2,
  blending: THREE.AdditiveBlending
});
const sunGlowMesh = new THREE.Mesh(sunGlowGeometry, sunGlowMaterial);
sunGroup.add(sunGlowMesh);

const sunLight = new THREE.PointLight(0xffaa00, 80000, 3000);
sunLight.position.set(0, 0, 0);
sunGroup.add(sunLight);


// Stars
const stars = getStarfield({numStars: 100000});
scene.add(stars);


// Mercury Model
const mercuryGroup = new THREE.Group();
mercuryGroup.position.set(100, 0, 0);
scene.add(mercuryGroup);

const mercuryGeometry = new THREE.IcosahedronGeometry(4, 10);
const mercuryMaterial = new THREE.MeshStandardMaterial({
  map: loader.load("/text/Mercury/mercurymap.jpg"),
  bumpMap: loader.load("/text/Mercury/mercurybump.jpg"),
  bumpScale: 0.1
})
const mercuryMesh = new THREE.Mesh(mercuryGeometry, mercuryMaterial);
mercuryGroup.add(mercuryMesh);


// Venus Model
const venusGroup = new THREE.Group();
venusGroup.position.set(170, 0, 0);
scene.add(venusGroup);

const venusGeometry = new THREE.IcosahedronGeometry(8, 10);
const venusMaterial = new THREE.MeshStandardMaterial({
  map: loader.load("/text/Venus/venusmap.jpg"),
  bumpMap: loader.load("/text/Venus/venusbump.jpg"),
  bumpScale: 0.1
})
const venusMesh = new THREE.Mesh(venusGeometry, venusMaterial);
venusGroup.add(venusMesh);

const venusAtmoMat = new THREE.MeshStandardMaterial({
  transparent: true,
  opacity: 0.5,
  map: loader.load("/text/Venus/2k_venus_atmosphere.jpg"),
  blending: THREE.AdditiveBlending
});
const venusAtmoMesh = new THREE.Mesh(venusGeometry, venusAtmoMat);
venusAtmoMesh.scale.setScalar(1.025);
venusGroup.add(venusAtmoMesh);


// Earth Model
const earthGroup = new THREE.Group();
earthGroup.position.set(250, 0, 0);
earthGroup.rotation.z = -23.4 * Math.PI / 180;
scene.add(earthGroup);

const earthGeometry = new THREE.IcosahedronGeometry(9, 10);
const earthMaterial = new THREE.MeshStandardMaterial({
  map: loader.load("/text/Earth/earthmap10k.jpg"),
  normalMap: loader.load("/text/Earth/2k_earth_normal_map.jpg"),
  metalnessMap: loader.load("/text/Earth/2k_earth_specular_map.jpg"),
  metalness: 0.5,
  roughness: 0.6
})
const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
earthGroup.add(earthMesh);

const earthLightsMat = new THREE.MeshStandardMaterial({
  map: loader.load("/text/Earth/earthlights4k.jpg"),
  blending: THREE.AdditiveBlending
});
const earthLightsMesh = new THREE.Mesh(earthGeometry, earthLightsMat);
earthGroup.add(earthLightsMesh);

const earthCloudsMat = new THREE.MeshStandardMaterial({
  map: loader.load("/text/Earth/2k_earth_clouds.jpg"),
  transparent: true,
	opacity: 0.8,
  blending: THREE.AdditiveBlending,
  alphaMap: loader.load("/text/Earth/earthcloudmaptrans.jpg")
});
const earthCloudsMesh = new THREE.Mesh(earthGeometry, earthCloudsMat);
earthCloudsMesh.scale.setScalar(1.01);
earthGroup.add(earthCloudsMesh);

const earthGlowMat = new THREE.MeshBasicMaterial({
  color: 0x3399ff,
  transparent: true,
  opacity: 0.2,
  blending: THREE.AdditiveBlending
});
const earthGlowMesh = new THREE.Mesh(earthGeometry, earthGlowMat);
earthGlowMesh.scale.setScalar(1.018);
earthGroup.add(earthGlowMesh);


// Mars Model
const marsGroup = new THREE.Group();
marsGroup.position.set(350, 0, 0);
scene.add(marsGroup);

const marsGeometry = new THREE.IcosahedronGeometry(5, 10);
const marsMaterial = new THREE.MeshStandardMaterial({
  map: loader.load("/text/Mars/mars_10k_color.jpg"),
  normalMap: loader.load("/text/Mars/mars_6k_normal.jpg"),
  bumpMap: loader.load("/text/Mars/mars_10k_topo.jpg"),
  bumpScale: 0.08,
  roughness: 0.7
});
const marsMesh = new THREE.Mesh(marsGeometry, marsMaterial);
marsGroup.add(marsMesh);

const marsGlowMat = new THREE.MeshBasicMaterial({
  color: 0xff5522,
  transparent: true,
  opacity: 0.15,
  blending: THREE.AdditiveBlending
});
const marsGlowMesh = new THREE.Mesh(marsGeometry, marsGlowMat);
marsGlowMesh.scale.setScalar(1.015);
marsGroup.add(marsGlowMesh);



// Jupiter Model
const jupiterGroup = new THREE.Group();
jupiterGroup.position.set(600, 0, 0);
scene.add(jupiterGroup);

const jupiterGeometry = new THREE.IcosahedronGeometry(25, 10);
const jupiterMaterial = new THREE.MeshStandardMaterial({
  map: loader.load("/text/Jupiter/jupitermap.jpg"),
  roughness: 0.8,
  metalness: 0
});
const jupiterMesh = new THREE.Mesh(jupiterGeometry, jupiterMaterial);
jupiterGroup.add(jupiterMesh);

const jupiterGlowMat = new THREE.MeshBasicMaterial({
  color: 0xffbb66,
  transparent: true,
  opacity: 0.15,
  blending: THREE.AdditiveBlending
});
const jupiterGlowMesh = new THREE.Mesh(jupiterGeometry, jupiterGlowMat);
jupiterGlowMesh.scale.setScalar(1.02);
jupiterGroup.add(jupiterGlowMesh);


// Saturn Model
const saturnGroup = new THREE.Group();
saturnGroup.rotation.x = THREE.MathUtils.degToRad(26.7);
saturnGroup.position.set(900, 0, 0);
scene.add(saturnGroup);

const saturnGeometry = new THREE.IcosahedronGeometry(22.5, 10);
const saturnMaterial = new THREE.MeshStandardMaterial({
  map: loader.load("/text/Saturn/saturnmap.jpg"),
  roughness: 0.7,
  metalness: 0.1
});
const saturnMesh = new THREE.Mesh(saturnGeometry, saturnMaterial);
saturnGroup.add(saturnMesh);

// const saturnRingGeometry = new THREE.RingGeometry(25, 52, 32);
// const saturnRingMat = new THREE.MeshStandardMaterial({
//   map: loader.load("/text/Saturn/saturnringcolor.jpg"),
//   map: loader.load("/text/Saturn/ring.png"),
//   transparent: true,
//   side: THREE.DoubleSide,
//   blending: THREE.AdditiveBlending
// })
// const saturnRingMesh = new THREE.Mesh(saturnRingGeometry, saturnRingMat);
// saturnGroup.add(saturnRingMesh);


const ringGeometry = new THREE.CylinderGeometry(25, 52, 0.1, 128, 1, true); 
const ringMaterial = new THREE.MeshBasicMaterial({
    map: loader.load("/text/Saturn/saturnringcolor.jpg"),
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.2,
    blending: THREE.AdditiveBlending
});

const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
ringMesh.rotation.x = Math.PI / 2;
saturnGroup.add(ringMesh);


// Uranus Model
const uranusGroup = new THREE.Group();
uranusGroup.position.set(1100, 0, 0);
scene.add(uranusGroup);

const uranusGeometry = new THREE.IcosahedronGeometry(12.5, 10);
const uranusMaterial = new THREE.MeshStandardMaterial({
  map: loader.load("/text/Uranus/2k_uranus.jpg")
});
const uranusMesh = new THREE.Mesh(uranusGeometry, uranusMaterial);
uranusGroup.add(uranusMesh);

const uranusRingGeometry = new THREE.RingGeometry(21, 21.5, 128);
const uranusRingMat = new THREE.MeshStandardMaterial({
  map: loader.load("/text/Uranus/uranusringcolour.jpg"),
  transparent: true,
  side: THREE.DoubleSide
});
const uranusRingMesh = new THREE.Mesh(uranusRingGeometry, uranusRingMat);
uranusRingMesh.rotation.x = THREE.MathUtils.degToRad(97.8);
uranusRingMesh.rotation.z = Math.PI / 2;
uranusGroup.add(uranusRingMesh);


// Neptune Model
const neptuneGroup = new THREE.Group();
neptuneGroup.position.set(1200, 0, 0);
scene.add(neptuneGroup);

const neptuneGeometry = new THREE.IcosahedronGeometry(12, 10);
const neptuneMaterial = new THREE.MeshStandardMaterial({
  map: loader.load("/text/Neptune/2k_neptune.jpg")
});
const neptuneMesh = new THREE.Mesh(neptuneGeometry, neptuneMaterial);
neptuneGroup.add(neptuneMesh);





const ambientLight = new THREE.AmbientLight(0xffffff, 0.1); // Soft background light  
scene.add(ambientLight);

// Axes Helper
const axesHelper = new THREE.AxesHelper(1200);
axesHelper.visible = false;
scene.add(axesHelper);


// GUI
const gui = new lil.GUI();

const cameraControls = {
  Sun: () => focusOnPlanet(sunGroup),
  Mercury: () => focusOnPlanet(mercuryGroup),
  Venus: () => focusOnPlanet(venusGroup),
  Earth: () => focusOnPlanet(earthGroup),
  Mars: () => focusOnPlanet(marsGroup),
  Jupiter: () => focusOnPlanet(jupiterGroup),
  Saturn: () => focusOnPlanet(saturnGroup),
  Uranus: () => focusOnPlanet(uranusGroup),
  Neptune: () => focusOnPlanet(neptuneGroup),
};

const cameraFolder = gui.addFolder('Focus on Planet');
cameraFolder.add(cameraControls, 'Sun');
cameraFolder.add(cameraControls, 'Mercury');
cameraFolder.add(cameraControls, 'Venus');
cameraFolder.add(cameraControls, 'Earth');
cameraFolder.add(cameraControls, 'Mars');
cameraFolder.add(cameraControls, 'Jupiter');
cameraFolder.add(cameraControls, 'Saturn');
cameraFolder.add(cameraControls, 'Uranus');
cameraFolder.add(cameraControls, 'Neptune');
cameraFolder.close();

const controls = {
  speedFactor: 1,
  mercurySpeed: 0.02,
  venusSpeed: 0.015,
  earthSpeed: 0.01,
  marsSpeed: 0.008,
  jupiterSpeed: 0.004,
  saturnSpeed: 0.003,
  uranusSpeed: 0.002,
  neptuneSpeed: 0.001,
};

const speedFolder = gui.addFolder('Planet Revolution Speeds');
speedFolder.add(controls, 'speedFactor', 1, 100).name('Global Speed');
// speedFolder.add(controls, 'mercurySpeed', 0.001, 0.05);
// speedFolder.add(controls, 'venusSpeed', 0.001, 0.05);
// speedFolder.add(controls, 'earthSpeed', 0.001, 0.05);
// speedFolder.add(controls, 'marsSpeed', 0.001, 0.05);
// speedFolder.add(controls, 'jupiterSpeed', 0.001, 0.05);
// speedFolder.add(controls, 'saturnSpeed', 0.001, 0.05);
// speedFolder.add(controls, 'uranusSpeed', 0.001, 0.05);
// speedFolder.add(controls, 'neptuneSpeed', 0.001, 0.05);
speedFolder.close();

const helpersFolder = gui.addFolder('Helpers');
helpersFolder.add(axesHelper, 'visible').name('Show Axes Helper');
helpersFolder.close();



// Functions
function focusOnPlanet(planetGroup) {
  gsap.to(camera.position, {
      x: planetGroup.position.x,
      y: planetGroup.position.y + 50,
      z: planetGroup.position.z + 100,
      duration: 2,
      ease: "power2.inOut"
  });

  gsap.to(orbit.target, {
      x: planetGroup.position.x,
      y: planetGroup.position.y,
      z: planetGroup.position.z,
      duration: 2,
      ease: "power2.inOut",
      onUpdate: () => orbit.update()
  });
}



// Orbit
function createOrbit(radius) {
  const points = [];
  const segments = 100;

  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    points.push(new THREE.Vector3(radius * Math.cos(angle), 0, radius * Math.sin(angle)));
  }

  const orbitGeometry = new THREE.BufferGeometry().setFromPoints(points);
  const orbitMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 0.5, transparent: true });
  return new THREE.Line(orbitGeometry, orbitMaterial);
}

scene.add(createOrbit(100));  // Mercury
scene.add(createOrbit(170));  // Venus
scene.add(createOrbit(250));  // Earth
scene.add(createOrbit(350));  // Mars
scene.add(createOrbit(600));  // Jupiter
scene.add(createOrbit(900));  // Saturn
scene.add(createOrbit(1100)); // Uranus
scene.add(createOrbit(1200)); // Neptune


let time = 0;

function animate() {
    requestAnimationFrame(animate);

    time += 0.01 * controls.speedFactor;

    mercuryGroup.position.set(
        100 * Math.cos(time * controls.mercurySpeed),
        0,
        100 * Math.sin(time * controls.mercurySpeed)
    );

    venusGroup.position.set(
        170 * Math.cos(time * controls.venusSpeed),
        0,
        170 * Math.sin(time * controls.venusSpeed)
    );

    earthGroup.position.set(
        250 * Math.cos(time * controls.earthSpeed),
        0,
        250 * Math.sin(time * controls.earthSpeed)
    );

    marsGroup.position.set(
        350 * Math.cos(time * controls.marsSpeed),
        0,
        350 * Math.sin(time * controls.marsSpeed)
    );

    jupiterGroup.position.set(
        600 * Math.cos(time * controls.jupiterSpeed),
        0,
        600 * Math.sin(time * controls.jupiterSpeed)
    );

    saturnGroup.position.set(
        900 * Math.cos(time * controls.saturnSpeed),
        0,
        900 * Math.sin(time * controls.saturnSpeed)
    );

    uranusGroup.position.set(
        1100 * Math.cos(time * controls.uranusSpeed),
        0,
        1100 * Math.sin(time * controls.uranusSpeed)
    );

    neptuneGroup.position.set(
        1200 * Math.cos(time * controls.neptuneSpeed),
        0,
        1200 * Math.sin(time * controls.neptuneSpeed)
    );

    sunGroup.rotation.y += 0.0001;

    // Rotate Planets
    mercuryGroup.rotation.y += 0.0002;
    venusGroup.rotation.y += 0.00005;
    earthGroup.rotation.y += 0.01;
    marsGroup.rotation.y += 0.0098;
    jupiterGroup.rotation.y += 0.0242;
    saturnGroup.rotation.y += 0.0224;
    uranusGroup.rotation.y += 0.014;
    neptuneGroup.rotation.y += 0.0149;

    // Rotate Saturn's Rings
    ringMesh.rotation.z += 0.0224;


    orbit.update();
    renderer.render(scene, camera);
}

animate();


// Responsive
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});