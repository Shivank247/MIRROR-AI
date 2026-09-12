import { useEffect, useRef } from "react";
import {
  ArcRotateCamera,
  Color3,
  Color4,
  Engine,
  GlowLayer,
  HemisphericLight,
  MeshBuilder,
  Scene,
  StandardMaterial,
  Vector3,
} from "@babylonjs/core";

function FutureSelfScene({ futureSelf, reveal = true }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return undefined;
    }

    const engine = new Engine(canvas, true, {
      preserveDrawingBuffer: true,
      stencil: true,
    });

    const scene = new Scene(engine);

    scene.clearColor = new Color4(0.01, 0.015, 0.03, 1);

    // --------------------------------------------------
    // CAMERA
    // --------------------------------------------------

    const camera = new ArcRotateCamera(
      "future-self-camera",
      -Math.PI / 2,
      Math.PI / 2.4,
      7,
      new Vector3(0, 1.2, 0),
      scene,
    );

    camera.lowerRadiusLimit = 4;
    camera.upperRadiusLimit = 10;
    camera.wheelPrecision = 100;
    camera.attachControl(canvas, true);

    // --------------------------------------------------
    // LIGHTING
    // --------------------------------------------------

    const light = new HemisphericLight(
      "future-self-light",
      new Vector3(0, 1, 0),
      scene,
    );

    light.intensity = 0.7;
    light.diffuse = new Color3(0.65, 0.8, 1);
    light.groundColor = new Color3(0.05, 0.05, 0.1);

    const glow = new GlowLayer("future-self-glow", scene);

    glow.intensity = 0.45;

    // --------------------------------------------------
    // FUTURISTIC FLOOR
    // --------------------------------------------------

    const floor = MeshBuilder.CreateGround(
      "future-self-floor",
      {
        width: 12,
        height: 12,
      },
      scene,
    );

    const floorMaterial = new StandardMaterial(
      "future-self-floor-material",
      scene,
    );

    floorMaterial.diffuseColor = new Color3(0.015, 0.025, 0.05);
    floorMaterial.specularColor = new Color3(0.1, 0.15, 0.25);

    floor.material = floorMaterial;

    // --------------------------------------------------
    // FUTURE SELF AVATAR
    // --------------------------------------------------

    const avatar = MeshBuilder.CreateCapsule(
      "future-self-avatar",
      {
        height: 2.6,
        radius: 0.55,
        subdivisions: 8,
      },
      scene,
    );

    avatar.position = new Vector3(0, 1.3, 0);

    const avatarMaterial = new StandardMaterial(
      "future-self-avatar-material",
      scene,
    );

    avatarMaterial.diffuseColor = new Color3(0.12, 0.25, 0.45);
    avatarMaterial.emissiveColor = new Color3(0.04, 0.12, 0.25);
    avatarMaterial.specularColor = new Color3(0.5, 0.65, 1);

    avatar.material = avatarMaterial;

    // --------------------------------------------------
    // AVATAR CORE
    // --------------------------------------------------

    const core = MeshBuilder.CreateSphere(
      "future-self-core",
      {
        diameter: 0.45,
        segments: 16,
      },
      scene,
    );

    core.position = new Vector3(0, 1.45, -0.52);

    const coreMaterial = new StandardMaterial(
      "future-self-core-material",
      scene,
    );

    coreMaterial.diffuseColor = new Color3(0.2, 0.6, 1);
    coreMaterial.emissiveColor = new Color3(0.1, 0.45, 1);

    core.material = coreMaterial;

    // --------------------------------------------------
    // FUTURE TIMELINE RINGS
    // --------------------------------------------------

    const ring = MeshBuilder.CreateTorus(
      "future-self-ring",
      {
        diameter: 3.2,
        thickness: 0.025,
        tessellation: 64,
      },
      scene,
    );

    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.05;

    const ringMaterial = new StandardMaterial(
      "future-self-ring-material",
      scene,
    );

    ringMaterial.diffuseColor = new Color3(0.1, 0.45, 1);
    ringMaterial.emissiveColor = new Color3(0.05, 0.25, 0.8);

    ring.material = ringMaterial;

    // --------------------------------------------------
    // FUTURE SELF LABEL
    // --------------------------------------------------

    const title = futureSelf?.career
      ? futureSelf.career.toUpperCase()
      : "FUTURE SELF";

    document.title = `MIRROR//AI — ${title}`;

    // --------------------------------------------------
    // CINEMATIC REVEAL
    // --------------------------------------------------

    const targetScale = reveal ? 1 : 0;

    avatar.scaling = new Vector3(
      targetScale,
      targetScale,
      targetScale,
    );

    core.scaling = new Vector3(
      targetScale,
      targetScale,
      targetScale,
    );

    ring.scaling = new Vector3(
      targetScale,
      targetScale,
      targetScale,
    );

    let animationFrame = 0;

    const revealAnimation = () => {
      animationFrame += 0.025;

      const target = reveal ? 1 : 0;

      const currentScale = avatar.scaling.x;

      const nextScale =
        currentScale + (target - currentScale) * 0.06;

      avatar.scaling.set(
        nextScale,
        nextScale,
        nextScale,
      );

      core.scaling.set(
        nextScale,
        nextScale,
        nextScale,
      );

      ring.scaling.set(
        nextScale,
        nextScale,
        nextScale,
      );

      // Floating Future Self
      avatar.position.y =
        1.3 + Math.sin(animationFrame) * 0.04;

      core.position.y =
        1.45 + Math.sin(animationFrame) * 0.04;

      // Slowly rotate timeline ring
      ring.rotation.z += 0.002;

      // Subtle avatar movement
      avatar.rotation.y += 0.0015;

      // Pulsing core
      const pulse =
        1 + Math.sin(animationFrame * 2) * 0.08;

      core.scaling.set(
        nextScale * pulse,
        nextScale * pulse,
        nextScale * pulse,
      );
    };

    scene.onBeforeRenderObservable.add(revealAnimation);

    // --------------------------------------------------
    // RENDER LOOP
    // --------------------------------------------------

    engine.runRenderLoop(() => {
      scene.render();
    });

    // --------------------------------------------------
    // RESIZE
    // --------------------------------------------------

    const handleResize = () => {
      engine.resize();
    };

    window.addEventListener("resize", handleResize);

    // --------------------------------------------------
    // CLEANUP
    // --------------------------------------------------

    return () => {
      window.removeEventListener("resize", handleResize);

      scene.onBeforeRenderObservable.clear();

      scene.dispose();

      engine.dispose();

      animationFrame = 0;
    };
  }, [futureSelf, reveal]);

  return (
    <section className="future-self-scene">
      <canvas
        ref={canvasRef}
        aria-label="Interactive 3D Future Self simulation"
        style={{
          width: "100%",
          height: "520px",
          display: "block",
          outline: "none",
        }}
      />

      <div
        className="future-self-scene-overlay"
        style={{
          position: "absolute",
          top: "24px",
          left: "24px",
          pointerEvents: "none",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: "12px",
            letterSpacing: "0.2em",
            opacity: 0.7,
          }}
        >
          MIRROR//AI
        </p>

        <h2
          style={{
            margin: "8px 0 0",
          }}
        >
          {futureSelf?.career || "FUTURE SELF"}
        </h2>

        {futureSelf?.age && (
          <p
            style={{
              marginTop: "6px",
              opacity: 0.7,
            }}
          >
            AGE {futureSelf.age}
          </p>
        )}
      </div>
    </section>
  );
}

export default FutureSelfScene;