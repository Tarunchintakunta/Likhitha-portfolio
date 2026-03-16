import { useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Html, Float } from '@react-three/drei'
import * as THREE from 'three'

const techNodes = [
  { label: 'Python',     color: '#00f0ff', pos: [0, 2.2, 0] },
  { label: 'PyTorch',    color: '#a855f7', pos: [2.1, 0.8, 0.6] },
  { label: 'LangChain',  color: '#f472b6', pos: [1.3, -1.6, -0.4] },
  { label: 'Snowflake',  color: '#00f0ff', pos: [-1.3, -1.6, 0.4] },
  { label: 'AWS',        color: '#a855f7', pos: [-2.1, 0.8, -0.6] },
  { label: 'MLflow',     color: '#f472b6', pos: [0, 0, 2.0] },
]

const connections = [
  [0, 1], [0, 4], [0, 5],
  [1, 2], [1, 5],
  [2, 3], [2, 5],
  [3, 4], [3, 5],
  [4, 5],
]

function ConnectionLines() {
  const ref = useRef()
  const positions = new Float32Array(connections.length * 6)
  connections.forEach(([a, b], i) => {
    positions.set(techNodes[a].pos, i * 6)
    positions.set(techNodes[b].pos, i * 6 + 3)
  })

  useFrame((state) => {
    ref.current.material.opacity = 0.07 + Math.sin(state.clock.elapsedTime * 1.5) * 0.03
  })

  return (
    <lineSegments ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={connections.length * 2} array={positions} itemSize={3} />
      </bufferGeometry>
      <lineBasicMaterial color="#00f0ff" transparent opacity={0.08} />
    </lineSegments>
  )
}

function TechNode({ label, color, position }) {
  const groupRef = useRef()
  const glowRef = useRef()
  const ringRef = useRef()
  const [hovered, setHovered] = useState(false)
  const scaleRef = useRef(1)
  const { gl } = useThree()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const target = hovered ? 1.35 : 1
    scaleRef.current += (target - scaleRef.current) * 0.08
    groupRef.current.scale.setScalar(scaleRef.current)

    if (glowRef.current) {
      glowRef.current.material.opacity = (hovered ? 0.3 : 0.15) + Math.sin(t * 2.5) * 0.05
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.01
      ringRef.current.rotation.x = Math.sin(t * 0.8) * 0.3
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Hit area */}
      <mesh
        onPointerEnter={(e) => { e.stopPropagation(); setHovered(true); gl.domElement.style.cursor = 'pointer' }}
        onPointerLeave={() => { setHovered(false); gl.domElement.style.cursor = '' }}
      >
        <sphereGeometry args={[0.5, 8, 8]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* Glow sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.15} />
      </mesh>

      {/* Center dot */}
      <mesh>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshBasicMaterial color={color} transparent opacity={0.9} />
      </mesh>

      {/* Ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[0.32, 0.006, 12, 48]} />
        <meshBasicMaterial color={color} transparent opacity={hovered ? 0.5 : 0.2} />
      </mesh>

      {/* HTML label — renders as DOM, no font loading, no crash risk */}
      <Html center distanceFactor={8} style={{ pointerEvents: 'none' }}>
        <div style={{
          color: hovered ? '#ffffff' : color,
          fontSize: '13px',
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          letterSpacing: '0.05em',
          textShadow: `0 0 12px ${color}80`,
          whiteSpace: 'nowrap',
          transform: 'translateY(22px)',
          transition: 'color 0.2s ease',
        }}>
          {label}
        </div>
      </Html>

      <pointLight color={color} intensity={hovered ? 0.8 : 0.3} distance={hovered ? 5 : 3} />
    </group>
  )
}

export default function TechConstellation() {
  const groupRef = useRef()
  const center = [0, 0.2, -57]

  useFrame((state) => {
    groupRef.current.rotation.y += 0.002
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.08
  })

  return (
    <group position={center}>
      <Float speed={0.6} rotationIntensity={0.05} floatIntensity={0.2}>
        <group ref={groupRef}>
          <ConnectionLines />
          {techNodes.map((node) => (
            <TechNode key={node.label} label={node.label} color={node.color} position={node.pos} />
          ))}
          {/* Central anchor */}
          <mesh>
            <sphereGeometry args={[0.08, 12, 12]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.2} />
          </mesh>
        </group>
      </Float>
    </group>
  )
}
