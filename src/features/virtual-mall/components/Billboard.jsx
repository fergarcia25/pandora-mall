import { useMemo } from 'react';
import * as THREE from 'three';

function createTextTexture(text, fontSize, color, bgColor) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = bgColor || '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.fillStyle = color || '#222222';
  ctx.font = `bold ${fontSize || 48}px Inter, Arial, sans-serif`;
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function MeshText({ text, position, fontSize = 48, color = '#222222', planeSize = [3, 0.6], bgColor = 'transparent' }) {
  const texture = useMemo(
    () => createTextTexture(text, fontSize, color, bgColor),
    [text, fontSize, color, bgColor]
  );

  return (
    <mesh position={position}>
      <planeGeometry args={planeSize} />
      <meshBasicMaterial map={texture} transparent side={2} />
    </mesh>
  );
}

function Billboard() {
  return (
    <group position={[0, 2.8, -11.7]}>
      {/* Billboard outer frame */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[6.2, 3.4, 0.15]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* White inner panel */}
      <mesh position={[0, 0, 0.09]}>
        <planeGeometry args={[5.8, 3.0]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Logo placeholder - purple accent box */}
      <mesh position={[0, 0.5, 0.1]}>
        <planeGeometry args={[3, 1.2]} />
        <meshStandardMaterial color="#6c5ce7" />
      </mesh>

      {/* Logo inner highlight */}
      <mesh position={[0, 0.5, 0.11]}>
        <planeGeometry args={[2.6, 1.0]} />
        <meshStandardMaterial color="#7c6df7" />
      </mesh>

      {/* PANDORA MALL text rendered via canvas */}
      <MeshText
        text="PANDORA MALL"
        position={[0, -0.65, 0.1]}
        fontSize={54}
        color="#1a1a1a"
        planeSize={[4.5, 0.7]}
      />

      {/* Subtitle */}
      <MeshText
        text="VIRTUAL SHOPPING EXPERIENCE"
        position={[0, -1.15, 0.1]}
        fontSize={24}
        color="#888888"
        planeSize={[4, 0.4]}
      />

      {/* Neon glow behind */}
      <mesh position={[0, 0, -0.2]}>
        <planeGeometry args={[6.6, 3.8]} />
        <meshStandardMaterial
          color="#6c5ce7"
          transparent
          opacity={0.06}
        />
      </mesh>
    </group>
  );
}

export default Billboard;
