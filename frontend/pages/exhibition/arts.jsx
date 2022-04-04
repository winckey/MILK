import * as THREE from "three";
import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  useCursor,
  MeshReflectorMaterial,
  Image,
  Text,
  Environment,
  Loader,
  PresentationControls,
  ContactShadows,
  Html,
  useGLTF,
} from "@react-three/drei";
import { useRoute, useLocation, Link } from "wouter";
import getUuid from "uuid-by-string";
import Goods from "@components/exhibition/Goods";

const pexel = (id) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260`;
const images = [
  // Front
  {
    position: [0, 0, 1.5],
    rotation: [0, 0, 0],
    url: "https://contents.lotteon.com/itemimage/LO/15/66/84/51/83/_1/56/68/45/18/5/LO1566845183_1566845185_1.jpg/dims/resizef/554X554",
  },
  // Back
  { position: [-0.8, 0, -0.6], rotation: [0, 0, 0], url: "/저장.jpg" },
  {
    position: [0.8, 0, -0.6],
    rotation: [0, 0, 0],
    url: "/구찌가방.PNG",
  },
  // Left
  {
    position: [-1.75, 0, 0.25],
    rotation: [0, Math.PI / 2.5, 0],
    url: "/에르메스.jpg",
  },
  {
    position: [-2.15, 0, 1.5],
    rotation: [0, Math.PI / 2.5, 0],
    url: "/구찌.jpg",
  },
  {
    position: [-2, 0, 2.75],
    rotation: [0, Math.PI / 2.5, 0],
    url: "/루이비통.jpg",
  },
  // Right
  {
    position: [1.75, 0, 0.25],
    rotation: [0, -Math.PI / 2.5, 0],
    url: "/톰브라운.jpg",
  },
  {
    position: [2.15, 0, 1.5],
    rotation: [0, -Math.PI / 2.5, 0],
    url: "/파텍필립.jpg",
  },
  {
    position: [2, 0, 2.75],
    rotation: [0, -Math.PI / 2.5, 0],
    url: "/고야드.jpg",
  },
];

const GOLDENRATIO = 1.61803398875;

export default function arts() {
  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }
  return (
    <Canvas
      gl={{ alpha: false }}
      dpr={[1, 1.5]}
      camera={{ fov: 70, position: [0, 2, 15] }}
      style={{ height: "100vh" }}
    >
      <Suspense fallback={null}>
        <color attach="background" args={["#191920"]} />

        <fog attach="fog" args={["#191920", 0, 15]} />
        <Environment preset="city" />
        <group position={[0, -0.5, 0]}>
          <Frames images={images} />
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
            <planeGeometry args={[50, 50]} />
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
        </group>
        <Html as="div" position={[-0.2, -3, 0]}>
          <button onClick={toggleFullScreen}>full screen</button>
        </Html>
      </Suspense>
    </Canvas>
  );
}

function Frame({ url, ...props }) {
  const [hovered, hover] = useState(false);

  const image = useRef();
  const frame = useRef();
  const name = getUuid(url);

  useCursor(hovered);
  useFrame((state) => {
    // image.current.material.zoom =
    //   2 + Math.sin(rnd * 10000 + state.clock.elapsedTime / 3) / 2;
    image.current.scale.x = THREE.MathUtils.lerp(
      image.current.scale.x,
      0.85 * (hovered ? 0.85 : 1),
      0.1
    );
    image.current.scale.y = THREE.MathUtils.lerp(
      image.current.scale.y,
      0.9 * (hovered ? 0.905 : 1),
      0.1
    );
  });

  return (
    <group {...props}>
      <mesh
        onPointerOver={(e) => (e.stopPropagation(), hover(true))}
        onPointerOut={() => hover(false)}
        name={name}
        scale={[1, 1.2, 0.05]}
        position={[0, GOLDENRATIO / 2, 0]}
      >
        <boxGeometry />
        <meshStandardMaterial
          color="#151515"
          metalness={0.5}
          roughness={0.5}
          envMapIntensity={2}
        />
        <mesh
          ref={frame}
          raycast={() => null}
          scale={[0.9, 0.93, 0.9]}
          position={[0, 0, 0.2]}
        >
          <boxGeometry />
          {/* <PresentationControls
            global
            config={{ mass: 2, tension: 500 }}
            snap={{ mass: 4, tension: 1500 }}
            rotation={[0, 0.6, 0]}
            polar={[-Math.PI / 3, Math.PI / 3]}
            azimuth={[-Math.PI / 1.4, Math.PI / 2]}
          >
            <Goods />
          </PresentationControls> */}
          <meshBasicMaterial toneMapped={false} fog={false} />
        </mesh>

        <ambientLight intensity={0.1} />
        <directionalLight />

        <Image
          raycast={() => null}
          ref={image}
          position={[0, 0, 0.7]}
          url={url}
        />
      </mesh>
    </group>
  );
}

function Frames({
  images,
  q = new THREE.Quaternion(),
  p = new THREE.Vector3(),
}) {
  const ref = useRef();
  const clicked = useRef();
  const [, params] = useRoute("/item/:id");
  const [, setLocation] = useLocation();
  useEffect(() => {
    clicked.current = ref.current.getObjectByName(params?.id);
    if (clicked.current) {
      clicked.current.parent.updateWorldMatrix(true, true);
      clicked.current.parent.localToWorld(p.set(0, GOLDENRATIO / 2, 1.25));
      clicked.current.parent.getWorldQuaternion(q);
    } else {
      p.set(0, 0, 5.5);
      q.identity();
    }
  });
  useFrame((state, dt) => {
    state.camera.position.lerp(p, 0.025);
    state.camera.quaternion.slerp(q, 0.025);
  });
  return (
    <group
      ref={ref}
      onClick={(e) => (
        e.stopPropagation(),
        setLocation(
          clicked.current === e.object ? "/show/arts" : "/item/" + e.object.name
        )
      )}
      onPointerMissed={() => setLocation("/show/arts")}
    >
      {images.map(
        (props) => <Frame key={props.url} {...props} /> /* prettier-ignore */
      )}
    </group>
  );
}

// function Goods(props) {
//   const ref = useRef();
//   const { nodes, materials } = useGLTF("/watch-v1.glb");
//   useFrame((state) => {
//     const t = state.clock.getElapsedTime();
//     ref.current.rotation.x = -Math.PI / 1.75 + Math.cos(t / 4) / 8;
//     ref.current.rotation.y = Math.sin(t / 4) / 10;
//     ref.current.rotation.z = (1 + Math.sin(t / 1.5)) / 20;
//     ref.current.position.y = (1 + Math.sin(t / 1.5)) / 30;
//   });
//   return (
//     <group ref={ref} {...props} dispose={null}>
//       <mesh
//         rotation={[-Math.PI / 2, 0, 0]}
//         geometry={nodes.Object005_glass_0.geometry}
//         material={materials.glass}
//         onWheel={(e) => console.log("wheel spins")}
//       ></mesh>
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object006_watch_0.geometry}
//         material={materials.watch}
//       />
//     </group>
//   );
// }
