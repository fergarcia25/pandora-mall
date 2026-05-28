import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { RigidBody, CapsuleCollider } from '@react-three/rapier';
import { RoundedBox, Html } from '@react-three/drei';
import { useSelector, useDispatch } from 'react-redux';
import { setNpcPosition, setNpcGreeting } from '@/store/slices/mallSlice';
import * as THREE from 'three';

const MOVE_SPEED = 3.2;
const WAYPOINT_THRESHOLD = 0.3;
const INTERACT_DIST = 3;
const INTERACT_LEAVE_DIST = 4.5;
const COMPLAIN_DURATION = 0.8;
const REST_DURATION = 4;
const RING_RADIUS = 3.2;
const GREETING_DURATION = 3;

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function createComplainTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ffffff';
  roundRect(ctx, 6, 6, 500, 116, 18);
  ctx.fill();
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 4;
  roundRect(ctx, 6, 6, 500, 116, 18);
  ctx.stroke();
  ctx.fillStyle = '#cc0000';
  ctx.font = 'bold 38px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('¡EH CHE CULIADO!', 256, 64);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

function SpeechBubble({ visible }) {
  const texture = useMemo(() => createComplainTexture(), []);

  return visible ? (
    <sprite scale={[2.4, 0.6, 1]}>
      <spriteMaterial map={texture} transparent depthTest={false} />
    </sprite>
  ) : null;
}

const MESSAGES = ['Hola bro!', 'Buenas! como va?', 'Que ondaaaa!!!!!'];

const bubbleStyles = {
  container: {
    background: 'rgba(255,255,255,0.85)',
    borderRadius: '12px',
    padding: '16px',
    maxWidth: '250px',
    fontSize: '18px',
    fontWeight: 400,
    color: '#111',
    textAlign: 'center',
    position: 'relative',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    lineHeight: 1.3,
  },
  tail: {
    position: 'absolute',
    bottom: '-8px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: 0,
    height: 0,
    borderLeft: '8px solid transparent',
    borderRight: '8px solid transparent',
    borderTop: '8px solid rgba(255,255,255,0.85)',
  },
};

function GreetingBubble({ message, visible }) {
  if (!visible) return null;

  return (
    <Html position={[0, 1.4, 0]} center style={{ pointerEvents: 'none' }}>
      <div style={bubbleStyles.container}>
        {message}
        <div style={bubbleStyles.tail} />
      </div>
    </Html>
  );
}

function NPCFigure() {
  return (
    <group>
      <RoundedBox args={[0.34, 0.4345, 0.17]} radius={0.08} position={[0, 0.721, 0]} castShadow>
        <meshStandardMaterial color="#0055A4" metalness={0.05} roughness={0.7} />
      </RoundedBox>

      <mesh position={[0, 0.9735, 0]} castShadow>
        <cylinderGeometry args={[0.045, 0.0525, 0.07, 8]} />
        <meshStandardMaterial color="#f5cba7" />
      </mesh>

    </group>
  );
}

function NPC() {
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
  const speechBubbleRef = useRef(null);
  const greetingBubbleRef = useRef(null);

  const state = useRef('RESTING');
  const prevState = useRef(null);
  const segIndex = useRef(0);
  const lapsToGo = useRef(1 + Math.floor(Math.random() * 3));
  const timer = useRef(0);
  const avoidChoice = useRef(null);
  const targetRotation = useRef(Math.PI);
  const showSpeech = useRef(false);
  const showGreeting = useRef(false);
  const greetFaceTarget = useRef(new THREE.Vector3());
  const greetingMessage = useRef('');

  const dispatch = useDispatch();
  const playerPos = useSelector((s) => s.mall.avatarPosition);
  const npcGreeting = useSelector((s) => s.mall.npcGreeting);

  const downPath = useMemo(() => {
    const pts = [];
    for (let i = 0; i < 9; i++) pts.push(new THREE.Vector3(0, 0, 30.6 - i * (27 / 8)));
    return pts;
  }, []);

  const ringPath = useMemo(() => {
    const pts = [];
    for (let i = 0; i < 24; i++) {
      const angle = (i / 8) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.sin(angle) * RING_RADIUS, 0, Math.cos(angle) * RING_RADIUS));
    }
    return pts;
  }, []);

  const upPath = useMemo(() => {
    const pts = [];
    for (let i = 0; i < 9; i++) pts.push(new THREE.Vector3(0, 0, 3.6 + i * (27 / 8)));
    return pts;
  }, []);

  useFrame((_, delta) => {
    if (!bodyRef.current) return;
    const rigidBody = bodyRef.current;
    const pos = rigidBody.translation();
    const vel = rigidBody.linvel();
    const speed = Math.hypot(vel.x, vel.z);

    if (showGreeting.current !== npcGreeting) {
      if (npcGreeting && !showGreeting.current) {
        state.current = 'GREETING';
        greetingMessage.current = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
        segIndex.current = 0;
        timer.current = 0;
      }
      showGreeting.current = npcGreeting;
    }

    dispatch(setNpcPosition([pos.x, pos.y, pos.z]));

    const distToPlayer = playerPos
      ? Math.hypot(playerPos[0] - pos.x, playerPos[2] - pos.z)
      : 999;

    if (speed > MOVE_SPEED * 1.8 && state.current !== 'COMPLAINING' && state.current !== 'INTERACTING') {
      prevState.current = state.current;
      state.current = 'COMPLAINING';
      timer.current = 0;
      showSpeech.current = true;
    }

    if (
      distToPlayer < INTERACT_DIST &&
      state.current !== 'COMPLAINING' &&
      state.current !== 'AVOIDING' &&
      state.current !== 'INTERACTING' &&
      state.current !== 'GREETING'
    ) {
      prevState.current = state.current;
      state.current = 'INTERACTING';
      if (playerPos) {
        const pdx = playerPos[0] - pos.x;
        const pdz = playerPos[2] - pos.z;
        targetRotation.current = Math.atan2(pdx, pdz);
      }
    }

    let target = null;
    let shouldMove = false;

    switch (state.current) {
      case 'RESTING': {
        timer.current += delta;
        if (timer.current >= REST_DURATION) {
          lapsToGo.current = 1 + Math.floor(Math.random() * 3);
          state.current = 'WALKING_DOWN';
          segIndex.current = 0;
        }
        break;
      }
      case 'WALKING_DOWN': {
        if (segIndex.current < downPath.length) {
          target = downPath[segIndex.current];
          shouldMove = true;
        } else {
          state.current = 'CIRCLING';
          segIndex.current = 0;
          target = ringPath[0];
          shouldMove = true;
        }
        break;
      }
      case 'CIRCLING': {
        const maxIdx = 8 * lapsToGo.current;
        if (segIndex.current < maxIdx) {
          target = ringPath[segIndex.current];
          shouldMove = true;
        } else {
          state.current = 'WALKING_UP';
          segIndex.current = 0;
          target = upPath[0];
          shouldMove = true;
        }
        break;
      }
      case 'WALKING_UP': {
        if (segIndex.current < upPath.length) {
          target = upPath[segIndex.current];
          shouldMove = true;
        } else {
          state.current = 'RESTING';
          segIndex.current = 0;
          timer.current = 0;
          lapsToGo.current = 1 + Math.floor(Math.random() * 3);
        }
        break;
      }
      case 'COMPLAINING': {
        timer.current += delta;
        if (timer.current >= COMPLAIN_DURATION) {
          state.current = 'AVOIDING';
          avoidChoice.current = Math.random() < 0.5 ? 'WAIT' : 'GO_AROUND';
          timer.current = 0;
          showSpeech.current = false;
        }
        break;
      }
      case 'AVOIDING': {
        if (avoidChoice.current === 'WAIT') {
          if (distToPlayer > INTERACT_LEAVE_DIST) {
            state.current = prevState.current || 'WALKING_UP';
            segIndex.current = 0;
          }
        } else {
          const s = prevState.current || 'WALKING_UP';
          state.current = s;
          segIndex.current = 0;
          target = s === 'WALKING_DOWN' ? downPath[0] : s === 'CIRCLING' ? ringPath[0] : upPath[0];
          shouldMove = true;
          if (distToPlayer > INTERACT_LEAVE_DIST) {
          }
        }
        break;
      }
      case 'INTERACTING': {
        if (playerPos) {
          const pdx = playerPos[0] - pos.x;
          const pdz = playerPos[2] - pos.z;
          targetRotation.current = Math.atan2(pdx, pdz);
        }
        if (distToPlayer > INTERACT_LEAVE_DIST) {
          state.current = prevState.current || 'WALKING_UP';
          segIndex.current = 0;
        }
        break;
      }
      case 'GREETING': {
        timer.current += delta;
        if (playerPos) {
          const pdx = playerPos[0] - pos.x;
          const pdz = playerPos[2] - pos.z;
          targetRotation.current = Math.atan2(pdx, pdz);
        }
        if (timer.current >= GREETING_DURATION) {
          dispatch(setNpcGreeting(false));
          state.current = prevState.current || 'RESTING';
          segIndex.current = 0;
        }
        break;
      }
    }

    if (
      state.current !== 'INTERACTING' &&
      state.current !== 'GREETING' &&
      ['WALKING_DOWN', 'WALKING_UP'].includes(state.current) &&
      target &&
      distToPlayer < 2.5
    ) {
      const dx = target.x - pos.x;
      const dz = target.z - pos.z;
      const dist = Math.hypot(dx, dz);
      if (dist > 0.5) {
        const dirX = dx / dist;
        const dirZ = dz / dist;
        const aheadX = pos.x + dirX * 1.5;
        const aheadZ = pos.z + dirZ * 1.5;
        const distAhead = playerPos
          ? Math.hypot(playerPos[0] - aheadX, playerPos[2] - aheadZ)
          : 999;
        if (distAhead < 2) {
          prevState.current = state.current;
          state.current = 'AVOIDING';
          avoidChoice.current = Math.random() < 0.5 ? 'WAIT' : 'GO_AROUND';
        }
      }
    }

    let isMoving = false;
    if (target && shouldMove) {
      if (state.current === 'AVOIDING' && avoidChoice.current === 'WAIT') {
        rigidBody.setLinvel({ x: 0, y: 0, z: 0 });
      } else {
        const dx = target.x - pos.x;
        const dz = target.z - pos.z;
        const dist = Math.hypot(dx, dz);
        if (dist < WAYPOINT_THRESHOLD) {
          segIndex.current++;
        } else {
          const dirX = dx / dist;
          const dirZ = dz / dist;
          rigidBody.setLinvel({ x: dirX * MOVE_SPEED, y: 0, z: dirZ * MOVE_SPEED });
          targetRotation.current = Math.atan2(dirX, dirZ);
          isMoving = true;
        }
      }
    } else {
      rigidBody.setLinvel({ x: 0, y: 0, z: 0 });
    }

    const quat = {
      x: 0,
      y: Math.sin(targetRotation.current / 2),
      z: 0,
      w: Math.cos(targetRotation.current / 2),
    };
    rigidBody.setRotation(quat);

    const walking = isMoving && state.current !== 'COMPLAINING' && state.current !== 'INTERACTING' && state.current !== 'GREETING';
    const isComplaining = state.current === 'COMPLAINING';
    const isInteracting = state.current === 'INTERACTING';
    const isGreeting = state.current === 'GREETING';

    if (walking) {
      walkTime.current += delta * 7 * 0.8;
    } else {
      walkTime.current *= 0.85;
    }

    const walkCycle = Math.sin(walkTime.current);

    let armSwing = walkCycle * 0.2;
    if (isComplaining) {
      armSwing = -1.0;
    } else if (isInteracting) {
      armSwing = Math.sin(walkTime.current * 5) * 0.35;
    } else if (isGreeting) {
      armSwing = -1.2;
    }
    if (leftArmRef.current) leftArmRef.current.rotation.x = armSwing;
    if (rightArmRef.current) {
      rightArmRef.current.rotation.x = isInteracting
        ? Math.sin(walkTime.current * 5 + Math.PI) * 0.35
        : isGreeting
        ? Math.sin(walkTime.current * 5) * 0.4
        : -armSwing;
    }

    if (walking) {
      if (leftLegRef.current) leftLegRef.current.rotation.x = -walkCycle * 0.25 * 0.8;
      if (rightLegRef.current) rightLegRef.current.rotation.x = walkCycle * 0.25 * 0.8;
      if (leftKneeRef.current) leftKneeRef.current.rotation.x = Math.max(0, -walkCycle) * 0.45 * 0.8;
      if (rightKneeRef.current) rightKneeRef.current.rotation.x = Math.max(0, walkCycle) * 0.45 * 0.8;
      if (leftAnkleRef.current) leftAnkleRef.current.rotation.x = Math.max(0, -walkCycle) * 0.25 * 0.8;
      if (rightAnkleRef.current) rightAnkleRef.current.rotation.x = Math.max(0, walkCycle) * 0.25 * 0.8;
    } else if (!isComplaining && !isInteracting && !isGreeting) {
      if (leftLegRef.current) leftLegRef.current.rotation.x = 0;
      if (rightLegRef.current) rightLegRef.current.rotation.x = 0;
      if (leftKneeRef.current) leftKneeRef.current.rotation.x = 0;
      if (rightKneeRef.current) rightKneeRef.current.rotation.x = 0;
      if (leftAnkleRef.current) leftAnkleRef.current.rotation.x = 0;
      if (rightAnkleRef.current) rightAnkleRef.current.rotation.x = 0;
    }

    const bodyBob = walking ? Math.abs(Math.sin(walkTime.current)) * 0.03 : 0;
    if (visualRef.current) {
      visualRef.current.position.y = 0.102 - bodyBob;
      visualRef.current.rotation.z = walking ? walkCycle * 0.015 : 0;
    }

    if (isComplaining && headRef.current) {
      headRef.current.rotation.z = Math.sin(timer.current * 30) * 0.3;
    } else if (headRef.current) {
      headRef.current.rotation.z *= 0.85;
    }

    if (speechBubbleRef.current) {
      speechBubbleRef.current.position.set(0, 2.4, 0);
    }
  });

  return (
    <RigidBody
      ref={bodyRef}
      position={[0, 0, 30.6]}
      colliders={false}
      enabledRotations={[false, true, false]}
      type="dynamic"
      linearDamping={5}
      angularDamping={10}
    >
      <CapsuleCollider args={[0.4, 0.2]} position={[0, 0.6, 0]} />
      <group ref={visualRef} scale={0.88} position={[0, 0.102, 0]}>
        <NPCFigure />

        <group ref={leftArmRef} position={[-0.22, 0.9385, 0]}>
          <mesh position={[0, -0.1209, 0]} castShadow>
            <capsuleGeometry args={[0.05, 0.1418, 6, 8]} />
            <meshStandardMaterial color="#0055A4" metalness={0.05} roughness={0.7} />
          </mesh>
          <mesh position={[0, -0.2418, 0]} castShadow>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshStandardMaterial color="#0055A4" metalness={0.05} roughness={0.7} />
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

        <group ref={rightArmRef} position={[0.22, 0.9385, 0]}>
          <mesh position={[0, -0.1209, 0]} castShadow>
            <capsuleGeometry args={[0.05, 0.1418, 6, 8]} />
            <meshStandardMaterial color="#0055A4" metalness={0.05} roughness={0.7} />
          </mesh>
          <mesh position={[0, -0.2418, 0]} castShadow>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshStandardMaterial color="#0055A4" metalness={0.05} roughness={0.7} />
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

        <group ref={leftLegRef} position={[-0.08, 0.504, 0]}>
          <group scale={[1, 1.2, 1]}>
            <mesh position={[0, -0.105, 0]} castShadow>
              <capsuleGeometry args={[0.065, 0.122, 6, 8]} />
              <meshStandardMaterial color="#000000" />
            </mesh>
            <group ref={leftKneeRef} position={[0, -0.21, 0]}>
              <mesh position={[0, -0.105, 0]} castShadow>
                <capsuleGeometry args={[0.065, 0.122, 6, 8]} />
                <meshStandardMaterial color="#000000" />
              </mesh>
              <group ref={leftAnkleRef} position={[0, -0.21, 0]}>
                <RoundedBox args={[0.184, 0.0568, 0.325]} radius={0.04} position={[0, -0.0678, 0.0975]} castShadow>
                  <meshStandardMaterial color="#000000" />
                </RoundedBox>
              </group>
            </group>
          </group>
        </group>

        <group ref={rightLegRef} position={[0.08, 0.504, 0]}>
          <group scale={[1, 1.2, 1]}>
            <mesh position={[0, -0.105, 0]} castShadow>
              <capsuleGeometry args={[0.065, 0.122, 6, 8]} />
              <meshStandardMaterial color="#000000" />
            </mesh>
            <group ref={rightKneeRef} position={[0, -0.21, 0]}>
              <mesh position={[0, -0.105, 0]} castShadow>
                <capsuleGeometry args={[0.065, 0.122, 6, 8]} />
                <meshStandardMaterial color="#000000" />
              </mesh>
              <group ref={rightAnkleRef} position={[0, -0.21, 0]}>
                <RoundedBox args={[0.184, 0.0568, 0.325]} radius={0.04} position={[0, -0.0678, 0.0975]} castShadow>
                  <meshStandardMaterial color="#000000" />
                </RoundedBox>
              </group>
            </group>
          </group>
        </group>

        <group ref={headRef} rotation={[0, Math.PI, 0]}>
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

          <mesh position={[0, 1.26, 0]} scale={[1.15, 0.28, 1.15]}>
            <sphereGeometry args={[0.16, 16, 16]} />
            <meshStandardMaterial color="#0055A4" roughness={0.6} />
          </mesh>
          <mesh position={[0, 1.22, 0.20]}>
            <boxGeometry args={[0.26, 0.025, 0.20]} />
            <meshStandardMaterial color="#003380" roughness={0.5} />
          </mesh>
        </group>
      </group>

      <group ref={speechBubbleRef}>
        <SpeechBubble visible={showSpeech.current} />
      </group>
      <group ref={greetingBubbleRef}>
        <GreetingBubble message={greetingMessage.current} visible={showGreeting.current} />
      </group>
    </RigidBody>
  );
}

export default NPC;
