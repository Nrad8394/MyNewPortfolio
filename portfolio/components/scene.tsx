"use client"

import { Canvas } from "@react-three/fiber"
import { Environment, OrbitControls, PresentationControls, Float, Text3D, Html } from "@react-three/drei"
import { Suspense } from "react"
import { Button } from "@/components/ui/button"

export function Scene() {
  return (
    <div className="h-screen w-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <PresentationControls
            global
            zoom={0.8}
            rotation={[0, -Math.PI / 4, 0]}
            polar={[-Math.PI / 4, Math.PI / 4]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}
          >
            <Float rotationIntensity={1}>
              <Text3D
                font="/fonts/Inter_Bold.json"
                size={0.75}
                height={0.2}
                curveSegments={12}
                bevelEnabled
                bevelThickness={0.02}
                bevelSize={0.02}
                bevelOffset={0}
                bevelSegments={5}
              >
                {`Hello\nWorld`}
                <meshStandardMaterial color="white" />
              </Text3D>
              <Html transform position={[0, -1.5, 0]} className="pointer-events-auto" center>
                <Button>Click Me</Button>
              </Html>
            </Float>
          </PresentationControls>
          <OrbitControls makeDefault />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  )
}

