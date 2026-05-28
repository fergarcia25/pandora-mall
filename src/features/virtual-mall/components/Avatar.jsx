import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RigidBody, CapsuleCollider } from '@react-three/rapier';
import { RoundedBox } from '@react-three/drei';
import { useKeyboardControls } from '../hooks/useKeyboardControls';
import { useDispatch } from 'react-redux';
import { setAvatarPosition, setAvatarRotation } from '@/store/slices/mallSlice';

const MOVE_SPEED = 4.8;
const ROTATE_SPEED = 2.5;

function HumanFigure() {
  return (
    <group>
      <RoundedBox args={[0.34, 0.4345, 0.17]} radius={0.08} position={[0, 0.721, 0]} castShadow>
        <meshStandardMaterial color="#ffffff" metalness={0.1} roughness={0.7} />
      </RoundedBox>

      <mesh position={[0, 0.9735, 0]} castShadow>
        <cylinderGeometry args={[0.045, 0.0525, 0.07, 8]} />
        <meshStandardMaterial color="#f5cba7" />
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
  const leftAnkleRef = useRef(null);
  const rightAnkleRef = useRef(null);
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
      headRef.current.rotation.y = Math.PI + headYaw.current;
    }

    let moveX = 0;
    let moveZ = 0;

    if (keys.forward) moveZ += 1;
    if (keys.backward) moveZ -= 1;

    const isMoving = keys.forward || keys.backward;
    if (isMoving) {
      walkTime.current += delta * 7;
    } else {
      walkTime.current *= 0.85;
    }

    const walkCycle = Math.sin(walkTime.current);

    // Arms swing opposite to legs
    const armSwing = walkCycle * 0.2;
    if (leftArmRef.current) leftArmRef.current.rotation.x = armSwing;
    if (rightArmRef.current) rightArmRef.current.rotation.x = -armSwing;

    // Legs swing with increased amplitude
    if (leftLegRef.current) leftLegRef.current.rotation.x = -walkCycle * 0.25;
    if (rightLegRef.current) rightLegRef.current.rotation.x = walkCycle * 0.25;

    // Knees flex forward and upward during swing phase
    if (leftKneeRef.current) leftKneeRef.current.rotation.x = Math.max(0, -walkCycle) * 0.45;
    if (rightKneeRef.current) rightKneeRef.current.rotation.x = Math.max(0, walkCycle) * 0.45;

    // Ankle/foot tilt - toes up during forward swing for ground clearance
    if (leftAnkleRef.current) leftAnkleRef.current.rotation.x = Math.max(0, -walkCycle) * 0.25;
    if (rightAnkleRef.current) rightAnkleRef.current.rotation.x = Math.max(0, walkCycle) * 0.25;

    // Body bob and subtle sway
    const bodyBob = isMoving ? Math.abs(Math.sin(walkTime.current)) * 0.03 : 0;
    if (visualRef.current) {
      visualRef.current.position.y = 0.102 - bodyBob;
      visualRef.current.rotation.z = isMoving ? walkCycle * 0.015 : 0;
    }

    const len = Math.sqrt(moveX * moveX + moveZ * moveZ);
    if (len > 0) {
      moveX /= len;
      moveZ /= len;

      const sin = Math.sin(targetRotation);
      const cos = Math.cos(targetRotation);
      const worldX = moveX * cos + moveZ * sin;
      const worldZ = -moveX * sin + moveZ * cos;

      rigidBody.setLinvel({
        x: worldX * MOVE_SPEED,
        y: 0,
        z: worldZ * MOVE_SPEED,
      });
    } else {
      rigidBody.setLinvel({ x: 0, y: 0, z: 0 });
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
      position={[0, 0, 14]}
      colliders={false}
      enabledRotations={[false, true, false]}
      type="dynamic"
      linearDamping={5}
      angularDamping={10}
    >
      <CapsuleCollider args={[0.4, 0.2]} position={[0, 0.6, 0]} />
      <group ref={visualRef} scale={0.88} position={[0, 0.102, 0]}>
        <HumanFigure />

        {/* Left arm - upper arm white, forearm skin */}
        <group ref={leftArmRef} position={[-0.22, 0.9385, 0]}>
          <mesh position={[0, -0.1209, 0]} castShadow>
            <capsuleGeometry args={[0.05, 0.1418, 6, 8]} />
            <meshStandardMaterial color="#ffffff" metalness={0.1} roughness={0.7} />
          </mesh>
          <mesh position={[0, -0.2418, 0]} castShadow>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshStandardMaterial color="#ffffff" metalness={0.1} roughness={0.7} />
          </mesh>
          <group position={[0, -0.2418, 0]} rotation={[-0.15, 0, -0.05]}>
            <mesh position={[0, -0.1209, 0]} castShadow>
              <capsuleGeometry args={[0.05, 0.1418, 6, 8]} />
              <meshStandardMaterial color="#f5cba7" />
            </mesh>
            <mesh position={[0, -0.2418, 0]} rotation={[0, Math.PI, 0]} castShadow>
              <sphereGeometry args={[0.035, 8, 8]} />
              <meshStandardMaterial color="#f5cba7" />
            </mesh>
          </group>
        </group>

        {/* Right arm - upper arm white, forearm skin */}
        <group ref={rightArmRef} position={[0.22, 0.9385, 0]}>
          <mesh position={[0, -0.1209, 0]} castShadow>
            <capsuleGeometry args={[0.05, 0.1418, 6, 8]} />
            <meshStandardMaterial color="#ffffff" metalness={0.1} roughness={0.7} />
          </mesh>
          <mesh position={[0, -0.2418, 0]} castShadow>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshStandardMaterial color="#ffffff" metalness={0.1} roughness={0.7} />
          </mesh>
          <group position={[0, -0.2418, 0]} rotation={[-0.15, 0, 0.05]}>
            <mesh position={[0, -0.1209, 0]} castShadow>
              <capsuleGeometry args={[0.05, 0.1418, 6, 8]} />
              <meshStandardMaterial color="#f5cba7" />
            </mesh>
            <mesh position={[0, -0.2418, 0]} rotation={[0, Math.PI, 0]} castShadow>
              <sphereGeometry args={[0.035, 8, 8]} />
              <meshStandardMaterial color="#f5cba7" />
            </mesh>
          </group>
        </group>

        {/* Left leg - military green */}
        <group ref={leftLegRef} position={[-0.08, 0.504, 0]}>
          <group scale={[1, 1.2, 1]}>
            <mesh position={[0, -0.105, 0]} castShadow>
              <capsuleGeometry args={[0.065, 0.122, 6, 8]} />
              <meshStandardMaterial color="#556b2f" />
            </mesh>
            <group ref={leftKneeRef} position={[0, -0.21, 0]}>
              <mesh position={[0, -0.105, 0]} castShadow>
                <capsuleGeometry args={[0.065, 0.122, 6, 8]} />
                <meshStandardMaterial color="#556b2f" />
              </mesh>
              <group ref={leftAnkleRef} position={[0, -0.21, 0]}>
                <RoundedBox args={[0.194, 0.0568, 0.295]} radius={0.04} position={[0, -0.0678, 0.0975]} castShadow>
                  <meshStandardMaterial color="#000000" />
                </RoundedBox>
              </group>
            </group>
          </group>
        </group>

        {/* Right leg - military green */}
        <group ref={rightLegRef} position={[0.08, 0.504, 0]}>
          <group scale={[1, 1.2, 1]}>
            <mesh position={[0, -0.105, 0]} castShadow>
              <capsuleGeometry args={[0.065, 0.122, 6, 8]} />
              <meshStandardMaterial color="#556b2f" />
            </mesh>
            <group ref={rightKneeRef} position={[0, -0.21, 0]}>
              <mesh position={[0, -0.105, 0]} castShadow>
                <capsuleGeometry args={[0.065, 0.122, 6, 8]} />
                <meshStandardMaterial color="#556b2f" />
              </mesh>
              <group ref={rightAnkleRef} position={[0, -0.21, 0]}>
                <RoundedBox args={[0.194, 0.0568, 0.295]} radius={0.04} position={[0, -0.0678, 0.0975]} castShadow>
                  <meshStandardMaterial color="#000000" />
                </RoundedBox>
              </group>
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
