'use client'

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import type { Group } from 'three';

interface ParallaxRigProps {
  /** Disable pointer parallax on touch devices — Float idle motion still runs */
  parallax: boolean;
  children: React.ReactNode;
}

/** Wraps the scene in a group that leans with the pointer and eases in on mount */
export default function ParallaxRig({ parallax, children }: ParallaxRigProps) {
  const rig = useRef<Group>(null);
  const [entered, setEntered] = useState(false);

  useFrame((state, delta) => {
    if (!rig.current) return;

    // entrance: scale 0.6 → 1 over roughly the first second
    if (!entered && state.clock.elapsedTime > 1.2) setEntered(true);
    const targetScale = entered || state.clock.elapsedTime > 0 ? 1 : 0.6;
    easing.damp3(rig.current.scale, targetScale, 0.4, delta);

    if (parallax) {
      easing.dampE(
        rig.current.rotation,
        [state.pointer.y * 0.08, state.pointer.x * 0.14, 0],
        0.28,
        delta,
      );
      easing.damp3(
        state.camera.position,
        [state.pointer.x * 0.4, state.pointer.y * 0.25, 8],
        0.35,
        delta,
      );
      state.camera.lookAt(0, 0, 0);
    }
  });

  return (
    <group ref={rig} scale={0.6}>
      {children}
    </group>
  );
}
