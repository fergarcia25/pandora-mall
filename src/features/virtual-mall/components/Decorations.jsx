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
      {/* Seat */}
      <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.08, 0.4]} />
        <meshStandardMaterial color="#5a4a3a" roughness={0.9} />
      </mesh>

      {/* Backrest */}
      <mesh position={[0, 0.5, -0.2]} castShadow>
        <boxGeometry args={[1.2, 0.4, 0.06]} />
        <meshStandardMaterial color="#5a4a3a" roughness={0.9} />
      </mesh>

      {/* Left leg */}
      <mesh position={[-0.5, 0.08, -0.15]} castShadow>
        <boxGeometry args={[0.06, 0.2, 0.06]} />
        <meshStandardMaterial color="#3a3025" />
      </mesh>

      {/* Right leg */}
      <mesh position={[0.5, 0.08, -0.15]} castShadow>
        <boxGeometry args={[0.06, 0.2, 0.06]} />
        <meshStandardMaterial color="#3a3025" />
      </mesh>

      {/* Back left leg */}
      <mesh position={[-0.5, 0.08, 0.15]} castShadow>
        <boxGeometry args={[0.06, 0.2, 0.06]} />
        <meshStandardMaterial color="#3a3025" />
      </mesh>

      {/* Back right leg */}
      <mesh position={[0.5, 0.08, 0.15]} castShadow>
        <boxGeometry args={[0.06, 0.2, 0.06]} />
        <meshStandardMaterial color="#3a3025" />
      </mesh>

      {/* Armrest left */}
      <mesh position={[-0.58, 0.4, -0.12]} castShadow>
        <boxGeometry args={[0.04, 0.3, 0.06]} />
        <meshStandardMaterial color="#3a3025" />
      </mesh>

      {/* Armrest right */}
      <mesh position={[0.58, 0.4, -0.12]} castShadow>
        <boxGeometry args={[0.04, 0.3, 0.06]} />
        <meshStandardMaterial color="#3a3025" />
      </mesh>
    </group>
  );
}

function TableSet({ position, rotation = 0 }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
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
      <mesh position={[-0.08, 0.06, 0.08]} castShadow>
        <cylinderGeometry args={[0.015, 0.018, 0.18, 6]} />
        <meshStandardMaterial color="#666666" metalness={0.3} roughness={0.5} />
      </mesh>

      {/* Front right leg */}
      <mesh position={[0.08, 0.06, 0.08]} castShadow>
        <cylinderGeometry args={[0.015, 0.018, 0.18, 6]} />
        <meshStandardMaterial color="#666666" metalness={0.3} roughness={0.5} />
      </mesh>

      {/* Back left leg */}
      <mesh position={[-0.08, 0.06, -0.08]} castShadow>
        <cylinderGeometry args={[0.015, 0.018, 0.18, 6]} />
        <meshStandardMaterial color="#666666" metalness={0.3} roughness={0.5} />
      </mesh>

      {/* Back right leg */}
      <mesh position={[0.08, 0.06, -0.08]} castShadow>
        <cylinderGeometry args={[0.015, 0.018, 0.18, 6]} />
        <meshStandardMaterial color="#666666" metalness={0.3} roughness={0.5} />
      </mesh>
    </group>
  );
}

function Decorations() {
  return (
    <group>
      {/* === PLANTS === */}

      {/* Plant at entrance left side (near Tech World) */}
      <PlantPot position={[-7.5, 0, -1.5]} scale={1} />
      {/* Plant at entrance right side (near Fashion Hub) */}
      <PlantPot position={[7.5, 0, -1.5]} scale={1} />
      {/* Plant near Game Zone */}
      <PlantPot position={[-7.5, 0, 6.5]} scale={1} />
      {/* Plant near Book Nook */}
      <PlantPot position={[7.5, 0, 6.5]} scale={1} />
      {/* Center aisle plants */}
      <PlantPot position={[-2, 0, -8]} scale={0.9} />
      <PlantPot position={[2, 0, -8]} scale={0.9} />
      {/* Near seating area */}
      <PlantPot position={[-1.5, 0, 9]} scale={1.1} />
      <PlantPot position={[1.5, 0, 9]} scale={1.1} />

      {/* === BENCHES === */}

      {/* Center walkway benches */}
      <Bench position={[-3, 0, 0]} rotation={0} />
      <Bench position={[3, 0, 0]} rotation={0} />
      {/* Benches near back wall */}
      <Bench position={[-3, 0, -9.5]} rotation={Math.PI / 2} />
      <Bench position={[3, 0, -9.5]} rotation={-Math.PI / 2} />
      {/* Bench near front */}
      <Bench position={[0, 0, 9.5]} rotation={0} />

      {/* === TABLES & CHAIRS (seating area) === */}
      <TableSet position={[-2.5, 0, 8]} rotation={0} />
      <TableSet position={[2.5, 0, 8]} rotation={Math.PI / 4} />
      <TableSet position={[0, 0, 7]} rotation={Math.PI / 6} />
    </group>
  );
}

export default Decorations;
