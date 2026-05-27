import { useMemo } from 'react';
import * as THREE from 'three';

function PlantPot({ position, scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      {/* Pot */}
      <mesh position={[0, 0.2, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.2, 0.3, 12]} />
        <meshStandardMaterial color="#8B4513" roughness={0.9} />
      </mesh>

      {/* Soil */}
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.14, 0.14, 0.04, 12]} />
        <meshStandardMaterial color="#3d2b1f" />
      </mesh>

      {/* Stem */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.025, 0.25, 6]} />
        <meshStandardMaterial color="#2d7d3a" />
      </mesh>

      {/* Leaves */}
      <mesh position={[0.1, 0.65, 0.05]} castShadow>
        <sphereGeometry args={[0.12, 8, 8]} />
        <meshStandardMaterial color="#3a9d4a" />
      </mesh>
      <mesh position={[-0.08, 0.7, 0.06]} castShadow>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color="#4aad5a" />
      </mesh>
      <mesh position={[0.05, 0.75, -0.08]} castShadow>
        <sphereGeometry args={[0.09, 8, 8]} />
        <meshStandardMaterial color="#3a9d4a" />
      </mesh>
      <mesh position={[-0.05, 0.6, -0.1]} castShadow>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color="#4aad5a" />
      </mesh>
    </group>
  );
}

function Bench({ position, rotation = 0 }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <mesh position={[0, 0.24, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.06, 0.4]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.28, 0]} receiveShadow>
        <boxGeometry args={[1.2, 0.02, 0.4]} />
        <meshStandardMaterial color="#ffffff" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.5, -0.2]} castShadow>
        <boxGeometry args={[1.2, 0.4, 0.06]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>
      <mesh position={[-0.5, 0.08, -0.15]} castShadow>
        <boxGeometry args={[0.06, 0.2, 0.06]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[0.5, 0.08, -0.15]} castShadow>
        <boxGeometry args={[0.06, 0.2, 0.06]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[-0.5, 0.08, 0.15]} castShadow>
        <boxGeometry args={[0.06, 0.2, 0.06]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[0.5, 0.08, 0.15]} castShadow>
        <boxGeometry args={[0.06, 0.2, 0.06]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[-0.58, 0.4, -0.12]} castShadow>
        <boxGeometry args={[0.04, 0.3, 0.06]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[0.58, 0.4, -0.12]} castShadow>
        <boxGeometry args={[0.04, 0.3, 0.06]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
    </group>
  );
}

function TableSet({ position, rotation = 0, scale = 1.2 }) {
  return (
    <group position={position} rotation={[0, rotation, 0]} scale={scale}>
      {/* Table top */}
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.06, 16]} />
        <meshStandardMaterial color="#f0f0f0" roughness={0.5} />
      </mesh>

      {/* Table leg */}
      <mesh position={[0, 0.2, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.05, 0.35, 8]} />
        <meshStandardMaterial color="#888888" metalness={0.4} roughness={0.3} />
      </mesh>

      {/* Table base */}
      <mesh position={[0, 0.03, 0]}>
        <cylinderGeometry args={[0.15, 0.18, 0.04, 12]} />
        <meshStandardMaterial color="#888888" metalness={0.4} roughness={0.3} />
      </mesh>

      {/* Chair 1 - front */}
      <Chair position={[0.3, 0, 0.3]} rotation={-Math.PI * 0.75} />
      {/* Chair 2 - back */}
      <Chair position={[-0.3, 0, -0.3]} rotation={Math.PI * 0.25} />
      {/* Chair 3 - left */}
      <Chair position={[-0.3, 0, 0.3]} rotation={Math.PI * 0.75} />
      {/* Chair 4 - right */}
      <Chair position={[0.3, 0, -0.3]} rotation={-Math.PI * 0.25} />
    </group>
  );
}

function Chair({ position, rotation = 0 }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* Seat */}
      <mesh position={[0, 0.22, 0]} castShadow>
        <boxGeometry args={[0.2, 0.04, 0.2]} />
        <meshStandardMaterial color="#4a4a4a" roughness={0.7} />
      </mesh>

      {/* Backrest */}
      <mesh position={[0, 0.38, -0.1]} castShadow>
        <boxGeometry args={[0.2, 0.25, 0.03]} />
        <meshStandardMaterial color="#4a4a4a" roughness={0.7} />
      </mesh>

      {/* Front left leg */}
      <mesh position={[-0.08, 0.10, 0.08]} castShadow>
        <cylinderGeometry args={[0.015, 0.018, 0.20, 6]} />
        <meshStandardMaterial color="#666666" metalness={0.3} roughness={0.5} />
      </mesh>

      {/* Front right leg */}
      <mesh position={[0.08, 0.10, 0.08]} castShadow>
        <cylinderGeometry args={[0.015, 0.018, 0.20, 6]} />
        <meshStandardMaterial color="#666666" metalness={0.3} roughness={0.5} />
      </mesh>

      {/* Back left leg */}
      <mesh position={[-0.08, 0.10, -0.08]} castShadow>
        <cylinderGeometry args={[0.015, 0.018, 0.20, 6]} />
        <meshStandardMaterial color="#666666" metalness={0.3} roughness={0.5} />
      </mesh>

      {/* Back right leg */}
      <mesh position={[0.08, 0.10, -0.08]} castShadow>
        <cylinderGeometry args={[0.015, 0.018, 0.20, 6]} />
        <meshStandardMaterial color="#666666" metalness={0.3} roughness={0.5} />
      </mesh>
    </group>
  );
}

function createParquetTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  const plankW = 64;
  const plankH = 128;
  const gap = 3;

  ctx.fillStyle = '#8B7355';
  ctx.fillRect(0, 0, 512, 512);

  for (let row = 0; row < Math.ceil(512 / (plankH + gap)); row++) {
    const offset = (row % 2) * (plankW / 2);
    for (let col = 0; col < Math.ceil(512 / (plankW + gap)) + 1; col++) {
      const x = col * (plankW + gap) + offset;
      const y = row * (plankH + gap);

      const r = 170 + Math.random() * 50;
      const g = 130 + Math.random() * 35;
      const b = 85 + Math.random() * 25;
      ctx.fillStyle = `rgb(${r | 0},${g | 0},${b | 0})`;
      ctx.fillRect(x, y, plankW, plankH);

      ctx.strokeStyle = `rgba(80, 55, 30, ${0.06 + Math.random() * 0.1})`;
      ctx.lineWidth = 1;
      for (let g = 0; g < 4; g++) {
        const gy = y + 10 + Math.random() * (plankH - 20);
        ctx.beginPath();
        ctx.moveTo(x, gy);
        for (let gx = x; gx < x + plankW; gx += 4) {
          ctx.lineTo(gx, gy + Math.sin(gx * 0.08 + g) * 1.5);
        }
        ctx.stroke();
      }
    }
  }

  return canvas;
}

function ParquetFloor() {
  const texture = useMemo(() => {
    const canvas = createParquetTexture();
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(4, 3.6);
    tex.anisotropy = 4;
    return tex;
  }, []);

  return (
    <mesh position={[0, 0.01, 40]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[20, 18]} />
      <meshStandardMaterial map={texture} roughness={0.7} metalness={0} />
    </mesh>
  );
}

function TrashCan({ position }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.15, 0.18, 0.5, 12]} />
        <meshStandardMaterial color="#2e7d32" roughness={0.85} />
      </mesh>
      <mesh position={[0, 0.55, 0]}>
        <torusGeometry args={[0.17, 0.025, 8, 12]} />
        <meshStandardMaterial color="#1b5e20" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.13, 0.15, 0.03, 12]} />
        <meshStandardMaterial color="#1b5e20" roughness={0.7} />
      </mesh>
    </group>
  );
}

function createFenceTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  const picketW = 20;
  const gap = 6;
  const span = picketW + gap;

  for (let x = 0; x < 256; x += span) {
    const base = 150 + Math.random() * 60;
    ctx.fillStyle = `rgb(${base | 0},${(base * 0.7) | 0},${(base * 0.45) | 0})`;
    ctx.fillRect(x, 2, picketW, 252);

    ctx.fillStyle = `rgba(0,0,0,0.06)`;
    ctx.fillRect(x + 2, 2, 3, 252);

    ctx.strokeStyle = `rgba(60, 35, 15, 0.12)`;
    ctx.lineWidth = 1;
    for (let g = 0; g < 2; g++) {
      const gy = 10 + Math.random() * 236;
      ctx.beginPath();
      ctx.moveTo(x + 2, gy);
      for (let gx = x + 2; gx < x + picketW - 2; gx += 3) {
        ctx.lineTo(gx, gy + Math.sin(gx * 0.06 + g) * 1.2);
      }
      ctx.stroke();
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

function FenceSection({ position, size, texture }) {
  return (
    <group>
      <mesh position={position} receiveShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial map={texture} roughness={0.9} />
      </mesh>
      <mesh position={[position[0], position[1] + size[1] / 2, position[2]]}>
        <boxGeometry args={[size[0], 0.025, size[2] + 0.02]} />
        <meshStandardMaterial color="#8B7355" roughness={0.9} />
      </mesh>
    </group>
  );
}

function drawFoodIcon(ctx, index, cx, cy, accent) {
  switch (index) {
    case 0: {
      ctx.fillStyle = accent;
      ctx.beginPath(); ctx.arc(cx, cy - 22, 25, Math.PI, 0); ctx.fill();
      ctx.fillRect(cx - 28, cy - 10, 56, 10);
      ctx.fillStyle = '#2ECC71'; ctx.fillRect(cx - 28, cy, 56, 5);
      ctx.fillStyle = '#E74C3C'; ctx.fillRect(cx - 28, cy + 6, 56, 4);
      ctx.fillStyle = accent;
      ctx.beginPath(); ctx.arc(cx, cy + 20, 20, 0, Math.PI * 2); ctx.fill();
      break;
    }
    case 1: {
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.moveTo(cx, cy - 35); ctx.lineTo(cx - 35, cy + 25); ctx.lineTo(cx + 35, cy + 25);
      ctx.closePath(); ctx.fill();
      ctx.fillStyle = '#E74C3C';
      for (const [dx, dy] of [[-15, -5], [10, 5], [-5, 15], [20, 10], [-20, 10]]) {
        ctx.beginPath(); ctx.arc(cx + dx, cy + dy, 5, 0, Math.PI * 2); ctx.fill();
      }
      break;
    }
    case 2: {
      ctx.strokeStyle = accent; ctx.lineWidth = 10; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.arc(cx - 22, cy + 5, 22, Math.PI * 1.2, Math.PI * 1.8); ctx.stroke();
      ctx.beginPath(); ctx.arc(cx + 22, cy + 5, 22, Math.PI * 1.2, Math.PI * 1.8); ctx.stroke();
      break;
    }
    case 3: {
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath(); ctx.moveTo(cx - 28, cy + 20); ctx.lineTo(cx - 22, cy - 25);
      ctx.lineTo(cx + 22, cy - 25); ctx.lineTo(cx + 28, cy + 20);
      ctx.closePath(); ctx.fill();
      ctx.fillStyle = accent; ctx.font = 'bold 28px Arial'; ctx.textAlign = 'center';
      ctx.textBaseline = 'middle'; ctx.fillText('KFC', cx, cy - 3);
      break;
    }
    case 4: {
      ctx.strokeStyle = accent; ctx.lineWidth = 5; ctx.lineCap = 'round';
      for (let i = 0; i < 5; i++) {
        ctx.beginPath(); const yy = cy - 20 + i * 10;
        for (let x = 0; x < 55; x += 4) ctx.lineTo(cx - 27 + x, yy + Math.sin(x * 0.25 + i) * 7);
        ctx.stroke();
      }
      break;
    }
    case 5: {
      ctx.fillStyle = accent;
      ctx.beginPath(); ctx.moveTo(cx - 5, cy - 28); ctx.lineTo(cx - 32, cy + 15); ctx.lineTo(cx + 22, cy + 15);
      ctx.closePath(); ctx.fill();
      ctx.fillStyle = '#F39C12';
      ctx.beginPath(); ctx.moveTo(cx + 5, cy - 28); ctx.lineTo(cx - 22, cy + 15); ctx.lineTo(cx + 32, cy + 15);
      ctx.closePath(); ctx.fill();
      break;
    }
    case 6: {
      ctx.fillStyle = accent;
      ctx.beginPath(); ctx.moveTo(cx - 16, cy + 12); ctx.lineTo(cx - 22, cy - 10);
      ctx.lineTo(cx + 22, cy - 10); ctx.lineTo(cx + 16, cy + 12);
      ctx.closePath(); ctx.fill();
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath(); ctx.arc(cx, cy - 10, 24, Math.PI, 0); ctx.fill();
      ctx.fillStyle = accent;
      ctx.beginPath(); ctx.arc(cx, cy - 10, 10, 0, Math.PI * 2); ctx.fill();
      break;
    }
  }
}

function createFoodTexture(index) {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 300;
  const ctx = canvas.getContext('2d');

  const foods = [
    { bg: '#C0392B', accent: '#F39C12', name: 'HAMBURGUESA' },
    { bg: '#E74C3C', accent: '#F1C40F', name: 'PIZZA' },
    { bg: '#DA291C', accent: '#FFD100', name: "McDONALD'S" },
    { bg: '#8B4513', accent: '#FF6B35', name: 'KFC' },
    { bg: '#E67E22', accent: '#2ECC71', name: 'PASTAS' },
    { bg: '#CD853F', accent: '#E74C3C', name: 'SÁNDWICHES' },
    { bg: '#E91E63', accent: '#F8BBD0', name: 'POSTRES' },
  ];

  const food = foods[index];
  ctx.fillStyle = food.bg;
  ctx.fillRect(0, 0, 256, 300);

  ctx.strokeStyle = 'rgba(255,255,255,0.15)';
  ctx.lineWidth = 3;
  ctx.strokeRect(10, 10, 236, 280);

  ctx.beginPath();
  ctx.arc(128, 140, 72, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255,255,255,0.1)';
  ctx.fill();

  drawFoodIcon(ctx, index, 128, 140, food.accent);

  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(0, 250, 256, 50);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 22px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(food.name, 128, 275);

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

function FoodPoster({ position, texture }) {
  return (
    <mesh position={position} receiveShadow>
      <boxGeometry args={[1.8, 2.08, 0.04]} />
      <meshStandardMaterial map={texture} roughness={0.6} />
    </mesh>
  );
}

function createSignTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 80;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, 800, 80);

  ctx.strokeStyle = '#CC0000';
  ctx.lineWidth = 4;
  ctx.strokeRect(6, 6, 788, 68);

  ctx.fillStyle = '#CC0000';
  ctx.font = 'bold 48px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('PATIO DE COMIDAS', 400, 40);

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

function EntranceFrame() {
  const postHeight = 2.2;
  const beamThick = 0.10;
  const gapHalf = 1.5;
  const signTexture = useMemo(() => createSignTexture(), []);
  const woodMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#8B5A2B',
    roughness: 0.9,
    metalness: 0,
  }), []);

  return (
    <group>
      <mesh position={[-gapHalf, postHeight / 2, 31]} castShadow material={woodMaterial}>
        <boxGeometry args={[0.12, postHeight, 0.12]} />
      </mesh>
      <mesh position={[gapHalf, postHeight / 2, 31]} castShadow material={woodMaterial}>
        <boxGeometry args={[0.12, postHeight, 0.12]} />
      </mesh>
      <mesh position={[0, postHeight + beamThick / 2, 31]} castShadow material={woodMaterial}>
        <boxGeometry args={[gapHalf * 2 + 0.12, beamThick, 0.12]} />
      </mesh>
      <mesh position={[0, postHeight - 0.10, 31.04]} castShadow>
        <boxGeometry args={[2.4, 0.20, 0.04]} />
        <meshStandardMaterial map={signTexture} roughness={0.6} />
      </mesh>
    </group>
  );
}

function Decorations() {
  const tablePositions = useMemo(() => {
    const spacing = 3;
    const row1z = 46;
    const row2z = 42.5;
    const row3z = 39;
    const xs = [-6, -3, 0, 3, 6];
    return xs.flatMap((x) => [
      { position: [x, 0, row1z], rotation: 0 },
      { position: [x, 0, row2z], rotation: 0 },
      { position: [x, 0, row3z], rotation: 0 },
    ]);
  }, []);

  const fenceHeight = 0.20;
  const fenceThick = 0.06;
  const fenceTexture = useMemo(() => createFenceTexture(), []);

  const fenceSections = useMemo(() => [
    { position: [0, fenceHeight / 2, 48.5], size: [20, fenceHeight, fenceThick] },
    { position: [-10, fenceHeight / 2, 35.5], size: [fenceThick, fenceHeight, 9] },
    { position: [-10, fenceHeight / 2, 45.5], size: [fenceThick, fenceHeight, 7] },
    { position: [10, fenceHeight / 2, 35.5], size: [fenceThick, fenceHeight, 9] },
    { position: [10, fenceHeight / 2, 45.5], size: [fenceThick, fenceHeight, 7] },
    { position: [-5.75, fenceHeight / 2, 31], size: [8.5, fenceHeight, fenceThick] },
    { position: [5.75, fenceHeight / 2, 31], size: [8.5, fenceHeight, fenceThick] },
  ], [fenceHeight]);

  const posterXs = useMemo(() => [-9, -6, -3, 0, 3, 6, 9], []);
  const posterTextures = useMemo(
    () => posterXs.map((_, i) => createFoodTexture(i)),
    [posterXs]
  );

  return (
    <group>
      <PlantPot position={[-15, 0, -3]} scale={1} />
      <PlantPot position={[15, 0, -3]} scale={1} />
      <PlantPot position={[-15, 0, 13]} scale={1} />
      <PlantPot position={[15, 0, 13]} scale={1} />
      <PlantPot position={[-4, 0, -16]} scale={0.9} />
      <PlantPot position={[4, 0, -16]} scale={0.9} />

      <mesh position={[-5.9875, 0.01, 0]}>
        <cylinderGeometry args={[1.125, 1.125, 0.02, 32]} />
        <meshStandardMaterial color="#999999" roughness={0.9} />
      </mesh>
      <mesh position={[5.9875, 0.01, 0]}>
        <cylinderGeometry args={[1.125, 1.125, 0.02, 32]} />
        <meshStandardMaterial color="#999999" roughness={0.9} />
      </mesh>
      <Bench position={[-5.9875, 0, 0]} rotation={Math.PI / 2} />
      <Bench position={[5.9875, 0, 0]} rotation={-Math.PI / 2} />
      <PlantPot position={[-1.85, 0, 30.6]} scale={1.1} />
      <PlantPot position={[1.85, 0, 30.6]} scale={1.1} />
      <Bench position={[-6, 0, -19]} rotation={Math.PI / 2} />
      <Bench position={[6, 0, -19]} rotation={-Math.PI / 2} />

      <ParquetFloor />

      {posterTextures.map((tex, i) => (
        <FoodPoster key={`poster-${i}`} position={[posterXs[i], 1.25, 48.5]} texture={tex} />
      ))}

      {fenceSections.map((s, i) => (
        <FenceSection key={`fence-${i}`} position={s.position} size={s.size} texture={fenceTexture} />
      ))}

      <EntranceFrame />

      {tablePositions.map((t, i) => (
        <TableSet key={i} position={t.position} rotation={t.rotation} scale={1.2} />
      ))}

      <TrashCan position={[-9, 0, 48]} />
      <TrashCan position={[9, 0, 48]} />
      <TrashCan position={[-9, 0, 32]} />
      <TrashCan position={[9, 0, 32]} />
    </group>
  );
}

export default Decorations;
