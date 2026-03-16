import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// Smooth camera flight path through the 3D scene
const cameraPath = new THREE.CatmullRomCurve3([
  new THREE.Vector3(0, 0, 6),         // Hero — looking at the AI node
  new THREE.Vector3(0.3, 0.2, 3),     // Begin pull-back
  new THREE.Vector3(1.5, 0.3, -2),    // Drift right toward Experience 1
  new THREE.Vector3(2, 0.1, -6),      // Arrive at Experience 1
  new THREE.Vector3(0.5, 0, -10),     // Transition between exp cards
  new THREE.Vector3(-1.5, -0.2, -15), // Drift left toward Experience 2
  new THREE.Vector3(-2, -0.1, -18),   // Arrive at Experience 2
  new THREE.Vector3(0, 0.3, -24),     // Coast into Projects zone
  new THREE.Vector3(0.8, 0.4, -29),   // Approach Project 1 (right panel)
  new THREE.Vector3(0, 0.2, -33),     // Center between projects 1 & 2
  new THREE.Vector3(-0.8, 0.3, -37),  // Approach Project 2 (left panel)
  new THREE.Vector3(0, 0.2, -40),     // Center between projects 2 & 3
  new THREE.Vector3(0.8, 0.3, -44),   // Approach Project 3 (right panel)
  new THREE.Vector3(0, 0.2, -49),     // Transition to Tech Stack
  new THREE.Vector3(0.3, 0.3, -53),   // Approach constellation
  new THREE.Vector3(0, 0.2, -57),     // Arrive at Tech Stack center
  new THREE.Vector3(0, 0.1, -60),     // Settle in front of constellation
  new THREE.Vector3(0, 0.2, -65),     // Transition to Contact
  new THREE.Vector3(0, 0.2, -69),     // Approach Contact portal
  new THREE.Vector3(0, 0.2, -72),     // Final rest — facing the portal
])

// Where the camera looks — always slightly ahead and centered
const lookAtPath = new THREE.CatmullRomCurve3([
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(0.3, 0, -1),
  new THREE.Vector3(1, 0, -5),
  new THREE.Vector3(1.5, 0, -8),
  new THREE.Vector3(0, 0, -13),
  new THREE.Vector3(-1, 0, -17),
  new THREE.Vector3(-1.5, 0, -20),
  new THREE.Vector3(0, 0, -28),
  new THREE.Vector3(0.5, 0, -32),
  new THREE.Vector3(0, 0, -35),
  new THREE.Vector3(-0.5, 0, -39),
  new THREE.Vector3(0, 0, -42),
  new THREE.Vector3(0.5, 0, -46),
  new THREE.Vector3(0, 0, -52),
  new THREE.Vector3(0, 0.2, -56),
  new THREE.Vector3(0, 0.2, -59),
  new THREE.Vector3(0, 0.2, -63),
  new THREE.Vector3(0, 0.2, -68),
  new THREE.Vector3(0, 0.2, -71),
  new THREE.Vector3(0, 0.2, -76),
])

export default function CameraRig() {
  const { camera } = useThree()
  const smoothProgress = useRef(0)
  const targetLookAt = useRef(new THREE.Vector3())

  useFrame(() => {
    const el = document.documentElement
    const maxScroll = el.scrollHeight - window.innerHeight
    const rawProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0

    // Smooth the scroll progress for buttery animation
    smoothProgress.current += (rawProgress - smoothProgress.current) * 0.06
    const p = THREE.MathUtils.clamp(smoothProgress.current, 0, 0.9999)

    // Get positions from curves
    const pos = cameraPath.getPointAt(p)
    const look = lookAtPath.getPointAt(p)

    // Apply to camera
    camera.position.copy(pos)
    targetLookAt.current.lerp(look, 0.1)
    camera.lookAt(targetLookAt.current)
  })

  return null
}
