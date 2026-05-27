import { useMemo } from 'react';
import { CanvasTexture, RepeatWrapping } from 'three';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import { PottedPlant } from './StoreBox';

function createTileTexture() {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#f8f8f8';
  ctx.fillRect(0, 0, size, size);

  const tileSize = size / 8;
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const x = col * tileSize;
      const y = row * tileSize;
      const brightness = 248 - Math.random() * 8;
      ctx.fillStyle = `rgb(${brightness}, ${brightness}, ${brightness})`;
      ctx.fillRect(x + 1, y + 1, tileSize - 2, tileSize - 2);
      ctx.strokeStyle = '#d4d4d4';
      ctx.lineWidth = 1;
      ctx.strokeRect(x + 0.5, y + 0.5, tileSize - 1, tileSize - 1);
    }
  }

  const texture = new CanvasTexture(canvas);
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(16, 16);
  return texture;
}

function Ground() {
  const tileTexture = useMemo(() => createTileTexture(), []);

  return (
    <>
      <RigidBody type="fixed">
        <CuboidCollider args={[50, 0.1, 50]} position={[0, -0.1, 0]} />
      </RigidBody>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial
          map={tileTexture}
          roughness={0.3}
          metalness={0.05}
        />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
        <planeGeometry args={[1.2, 100]} />
        <meshStandardMaterial color="#2d2d44" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 30.6]}>
        <planeGeometry args={[20, 1.2]} />
        <meshStandardMaterial color="#2d2d44" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-10.4, 0.005, 39.75]}>
        <planeGeometry args={[1.2, 17.5]} />
        <meshStandardMaterial color="#2d2d44" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[10.4, 0.005, 39.75]}>
        <planeGeometry args={[1.2, 17.5]} />
        <meshStandardMaterial color="#2d2d44" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 48.6]}>
        <planeGeometry args={[20, 1.2]} />
        <meshStandardMaterial color="#2d2d44" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-9.8, 0.005, 31.2]}>
        <ringGeometry args={[0.001, 1.2, 24, 1, Math.PI, Math.PI / 2]} />
        <meshStandardMaterial color="#2d2d44" side={2} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[9.8, 0.005, 31.2]}>
        <ringGeometry args={[0.001, 1.2, 24, 1, Math.PI * 1.5, Math.PI / 2]} />
        <meshStandardMaterial color="#2d2d44" side={2} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-9.8, 0.005, 48.0]}>
        <ringGeometry args={[0.001, 1.2, 24, 1, Math.PI / 2, Math.PI / 2]} />
        <meshStandardMaterial color="#2d2d44" side={2} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[9.8, 0.005, 48.0]}>
        <ringGeometry args={[0.001, 1.2, 24, 1, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#2d2d44" side={2} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
        <ringGeometry args={[2.8, 3.6, 48]} />
        <meshStandardMaterial color="#2d2d44" side={2} />
      </mesh>
      {(() => {
        const spacing = (100 / 16) * 3;
        const count = Math.floor(100 / spacing) + 1;
        return Array.from({ length: count }, (_, i) => {
          const z = -50 + i * spacing;
          if (z > 0 && z < 31) return null;
          return (
            <group key={i} position={[0, 0, z]}>
              <PottedPlant />
            </group>
          );
        });
      })()}
    </>
  );
}

export default Ground;
