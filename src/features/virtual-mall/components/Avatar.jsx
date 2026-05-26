import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RigidBody, CapsuleCollider } from '@react-three/rapier';
import { RoundedBox } from '@react-three/drei';
import { useKeyboardControls } from '../hooks/useKeyboardControls';
import { useDispatch } from 'react-redux';
import { setAvatarPosition, setAvatarRotation } from '@/store/slices/mallSlice';

const MOVE_SPEED = 4;
const ROTATE_SPEED = 2.5;

function HumanFigure() {
  return (
    <group>
      <RoundedBox args={[0.34, 0.4345, 0.17]} radius={0.08} position={[0, 0.721, 0]} castShadow>
        <meshStandardMaterial color="#e74c3c" metalness={0.2} roughness={0.6} />
      </RoundedBox>

      <mesh position={[0, 0.9735, 0]} castShadow>
        <cylinderGeometry args={[0.045, 0.0525, 0.07, 8]} />
        <meshStandardMaterial color="#f5cba7" />
      </mesh>

      <mesh position={[0, 0.804, 0.23]}>
      <boxGeometry args={[0.2, 0.24, 0.1]} />
      <meshStandardMaterial color="#4a3f6b" roughness={0.8} />
    </mesh>
    <mesh position={[0, 0.804, 0.28]}>
        <boxGeometry args={[0.14, 0.18, 0.03]} />
        <meshStandardMaterial color="#3a2f5b" roughness={0.9} />
      </mesh>
    </group>
  );
}

function Avatar() {
  const bodyRef = useRef(null);
  const visualRef = useRef(null);
  const headRef = useRef(null);
  const leftArmRef = useRef(null);
  const rightArmRef = useRef(null);
  const leftLegRef = useRef(null);
  const rightLegRef = useRef(null);
  const leftKneeRef = useRef(null);
  const rightKneeRef = useRef(null);
  const walkTime = useRef(0);
  const dispatch = useDispatch();
  const { keys, mouse } = useKeyboardControls();
  const rotationOffset = useRef(0);
  const headYaw = useRef(0);

  useFrame((state, delta) => {
    if (!bodyRef.current) return;

    const rigidBody = bodyRef.current;
    const currentPos = rigidBody.translation();

    if (keys.left) rotationOffset.current += ROTATE_SPEED * delta;
    if (keys.right) rotationOffset.current -= ROTATE_SPEED * delta;

    const targetRotation = mouse.x * Math.PI + rotationOffset.current;

    let targetHeadYaw = 0;
    if (keys.left && !keys.right) targetHeadYaw = Math.PI / 4;
    if (keys.right && !keys.left) targetHeadYaw = -Math.PI / 4;
    headYaw.current += (targetHeadYaw - headYaw.current) * Math.min(1, 8 * delta);

    if (headRef.current) {
      headRef.current.rotation.y = headYaw.current;
    }

    let moveX = 0;
    let moveZ = 0;

    if (keys.forward) moveZ -= 1;
    if (keys.backward) moveZ += 1;

    const isMoving = keys.forward || keys.backward;
    if (isMoving) {
      walkTime.current += delta * 7;
    } else {
      walkTime.current *= 0.85;
    }
    const swing = Math.sin(walkTime.current) * 0.2;
    if (leftArmRef.current) leftArmRef.current.rotation.x = swing;
    if (rightArmRef.current) rightArmRef.current.rotation.x = -swing;
    if (leftLegRef.current) leftLegRef.current.rotation.x = -swing * 0.6;
    if (rightLegRef.current) rightLegRef.current.rotation.x = swing * 0.6;
    if (leftKneeRef.current) leftKneeRef.current.rotation.x = Math.max(0, Math.sin(walkTime.current)) * 0.35;
    if (rightKneeRef.current) rightKneeRef.current.rotation.x = Math.max(0, -Math.sin(walkTime.current)) * 0.35;

    const bodyBob = isMoving ? Math.abs(Math.sin(walkTime.current)) * 0.03 : 0;
    if (visualRef.current) visualRef.current.position.y = -bodyBob;

    const len = Math.sqrt(moveX * moveX + moveZ * moveZ);
    if (len > 0) {
      moveX /= len;
      moveZ /= len;

      const sin = Math.sin(targetRotation);
      const cos = Math.cos(targetRotation);
      const worldX = moveX * cos + moveZ * sin;
      const worldZ = -moveX * sin + moveZ * cos;

      rigidBody.setTranslation({
        x: currentPos.x + worldX * MOVE_SPEED * delta,
        y: currentPos.y,
        z: currentPos.z + worldZ * MOVE_SPEED * delta,
      });
    }

    const targetQuat = {
      x: 0,
      y: Math.sin(targetRotation / 2),
      z: 0,
      w: Math.cos(targetRotation / 2),
    };
    rigidBody.setRotation(targetQuat);

    dispatch(setAvatarPosition([currentPos.x, currentPos.y, currentPos.z]));
    dispatch(setAvatarRotation(targetRotation));
  });

  return (
    <RigidBody
      ref={bodyRef}
      position={[0, 0, 0]}
      colliders={false}
      enabledRotations={[false, true, false]}
      type="dynamic"
      linearDamping={5}
      angularDamping={10}
    >
      <CapsuleCollider args={[0.4, 0.2]} position={[0, 0.6, 0]} />
      <group ref={visualRef} scale={0.88}>
        <HumanFigure />

        <group ref={leftArmRef} position={[-0.22, 0.9385, 0]}>
          <mesh position={[0, -0.1209, 0]} castShadow>
            <capsuleGeometry args={[0.05, 0.1418, 6, 8]} />
            <meshStandardMaterial color="#e74c3c" metalness={0.2} roughness={0.6} />
          </mesh>
          <mesh position={[0, -0.2418, 0]} castShadow>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshStandardMaterial color="#e74c3c" metalness={0.2} roughness={0.6} />
          </mesh>
          <group position={[0, -0.2418, 0]} rotation={[-0.15, 0, -0.05]}>
            <mesh position={[0, -0.1209, 0]} castShadow>
              <capsuleGeometry args={[0.05, 0.1418, 6, 8]} />
              <meshStandardMaterial color="#e74c3c" metalness={0.2} roughness={0.6} />
            </mesh>
          </group>
          <mesh position={[-0.012, -0.481, -0.036]} castShadow>
            <sphereGeometry args={[0.035, 8, 8]} />
            <meshStandardMaterial color="#f5cba7" />
          </mesh>
        </group>

        <group ref={rightArmRef} position={[0.22, 0.9385, 0]}>
          <mesh position={[0, -0.1209, 0]} castShadow>
            <capsuleGeometry args={[0.05, 0.1418, 6, 8]} />
            <meshStandardMaterial color="#e74c3c" metalness={0.2} roughness={0.6} />
          </mesh>
          <mesh position={[0, -0.2418, 0]} castShadow>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshStandardMaterial color="#e74c3c" metalness={0.2} roughness={0.6} />
          </mesh>
          <group position={[0, -0.2418, 0]} rotation={[-0.15, 0, 0.05]}>
            <mesh position={[0, -0.1209, 0]} castShadow>
              <capsuleGeometry args={[0.05, 0.1418, 6, 8]} />
              <meshStandardMaterial color="#e74c3c" metalness={0.2} roughness={0.6} />
            </mesh>
          </group>
          <mesh position={[0.012, -0.481, -0.036]} castShadow>
            <sphereGeometry args={[0.035, 8, 8]} />
            <meshStandardMaterial color="#f5cba7" />
          </mesh>
        </group>

        <group ref={leftLegRef} position={[-0.08, 0.504, 0]}>
          <group scale={[1, 1.2, 1]}>
            <mesh position={[0, -0.105, 0]} castShadow>
              <capsuleGeometry args={[0.065, 0.122, 6, 8]} />
              <meshStandardMaterial color="#0a0a3a" />
            </mesh>
            <group ref={leftKneeRef} position={[0, -0.21, 0]}>
              <mesh position={[0, -0.105, 0]} castShadow>
                <capsuleGeometry args={[0.065, 0.122, 6, 8]} />
                <meshStandardMaterial color="#0a0a3a" />
              </mesh>
              <mesh position={[0, -0.21, -0.07]} castShadow>
                <boxGeometry args={[0.14, 0.045, 0.09]} />
                <meshStandardMaterial color="#000000" />
              </mesh>
            </group>
          </group>
        </group>

        <group ref={rightLegRef} position={[0.08, 0.504, 0]}>
          <group scale={[1, 1.2, 1]}>
            <mesh position={[0, -0.105, 0]} castShadow>
              <capsuleGeometry args={[0.065, 0.122, 6, 8]} />
              <meshStandardMaterial color="#0a0a3a" />
            </mesh>
            <group ref={rightKneeRef} position={[0, -0.21, 0]}>
              <mesh position={[0, -0.105, 0]} castShadow>
                <capsuleGeometry args={[0.065, 0.122, 6, 8]} />
                <meshStandardMaterial color="#0a0a3a" />
              </mesh>
              <mesh position={[0, -0.21, -0.07]} castShadow>
                <boxGeometry args={[0.14, 0.045, 0.09]} />
                <meshStandardMaterial color="#000000" />
              </mesh>
            </group>
          </group>
        </group>

        <group ref={headRef}>
          <mesh position={[0, 1.095, 0]} castShadow>
            <sphereGeometry args={[0.14, 16, 16]} />
            <meshStandardMaterial color="#f5cba7" />
          </mesh>

          <mesh position={[0, 1.193, 0.02]} scale={[1.2, 0.55, 1.3]}>
            <sphereGeometry args={[0.14, 12, 12]} />
            <meshStandardMaterial color="#2d1f0e" />
          </mesh>
          <mesh position={[0, 1.13, 0.1]} scale={[1, 0.75, 0.7]}>
          <sphereGeometry args={[0.14, 12, 12]} />
          <meshStandardMaterial color="#2d1f0e" />
        </mesh>

          <mesh position={[-0.055, 1.115, -0.12]}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0.055, 1.115, -0.12]}>
            <sphereGeometry args={[0.025, 8, 8]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
          <mesh position={[-0.055, 1.115, -0.14]}>
            <sphereGeometry args={[0.013, 8, 8]} />
            <meshStandardMaterial color="#1a1a2e" />
          </mesh>
          <mesh position={[0.055, 1.115, -0.14]}>
            <sphereGeometry args={[0.013, 8, 8]} />
            <meshStandardMaterial color="#1a1a2e" />
          </mesh>
        </group>
      </group>
    </RigidBody>
  );
}

export default Avatar;
