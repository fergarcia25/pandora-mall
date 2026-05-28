function Lights() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[5, 15, 10]}
        intensity={0.8}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-60}
        shadow-camera-right={60}
        shadow-camera-top={60}
        shadow-camera-bottom={-60}
        shadow-camera-near={0.1}
        shadow-camera-far={60}
      />
      <pointLight position={[-8, 6, -8]} intensity={0.3} color="#6c5ce7" />
      <pointLight position={[8, 6, 8]} intensity={0.3} color="#00cec9" />
      <hemisphereLight
        args={['#ffffff', '#e0e0e0', 0.4]}
      />
    </>
  );
}

export default Lights;
