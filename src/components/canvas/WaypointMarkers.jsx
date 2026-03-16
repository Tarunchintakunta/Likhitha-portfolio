import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function GlowRing({ position, color = '#00f0ff', size = 1.2 }) {
  const ref = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    ref.current.rotation.x = Math.sin(t * 0.5) * 0.3
    ref.current.rotation.y += 0.008
    const s = 1 + Math.sin(t * 2) * 0.08
    ref.current.scale.setScalar(s)
  })

  return (
    <group position={position}>
      <mesh ref={ref}>
        <torusGeometry args={[size, 0.015, 16, 64]} />
        <meshBasicMaterial color={color} transparent opacity={0.35} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.6} />
      </mesh>
      <pointLight color={color} intensity={0.6} distance={8} />
    </group>
  )
}

function ConnectingBeam({ start, end, color = '#00f0ff' }) {
  const ref = useRef()
  const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)]
  const geometry = new THREE.BufferGeometry().setFromPoints(points)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    ref.current.material.opacity = 0.06 + Math.sin(t * 1.5) * 0.03
  })

  return (
    <line ref={ref} geometry={geometry}>
      <lineBasicMaterial color={color} transparent opacity={0.08} />
    </line>
  )
}

export default function WaypointMarkers() {
  return (
    <group>
      {/* ── Experience zone ── */}
      <GlowRing position={[4, 0, -6]} color="#00f0ff" size={1.0} />
      <GlowRing position={[-4, 0, -18]} color="#a855f7" size={1.0} />
      <ConnectingBeam start={[4, 0, -6]} end={[-4, 0, -18]} color="#00f0ff" />

      {/* ── Transition zone ── */}
      <GlowRing position={[0, 2, -12]} color="#f472b6" size={0.6} />
      <GlowRing position={[-2, -1, -9]} color="#3b82f6" size={0.4} />
      <GlowRing position={[3, 1, -22]} color="#00f0ff" size={0.5} />

      {/* ── Projects zone ── */}
      <GlowRing position={[5, 0.5, -30]} color="#00f0ff" size={0.7} />
      <GlowRing position={[-5, 0.5, -37]} color="#a855f7" size={0.7} />
      <ConnectingBeam start={[0, 0.3, -24]} end={[3, 0.3, -30]} color="#00f0ff" />
      <ConnectingBeam start={[3, 0.3, -30]} end={[-3, 0.3, -37]} color="#a855f7" />

      {/* Extra depth markers in projects zone */}
      <GlowRing position={[1, -1, -27]} color="#f472b6" size={0.35} />
      <GlowRing position={[-1.5, 1.5, -34]} color="#3b82f6" size={0.3} />
      <GlowRing position={[2, -0.5, -41]} color="#f472b6" size={0.4} />
      <GlowRing position={[-1, 1, -46]} color="#00f0ff" size={0.35} />
      <GlowRing position={[-5, 0.5, -51]} color="#3b82f6" size={0.7} />
      <GlowRing position={[1.5, -0.5, -49]} color="#3b82f6" size={0.3} />
      <ConnectingBeam start={[3, 0.3, -30]} end={[-3, 0.3, -37]} color="#a855f7" />
      <ConnectingBeam start={[-3, 0.3, -37]} end={[3, 0.3, -44]} color="#f472b6" />
      <ConnectingBeam start={[3, 0.3, -44]} end={[-3, 0.3, -51]} color="#3b82f6" />

      {/* ── Tech Stack zone ── */}
      <GlowRing position={[3, 1.5, -61]} color="#00f0ff" size={0.5} />
      <GlowRing position={[-3, 1.5, -67]} color="#a855f7" size={0.5} />
      <GlowRing position={[0, -1.5, -64]} color="#f472b6" size={0.4} />
      <ConnectingBeam start={[-3, 0.3, -51]} end={[0, 0.2, -58]} color="#3b82f6" />
      <ConnectingBeam start={[0, 0.2, -58]} end={[0, 0.2, -64]} color="#00f0ff" />

      {/* ── Education zone ── */}
      <GlowRing position={[3, 1, -76]} color="#3b82f6" size={0.5} />
      <GlowRing position={[-3, 1, -80]} color="#00f0ff" size={0.5} />
      <GlowRing position={[0, -1.5, -78]} color="#a855f7" size={0.35} />
      <ConnectingBeam start={[0, 0.2, -67]} end={[0, 0.2, -78]} color="#3b82f6" />

      {/* ── Contact zone ── */}
      <GlowRing position={[2.5, 1, -87]} color="#00f0ff" size={0.4} />
      <GlowRing position={[-2.5, 1, -90]} color="#a855f7" size={0.4} />
      <GlowRing position={[0, -1.5, -94]} color="#f472b6" size={0.35} />
      <ConnectingBeam start={[0, 0.2, -80]} end={[0, 0.2, -92]} color="#00f0ff" />
    </group>
  )
}
