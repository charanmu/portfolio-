import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeHero = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Set up scene, camera, renderer
    const scene = new THREE.Scene();
    
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight || 400;

    const camera = new THREE.PerspectiveCamera(70, width / height, 0.1, 1000);
    camera.position.z = 4.2;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Mouse tracking variables for parallax interactive tilts
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    // Standard geometries for theme morphing
    const geometries = {
      green: new THREE.TorusKnotGeometry(1.0, 0.28, 120, 16),
      purple: new THREE.IcosahedronGeometry(1.3, 2),  // Geodesic sphere for AI
      blue: new THREE.OctahedronGeometry(1.4, 1)     // Database diamond for SQL
    };

    // Initialize with green torus knot
    let currentTheme = 'green';
    let activeGeometry = geometries.green;

    const material = new THREE.MeshPhysicalMaterial({
      color: 0x64ffda,       // Default Green Accent
      emissive: 0x072a20,
      roughness: 0.1,
      metalness: 0.95,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      wireframe: true
    });

    let mesh = new THREE.Mesh(activeGeometry, material);
    scene.add(mesh);

    // Ambient and Point Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x0f9d58, 4, 30);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x64ffda, 4, 30);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    // Underlying network wavy wireframe terrain
    const terrainGeometry = new THREE.PlaneGeometry(16, 16, 24, 24);
    const terrainMaterial = new THREE.MeshBasicMaterial({
      color: 0x64ffda,
      wireframe: true,
      transparent: true,
      opacity: 0.18
    });
    const terrain = new THREE.Mesh(terrainGeometry, terrainMaterial);
    terrain.rotation.x = -Math.PI / 2.2;
    terrain.position.y = -2.3;
    terrain.position.z = -0.5;
    scene.add(terrain);

    // Ambient floating space particles with home positions for gravity physics
    const particleCount = 200;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const initialPositions = []; // Store base coordinates for elastic return force

    for (let i = 0; i < particleCount * 3; i += 3) {
      const px = (Math.random() - 0.5) * 12;
      const py = (Math.random() - 0.5) * 12;
      const pz = (Math.random() - 0.5) * 8;
      
      particlePositions[i] = px;
      particlePositions[i + 1] = py;
      particlePositions[i + 2] = pz;

      initialPositions.push({ x: px, y: py, z: pz });
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x64ffda,
      size: 0.038,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Mouse movement listener
    const onMouseMove = (event) => {
      const rect = containerRef.current.getBoundingClientRect();
      const clientX = event.clientX - rect.left;
      const clientY = event.clientY - rect.top;
      mouse.targetX = (clientX / rect.width) * 2 - 1;
      mouse.targetY = -(clientY / rect.height) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Dynamic Theme MutationObserver routine
    const updateThemeStyles = (theme) => {
      if (theme === currentTheme) return;
      currentTheme = theme;

      // Morph geometry
      scene.remove(mesh);
      mesh.geometry.dispose();

      activeGeometry = geometries[theme];
      mesh = new THREE.Mesh(activeGeometry, material);
      scene.add(mesh);

      // Morph colors and light emissions across primary geometries, particles, and terrain mesh
      if (theme === 'purple') {
        material.color.setHex(0xa78bfa); // Purple accent
        material.emissive.setHex(0x2e1065);
        pointLight1.color.setHex(0x7c3aed);
        pointLight2.color.setHex(0xa78bfa);
        particleMaterial.color.setHex(0xa78bfa);
        terrainMaterial.color.setHex(0xa78bfa);
      } else if (theme === 'blue') {
        material.color.setHex(0x60a5fa); // Blue accent
        material.emissive.setHex(0x1e3a8a);
        pointLight1.color.setHex(0x2563eb);
        pointLight2.color.setHex(0x60a5fa);
        particleMaterial.color.setHex(0x60a5fa);
        terrainMaterial.color.setHex(0x60a5fa);
      } else {
        material.color.setHex(0x64ffda); // Green accent
        material.emissive.setHex(0x072a20);
        pointLight1.color.setHex(0x0f9d58);
        pointLight2.color.setHex(0x64ffda);
        particleMaterial.color.setHex(0x64ffda);
        terrainMaterial.color.setHex(0x64ffda);
      }
    };

    const observer = new MutationObserver(() => {
      const isPurple = document.body.classList.contains('theme-purple');
      const isBlue = document.body.classList.contains('theme-blue');
      const active = isPurple ? 'purple' : isBlue ? 'blue' : 'green';
      updateThemeStyles(active);
    });

    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    // Initial check in case of preset classes
    const initialPurple = document.body.classList.contains('theme-purple');
    const initialBlue = document.body.classList.contains('theme-blue');
    updateThemeStyles(initialPurple ? 'purple' : initialBlue ? 'blue' : 'green');

    // Animation Loop
    let animationFrameId;
    const animate = () => {
      const time = Date.now() * 0.001;

      // Ease mouse tracking for responsive tilts
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Base rotations combined with dynamic user mouse inputs
      mesh.rotation.x += 0.005 + mouse.y * 0.015;
      mesh.rotation.y += 0.007 + mouse.x * 0.015;
      mesh.rotation.z += 0.002;

      // Animate terrain vertices in a beautiful continuous sine-cosine signal wave
      const terrainPos = terrainGeometry.attributes.position.array;
      for (let i = 0; i < terrainPos.length; i += 3) {
        const x = terrainPos[i];
        const y = terrainPos[i + 1];
        terrainPos[i + 2] = Math.sin(x * 0.4 + time * 1.5) * Math.cos(y * 0.4 + time * 1.5) * 0.45;
      }
      terrainGeometry.attributes.position.needsUpdate = true;

      // Gravity-attraction and drift simulations for particles
      const pPositions = particleGeometry.attributes.position.array;
      for (let i = 0; i < particleCount * 3; i += 3) {
        // Add home elastic force back to default random positions
        const home = initialPositions[i / 3];
        pPositions[i] += (home.x - pPositions[i]) * 0.008;
        pPositions[i + 1] += (home.y - pPositions[i + 1]) * 0.008;

        // Drift slowly downwards
        pPositions[i + 1] -= 0.0025;
        if (pPositions[i + 1] < -6) pPositions[i + 1] = 6;

        // localized gravity well pull under cursor
        const targetWorldX = mouse.x * 5.0;
        const targetWorldY = mouse.y * 4.0;
        
        const dx = targetWorldX - pPositions[i];
        const dy = targetWorldY - pPositions[i + 1];
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 2.5) {
          const force = (2.5 - dist) * 0.025; // Pull force scaling
          pPositions[i] += (dx / dist) * force;
          pPositions[i + 1] += (dy / dist) * force;
        }
      }
      particleGeometry.attributes.position.needsUpdate = true;

      // Particle overall rotations
      particles.rotation.y += 0.0006 + mouse.x * 0.0008;
      particles.rotation.x += 0.0003 + mouse.y * 0.0008;
      
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight || 400;
      
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometries.green.dispose();
      geometries.purple.dispose();
      geometries.blue.dispose();
      terrainGeometry.dispose();
      terrainMaterial.dispose();
      material.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="three-canvas-container" style={{ width: '100%', height: '100%', minHeight: '350px' }} />;
};

export default ThreeHero;
