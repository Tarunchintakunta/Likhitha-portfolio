import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import { Suspense } from 'react'
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import AINode from './AINode'
import Particles from './Particles'
import CameraRig from './CameraRig'
import WaypointMarkers from './WaypointMarkers'
import ProjectPanels from './ProjectPanels'
import TechConstellation from './TechConstellation'
import ContactPortal from './ContactPortal'

function Lights() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#ffffff" />
      <pointLight position={[-5, 3, -5]} intensity={0.8} color="#00f0ff" distance={20} />
      <pointLight position={[5, -3, 5]} intensity={0.5} color="#a855f7" distance={20} />
      <pointLight position={[0, 5, 0]} intensity={0.3} color="#f472b6" distance={15} />
      {/* Experience zone */}
      <pointLight position={[3, 1, -8]} intensity={0.4} color="#00f0ff" distance={15} />
      <pointLight position={[-3, 1, -18]} intensity={0.4} color="#a855f7" distance={15} />
      {/* Projects zone */}
      <pointLight position={[3, 1, -30]} intensity={0.5} color="#00f0ff" distance={12} />
      <pointLight position={[-3, 1, -37]} intensity={0.5} color="#a855f7" distance={12} />
      <pointLight position={[3, 1, -44]} intensity={0.5} color="#f472b6" distance={12} />
      {/* Tech Stack zone */}
      <pointLight position={[0, 2, -57]} intensity={0.6} color="#f472b6" distance={15} />
      <pointLight position={[2, -1, -55]} intensity={0.3} color="#00f0ff" distance={10} />
      {/* Contact zone */}
      <pointLight position={[0, 2, -72]} intensity={0.5} color="#00f0ff" distance={12} />
      <pointLight position={[0, -2, -72]} intensity={0.3} color="#a855f7" distance={10} />
    </>
  )
}

function PostProcessing() {
  return (
    <EffectComposer>
      <Bloom
        intensity={0.8}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={[0.0005, 0.0005]}
      />
    </EffectComposer>
  )
}

export default function Scene() {
  return (
    <div id="canvas-container">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 55 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#0a0a0f']} />
        <fog attach="fog" args={['#0a0a0f', 6, 80]} />

        <Suspense fallback={null}>
          <CameraRig />
          <Lights />
          <AINode />
          <Particles />
          <WaypointMarkers />
          <ProjectPanels />
          <TechConstellation />
          <ContactPortal />
          <PostProcessing />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  )
}
