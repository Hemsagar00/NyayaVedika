/**
 * NyayaVedika — Immersive 3D Experience v2
 * Three.js-powered scene:
 *  - Scales of Justice (procedural, swaying)
 *  - Courthouse pillars (classical columns with fluting & capitals)
 *  - Floating law-text ribbons (paragraphs of Indian statutes)
 *  - Multi-layer particle systems (dust, sparks, orbs, cursor trail)
 *  - Central interactive beacon responding to mouse
 *  - Scroll-driven depth parallax across 3 z-layers
 *  - Dynamic terracotta lighting with pulse
 *  - Optimized for 60fps desktop
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
  renderer.toneMappingExposure = 1.15;

  /* ─── Scene & Camera ─── */
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x050505, 0.00012);

  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 90);
  camera.position.set(0, 0.6, 12);

  /* ─── Mouse tracking (smoothed) ─── */
  const mouse = { x: 0, y: 0, tx: 0, ty: 0, prevTx: 0, prevTy: 0 };
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
  let targetScrollY = 0;
  window.addEventListener('scroll', () => { targetScrollY = window.scrollY; }, { passive: true });

  /* ─── Lighting ─── */
  scene.add(new THREE.AmbientLight(0x22110a, 0.5));

  const keyLight = new THREE.PointLight(0xD97757, 16, 22, 1.2);
  keyLight.position.set(3, 4, 6);
  scene.add(keyLight);

  const fillLight = new THREE.PointLight(0xD97757, 5, 14, 1.5);
  fillLight.position.set(-4, -1, 4);
  scene.add(fillLight);

  const rimLight = new THREE.PointLight(0x664433, 7, 12, 1.8);
  rimLight.position.set(0, 2, -3);
  scene.add(rimLight);

  const topGlow = new THREE.PointLight(0xD97757, 3, 9, 2);
  topGlow.position.set(0, 5, 2);
  scene.add(topGlow);

  /* ─── Material Presets ─── */
  const terracottaGlow = new THREE.MeshStandardMaterial({
    color: 0xD97757, emissive: 0xD97757, emissiveIntensity: 0.55,
    metalness: 0.35, roughness: 0.25,
  });
  const brassPolished = new THREE.MeshStandardMaterial({
    color: 0xc4955a, emissive: 0x221100, emissiveIntensity: 0.18,
    metalness: 0.92, roughness: 0.12,
  });
  const darkSteel = new THREE.MeshStandardMaterial({
    color: 0x1a1a1a, emissive: 0x000000, emissiveIntensity: 0,
    metalness: 0.96, roughness: 0.08,
  });
  const marbleWhite = new THREE.MeshStandardMaterial({
    color: 0xe8e4dd, emissive: 0x050505, emissiveIntensity: 0.04,
    metalness: 0.05, roughness: 0.5,
  });
  const pillarStone = new THREE.MeshStandardMaterial({
    color: 0x3a3530, emissive: 0x050302, emissiveIntensity: 0.06,
    metalness: 0.08, roughness: 0.7,
  });
  const goldAccent = new THREE.MeshStandardMaterial({
    color: 0xd4a853, emissive: 0x332200, emissiveIntensity: 0.12,
    metalness: 0.9, roughness: 0.13,
  });

  /* ─── Depth layers for parallax ─── */
  const layerFar = new THREE.Group();   // z < -4
  layerFar.name = 'layer-far';
  const layerMid = new THREE.Group();   // z = -3 to -2
  layerMid.name = 'layer-mid';
  const layerNear = new THREE.Group();  // z = -2 to -1
  layerNear.name = 'layer-near';
  const layerFore = new THREE.Group();  // z = 0+
  layerFore.name = 'layer-fore';
  scene.add(layerFar);
  scene.add(layerMid);
  scene.add(layerNear);
  scene.add(layerFore);

  /* ═════════════════════════════════════════
     SCALES OF JUSTICE (layerNear — centerpiece)
     ═════════════════════════════════════════ */
  const scalesGroup = new THREE.Group();

  // Central pillar (tapered)
  const pillarGeo = new THREE.CylinderGeometry(0.05, 0.07, 3.4, 20);
  const pillar = new THREE.Mesh(pillarGeo, darkSteel);
  pillar.position.y = 0.5;
  scalesGroup.add(pillar);

  // Base block (tiered)
  for (let i = 0; i < 3; i++) {
    const s = 0.5 - i * 0.08;
    const bh = 0.12 - i * 0.02;
    const baseGeo = new THREE.BoxGeometry(s, bh, s);
    const base = new THREE.Mesh(baseGeo, i === 0 ? brassPolished : goldAccent);
    base.position.y = -1.2 - i * 0.1;
    scalesGroup.add(base);
  }

  // Cross beam
  const beamGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.8, 12);
  const beam = new THREE.Mesh(beamGeo, brassPolished);
  beam.rotation.z = Math.PI / 2;
  beam.position.y = 1.95;
  scalesGroup.add(beam);

  // Decorative top finial
  const finialGeo = new THREE.SphereGeometry(0.13, 16, 16);
  const finial = new THREE.Mesh(finialGeo, terracottaGlow);
  finial.position.y = 2.2;
  scalesGroup.add(finial);

  // Scale pans (bowls)
  const panGeo = new THREE.SphereGeometry(0.2, 20, 10, 0, Math.PI * 2, 0, Math.PI * 0.5);
  const leftPan = new THREE.Mesh(panGeo, brassPolished);
  leftPan.position.set(-0.8, 1.5, 0);
  scalesGroup.add(leftPan);

  const rightPan = new THREE.Mesh(panGeo, brassPolished);
  rightPan.position.set(0.8, 1.5, 0);
  scalesGroup.add(rightPan);

  // Pan chains
  const chainGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.5, 6);
  for (let side = -1; side <= 1; side += 2) {
    for (let front = -0.07; front <= 0.07; front += 0.14) {
      const chain = new THREE.Mesh(chainGeo, darkSteel);
      chain.position.set(side * 0.8, 1.7, front);
      scalesGroup.add(chain);
    }
  }

  // Decorative rings on pillar
  const ringGeo = new THREE.TorusGeometry(0.11, 0.022, 8, 20);
  for (let py = -0.1; py <= 1.3; py += 0.7) {
    const ring = new THREE.Mesh(ringGeo, terracottaGlow);
    ring.position.y = py;
    ring.rotation.x = Math.PI / 2;
    scalesGroup.add(ring);
  }

  scalesGroup.position.set(0, 0.2, -2);
  layerNear.add(scalesGroup);

  /* ═════════════════════════════════════════
     COURTHOUSE PILLARS (layerMid — flanking)
     ═════════════════════════════════════════ */
  function createPillar(x, z) {
    const pillarGroup = new THREE.Group();

    // Main column shaft
    const shaftGeo = new THREE.CylinderGeometry(0.15, 0.18, 5, 16);
    const shaft = new THREE.Mesh(shaftGeo, pillarStone);
    shaft.position.y = 0;
    pillarGroup.add(shaft);

    // Fluting lines (vertical grooves on the shaft)
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const lineGeo = new THREE.CylinderGeometry(0.01, 0.01, 4.6, 4);
      const line = new THREE.Mesh(lineGeo, darkSteel);
      line.position.set(Math.cos(angle) * 0.16, 0, Math.sin(angle) * 0.16);
      pillarGroup.add(line);
    }

    // Capital (top decorative part)
    const capitalGeo = new THREE.CylinderGeometry(0.2, 0.15, 0.3, 16);
    const capital = new THREE.Mesh(capitalGeo, marbleWhite);
    capital.position.y = 2.65;
    pillarGroup.add(capital);

    // Capital top plate
    const capTopGeo = new THREE.BoxGeometry(0.5, 0.1, 0.5);
    const capTop = new THREE.Mesh(capTopGeo, marbleWhite);
    capTop.position.y = 2.85;
    pillarGroup.add(capTop);

    // Capital bottom ring
    const capRingGeo = new THREE.TorusGeometry(0.18, 0.03, 8, 16);
    const capRing = new THREE.Mesh(capRingGeo, goldAccent);
    capRing.position.y = 2.5;
    capRing.rotation.x = Math.PI / 2;
    pillarGroup.add(capRing);

    // Base
    const baseGeo = new THREE.CylinderGeometry(0.2, 0.22, 0.25, 16);
    const base = new THREE.Mesh(baseGeo, marbleWhite);
    base.position.y = -2.6;
    pillarGroup.add(base);

    const basePlatGeo = new THREE.BoxGeometry(0.55, 0.08, 0.55);
    const basePlat = new THREE.Mesh(basePlatGeo, marbleWhite);
    basePlat.position.y = -2.75;
    pillarGroup.add(basePlat);

    pillarGroup.position.set(x, -0.3, z);
    return pillarGroup;
  }

  const leftPillar = createPillar(-4.5, -3.5);
  const rightPillar = createPillar(4.5, -3.5);
  layerMid.add(leftPillar);
  layerMid.add(rightPillar);

  /* ═════════════════════════════════════════
     FLOATING LAW TEXT RIBBONS (layerMid/Far)
     Ribbons represent paragraphs of legal text
     ═════════════════════════════════════════ */
  const ribbonGroup = new THREE.Group();
  const ribbons = [];

  // Legal phrases to texture onto ribbons (Indian law references)
  const lawPhrases = [
    'Article 21 — Protection of Life and Personal Liberty',
    'Section 37 NDPS — Twin Conditions for Bail',
    'Article 226 — Power of High Courts to Issue Writs',
    'Section 528 BNSS — Inherent Powers of High Court',
    'Article 32 — Right to Constitutional Remedies',
    'Section 482 CrPC — Saving of Inherent Powers',
    'Article 19 — Protection of Certain Rights',
    'Section 187 BNSS — Default Bail',
    'Section 436A CrPC — Maximum Period of Detention',
    'Article 14 — Equality Before Law',
    'Section 41A CrPC — Notice of Appearance',
    'Section 156(3) CrPC — Magistrate Ordering Investigation',
  ];

  function createLawRibbon(text, x, y, z, rotY, speed) {
    const canvas2d = document.createElement('canvas');
    canvas2d.width = 512;
    canvas2d.height = 64;
    const ctx = canvas2d.getContext('2d');
    ctx.fillStyle = 'rgba(0,0,0,0)';
    ctx.fillRect(0, 0, 512, 64);
    ctx.font = '22px "Times New Roman", serif';
    ctx.fillStyle = 'rgba(191, 155, 48,0.85)';
    ctx.textAlign = 'center';
    ctx.fillText(text, 256, 40);

    const texture = new THREE.CanvasTexture(canvas2d);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;

    const planeGeo = new THREE.PlaneGeometry(3.5, 0.44, 1, 1);
    const planeMat = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const ribbon = new THREE.Mesh(planeGeo, planeMat);
    ribbon.position.set(x, y, z);
    ribbon.rotation.y = rotY;
    ribbon.userData = { baseY: y, speed, phase: Math.random() * Math.PI * 2 };
    return ribbon;
  }

  lawPhrases.forEach((phrase, i) => {
    const x = (Math.random() - 0.5) * 10;
    const y = Math.random() * 5 - 1;
    const z = -4 - Math.random() * 4;
    const rotY = (Math.random() - 0.5) * Math.PI;
    const speed = 0.3 + Math.random() * 0.7;
    const ribbon = createLawRibbon(phrase, x, y, z, rotY, speed);
    ribbon.userData.layerIndex = i % 3;
    ribbonGroup.add(ribbon);
    ribbons.push(ribbon);
  });

  // Additional floating abstract paragraph blocks (thick semi-transparent rects)
  for (let i = 0; i < 8; i++) {
    const blockGeo = new THREE.BoxGeometry(1.2 + Math.random() * 1.5, 0.4 + Math.random() * 0.8, 0.04);
    const blockMat = new THREE.MeshStandardMaterial({
      color: 0xD97757,
      emissive: 0xD97757,
      emissiveIntensity: 0.12,
      metalness: 0.1,
      roughness: 0.4,
      transparent: true,
      opacity: 0.18 + Math.random() * 0.12,
      depthWrite: false,
    });
    const block = new THREE.Mesh(blockGeo, blockMat);
    block.position.set((Math.random() - 0.5) * 9, Math.random() * 5 - 1.5, -3 - Math.random() * 5);
    block.rotation.set(Math.random() * 0.4, (Math.random() - 0.5) * Math.PI, Math.random() * 0.3);
    block.userData = {
      baseY: block.position.y,
      rotSpeed: 0.05 + Math.random() * 0.15,
      bobSpeed: 0.2 + Math.random() * 0.5,
      phase: Math.random() * Math.PI * 2,
    };
    ribbonGroup.add(block);
    ribbons.push(block);
  }

  layerMid.add(ribbonGroup);

  /* ═════════════════════════════════════════
     INTERACTIVE BEACON (layerNear — responds to cursor)
     ═════════════════════════════════════════ */
  const beaconGroup = new THREE.Group();

  // Core orb
  const coreGeo = new THREE.IcosahedronGeometry(0.25, 2);
  const coreMat = new THREE.MeshStandardMaterial({
    color: 0xD97757,
    emissive: 0xD97757,
    emissiveIntensity: 0.8,
    metalness: 0.2,
    roughness: 0.3,
  });
  const coreOrb = new THREE.Mesh(coreGeo, coreMat);
  beaconGroup.add(coreOrb);

  // Outer wireframe ring
  const outerRingGeo = new THREE.TorusGeometry(0.45, 0.015, 8, 32);
  const outerRing = new THREE.Mesh(outerRingGeo, new THREE.MeshBasicMaterial({
    color: 0xD97757, transparent: true, opacity: 0.5, depthWrite: false,
  }));
  beaconGroup.add(outerRing);

  // Second diagonal ring
  const ring2 = new THREE.Mesh(new THREE.TorusGeometry(0.38, 0.012, 8, 32),
    new THREE.MeshBasicMaterial({ color: 0xff9f6b, transparent: true, opacity: 0.4, depthWrite: false }));
  ring2.rotation.x = Math.PI / 2;
  beaconGroup.add(ring2);

  // Third ring
  const ring3 = new THREE.Mesh(new THREE.TorusGeometry(0.4, 0.01, 8, 28),
    new THREE.MeshBasicMaterial({ color: 0xD97757, transparent: true, opacity: 0.3, depthWrite: false }));
  ring3.rotation.z = Math.PI / 2;
  beaconGroup.add(ring3);

  // Glow particles around beacon
  const glowCount = 30;
  const glowParticles = [];
  for (let i = 0; i < glowCount; i++) {
    const size = 0.015 + Math.random() * 0.03;
    const pGeo = new THREE.SphereGeometry(size, 4, 4);
    const pMat = new THREE.MeshBasicMaterial({ color: 0xD97757, transparent: true, opacity: 0.5, depthWrite: false });
    const particle = new THREE.Mesh(pGeo, pMat);
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;
    const r = 0.5 + Math.random() * 0.4;
    particle.position.set(
      Math.sin(phi) * Math.cos(theta) * r,
      Math.sin(phi) * Math.sin(theta) * r,
      Math.cos(phi) * r,
    );
    particle.userData = {
      basePos: particle.position.clone(),
      orbitSpeed: 0.5 + Math.random() * 1.5,
      phase: Math.random() * Math.PI * 2,
    };
    beaconGroup.add(particle);
    glowParticles.push(particle);
  }

  beaconGroup.position.set(0, 1.2, -1.2);
  layerNear.add(beaconGroup);

  /* ═════════════════════════════════════════
     ORBIT RINGS (layerMid — geometric halos)
     ═════════════════════════════════════════ */
  const orbitRings = [];
  const ringMatPresets = [];
  for (let i = 0; i < 7; i++) {
    const radius = 2.0 + i * 0.45;
    const tube = 0.008 + i * 0.004;
    const geo = new THREE.TorusGeometry(radius, tube, 16, i === 0 ? 80 : 140);
    const emissiveIntensity = 0.10 + i * 0.08;
    const mat = new THREE.MeshStandardMaterial({
      color: 0xD97757, emissive: 0xD97757, emissiveIntensity,
      metalness: 0.12, roughness: 0.5, transparent: true,
      opacity: 0.4 - i * 0.05,
    });
    ringMatPresets.push({ emissiveIntensity, baseOpacity: mat.opacity });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.rotation.x = Math.PI * 0.35 + i * 0.1;
    mesh.rotation.y = i * 0.6;
    mesh.userData = {
      baseRotX: mesh.rotation.x, baseRotY: mesh.rotation.y,
      speedX: 0.1 + Math.random() * 0.2, speedY: 0.08 + Math.random() * 0.25,
      speedZ: 0.03 + Math.random() * 0.08, radius, index: i,
    };
    layerMid.add(mesh);
    orbitRings.push(mesh);
  }

  /* ═════════════════════════════════════════
     PARTICLE SYSTEMS
     ═════════════════════════════════════════ */

  // Layer 1: Fine ambient dust (dense, slow drift)
  const dustCount = 500;
  const dustGeo = new THREE.BufferGeometry();
  const dustPos = new Float32Array(dustCount * 3);
  for (let i = 0; i < dustCount; i++) {
    dustPos[i * 3] = (Math.random() - 0.5) * 20;
    dustPos[i * 3 + 1] = (Math.random() - 0.5) * 16;
    dustPos[i * 3 + 2] = (Math.random() - 0.5) * 12;
  }
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
  const dustMat = new THREE.PointsMaterial({
    color: 0xD97757, size: 0.02, transparent: true, opacity: 0.35,
    blending: THREE.AdditiveBlending, depthWrite: false,
  });
  const dust = new THREE.Points(dustGeo, dustMat);
  layerMid.add(dust);

  // Layer 2: Bright spark particles (medium density, faster)
  const sparkCount = 150;
  const sparkGeo = new THREE.BufferGeometry();
  const sparkPositions = new Float32Array(sparkCount * 3);
  const sparkData = [];
  for (let i = 0; i < sparkCount; i++) {
    sparkPositions[i * 3] = (Math.random() - 0.5) * 16;
    sparkPositions[i * 3 + 1] = (Math.random() - 0.5) * 14;
    sparkPositions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    sparkData.push({
      baseY: sparkPositions[i * 3 + 1],
      speed: 0.3 + Math.random() * 1.5,
      amplitude: 0.5 + Math.random() * 3,
      phase: Math.random() * Math.PI * 2,
    });
  }
  sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPositions, 3));
  const sparkMat = new THREE.PointsMaterial({
    color: 0xff9966, size: 0.035, transparent: true, opacity: 0.6,
    blending: THREE.AdditiveBlending, depthWrite: false,
  });
  const sparks = new THREE.Points(sparkGeo, sparkMat);
  layerNear.add(sparks);

  // Layer 3: Large glowing orbs (rare, dramatic)
  const orbCount = 25;
  const orbs = [];
  for (let i = 0; i < orbCount; i++) {
    const size = 0.03 + Math.random() * 0.12;
    const orbGeo = new THREE.SphereGeometry(size, 8, 8);
    const orbMat = new THREE.MeshBasicMaterial({
      color: 0xD97757, transparent: true,
      opacity: 0.4 + Math.random() * 0.45, depthWrite: false,
    });
    const orb = new THREE.Mesh(orbGeo, orbMat);
    orb.position.set(
      (Math.random() - 0.5) * 16,
      (Math.random() - 0.5) * 14,
      (Math.random() - 0.5) * 9,
    );
    orb.userData = {
      base: orb.position.clone(),
      speed: 0.15 + Math.random() * 0.7,
      amplitude: 0.5 + Math.random() * 3.5,
      phase: Math.random() * Math.PI * 2,
      attractionWeight: Math.random(),
    };
    layerNear.add(orb);
    orbs.push(orb);
  }

  // Layer 4: Cursor trail particles (follow mouse)
  const trailCount = 40;
  const trailGeo = new THREE.BufferGeometry();
  const trailPositions = new Float32Array(trailCount * 3);
  const trailDataArr = [];
  for (let i = 0; i < trailCount; i++) {
    trailPositions[i * 3] = 0;
    trailPositions[i * 3 + 1] = 0;
    trailPositions[i * 3 + 2] = 1;
    trailDataArr.push({ lag: i / trailCount, phase: Math.random() * Math.PI * 2 });
  }
  trailGeo.setAttribute('position', new THREE.BufferAttribute(trailPositions, 3));
  const trailMat = new THREE.PointsMaterial({
    color: 0xff9f6b, size: 0.03, transparent: true, opacity: 0.5,
    blending: THREE.AdditiveBlending, depthWrite: false,
  });
  const trailPoints = new THREE.Points(trailGeo, trailMat);
  layerFore.add(trailPoints);

  /* ═════════════════════════════════════════
     GROUND GRID (subtle reference plane)
     ═════════════════════════════════════════ */
  const gridHelper = new THREE.PolarGridHelper(8, 36, 28, 72, 0xD97757, 0xD97757);
  gridHelper.position.y = -4.2;
  gridHelper.material.opacity = 0.06;
  gridHelper.material.transparent = true;
  gridHelper.material.depthWrite = false;
  layerFar.add(gridHelper);

  /* ═════════════════════════════════════════
     FLOATING LAW BOOK (layerMid)
     ═════════════════════════════════════════ */
  const bookGroup = new THREE.Group();

  const coverGeo = new THREE.BoxGeometry(0.65, 0.85, 0.11);
  const cover = new THREE.Mesh(coverGeo, new THREE.MeshStandardMaterial({
    color: 0x1a0a05, emissive: 0x1a0a05, emissiveIntensity: 0.25,
    metalness: 0.1, roughness: 0.65,
  }));
  bookGroup.add(cover);

  const spineGeo = new THREE.BoxGeometry(0.05, 0.76, 0.13);
  const spine = new THREE.Mesh(spineGeo, goldAccent);
  spine.position.set(-0.31, 0, 0);
  bookGroup.add(spine);

  for (let ly = -0.25; ly <= 0.25; ly += 0.12) {
    const lineGeo = new THREE.BoxGeometry(0.06, 0.018, 0.14);
    const line = new THREE.Mesh(lineGeo, goldAccent);
    line.position.set(-0.31, ly, 0);
    bookGroup.add(line);
  }

  const pagesGeo = new THREE.BoxGeometry(0.6, 0.8, 0.01);
  const pagesTop = new THREE.Mesh(pagesGeo, new THREE.MeshStandardMaterial({
    color: 0xf5f0e8, emissive: 0x080808, emissiveIntensity: 0.08, roughness: 0.75,
  }));
  pagesTop.position.y = 0.04;
  bookGroup.add(pagesTop);

  bookGroup.position.set(-4, -0.2, -3);
  bookGroup.rotation.set(-0.2, 0.5, 0.12);
  layerMid.add(bookGroup);

  /* ═════════════════════════════════════════
     ANIMATION LOOP
     ═════════════════════════════════════════ */
  const clock = new THREE.Clock();
  const mousePos3D = new THREE.Vector3();

  function animate() {
    requestAnimationFrame(animate);

    const dt = Math.min(clock.getDelta(), 0.1);
    const t = clock.getElapsedTime();

    // Smooth mouse follow
    mouse.x += (mouse.tx - mouse.x) * 3.0 * dt;
    mouse.y += (mouse.ty - mouse.y) * 3.0 * dt;

    // Smooth scroll
    scrollY += (targetScrollY - scrollY) * 2.5 * dt;

    // Compute mouse velocity for dynamic effects
    const mouseVelX = (mouse.tx - mouse.prevTx) / Math.max(dt, 0.001);
    const mouseVelY = (mouse.ty - mouse.prevTy) / Math.max(dt, 0.001);
    mouse.prevTx = mouse.tx;
    mouse.prevTy = mouse.ty;

    // Convert mouse to 3D world position at z=0 plane
    mousePos3D.set(mouse.x * 5, mouse.y * 3.5, 0);

    // Camera parallax
    const scrollFactor = scrollY * 0.0006;
    camera.position.x += ((mouse.x * 0.5 - scrollFactor * 0.4) - camera.position.x) * 1.0 * dt;
    camera.position.y += ((0.6 + mouse.y * 0.3 + scrollFactor * 0.25) - camera.position.y) * 1.0 * dt;
    camera.lookAt(0, 0.2, -3);

    // Scales of Justice
    scalesGroup.rotation.y += (mouse.x * 0.25 - scalesGroup.rotation.y) * 0.7 * dt;
    scalesGroup.rotation.z = mouse.y * 0.12;
    scalesGroup.position.y = 0.2 + Math.sin(t * 0.3) * 0.25;

    const panBob = Math.sin(t * 0.6) * 0.08;
    leftPan.position.y = 1.5 + panBob + mouse.y * 0.04;
    rightPan.position.y = 1.5 - panBob - mouse.y * 0.04;

    // Pillars — subtle rotation toward viewer
    leftPillar.rotation.y += (mouse.x * 0.08 - leftPillar.rotation.y) * 0.4 * dt;
    rightPillar.rotation.y += (mouse.x * 0.08 - rightPillar.rotation.y) * 0.4 * dt;

    // Orbit rings
    orbitRings.forEach((ring, i) => {
      ring.rotation.x += ring.userData.speedX * 0.008 * dt;
      ring.rotation.y += ring.userData.speedY * 0.008 * dt;
      ring.rotation.z += ring.userData.speedZ * 0.008 * dt;
      const breathe = 1 + Math.sin(t * 0.35 + i * 0.6) * 0.18;
      ring.material.opacity = Math.min(0.5, ringMatPresets[i].baseOpacity * breathe);
      ring.position.z = scrollY * 0.00025 * (i + 1);
    });

    // Law text ribbons
    ribbons.forEach((ribbon, i) => {
      if (ribbon.geometry.type === 'PlaneGeometry') {
        ribbon.position.y = ribbon.userData.baseY + Math.sin(t * ribbon.userData.speed + ribbon.userData.phase) * 0.6;
        ribbon.rotation.y += 0.08 * dt;
        // Fade based on proximity to center of view
        const distFromCenter = Math.abs(ribbon.position.x);
        ribbon.material.opacity = 0.35 * (1 - distFromCenter / 8);
      } else {
        // Block paragraphs
        ribbon.rotation.y += ribbon.userData.rotSpeed * dt;
        ribbon.position.y = ribbon.userData.baseY + Math.sin(t * ribbon.userData.bobSpeed + ribbon.userData.phase) * 0.5;
      }
    });

    // Beacon interactive response
    const beaconTargetX = mouse.x * 2.5;
    const beaconTargetY = 1.2 + mouse.y * 1.0;
    beaconGroup.position.x += (beaconTargetX - beaconGroup.position.x) * 1.5 * dt;
    beaconGroup.position.y += (beaconTargetY - beaconGroup.position.y) * 1.5 * dt;
    coreOrb.rotation.x += 0.4 * dt;
    coreOrb.rotation.y += 0.6 * dt;
    outerRing.rotation.x += 0.5 * dt;
    outerRing.rotation.y += 0.7 * dt;
    ring2.rotation.z += 0.45 * dt;
    ring3.rotation.x += 0.55 * dt;

    // Mouse proximity → beacon glow intensity
    const beaconToMouse = Math.abs(beaconGroup.position.x - mouse.x * 5);
    const proximityGlow = Math.max(0, 1 - beaconToMouse / 3);
    coreOrb.material.emissiveIntensity = 0.8 + proximityGlow * 0.7;
    coreOrb.material.opacity = 1;

    // Glow particles orbit + attract toward mouse
    glowParticles.forEach(p => {
      const ud = p.userData;
      const theta = t * ud.orbitSpeed + ud.phase;
      const attractX = mouse.x * 0.3;
      const attractY = mouse.y * 0.2;
      p.position.x = ud.basePos.x + Math.cos(theta) * 0.15 + attractX;
      p.position.y = ud.basePos.y + Math.sin(theta) * 0.15 + attractY;
      p.position.z = ud.basePos.z + Math.sin(theta * 0.7) * 0.1;
      p.material.opacity = 0.3 + proximityGlow * 0.5;
    });

    // Cursor trail
    const trailArr = trailPoints.geometry.attributes.position.array;
    for (let i = 0; i < trailCount; i++) {
      const td = trailDataArr[i];
      const lagFactor = td.lag * 0.15;
      trailArr[i * 3] = mouse.x * 6 + Math.sin(t * 2 + td.phase) * 0.1 - mouseVelX * lagFactor;
      trailArr[i * 3 + 1] = mouse.y * 4 + Math.cos(t * 2.5 + td.phase) * 0.1 - mouseVelY * lagFactor;
      trailArr[i * 3 + 2] = 0.5 + td.lag * 3;
    }
    trailPoints.geometry.attributes.position.needsUpdate = true;

    // Dust rotation
    dust.rotation.y += 0.03 * dt;
    dust.rotation.x += 0.01 * dt;

    // Sparks
    const sparkPosArr = sparks.geometry.attributes.position.array;
    for (let i = 0; i < sparkCount; i++) {
      const d = sparkData[i];
      sparkPosArr[i * 3 + 1] = d.baseY + Math.sin(t * d.speed + d.phase) * d.amplitude;
      sparkPosArr[i * 3] += Math.cos(t * 0.4 + d.phase) * 0.12 * dt;
    }
    sparks.geometry.attributes.position.needsUpdate = true;
    sparks.rotation.y += 0.06 * dt;

    // Orbs — some attracted to mouse
    orbs.forEach(orb => {
      const ud = orb.userData;
      const baseX = ud.base.x + Math.sin(t * ud.speed + ud.phase) * ud.amplitude;
      const baseY = ud.base.y + Math.cos(t * ud.speed * 0.6 + ud.phase) * ud.amplitude * 0.6;
      const baseZ = ud.base.z + Math.cos(t * ud.speed * 0.4 + ud.phase) * ud.amplitude * 0.4;
      const attractToMouse = ud.attractionWeight * 0.3;
      orb.position.x += (baseX + mouse.x * 3 * attractToMouse - orb.position.x) * 0.8 * dt;
      orb.position.y += (baseY + mouse.y * 2 * attractToMouse - orb.position.y) * 0.8 * dt;
      orb.position.z += (baseZ - orb.position.z) * 0.8 * dt;
    });

    // Book
    bookGroup.position.y = -0.2 + Math.sin(t * 0.45 + 1) * 0.35;
    bookGroup.rotation.y += 0.1 * dt;

    // Grid pulse
    gridHelper.material.opacity = 0.04 + Math.sin(t * 0.25) * 0.02;

    // Layer parallax — each depth layer responds to scroll differently
    layerFar.position.y = scrollY * 0.0002;
    layerMid.position.y = scrollY * 0.0004;
    layerNear.position.y = scrollY * 0.0006;
    layerFore.position.y = Math.sin(t * 0.5) * 0.1; // subtle breathing only

    // Dynamic lighting pulse
    const lightPulse = 1 + Math.sin(t * 0.5) * 0.15;
    keyLight.intensity = 16 * lightPulse;
    topGlow.intensity = 3 * (1 + Math.sin(t * 0.7) * 0.25);

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
