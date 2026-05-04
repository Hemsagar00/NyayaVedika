// src/components/three-bg.js — Subtle 3D background (Three.js)
// Creates floating geometric rings and particles in matte black + orange
export function mountThreeBackground() {
  // Check if Three.js is available, if not load from CDN
  if (typeof THREE === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/three@0.160.0/build/three.min.js';
    script.onload = init;
    document.head.appendChild(script);
  } else {
    init();
  }

  function init() {
    const canvas = document.createElement('canvas');
    canvas.id = 'nv-3d-canvas';
    document.body.prepend(canvas);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Ambient + point lights for subtle orange glow
    const ambient = new THREE.AmbientLight(0x222222, 0.5);
    scene.add(ambient);
    const point = new THREE.PointLight(0xD97757, 2, 15);
    point.position.set(2, 3, 4);
    scene.add(point);
    const point2 = new THREE.PointLight(0xD97757, 1, 10);
    point2.position.set(-3, -1, 3);
    scene.add(point2);

    // Create rings — like abstract scales of justice
    const rings = [];
    for (let i = 0; i < 5; i++) {
      const geo = new THREE.TorusGeometry(1.5 - i * 0.2, 0.008, 16, 100);
      const mat = new THREE.MeshStandardMaterial({
        color: 0xff6b35,
        emissive: 0xff6b35,
        emissiveIntensity: 0.3 + i * 0.1,
        metalness: 0.1,
        roughness: 0.5,
        transparent: true,
        opacity: 0.4 - i * 0.06,
      });
      const ring = new THREE.Mesh(geo, mat);
      ring.rotation.x = Math.PI * 0.3 + i * 0.15;
      ring.rotation.y = i * 0.4;
      ring.userData = {
        speedX: 0.003 + Math.random() * 0.005,
        speedY: 0.004 + Math.random() * 0.006,
      };
      scene.add(ring);
      rings.push(ring);
    }

    // Floating particles
    const particlesGeo = new THREE.BufferGeometry();
    const count = 200;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particlesMat = new THREE.PointsMaterial({
      color: 0xff6b35,
      size: 0.015,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particles);

    // Center sphere — subtle
    const sphereGeo = new THREE.SphereGeometry(0.15, 32, 32);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: 0xD97757,
      emissive: 0xD97757,
      emissiveIntensity: 1.5,
      roughness: 0.2,
    });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    scene.add(sphere);

    // Animation loop
    const clock = new THREE.Clock();
    function animate() {
      requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      rings.forEach((ring, i) => {
        ring.rotation.x += ring.userData.speedX;
        ring.rotation.y += ring.userData.speedY;
        ring.rotation.z += 0.001;
      });

      particles.rotation.y += 0.0003;
      particles.rotation.x += 0.0001;

      sphere.position.y = Math.sin(t * 0.8) * 1.5;
      sphere.position.x = Math.cos(t * 0.6) * 2;
      sphere.scale.setScalar(1 + Math.sin(t * 1.2) * 0.3);

      renderer.render(scene, camera);
    }
    animate();

    // Resize
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }
}
