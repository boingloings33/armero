// src/components/HexGrid.jsx
// Animated hexagonal grid background — draws a field of hex outlines that
// slowly pulse in opacity, with occasional hexes lighting up in red.
//
// Props:
//   hexSize        {number}  Circumradius of each hexagon in px.          Default: 34
//   baseOpacityMax {number}  Max stroke opacity for idle hexes (0–1).     Default: 0.10
//   redChance      {number}  Per-frame probability an idle hex goes red.  Default: 0.005
//   redCooldownMin {number}  Min frames between red pulses on one hex.    Default: 40
//   redCooldownMax {number}  Max frames between red pulses on one hex.    Default: 180
//   redIntensity   {number}  Peak red opacity multiplier (0–1).           Default: 0.85
import { useEffect, useRef } from "react";

const SQRT3 = Math.sqrt(3);

/** Pointy-top hex vertices */
function hexVertices(cx, cy, r) {
  const pts = [];
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i + Math.PI / 6;
    pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
  }
  return pts;
}

function buildHexes(w, h, size) {
  const hexes = [];
  const colW = SQRT3 * size;
  const rowH = 1.5 * size;
  const cols = Math.ceil(w / colW) + 2;
  const rows = Math.ceil(h / rowH) + 2;

  for (let row = -1; row < rows; row++) {
    for (let col = -1; col < cols; col++) {
      const cx = col * colW + (row % 2 === 0 ? 0 : colW / 2);
      const cy = row * rowH;
      hexes.push({
        cx,
        cy,
        opacity: Math.random() * 0.1,
        opacityTarget: Math.random() * 0.1,
        opacitySpeed: 0.008 + Math.random() * 0.012,
        redOpacity: 0,
        redTarget: 0,
        redCooldown: Math.floor(Math.random() * 200),
      });
    }
  }
  return hexes;
}

function HexGrid({
  hexSize = 34,
  baseOpacityMax = 0.1,
  redChance = 0.005,
  redCooldownMin = 40,
  redCooldownMax = 180,
  redIntensity = 0.85,
}) {
  const canvasRef = useRef(null);
  // keep props accessible inside the rAF loop without re-running the effect
  const propsRef = useRef({});
  propsRef.current = {
    hexSize,
    baseOpacityMax,
    redChance,
    redCooldownMin,
    redCooldownMax,
    redIntensity,
  };

  const stateRef = useRef({ hexes: [], animId: null, w: 0, h: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const state = stateRef.current;

    function resize() {
      const p = propsRef.current;
      const parent = canvas.parentElement;
      state.w = parent.offsetWidth;
      state.h = parent.offsetHeight;
      canvas.width = state.w;
      canvas.height = state.h;
      state.hexes = buildHexes(state.w, state.h, p.hexSize);
    }

    function drawHex(hex) {
      const p = propsRef.current;
      const verts = hexVertices(hex.cx, hex.cy, p.hexSize - 1.5);
      ctx.beginPath();
      ctx.moveTo(verts[0][0], verts[0][1]);
      for (let i = 1; i < 6; i++) ctx.lineTo(verts[i][0], verts[i][1]);
      ctx.closePath();

      if (hex.redOpacity > 0.01) {
        ctx.fillStyle = `rgba(178,16,14,${hex.redOpacity * 0.18})`;
        ctx.fill();
        ctx.strokeStyle = `rgba(178,16,14,${hex.redOpacity * 0.75})`;
      } else {
        ctx.strokeStyle = `rgba(240,240,240,${hex.opacity})`;
      }
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    function tick() {
      const p = propsRef.current;
      ctx.clearRect(0, 0, state.w, state.h);

      for (const hex of state.hexes) {
        // ── base opacity drift
        const diff = hex.opacityTarget - hex.opacity;
        if (Math.abs(diff) < 0.001) {
          hex.opacityTarget = Math.random() * p.baseOpacityMax;
          hex.opacitySpeed = 0.005 + Math.random() * 0.01;
        }
        hex.opacity += diff * hex.opacitySpeed;

        // ── red pulse cooldown / trigger
        if (hex.redCooldown > 0) {
          hex.redCooldown--;
        } else if (hex.redTarget === 0 && hex.redOpacity < 0.01) {
          if (Math.random() < p.redChance) {
            hex.redTarget = (0.5 + Math.random() * 0.5) * p.redIntensity;
          } else {
            hex.redCooldown = Math.floor(
              p.redCooldownMin +
                Math.random() * (p.redCooldownMax - p.redCooldownMin),
            );
          }
        }

        // ── fade red in / out
        const rdiff = hex.redTarget - hex.redOpacity;
        hex.redOpacity += rdiff * (hex.redTarget > 0 ? 0.04 : 0.025);
        if (hex.redTarget > 0 && hex.redOpacity > hex.redTarget - 0.02) {
          hex.redTarget = 0;
          hex.redCooldown = Math.floor(
            p.redCooldownMin +
              Math.random() * (p.redCooldownMax - p.redCooldownMin),
          );
        }

        drawHex(hex);
      }

      state.animId = requestAnimationFrame(tick);
    }

    resize();
    tick();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);

    return () => {
      cancelAnimationFrame(state.animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        display: "block",
      }}
    />
  );
}

export default HexGrid;
