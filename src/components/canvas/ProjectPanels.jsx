import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

/* ─── Holographic display frame ─── */
function HoloFrame({ position, rotation, color = '#00f0ff', width = 3.2, height = 2 }) {
  const groupRef = useRef()
  const edgeRef = useRef()
  const scanRef = useRef()

  // Frame corner points for edge lines
  const framePoints = useMemo(() => {
    const hw = width / 2
    const hh = height / 2
    return new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-hw, -hh, 0),
      new THREE.Vector3(hw, -hh, 0),
      new THREE.Vector3(hw, hh, 0),
      new THREE.Vector3(-hw, hh, 0),
      new THREE.Vector3(-hw, -hh, 0),
    ])
  }, [width, height])

  // Corner bracket geometry (short lines at each corner)
  const brackets = useMemo(() => {
    const hw = width / 2
    const hh = height / 2
    const bLen = 0.3
    const corners = [
      // Top-left
      [[-hw, hh, 0], [-hw + bLen, hh, 0]],
      [[-hw, hh, 0], [-hw, hh - bLen, 0]],
      // Top-right
      [[hw, hh, 0], [hw - bLen, hh, 0]],
      [[hw, hh, 0], [hw, hh - bLen, 0]],
      // Bottom-left
      [[-hw, -hh, 0], [-hw + bLen, -hh, 0]],
      [[-hw, -hh, 0], [-hw, -hh + bLen, 0]],
      // Bottom-right
      [[hw, -hh, 0], [hw - bLen, -hh, 0]],
      [[hw, -hh, 0], [hw, -hh + bLen, 0]],
    ]
    return corners.map(([a, b]) =>
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(...a),
        new THREE.Vector3(...b),
      ])
    )
  }, [width, height])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    // Pulse the frame edges
    if (edgeRef.current) {
      edgeRef.current.material.opacity = 0.12 + Math.sin(t * 2) * 0.04
    }
    // Scan line animation
    if (scanRef.current) {
      const scanY = ((t * 0.4) % 1) * height - height / 2
      scanRef.current.position.y = scanY
      scanRef.current.material.opacity = 0.06 + Math.sin(t * 3) * 0.03
    }
  })

  return (
    <Float speed={0.8} rotationIntensity={0.05} floatIntensity={0.15}>
      <group ref={groupRef} position={position} rotation={rotation}>
        {/* Back panel — semi-transparent */}
        <mesh>
          <planeGeometry args={[width, height]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.03}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Subtle grid overlay */}
        <mesh position={[0, 0, 0.001]}>
          <planeGeometry args={[width, height, 16, 10]} />
          <meshBasicMaterial
            color={color}
            wireframe
            transparent
            opacity={0.03}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Outer frame line */}
        <line ref={edgeRef} geometry={framePoints}>
          <lineBasicMaterial color={color} transparent opacity={0.15} />
        </line>

        {/* Corner brackets — brighter accents */}
        {brackets.map((geo, i) => (
          <line key={i} geometry={geo}>
            <lineBasicMaterial color={color} transparent opacity={0.6} linewidth={1} />
          </line>
        ))}

        {/* Scanning line effect */}
        <mesh ref={scanRef} position={[0, 0, 0.002]}>
          <planeGeometry args={[width * 0.95, 0.02]} />
          <meshBasicMaterial color={color} transparent opacity={0.08} />
        </mesh>

        {/* Top accent bar */}
        <mesh position={[0, height / 2 + 0.03, 0]}>
          <planeGeometry args={[width * 0.4, 0.005]} />
          <meshBasicMaterial color={color} transparent opacity={0.5} />
        </mesh>

        {/* Glow light for this panel */}
        <pointLight color={color} intensity={0.3} distance={6} position={[0, 0, 1]} />
      </group>
    </Float>
  )
}

/* ─── Small orbiting data nodes around each panel ─── */
function DataNodes({ position, color, count = 4, radius = 2 }) {
  const groupRef = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    groupRef.current.children.forEach((child, i) => {
      const angle = (i / count) * Math.PI * 2 + t * 0.3
      child.position.x = Math.cos(angle) * radius
      child.position.y = Math.sin(angle * 0.7) * 0.5
      child.position.z = Math.sin(angle) * radius * 0.3
    })
  })

  return (
    <group ref={groupRef} position={position}>
      {Array.from({ length: count }, (_, i) => (
        <mesh key={i}>
          <octahedronGeometry args={[0.04, 0]} />
          <meshBasicMaterial color={color} transparent opacity={0.7} />
        </mesh>
      ))}
    </group>
  )
}

/* ─── Connecting arc between the two project panels ─── */
function ConnectorArc({ startZ, endZ, color = '#00f0ff' }) {
  const geometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(2.5, 0, startZ),
      new THREE.Vector3(1.5, 0.8, (startZ + endZ) / 2 + 1),
      new THREE.Vector3(0, 1, (startZ + endZ) / 2),
      new THREE.Vector3(-1.5, 0.8, (startZ + endZ) / 2 - 1),
      new THREE.Vector3(-2.5, 0, endZ),
    ])
    return new THREE.BufferGeometry().setFromPoints(curve.getPoints(60))
  }, [startZ, endZ])

  const ref = useRef()

  useFrame((state) => {
    ref.current.material.opacity = 0.06 + Math.sin(state.clock.elapsedTime * 1.2) * 0.03
  })

  return (
    <line ref={ref} geometry={geometry}>
      <lineBasicMaterial color={color} transparent opacity={0.08} />
    </line>
  )
}

/* ─── Main export ─── */
export default function ProjectPanels() {
  return (
    <group>
      {/* Project 1: LLM Analytics Copilot — right side */}
      <HoloFrame
        position={[3, 0.3, -30]}
        rotation={[0, -0.35, 0]}
        color="#00f0ff"
        width={3.4}
        height={2.2}
      />
      <DataNodes position={[3, 0.3, -30]} color="#00f0ff" count={5} radius={2.2} />

      {/* Project 2: Automated MLOps Pipeline — left side */}
      <HoloFrame
        position={[-3, 0.3, -37]}
        rotation={[0, 0.35, 0]}
        color="#a855f7"
        width={3.4}
        height={2.2}
      />
      <DataNodes position={[-3, 0.3, -37]} color="#a855f7" count={5} radius={2.2} />

      {/* Project 3: Dyslexia Screening System — right side */}
      <HoloFrame
        position={[3, 0.3, -44]}
        rotation={[0, -0.35, 0]}
        color="#f472b6"
        width={3.4}
        height={2.2}
      />
      <DataNodes position={[3, 0.3, -44]} color="#f472b6" count={5} radius={2.2} />

      {/* Arcs connecting the panels */}
      <ConnectorArc startZ={-30} endZ={-37} color="#f472b6" />
      <ConnectorArc startZ={-37} endZ={-44} color="#00f0ff" />
    </group>
  )
}
