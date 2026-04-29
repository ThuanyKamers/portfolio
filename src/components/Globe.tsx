import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface GlobeProps {
  size?: number;
  onMarkerClick?: (id: string) => void;
}

const MARKERS = [
  { id: "brazil", lat: -27.59, lng: -48.55 },
  { id: "portugal", lat: 38.72, lng: -9.14 },
  { id: "germany", lat: 50.78, lng: 6.08 },
];

// Convert lat/lng to 3D point on sphere; writes into `out` to avoid allocations
function latLngToVec3(lat: number, lng: number, radius: number, out: THREE.Vector3): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return out.set(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

const Globe = ({ size = 600, onMarkerClick }: GlobeProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [pins, setPins] = useState<{ id: string; x: number; y: number; visible: boolean }[]>([]);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;

    // Clean any leftover canvas from strict mode re-mount
    while (container.firstChild) container.removeChild(container.firstChild);

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 3;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Lighting — soft, cartoon-like
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 3, 5);
    scene.add(dirLight);

    const hemiLight = new THREE.HemisphereLight(0x87ceeb, 0x228b22, 0.4);
    scene.add(hemiLight);

    // Globe sphere
    const geometry = new THREE.SphereGeometry(1, 64, 64);

    // Load cartoon-style texture
    const loader = new THREE.TextureLoader();
    const material = new THREE.MeshToonMaterial({
      color: 0x4488cc,
      gradientMap: createToonGradient(),
    });

    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    // Load texture and apply
    loader.load(
      "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg",
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        material.map = texture;
        material.color.set(0xffffff);
        material.needsUpdate = true;
      }
    );

    // Initial rotation to show Atlantic (Brazil + Europe)
    globe.rotation.y = -0.9;

    // Mouse drag rotation
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
      renderer.domElement.setPointerCapture(e.pointerId);
      renderer.domElement.style.cursor = "grabbing";
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      prevX = e.clientX;
      prevY = e.clientY;
      globe.rotation.y += dx * 0.005;
      globe.rotation.x += dy * 0.005;
      globe.rotation.x = Math.max(-1, Math.min(1, globe.rotation.x));
    };

    const onPointerUp = () => {
      isDragging = false;
      renderer.domElement.style.cursor = "grab";
    };

    renderer.domElement.style.cursor = "grab";
    renderer.domElement.style.touchAction = "none";
    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    renderer.domElement.addEventListener("pointermove", onPointerMove);
    renderer.domElement.addEventListener("pointerup", onPointerUp);

    // Reused vectors to avoid per-frame allocations
    const camPos = new THREE.Vector3();
    const localPos = new THREE.Vector3();
    const worldPos = new THREE.Vector3();
    const screenPos = new THREE.Vector3();
    const globeCenter = new THREE.Vector3();
    const markerFromCenter = new THREE.Vector3();
    const cameraFromCenter = new THREE.Vector3();
    let lastPinsRef: { id: string; x: number; y: number; visible: boolean }[] = [];

    const pinsEqual = (
      a: { x: number; y: number; visible: boolean }[],
      b: { x: number; y: number; visible: boolean }[]
    ) => {
      if (a.length !== b.length) return false;
      for (let i = 0; i < a.length; i++) {
        if (a[i].visible !== b[i].visible) return false;
        if (Math.abs(a[i].x - b[i].x) > 0.5) return false;
        if (Math.abs(a[i].y - b[i].y) > 0.5) return false;
      }
      return true;
    };

    const projectPins = () => {
      globe.updateMatrixWorld(true);
      camPos.copy(camera.position);
      globeCenter.setFromMatrixPosition(globe.matrixWorld);
      cameraFromCenter.copy(camPos).sub(globeCenter).normalize();

      const projected = MARKERS.map((m) => {
        latLngToVec3(m.lat, m.lng, 1.02, localPos);
        worldPos.copy(localPos).applyMatrix4(globe.matrixWorld);
        screenPos.copy(worldPos).project(camera);
        const x = (screenPos.x * 0.5 + 0.5) * size;
        const y = (-screenPos.y * 0.5 + 0.5) * size;
        markerFromCenter.copy(worldPos).sub(globeCenter).normalize();
        const visible = markerFromCenter.dot(cameraFromCenter) > 0.15;
        return { id: m.id, x, y, visible };
      });

      if (!pinsEqual(lastPinsRef, projected)) {
        lastPinsRef = projected;
        setPins(projected);
      }
    };

    // Animation loop
    let animFrame: number;
    const animate = () => {
      renderer.render(scene, camera);
      projectPins();
      animFrame = requestAnimationFrame(animate);
    };
    animFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrame);
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      renderer.domElement.removeEventListener("pointermove", onPointerMove);
      renderer.domElement.removeEventListener("pointerup", onPointerUp);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [size]);

  return (
    <div style={{ position: "relative", width: size, height: size, maxWidth: "100%" }}>
      <div ref={mountRef} />
      {pins
        .filter((p) => p.visible)
        .map((p) => (
          <button
            key={p.id}
            onClick={() => onMarkerClick?.(p.id)}
            style={{
              position: "absolute",
              left: p.x,
              top: p.y,
              transform: "translate(-50%, -100%)",
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              fontSize: 22,
              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))",
              zIndex: 10,
              transition: "font-size 0.15s",
            }}
          >
            📍
          </button>
        ))}
    </div>
  );
};

// Creates a 3-step toon gradient for cartoon shading
function createToonGradient(): THREE.Texture {
  const canvas = document.createElement("canvas");
  canvas.width = 4;
  canvas.height = 1;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#444";
  ctx.fillRect(0, 0, 1, 1);
  ctx.fillStyle = "#999";
  ctx.fillRect(1, 0, 1, 1);
  ctx.fillStyle = "#ccc";
  ctx.fillRect(2, 0, 1, 1);
  ctx.fillStyle = "#fff";
  ctx.fillRect(3, 0, 1, 1);
  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  return texture;
}

export default Globe;
