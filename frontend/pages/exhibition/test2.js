import * as THREE from "three";
import { Suspense, useLayoutEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  useGLTF,
  MeshReflectorMaterial,
  Environment,
  Stage,
  PresentationControls,
} from "@react-three/drei";
import { useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import Model from "../../components/exhibition/Model";

/*
Author: Steven Grey (https://sketchfab.com/Steven007)
License: CC-BY-NC-4.0 (http://creativecommons.org/licenses/by-nc/4.0/)
Source: https://sketchfab.com/3d-models/lamborghini-urus-2650599973b649ddb4460ff6c03e4aa2
Title: Lamborghini Urus
*/
// function Model(props) {
//   const ref = useRef();
//   const model = useLoader(GLTFLoader, props.path);
//   // const model = useLoader(GLTFLoader, process.env.PUBLIC_URL + props.path);
//   console.log(model);

//   let mixer;
//   if (model.animations.length > 0) {
//     mixer = new THREE.AnimationMixer(model.scene);
//     model.animations.forEach((clip) => {
//       const action = mixer.clipAction(clip);
//       action.play();
//     });
//   }

//   useFrame((scene, delta) => {
//     mixer?.update(delta);

//     ref.current.rotation.y += 0.005;
//   });

//   model.scene.traverse((child) => {
//     if (child.isMesh) {
//       child.castShadow = true;
//       child.receiveShadow = true;
//       child.material.side = THREE.FrontSide;
//     }
//   });
//   return <primitive object={model.scene} ref={ref} scale={props.scale} />;
// }

export default function App() {
  return (
    <div className="h-[100vh]">
      <Canvas dpr={[1, 2]} shadows camera={{ fov: 45 }}>
        <color attach="background" args={["#101010"]} />
        <fog attach="fog" args={["#101010", 10, 20]} />
        <Suspense fallback={null}>
          {/*  배경 */}
          <Environment path="/cube" />
          <PresentationControls
            speed={1.5}
            global
            zoom={0.7}
            polar={[-0.1, Math.PI / 4]}
          >
            <Stage
              environment={null}
              intensity={1}
              contactShadow={false}
              shadowBias={-0.0015}
            >
              <Suspense fallback={null}>
                <Model path="/vans.gltf" />
              </Suspense>
            </Stage>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[170, 170]} />
              <MeshReflectorMaterial
                blur={[300, 100]}
                resolution={2048}
                mixBlur={1}
                mixStrength={40}
                roughness={1}
                depthScale={1.2}
                minDepthThreshold={0.4}
                maxDepthThreshold={1.4}
                color="#101010"
                metalness={0.5}
              />
            </mesh>
          </PresentationControls>
        </Suspense>
      </Canvas>
    </div>
  );
}
