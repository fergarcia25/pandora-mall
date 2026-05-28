import { useRef, useCallback } from 'react';
import { keys } from '../stores/movementStore';
import styles from './TouchJoystick.module.scss';

const DEAD_ZONE = 15;

function TouchJoystick() {
  const baseRef = useRef(null);
  const thumbRef = useRef(null);
  const activeRef = useRef(false);
  const centerRef = useRef({ x: 0, y: 0 });

  const resetKeys = useCallback(() => {
    keys.forward = false;
    keys.backward = false;
    keys.left = false;
    keys.right = false;
  }, []);

  const handleTouchStart = useCallback((e) => {
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    centerRef.current = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
    activeRef.current = true;
    handleTouchMove(e);
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (!activeRef.current) return;
    e.preventDefault();

    const touch = e.touches[0];
    const dx = touch.clientX - centerRef.current.x;
    const dy = touch.clientY - centerRef.current.y;

    const maxRadius = baseRef.current.offsetWidth / 2 - thumbRef.current.offsetWidth / 2;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const clampedDist = Math.min(dist, maxRadius);
    const angle = Math.atan2(dy, dx);

    const clampedX = Math.cos(angle) * clampedDist;
    const clampedY = Math.sin(angle) * clampedDist;

    thumbRef.current.style.transform = `translate(${clampedX}px, ${clampedY}px)`;

    keys.forward = dy < -DEAD_ZONE;
    keys.backward = dy > DEAD_ZONE;
    keys.left = dx < -DEAD_ZONE;
    keys.right = dx > DEAD_ZONE;
  }, []);

  const handleTouchEnd = useCallback(() => {
    activeRef.current = false;
    thumbRef.current.style.transform = 'translate(0, 0)';
    resetKeys();
  }, [resetKeys]);

  return (
    <div
      ref={baseRef}
      className={styles.joystick}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      <div ref={thumbRef} className={styles.thumb} />
    </div>
  );
}

export default TouchJoystick;
