import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useStore } from 'react-redux';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const CAMERA_DISTANCE = 14;
const CAMERA_HEIGHT = 10;
const AVT_DISTANCE = 4.48;
const AVT_HEIGHT = 1.2;
const LERP_SPEED = 4;

function CameraController() {
  const cameraRef = useRef();
  const store = useStore();

  useFrame((_, delta) => {
    const { cameraMode, avatarPosition, avatarRotation } = getLiveState(store);
    if (!cameraRef.current) return;

    if (cameraMode === 'C-AVT') {
      const [ax, ay, az] = avatarPosition;
      const targetX = ax - Math.sin(avatarRotation) * AVT_DISTANCE;
      const targetZ = az - Math.cos(avatarRotation) * AVT_DISTANCE;
      const targetY = ay + AVT_HEIGHT;

      cameraRef.current.position.lerp(
        new THREE.Vector3(targetX, targetY, targetZ),
        Math.min(1, LERP_SPEED * delta)
      );
      cameraRef.current.lookAt(ax, ay + 1.81, az);
    } else {
      cameraRef.current.position.lerp(
        new THREE.Vector3(CAMERA_DISTANCE, CAMERA_HEIGHT, CAMERA_DISTANCE),
        Math.min(1, LERP_SPEED * delta)
      );
      cameraRef.current.lookAt(0, 0, 0);
    }
  });

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={[0, AVT_HEIGHT + 0.6, AVT_DISTANCE + 8]}
      fov={50}
      near={0.1}
      far={100}
    />
  );
}

function getLiveState(store) {
  const state = store.getState();
  return {
    cameraMode: state.ui.cameraMode,
    avatarPosition: state.mall.avatarPosition,
    avatarRotation: state.mall.avatarRotation,
  };
}

export default CameraController;
