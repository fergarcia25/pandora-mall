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
import Fountain from './Fountain';
import ReceptionCounter from './ReceptionCounter';

function Scene() {
  return (
    <Canvas shadows>
      <CameraController />
      <Lights />
      <Physics gravity={[0, -9.81, 0]}>
        <Ground />
        <MallStructure />
        <Fountain />
        <ReceptionCounter />
        <StoreBox position={[-14, 0, -6]} storeId="store-1" storeName="Tech World" color="#6c5ce7" />
        <StoreBox position={[14, 0, -6]} storeId="store-2" storeName="Fashion Hub" color="#fd79a8" />
        <StoreBox position={[-14, 0, 10]} storeId="store-3" storeName="Game Zone" color="#00cec9" />
        <StoreBox position={[14, 0, 10]} storeId="store-4" storeName="Book Nook" color="#fdcb6e" />
        <StoreBox position={[-14, 0, 2]} storeId="store-5" storeName="Cyber Tower" color="#e17055" height={6.0} depth={9.6} />
        <StoreBox position={[14, 0, 2]} storeId="store-6" storeName="Nexus Plaza" color="#2e86de" height={6.0} depth={9.6} />
        <Decorations />
        <EntranceMarkers />
        <Avatar />
      </Physics>
      <Billboard />
    </Canvas>
  );
}

export default Scene;
