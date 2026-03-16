import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

/* ─── Spinning portal rings ─── */
function PortalRing({ radius, speed, color, thickness = 0.012, tilt = 0 }) {
  const ref = useRef()
  useFrame((state) => {
    const t = state.clock.elapsedTime
    ref.current.rotation.z += speed * 0.008
    ref.current.rotation.x = tilt + Math.sin(t * speed * 0.5) * 0.15
  })
  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, thickness, 16, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.3} />
    </mesh>
  )
}

/* ─── Orbiting energy particles ─── */
function EnergyParticles({ count = 30, radius = 2.5, color = '#00f0ff' }) {
  const ref = useRef()
  const offsets = useMemo(() =>
    Array.from({ length: count }, () => ({
      angle: Math.random() * Math.PI * 2,
      y: (Math.random() - 0.5) * 1.5,
      speed: 0.15 + Math.random() * 0.3,
      r: radius + (Math.random() - 0.5) * 0.8,
      size: 0.015 + Math.random() * 0.025,
    })), [count, radius])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    ref.current.children.forEach((child, i) => {
      const o = offsets[i]
      const a = o.angle + t * o.speed
      child.position.set(Math.cos(a) * o.r, o.y + Math.sin(t * 0.8 + i) * 0.2, Math.sin(a) * o.r)
    })
  })

  return (
    <group ref={ref}>
      {offsets.map((o, i) => (
        <mesh key={i}>
          <sphereGeometry args={[o.size, 8, 8]} />
          <meshBasicMaterial color={color} transparent opacity={0.7} />
        </mesh>
      ))}
    </group>
  )
}

/* ─── Main portal ─── */
export default function ContactPortal() {
  const center = [0, 0.2, -92]
  const coreRef = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (coreRef.current) {
      const s = 1 + Math.sin(t * 1.2) * 0.06
      coreRef.current.scale.setScalar(s)
    }
  })

  return (
    <group position={center}>
      <Float speed={0.8} rotationIntensity={0.08} floatIntensity={0.15}>
        {/* Core orb — distorted glowing sphere */}
        <group ref={coreRef}>
          <mesh>
            <sphereGeometry args={[0.7, 64, 64]} />
            <MeshDistortMaterial
              color="#0a0a2e"
              emissive="#00f0ff"
              emissiveIntensity={0.2}
              roughness={0.15}
              metalness={0.95}
              distort={0.25}
              speed={1.8}
              transparent
              opacity={0.9}
            />
          </mesh>

          {/* Inner glow */}
          <mesh>
            <sphereGeometry args={[0.45, 32, 32]} />
            <meshBasicMaterial color="#00f0ff" transparent opacity={0.06} />
          </mesh>

          {/* Wireframe shell */}
          <mesh>
            <sphereGeometry args={[0.72, 24, 24]} />
            <meshBasicMaterial color="#00f0ff" wireframe transparent opacity={0.06} />
          </mesh>
        </group>

        {/* Portal rings */}
        <PortalRing radius={1.3} speed={0.6} color="#00f0ff" thickness={0.012} tilt={0.4} />
        <PortalRing radius={1.7} speed={-0.4} color="#a855f7" thickness={0.008} tilt={-0.3} />
        <PortalRing radius={2.1} speed={0.25} color="#f472b6" thickness={0.006} tilt={0.6} />

        {/* Energy particles */}
        <EnergyParticles count={25} radius={2.0} color="#00f0ff" />
        <EnergyParticles count={15} radius={1.5} color="#a855f7" />

        {/* Central light */}
        <pointLight color="#00f0ff" intensity={1.0} distance={12} />
        <pointLight color="#a855f7" intensity={0.4} distance={8} position={[0, 1, 0]} />
      </Float>
    </group>
  )
}
