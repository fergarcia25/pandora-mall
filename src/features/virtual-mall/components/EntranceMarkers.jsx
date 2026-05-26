import { useSelector } from 'react-redux';

const PROXIMITY_THRESHOLD = 3.6;

const ENTRANCES = [
  { id: 'store-1', pos: [-9.6, 0.02, -6], color: '#6c5ce7' },
  { id: 'store-2', pos: [9.6, 0.02, -6], color: '#fd79a8' },
  { id: 'store-3', pos: [-9.6, 0.02, 10], color: '#00cec9' },
  { id: 'store-4', pos: [9.6, 0.02, 10], color: '#fdcb6e' },
];

function EntranceMarkers() {
  const avatarPos = useSelector((state) => state.mall.avatarPosition);
  const [ax, , az] = avatarPos;

  return ENTRANCES.map((entrance) => {
    const [sx, , sz] = entrance.pos;
    const dx = ax - sx;
    const dz = az - sz;
    const dist = Math.sqrt(dx * dx + dz * dz);
    const isActive = dist < PROXIMITY_THRESHOLD;
    const activeColor = '#00ff88';

    return (
      <group key={entrance.id}>
        {/* Floor marker */}
        <mesh position={entrance.pos} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.2, 1.2]} />
          <meshStandardMaterial
            color={isActive ? activeColor : entrance.color}
            transparent
            opacity={isActive ? 0.6 : 0.2}
            side={2}
          />
        </mesh>

        {/* Glow ring when active */}
        {isActive && (
          <mesh position={[entrance.pos[0], 0.03, entrance.pos[2]]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.6, 0.9, 24]} />
            <meshBasicMaterial
              color={activeColor}
              transparent
              opacity={0.3}
              side={2}
            />
          </mesh>
        )}

        {/* Neon pillar glow when active */}
        {isActive && (
          <mesh position={[entrance.pos[0], 0.5, entrance.pos[2]]}>
            <boxGeometry args={[0.05, 1, 0.05]} />
            <meshBasicMaterial
              color={activeColor}
              transparent
              opacity={0.4}
            />
          </mesh>
        )}
      </group>
    );
  });
}

export default EntranceMarkers;
