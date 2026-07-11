'use client'

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Billboard, Text } from '@react-three/drei';
import { easing } from 'maath';
import type { Group } from 'three';
import { allSkills } from '@/lib/skills';

const RADIUS = 2.55;
const GOLDEN_ANGLE = Math.PI * (1 + Math.sqrt(5));

// Compact display names — the pills keep the full names; the orb needs short, non-colliding words
const SHORT_LABELS: Record<string, string> = {
  'Python (FastApi/Django)': 'Python',
  'Payment Gateways': 'Payments',
  'REST APIs': 'REST',
  'Zoho API': 'Zoho',
  PostgreSQL: 'Postgres',
};

/** Skill names on a fibonacci sphere with a faint wireframe globe for structure */
export default function WordSphere({ speedMultiplier = 1, showGlobeMesh = true }: { speedMultiplier?: number; showGlobeMesh?: boolean }) {
  const group = useRef<Group>(null);
  const baseY = useRef(0);

  const words = useMemo(
    () =>
      allSkills.map((skill, i) => {
        const phi = Math.acos(1 - (2 * (i + 0.5)) / allSkills.length);
        const theta = GOLDEN_ANGLE * i;
        return {
          label: SHORT_LABELS[skill.name] ?? skill.name,
          color: skill.color,
          position: [
            RADIUS * Math.sin(phi) * Math.cos(theta),
            RADIUS * Math.cos(phi),
            RADIUS * Math.sin(phi) * Math.sin(theta),
          ] as [number, number, number],
        };
      }),
    [],
  );

  useFrame((state, delta) => {
    if (!group.current) return;
    baseY.current += delta * 0.07 * speedMultiplier;
    easing.dampE(
      group.current.rotation,
      [state.pointer.y * 0.15, baseY.current + state.pointer.x * 0.3, 0],
      0.5,
      delta,
    );
  });

  return (
    <group ref={group}>
      {/* The globe: a barely-there wireframe sphere gives the words a structure to live on */}
      {showGlobeMesh && (
        <mesh>
          <sphereGeometry args={[RADIUS * 0.99, 20, 20]} />
          <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.035} />
        </mesh>
      )}

      {words.map((word, i) => (
        <group key={i} position={word.position}>
          {/* Anchor dot ties the word to the sphere surface */}
          <mesh>
            <sphereGeometry args={[0.028, 8, 8]} />
            <meshBasicMaterial color={word.color} transparent opacity={0.9} />
          </mesh>
          <Billboard>
            <Text
              position={[0, 0.14, 0]}
              fontSize={0.21}
              color={word.color}
              fillOpacity={0.92}
              outlineWidth={0.012}
              outlineColor="#000000"
              outlineOpacity={0.85}
              font="/fonts/Inter-Medium.woff"
              anchorX="center"
              anchorY="bottom"
            >
              {word.label}
            </Text>
          </Billboard>
        </group>
      ))}
    </group>
  );
}
