import { Suspense, useState, useCallback, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toggleCameraMode } from '@/store/slices/uiSlice';
import { setNpcGreeting } from '@/store/slices/mallSlice';
import { Scene } from '@/features/virtual-mall';
import FloatingPrompt from '@/features/virtual-mall/components/FloatingPrompt';
import TouchJoystick from '@/features/virtual-mall/components/TouchJoystick';
import Spinner from '@/components/ui/Spinner/Spinner';
import styles from './VirtualMallPage.module.scss';

const PROXIMITY_THRESHOLD = 3.6;
const NPC_PROXIMITY_THRESHOLD = 3.5;
const GREETING_COOLDOWN = 20;

const STORE_ENTRANCES = [
  { id: 'store-1', name: 'Tech World', pos: [-9.6, 0, -6], color: '#6c5ce7' },
  { id: 'store-2', name: 'Fashion Hub', pos: [9.6, 0, -6], color: '#fd79a8' },
  { id: 'store-3', name: 'Game Zone', pos: [-9.6, 0, 10], color: '#00cec9' },
  { id: 'store-4', name: 'Book Nook', pos: [9.6, 0, 10], color: '#fdcb6e' },
  { id: 'store-5', name: 'Cyber Tower', pos: [-9.6, 0, 2], color: '#e17055' },
  { id: 'store-6', name: 'Nexus Plaza', pos: [9.6, 0, 2], color: '#2e86de' },
];

function VirtualMallPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const avatarPos = useSelector((state) => state.mall.avatarPosition);
  const cameraMode = useSelector((state) => state.ui.cameraMode);
  const npcPos = useSelector((state) => state.mall.npcPosition);
  const npcGreeting = useSelector((state) => state.mall.npcGreeting);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [nearbyStore, setNearbyStore] = useState(null);
  const [nearbyNpc, setNearbyNpc] = useState(false);
  const [greetingActive, setGreetingActive] = useState(false);
  const [greetingCooldown, setGreetingCooldown] = useState(false);
  const storeCooldown = useRef(null);

  useEffect(() => {
    if (!greetingActive && npcGreeting) {
      setGreetingActive(true);
    } else if (greetingActive && !npcGreeting) {
      setGreetingActive(false);
    }
  }, [npcGreeting, greetingActive]);

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  useEffect(() => {
    const [ax, , az] = avatarPos;
    let found = null;

    for (const store of STORE_ENTRANCES) {
      const [sx, , sz] = store.pos;
      const dx = ax - sx;
      const dz = az - sz;
      const dist = Math.sqrt(dx * dx + dz * dz);

      if (dist < PROXIMITY_THRESHOLD) {
        found = store;
        break;
      }
    }

    if (found?.id !== nearbyStore?.id) {
      setNearbyStore(found);
    }

    const [nx, , nz] = npcPos;
    const npcDx = ax - nx;
    const npcDz = az - nz;
    const npcDist = Math.sqrt(npcDx * npcDx + npcDz * npcDz);
    const isNearNpc = npcDist < NPC_PROXIMITY_THRESHOLD;
    setNearbyNpc(isNearNpc);
  }, [avatarPos, nearbyStore, npcPos]);

  const storeInCooldown = storeCooldown.current !== null;
  const prompt = nearbyStore && !storeInCooldown
    ? { type: 'store', store: nearbyStore }
    : nearbyNpc && !greetingActive && !greetingCooldown
      ? { type: 'npc' }
      : null;

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, []);

  const handleConfirm = useCallback(() => {
    if (!prompt) return;
    if (prompt.type === 'store') {
      storeCooldown.current = setTimeout(() => {
        storeCooldown.current = null;
      }, GREETING_COOLDOWN * 1000);
      navigate(`/catalog?store=${prompt.store.id}`);
    } else if (prompt.type === 'npc') {
      dispatch(setNpcGreeting(true));
      setGreetingCooldown(true);
      setTimeout(() => setGreetingCooldown(false), GREETING_COOLDOWN * 1000);
    }
  }, [prompt, navigate, dispatch]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Enter' && prompt) {
        handleConfirm();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [prompt, handleConfirm]);

  return (
    <div className={styles.fullscreen} id="virtual-mall-container">
      <Suspense fallback={
        <div className={styles.loading}>
          <Spinner size="lg" />
          <p className={styles.loadingText}>Loading the mall...</p>
        </div>
      }>
        <Scene />
      </Suspense>

      <div className={styles.topLeftButtons}>
        <div className={styles.switch} onClick={() => dispatch(toggleCameraMode())}>
          <span className={`${styles.switchOpt} ${cameraMode === 'C-AVT' ? styles.switchActive : ''}`}>
            C-AVT
          </span>
          <span className={`${styles.switchOpt} ${cameraMode === 'C-FULL' ? styles.switchActive : ''}`}>
            C-FULL
          </span>
          <div
            className={styles.switchThumb}
            style={{
              transform: cameraMode === 'C-AVT' ? 'translateX(0)' : 'translateX(100%)',
              background: cameraMode === 'C-AVT' ? '#00cec9' : '#6c5ce7',
            }}
          />
        </div>
      </div>

      <div className={styles.topButtons}>
        <button
          className={styles.fullscreenBtn}
          onClick={toggleFullscreen}
          aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
        >
          {isFullscreen ? (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="4 14 10 14 10 20" />
              <polyline points="20 10 14 10 14 4" />
              <line x1="14" y1="10" x2="21" y2="3" />
              <line x1="3" y1="21" x2="10" y2="14" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 3 21 3 21 9" />
              <polyline points="9 21 3 21 3 15" />
              <line x1="21" y1="3" x2="14" y2="10" />
              <line x1="3" y1="21" x2="10" y2="14" />
            </svg>
          )}
        </button>
      </div>

      <div className={styles.hud}>
        <div className={styles.hudControls}>
          <kbd className={styles.kbd}>W A S D</kbd>
          <span className={styles.hudText}>Move</span>
          <kbd className={styles.kbd}>Mouse</kbd>
          <span className={styles.hudText}>Look around</span>
        </div>
      </div>

      <FloatingPrompt prompt={prompt} onConfirm={handleConfirm} />

      <TouchJoystick />
    </div>
  );
}

export default VirtualMallPage;
