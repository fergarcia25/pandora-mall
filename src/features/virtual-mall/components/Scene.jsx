import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import CameraController from './CameraController';
import Ground from './Ground';
import MallStructure from './MallStructure';
import StoreBox from './StoreBox';
import Avatar from './Avatar';
import Lights from './Lights';
import Billboard from './Billboard';
import Decorations from './Decorations';
import EntranceMarkers from './EntranceMarkers';

function Scene() {
  return (
    <Canvas shadows>
      <CameraController />
      <Lights />
      <Physics gravity={[0, -9.81, 0]}>
        <Ground />
        <MallStructure />
        <StoreBox position={[-7, 0.5, -3]} storeId="store-1" storeName="Tech World" color="#6c5ce7" />
        <StoreBox position={[7, 0.5, -3]} storeId="store-2" storeName="Fashion Hub" color="#fd79a8" />
        <StoreBox position={[-7, 0.5, 5]} storeId="store-3" storeName="Game Zone" color="#00cec9" />
        <StoreBox position={[7, 0.5, 5]} storeId="store-4" storeName="Book Nook" color="#fdcb6e" />
        <Decorations />
        <EntranceMarkers />
        <Avatar />
      </Physics>
      <Billboard />
    </Canvas>
  );
}

export default Scene;
