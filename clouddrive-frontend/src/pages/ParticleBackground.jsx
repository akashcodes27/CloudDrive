import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

function ParticleBackground() {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: {
          enable: true,
          zIndex: -1,
        },
        background: {
          color: {
            value: "#0f0f0f",
          },
        },
        fpsLimit: 60,
        particles: {
          number: {
            value: 60,
            density: {
              enable: true,
              area: 800,
            },
          },
          color: {
            value: "#00e6e6",
          },
          shape: {
            type: "circle",
          },
          opacity: {
            value: 0.5,
          },
          size: {
            value: 3,
            random: true,
          },
          move: {
            enable: true,
            speed: 1,
            direction: "none",
            outMode: "bounce",
          },
          links: {
            enable: true,
            distance: 130,
            color: "#00c6ff",
            opacity: 0.3,
            width: 1,
          },
        },
        detectRetina: true,
      }}
    />
  );
}

export default ParticleBackground;
