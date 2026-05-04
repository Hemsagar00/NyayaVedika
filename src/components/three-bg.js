/**
 * NyayaVedika — Immersive 3D Experience
 * Three.js-powered scene with:
 *  - 3D Scales of Justice (procedural)
 *  - Multi-layer particle systems
 *  - Mouse parallax interaction
 *  - Scroll-driven depth animations
 *  - Dynamic lighting with terracotta glow
 */
import * as THREE from 'three';

export function mountThreeBackground() {
  const canvas = document.createElement('canvas');
  canvas.id = 'nv-3d-canvas';
  document.body.prepend(canvas);

  /* ─── Renderer ─── */
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;

  /* ─── Scene & Camera ─── */
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x050505, 0.00015);

  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 80);
  camera.position.set(0, 0.8, 12);

  /* ─── Mouse tracking ─── */
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  document.addEventListener('mousemove', e => {
    mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.ty = -(e.clientY / window.innerHeight) * 2 + 1;
  });
  document.addEventListener('touchmove', e => {
    mouse.tx = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
    mouse.ty = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
  }, { passive: true });

  /* ─── Scroll tracking ─── */
  let scrollY = 0;
  window.addEventListener('scroll', () => { scrollY = window.scrollY; }, { passive: true });

  /* ─── Lighting ─── */
  scene.add(new THREE.AmbientLight(0x332211, 0.6));

  const keyLight = new THREE.PointLight(0xD97757, 18, 20, 1.2);
  keyLight.position.set(3, 4, 6);
  scene.add(keyLight);

  const fillLight = new THREE.PointLight(0xD97757, 6, 14, 1.5);
  fillLight.position.set(-4, -1, 4);
  scene.add(fillLight);

  const rimLight = new THREE.PointLight(0x885544, 8, 12, 1.8);
  rimLight.position.set(0, 2, -3);
  scene.add(rimLight);

  const topGlow = new THREE.PointLight(0xD97757, 4, 8, 2);
  topGlow.position.set(0, 5, 2);
  scene.add(topGlow);

  /* ─── Material presets ─── */
  const terracottaMat = new THREE.MeshStandardMaterial({
    color: 0xD97757,
    emissive: 0xD97757,
    emissiveIntensity: 0.6,
    metalness: 0.4,
    roughness: 0.25,
  });

  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xc4955a,
    emissive: 0x332211,
    emissiveIntensity: 0.2,
    metalness: 0.9,
    roughness: 0.15,
  });

  const darkMetal = new THREE.MeshStandardMaterial({
    color: 0x222222,
    emissive: 0x000000,
    emissiveIntensity: 0,
    metalness: 0.95,
    roughness: 0.1,
  });

  /* ═════════════════════════════════════════
     SCALES OF JUSTICE (procedural)
     ═════════════════════════════════════════ */
  const scalesGroup = new THREE.Group();

  // Central pillar
  const pillarGeo = new THREE.CylinderGeometry(0.06, 0.08, 3.2, 16);
  const pillar = new THREE.Mesh(pillarGeo, darkMetal);
  pillar.position.y = 0.4;
  scalesGroup.add(pillar);

  // Base block
  const baseGeo = new THREE.BoxGeometry(0.45, 0.15, 0.45);
  const base = new THREE.Mesh(baseGeo, brassMat);
  base.position.y = -1.2;
  scalesGroup.add(base);

  // Base tier 2
  const baseGeo2 = new THREE.BoxGeometry(0.35, 0.1, 0.35);
  const base2 = new THREE.Mesh(baseGeo2, brassMat);
  base2.position.y = -1.06;
  scalesGroup.add(base2);

  // Top cross beam
  const beamGeo = new THREE.BoxGeometry(1.6, 0.06, 0.12);
  const beam = new THREE.Mesh(beamGeo, brassMat);
  beam.position.y = 1.8;
  scalesGroup.add(beam);

  // Decorative top finial
  const finialGeo = new THREE.SphereGeometry(0.12, 16, 16);
  const finial = new THREE.Mesh(finialGeo, terracottaMat);
  finial.position.y = 2.05;
  scalesGroup.add(finial);

  // Scale pans (bowls hanging from beam ends)
  const panGeo = new THREE.SphereGeometry(0.22, 20, 10, 0, Math.PI * 2, 0, Math.PI * 0.55);
  // Left pan
  const leftPan = new THREE.Mesh(panGeo, brassMat);
  leftPan.position.set(-0.7, 1.35, 0);
  scalesGroup.add(leftPan);

  // Right pan
  const rightPan = new THREE.Mesh(panGeo, brassMat);
  rightPan.position.set(0.7, 1.35, 0);
  scalesGroup.add(rightPan);

  // Pan chains (thin cylinders)
  const chainGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.55, 8);
  for (let side = -1; side <= 1; side += 2) {
    for (let front = -0.08; front <= 0.08; front += 0.16) {
      const chain = new THREE.Mesh(chainGeo, darkMetal);
      chain.position.set(side * 0.72, 1.55, front);
      scalesGroup.add(chain);
    }
  }

  // Center decorative ring on pillar
  const ringGeo = new THREE.TorusGeometry(0.12, 0.025, 8, 24);
  const ring = new THREE.Mesh(ringGeo, terracottaMat);
  ring.position.y = 1.1;
  scalesGroup.add(ring);

  // Lower ring
  const ring2 = new THREE.Mesh(ringGeo, terracottaMat);
  ring2.position.y = -0.2;
  ring2.scale.set(0.85, 0.85, 0.85);
  scalesGroup.add(ring2);

  scalesGroup.position.set(0, 0, -2);
  scene.add(scalesGroup);

  /* ═════════════════════════════════════════
     FLOATING GEOMETRIC RINGS (orbit layers)
     ═════════════════════════════════════════ */
  const orbitRings = [];
  const ringMatPresets = [];
  for (let i = 0; i < 6; i++) {
    const radius = 1.8 + i * 0.35;
    const tube = 0.01 + i * 0.004;
    const geo = new THREE.TorusGeometry(radius, tube, 16, 120);

    const emissiveIntensity = 0.15 + i * 0.08;
    const mat = new THREE.MeshStandardMaterial({
      color: 0xD97757,
      emissive: 0xD97757,
      emissiveIntensity,
      metalness: 0.15,
      roughness: 0.45,
      transparent: true,
      opacity: 0.5 - i * 0.06,
    });
    ringMatPresets.push({ emissiveIntensity, baseOpacity: mat.opacity });

    const mesh = new THREE.Mesh(geo, mat);
    mesh.rotation.x = Math.PI * 0.35 + i * 0.12;
    mesh.rotation.y = i * 0.55;
    mesh.userData = {
      baseRotX: mesh.rotation.x,
      baseRotY: mesh.rotation.y,
      speedX: 0.15 + Math.random() * 0.25,
      speedY: 0.1 + Math.random() * 0.3,
      speedZ: 0.05 + Math.random() * 0.1,
      radius,
      index: i,
    };
    scene.add(mesh);
    orbitRings.push(mesh);
  }

  /* ═════════════════════════════════════════
     PARTICLE SYSTEMS (3 layers)
     ═════════════════════════════════════════ */

  // Layer 1: Fine ambient dust (dense, slow)
  const dustCount = 400;
  const dustGeo = new THREE.BufferGeometry();
  const dustPos = new Float32Array(dustCount * 3);
  const dustSizes = new Float32Array(dustCount);
  for (let i = 0; i < dustCount; i++) {
    dustPos[i * 3] = (Math.random() - 0.5) * 18;
    dustPos[i * 3 + 1] = (Math.random() - 0.5) * 14;
    dustPos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    dustSizes[i] = Math.random() * 2.5 + 0.5;
  }
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
  dustGeo.setAttribute('size', new THREE.BufferAttribute(dustSizes, 1));
  const dustMat = new THREE.PointsMaterial({
    color: 0xD97757,
    size: 0.025,
    transparent: true,
    opacity: 0.45,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const dust = new THREE.Points(dustGeo, dustMat);
  scene.add(dust);

  // Layer 2: Bright spark particles (sparse, faster)
  const sparkCount = 120;
  const sparkGeo = new THREE.BufferGeometry();
  const sparkPositions = new Float32Array(sparkCount * 3);
  const sparkData = [];
  for (let i = 0; i < sparkCount; i++) {
    sparkPositions[i * 3] = (Math.random() - 0.5) * 14;
    sparkPositions[i * 3 + 1] = (Math.random() - 0.5) * 12;
    sparkPositions[i * 3 + 2] = (Math.random() - 0.5) * 8;
    sparkData.push({
      baseY: sparkPositions[i * 3 + 1],
      speed: 0.3 + Math.random() * 1.2,
      amplitude: 0.5 + Math.random() * 2.5,
      phase: Math.random() * Math.PI * 2,
    });
  }
  sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPositions, 3));
  const sparkMat = new THREE.PointsMaterial({
    color: 0xff9966,
    size: 0.04,
    transparent: true,
    opacity: 0.7,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const sparks = new THREE.Points(sparkGeo, sparkMat);
  scene.add(sparks);

  // Layer 3: Large glowing orbs (rare, dramatic)
  const orbCount = 20;
  const orbGroup = new THREE.Group();
  const orbs = [];
  for (let i = 0; i < orbCount; i++) {
    const size = 0.04 + Math.random() * 0.1;
    const orbGeo = new THREE.SphereGeometry(size, 8, 8);
    const orbMat = new THREE.MeshBasicMaterial({
      color: 0xD97757,
      transparent: true,
      opacity: 0.6 + Math.random() * 0.4,
      depthWrite: false,
    });
    const orb = new THREE.Mesh(orbGeo, orbMat);
    orb.position.set(
      (Math.random() - 0.5) * 14,
      (Math.random() - 0.5) * 12,
      (Math.random() - 0.5) * 7,
    );
    orb.userData = {
      base: orb.position.clone(),
      speed: 0.2 + Math.random() * 0.6,
      amplitude: 0.5 + Math.random() * 3,
      phase: Math.random() * Math.PI * 2,
    };
    orbGroup.add(orb);
    orbs.push(orb);
  }
  scene.add(orbGroup);

  /* ═════════════════════════════════════════
     GROUND GRID (subtle reference plane)
     ═════════════════════════════════════════ */
  const gridHelper = new THREE.PolarGridHelper(7, 32, 24, 64, 0xD97757, 0xD97757);
  gridHelper.position.y = -4;
  gridHelper.material.opacity = 0.08;
  gridHelper.material.transparent = true;
  gridHelper.material.depthWrite = false;
  scene.add(gridHelper);

  /* ═════════════════════════════════════════
     LAW BOOK (floating, abstract)
     ═════════════════════════════════════════ */
  const bookGroup = new THREE.Group();
  const coverGeo = new THREE.BoxGeometry(0.7, 0.9, 0.12);
  const cover = new THREE.Mesh(coverGeo, new THREE.MeshStandardMaterial({
    color: 0x1a0a05,
    emissive: 0x1a0a05,
    emissiveIntensity: 0.3,
    metalness: 0.1,
    roughness: 0.6,
  }));
  bookGroup.add(cover);

  // Spine detail
  const spineGeo = new THREE.BoxGeometry(0.06, 0.8, 0.14);
  const spine = new THREE.Mesh(spineGeo, brassMat);
  spine.position.set(-0.33, 0, 0);
  bookGroup.add(spine);

  // Gold lines on spine
  for (let ly = -0.3; ly <= 0.3; ly += 0.15) {
    const lineGeo = new THREE.BoxGeometry(0.07, 0.02, 0.15);
    const line = new THREE.Mesh(lineGeo, brassMat);
    line.position.set(-0.33, ly, 0);
    bookGroup.add(line);
  }

  // Page edges (top)
  const pagesGeo = new THREE.BoxGeometry(0.64, 0.84, 0.01);
  const pagesMat = new THREE.MeshStandardMaterial({
    color: 0xf5f0e8,
    emissive: 0x111111,
    emissiveIntensity: 0.1,
    roughness: 0.7,
  });
  const pagesTop = new THREE.Mesh(pagesGeo, pagesMat);
  pagesTop.position.y = 0.04;
  bookGroup.add(pagesTop);

  bookGroup.position.set(-3.5, -0.5, -3);
  bookGroup.rotation.set(-0.25, 0.45, 0.15);
  scene.add(bookGroup);

  /* ═════════════════════════════════════════
     ANIMATION LOOP
     ═════════════════════════════════════════ */
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const dt = Math.min(clock.getDelta(), 0.1);
    const t = clock.getElapsedTime();

    // Smooth mouse follow
    mouse.x += (mouse.tx - mouse.x) * 2.5 * dt;
    mouse.y += (mouse.ty - mouse.y) * 2.5 * dt;

    // Camera parallax from mouse + scroll
    const scrollFactor = scrollY * 0.0008;
    const tx = mouse.x * 0.6 - scrollFactor * 0.5;
    const ty = mouse.y * 0.35 + scrollFactor * 0.3;
    camera.position.x += (tx - camera.position.x) * 1.2 * dt;
    camera.position.y += (0.8 + ty - camera.position.y) * 1.2 * dt;
    camera.lookAt(0, 0.3, -3);

    // Scales of Justice: gentle sway + mouse response
    scalesGroup.rotation.y += (mouse.x * 0.3 - scalesGroup.rotation.y) * 0.8 * dt;
    scalesGroup.rotation.z = mouse.y * 0.15;
    scalesGroup.position.y = Math.sin(t * 0.35) * 0.3;

    // Left/right pans bob independently
    const panBob = Math.sin(t * 0.7) * 0.1;
    leftPan.position.y = 1.35 + panBob + mouse.y * 0.05;
    rightPan.position.y = 1.35 - panBob - mouse.y * 0.05;

    // Orbit rings animate with depth
    orbitRings.forEach((ring, i) => {
      ring.rotation.x += ring.userData.speedX * 0.01 * dt;
      ring.rotation.y += ring.userData.speedY * 0.01 * dt;
      ring.rotation.z += ring.userData.speedZ * 0.01 * dt;

      // Breathe opacity
      const breathe = 1 + Math.sin(t * 0.4 + i * 0.7) * 0.2;
      ring.material.opacity = Math.min(0.55, ringMatPresets[i].baseOpacity * breathe);

      // Scroll parallax: rings move apart on scroll
      const scrollOffset = scrollY * 0.0003 * (i + 1);
      ring.position.z = scrollOffset;
    });

    // Dust slow rotation
    dust.rotation.y += 0.04 * dt;
    dust.rotation.x += 0.015 * dt;

    // Sparks animate individually
    const sparkPosArr = sparks.geometry.attributes.position.array;
    for (let i = 0; i < sparkCount; i++) {
      const d = sparkData[i];
      sparkPosArr[i * 3 + 1] = d.baseY + Math.sin(t * d.speed + d.phase) * d.amplitude;
      sparkPosArr[i * 3] += Math.cos(t * 0.5 + d.phase) * 0.15 * dt;
    }
    sparks.geometry.attributes.position.needsUpdate = true;
    sparks.rotation.y += 0.08 * dt;

    // Floating orbs
    orbs.forEach(orb => {
      const ud = orb.userData;
      orb.position.x = ud.base.x + Math.sin(t * ud.speed + ud.phase) * ud.amplitude;
      orb.position.y = ud.base.y + Math.cos(t * ud.speed * 0.7 + ud.phase) * ud.amplitude * 0.7;
      orb.position.z = ud.base.z + Math.cos(t * ud.speed * 0.5 + ud.phase) * ud.amplitude * 0.5;
      orb.material.opacity = 0.3 + Math.sin(t * 1.5 + ud.phase) * 0.25;
    });

    // Book gentle float
    bookGroup.position.y = -0.5 + Math.sin(t * 0.5 + 1) * 0.4;
    bookGroup.rotation.y += 0.12 * dt;

    // Grid subtle pulse
    gridHelper.material.opacity = 0.06 + Math.sin(t * 0.3) * 0.025;

    // Dynamic lighting pulse
    const lightPulse = 1 + Math.sin(t * 0.6) * 0.2;
    keyLight.intensity = 18 * lightPulse;
    topGlow.intensity = 4 * (1 + Math.sin(t * 0.8) * 0.3);

    renderer.render(scene, camera);
  }
  animate();

  /* ─── Resize Handler ─── */
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}
