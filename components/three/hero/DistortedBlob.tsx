'use client'

import { Sphere, MeshDistortMaterial } from '@react-three/drei';

interface DistortedBlobProps {
  lite: boolean;
}

/**
 * Atmospheric core: a large, dim, slowly-morphing sphere far behind the headline.
 * Reads as a deep-blue aurora, not an object — keep it dark and translucent.
 */
export default function DistortedBlob({ lite }: DistortedBlobProps) {
  return (
    <Sphere
      args={[1.6, lite ? 48 : 96, lite ? 48 : 96]}
      position={lite ? [0, 1.2, -7] : [-2.4, 0.3, -7]}
      scale={2.2}
    >
      <MeshDistortMaterial
        color="#061c3f"
        emissive="#0A84FF"
        emissiveIntensity={0.32}
        distort={0.45}
        speed={1.1}
        roughness={0.9}
        metalness={0}
        transparent
        opacity={0.3}
      />
    </Sphere>
  );
}
