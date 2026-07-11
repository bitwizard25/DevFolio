'use client'

import { Float, Sparkles } from '@react-three/drei';

/**
 * Scene furniture, composed to stay OUT of the central content zone:
 * - two large, barely-there wireframe structures drifting at the edges
 * - a handful of tiny metallic accents at the periphery
 * - a sparse star field
 * Everything sits deep (z ≤ -5) so the scene fog fades it into the background.
 */

interface AccentSpec {
  geometry: 'icosahedron' | 'octahedron' | 'tetrahedron' | 'ring';
  position: [number, number, number];
  color: string;
  scale: number;
}

// Peripheral only: |x| ≥ 6 or |y| ≥ 2.5 at z −6…−8 keeps the headline/tagline clear
const ACCENTS: AccentSpec[] = [
  { geometry: 'icosahedron', position: [-8.2, 2.9, -6], color: '#0A84FF', scale: 0.4 },
  { geometry: 'octahedron', position: [-6.6, -3.4, -7], color: '#BF5AF2', scale: 0.5 },
  { geometry: 'tetrahedron', position: [7.4, -2.8, -6], color: '#32D74B', scale: 0.38 },
  { geometry: 'ring', position: [8.6, 3.2, -7], color: '#BF5AF2', scale: 0.55 },
  { geometry: 'octahedron', position: [0.4, 4.4, -8], color: '#0A84FF', scale: 0.34 },
];

function AccentGeometry({ type }: { type: AccentSpec['geometry'] }) {
  switch (type) {
    case 'icosahedron':
      return <icosahedronGeometry args={[1, 0]} />;
    case 'octahedron':
      return <octahedronGeometry args={[1, 0]} />;
    case 'tetrahedron':
      return <tetrahedronGeometry args={[1, 0]} />;
    case 'ring':
      return <torusGeometry args={[1, 0.18, 16, 40]} />;
  }
}

interface FloatingShapesProps {
  lite: boolean;
}

export default function FloatingShapes({ lite }: FloatingShapesProps) {
  const accents = lite ? ACCENTS.slice(0, 3) : ACCENTS;

  return (
    <>
      {/* Large wireframe structures — technical, barely visible, very slow */}
      <Float speed={0.6} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh position={[4.8, 2.6, -8]} rotation={[0.4, 0.3, 0]}>
          <icosahedronGeometry args={[2.8, 1]} />
          <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.05} />
        </mesh>
      </Float>
      {!lite && (
        <Float speed={0.45} rotationIntensity={0.35} floatIntensity={0.4}>
          <mesh position={[-7, -3.4, -9]} rotation={[0.2, 0.5, 0.1]}>
            <icosahedronGeometry args={[2, 1]} />
            <meshBasicMaterial color="#0A84FF" wireframe transparent opacity={0.07} />
          </mesh>
        </Float>
      )}

      {/* Tiny peripheral accents with a soft metallic finish */}
      {accents.map((accent, i) => (
        <Float key={i} speed={1 + (i % 3) * 0.25} rotationIntensity={0.6} floatIntensity={0.8}>
          <mesh position={accent.position} scale={accent.scale}>
            <AccentGeometry type={accent.geometry} />
            <meshStandardMaterial
              color={accent.color}
              emissive={accent.color}
              emissiveIntensity={0.22}
              metalness={0.6}
              roughness={0.3}
            />
          </mesh>
        </Float>
      ))}

      {/* Sparse star field */}
      <Sparkles
        count={lite ? 40 : 110}
        scale={[18, 10, 8]}
        size={1.6}
        speed={0.3}
        color="#0A84FF"
        opacity={0.35}
      />

      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.7} />
      <pointLight position={[-6, 3, -4]} color="#BF5AF2" intensity={2} distance={16} />
      <pointLight position={[5, -3, -2]} color="#32D74B" intensity={1} distance={12} />
    </>
  );
}
