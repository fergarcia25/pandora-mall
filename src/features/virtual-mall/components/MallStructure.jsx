import { useMemo } from 'react';
import { RigidBody } from '@react-three/rapier';
import * as THREE from 'three';

const wallHeight = 10;
const wallThickness = 0.5;
const mallSize = 98;
const ceilingColor = '#87CEEB';

function createGridCanvas() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = ceilingColor;
  ctx.fillRect(0, 0, 512, 512);

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
  ctx.lineWidth = 2;
  const cellSize = 64;
  for (let i = 0; i <= 512; i += cellSize) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 512);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(512, i);
    ctx.stroke();
  }

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.lineWidth = 1;
  const halfCell = cellSize / 2;
  for (let i = halfCell; i <= 512; i += cellSize) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 512);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(512, i);
    ctx.stroke();
  }

  return canvas;
}

function WallSection({ position, size, color, texture }) {
  return (
    <RigidBody type="fixed" colliders="cuboid">
      <mesh position={position} receiveShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial color={color} map={texture || undefined} />
      </mesh>
    </RigidBody>
  );
}

function Wall({ position, size }) {
  const gridTexture = useMemo(() => {
    const canvas = createGridCanvas();
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(4, 1);
    return tex;
  }, []);

  const sectionHeight = size[1] / 4;
  const sectionSize = [size[0], sectionHeight, size[2]];
  const baseY = position[1] - size[1] / 2;

  const sections = [
    { y: baseY + sectionHeight * 0.5, color: '#ffffff', texture: null },
    { y: baseY + sectionHeight * 1.5, color: ceilingColor, texture: gridTexture },
    { y: baseY + sectionHeight * 2.5, color: ceilingColor, texture: gridTexture },
    { y: baseY + sectionHeight * 3.5, color: '#ffffff', texture: null },
  ];

  return (
    <group>
      {sections.map((s, i) => (
        <WallSection
          key={i}
          position={[position[0], s.y, position[2]]}
          size={sectionSize}
          color={s.color}
          texture={s.texture}
        />
      ))}
    </group>
  );
}

function Ceiling() {
  const texture = useMemo(() => {
    const canvas = createGridCanvas();
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
    return tex;
  }, []);

  return (
    <mesh position={[0, wallHeight, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[mallSize, mallSize]} />
      <meshStandardMaterial map={texture} side={THREE.DoubleSide} />
    </mesh>
  );
}

function MallStructure() {
  const half = mallSize / 2;

  return (
    <group>
      <Wall
        position={[0, wallHeight / 2, -half]}
        size={[mallSize, wallHeight, wallThickness]}
      />
      <Wall
        position={[0, wallHeight / 2, half]}
        size={[mallSize, wallHeight, wallThickness]}
      />
      <Wall
        position={[-half, wallHeight / 2, 0]}
        size={[wallThickness, wallHeight, mallSize]}
      />
      <Wall
        position={[half, wallHeight / 2, 0]}
        size={[wallThickness, wallHeight, mallSize]}
      />
      <Ceiling />
    </group>
  );
}

export default MallStructure;
