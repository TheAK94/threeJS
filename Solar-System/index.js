import * as THREE from 'three';

function hideLoadingScreen() {
    const loadingScreen = document.getElementById("loading-screen");
    loadingScreen.style.opacity = 0;
    setTimeout(() => loadingScreen.style.display = "none", 500); // Fade out
  }
  
  // Texture paths
  const texturePaths = [
    "/text/Sun/2k_sun.jpg",
    "/text/Mercury/mercurymap.jpg",
    "/text/Venus/venusmap.jpg",
    "/text/Earth/earthmap10k.jpg",
    "/text/Mars/mars_10k_color.jpg",
    "/text/Jupiter/jupitermap.jpg",
    "/text/Saturn/saturnmap.jpg",
    "/text/Uranus/2k_uranus.jpg",
    "/text/Neptune/2k_neptune.jpg"
  ];
  
  const loader = new THREE.TextureLoader();
  
  const texturePromises = texturePaths.map(path => new Promise((resolve, reject) => {
    loader.load(
      path,
      () => resolve(),
      undefined,
      (err) => {
        console.error(`Failed to load texture: ${path}`, err);
        reject(err);
      }
    );
  }));
  
  Promise.all(texturePromises)
    .then(() => {
      console.log("✅ All textures loaded successfully!");
      hideLoadingScreen();
    })
    .catch(() => {
      alert("❌ Some textures failed to load! Check console for errors.");
    });
  