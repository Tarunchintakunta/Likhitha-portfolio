import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { MeshDistortMaterial, Sphere, Float, Ring } from '@react-three/drei'
import * as THREE from 'three'

function OrbitRing({ radius, speed, color, thickness = 0.015 }) {
  const ref = useRef()
  useFrame((state) => {
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * speed) * 0.5
    ref.current.rotation.y += speed * 0.01
    ref.current.rotation.z = Math.cos(state.clock.elapsedTime * speed * 0.7) * 0.3
  })
  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, thickness, 16, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.4} />
    </mesh>
  )
}

function GlowSphere() {
  const ref = useRef()
  const { pointer } = useThree()

  useFrame((state) => {
    const time = state.clock.elapsedTime
    // Smooth follow cursor
    ref.current.rotation.x = THREE.MathUtils.lerp(
      ref.current.rotation.x,
      pointer.y * 0.4,
      0.05
    )
    ref.current.rotation.y = THREE.MathUtils.lerp(
      ref.current.rotation.y,
      pointer.x * 0.4,
      0.05
    )
    // Gentle breathing scale
    const scale = 1 + Math.sin(time * 1.5) * 0.05
    ref.current.scale.setScalar(scale)
  })

  return (
    <group ref={ref}>
      <Sphere args={[1, 64, 64]}>
        <MeshDistortMaterial
          color="#0a0a2e"
          emissive="#00f0ff"
          emissiveIntensity={0.15}
          roughness={0.2}
          metalness={0.9}
          distort={0.3}
          speed={2}
          transparent
          opacity={0.9}
        />
      </Sphere>

      {/* Inner glow core */}
      <Sphere args={[0.6, 32, 32]}>
        <meshBasicMaterial
          color="#00f0ff"
          transparent
          opacity={0.08}
        />
      </Sphere>

      {/* Wireframe overlay */}
      <Sphere args={[1.02, 32, 32]}>
        <meshBasicMaterial
          color="#00f0ff"
          wireframe
          transparent
          opacity={0.08}
        />
      </Sphere>
    </group>
  )
}

function FloatingOrbs() {
  const groupRef = useRef()
  const orbs = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => ({
      angle: (i / 6) * Math.PI * 2,
      radius: 2.2 + Math.random() * 0.5,
      speed: 0.3 + Math.random() * 0.4,
      size: 0.04 + Math.random() * 0.06,
      color: ['#00f0ff', '#a855f7', '#f472b6'][i % 3],
    }))
  }, [])

  useFrame((state) => {
    const time = state.clock.elapsedTime
    groupRef.current.children.forEach((child, i) => {
      const orb = orbs[i]
      child.position.x = Math.cos(time * orb.speed + orb.angle) * orb.radius
      child.position.y = Math.sin(time * orb.speed * 1.3 + orb.angle) * 0.8
      child.position.z = Math.sin(time * orb.speed + orb.angle) * orb.radius
    })
  })

  return (
    <group ref={groupRef}>
      {orbs.map((orb, i) => (
        <mesh key={i}>
          <sphereGeometry args={[orb.size, 16, 16]} />
          <meshBasicMaterial
            color={orb.color}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  )
}

export default function AINode() {
  const groupRef = useRef()
  const { pointer } = useThree()

  useFrame(() => {
    // Entire group gently follows cursor
    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      pointer.x * 0.3,
      0.02
    )
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      pointer.y * 0.2,
      0.02
    )
  })

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <GlowSphere />
        <OrbitRing radius={1.8} speed={0.5} color="#00f0ff" />
        <OrbitRing radius={2.2} speed={-0.3} color="#a855f7" thickness={0.01} />
        <OrbitRing radius={2.6} speed={0.2} color="#f472b6" thickness={0.008} />
        <FloatingOrbs />
      </Float>
    </group>
  )
}
