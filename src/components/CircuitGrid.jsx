// src/components/CircuitGrid.jsx
// Animated circuit-board / data-flow background.
// A sparse grid of nodes connected by dim lines; signal pulses travel
// along paths and briefly illuminate lines and nodes as they pass.
//
// Props:
//   nodeSpacing    {number}  Grid spacing in px.                           Default: 90
//   baseOpacity    {number}  Dim grid line & node opacity (0–1).           Default: 0.07
//   pulseRate      {number}  New pulses spawned per second.                Default: 3.5
//   pulseSpeed     {number}  Pulse travel speed in px/s.                   Default: 120
//   redRatio       {number}  Fraction of pulses that use the accent color. Default: 0.35
//   accentColor    {string}  RGB triplet for accent pulses.                Default: "178,16,14"
//   neutralColor   {string}  RGB triplet for neutral pulses.               Default: "200,200,200"
import { useEffect, useRef } from "react";

const DIRS = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

function rand(min, max) {
  return min + Math.random() * (max - min);
}
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function buildGrid(w, h, spacing) {
  const cols = Math.ceil(w / spacing) + 1;
  const rows = Math.ceil(h / spacing) + 1;
  const nodes = [];
  const nodeMap = {};

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const idx = nodes.length;
      nodes.push({ x: c * spacing, y: r * spacing, glow: 0 });
      nodeMap[`${c},${r}`] = idx;
    }
  }

  const adj = nodes.map((_, idx) => {
    const c = idx % cols;
    const r = Math.floor(idx / cols);
    return DIRS.map(([dc, dr]) => {
      const key = `${c + dc},${r + dr}`;
      return nodeMap[key] ?? null;
    }).filter((i) => i !== null);
  });

  return { nodes, adj, cols, rows };
}

export default function CircuitGrid({
  nodeSpacing = 90,
  baseOpacity = 0.07,
  pulseRate = 3.5,
  pulseSpeed = 120,
  redRatio = 0.35,
  accentColor = "178,16,14",
  neutralColor = "200,200,200",
}) {
  const canvasRef = useRef(null);
  const propsRef = useRef({});
  propsRef.current = {
    nodeSpacing,
    baseOpacity,
    pulseRate,
    pulseSpeed,
    redRatio,
    accentColor,
    neutralColor,
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let grid = null;
    let w = 0;
    let h = 0;
    let pulses = [];
    let animId = null;
    let lastTime = null;
    let spawnAccum = 0;

    function resize() {
      const p = propsRef.current;
      const parent = canvas.parentElement;
      w = parent.offsetWidth;
      h = parent.offsetHeight;
      canvas.width = w;
      canvas.height = h;
      grid = buildGrid(w, h, p.nodeSpacing);
      pulses = [];
    }

    function spawnPulse() {
      const p = propsRef.current;
      if (!grid) return;

      const fromIdx = Math.floor(Math.random() * grid.nodes.length);
      const neighbors = grid.adj[fromIdx];
      if (!neighbors.length) return;
      const toIdx = pick(neighbors);

      const isRed = Math.random() < p.redRatio;
      const color = isRed ? p.accentColor : p.neutralColor;
      const brightness = isRed ? 0.9 : rand(0.35, 0.65);

      pulses.push({
        fromIdx,
        toIdx,
        progress: 0,
        color,
        brightness,
        isRed,
        tailLen: isRed ? rand(0.18, 0.32) : rand(0.1, 0.2),
      });
    }

    function drawEdge(aIdx, bIdx, alpha) {
      const a = grid.nodes[aIdx];
      const b = grid.nodes[bIdx];
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.strokeStyle = `rgba(200,200,200,${alpha})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    function drawNode(node, alpha) {
      ctx.beginPath();
      ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200,200,200,${alpha})`;
      ctx.fill();
    }

    function tick(time) {
      if (!lastTime) lastTime = time;
      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      const p = propsRef.current;
      ctx.clearRect(0, 0, w, h);

      if (!grid) {
        animId = requestAnimationFrame(tick);
        return;
      }

      // Base grid lines
      const drawn = new Set();
      grid.nodes.forEach((_, aIdx) => {
        grid.adj[aIdx].forEach((bIdx) => {
          const key = aIdx < bIdx ? `${aIdx}-${bIdx}` : `${bIdx}-${aIdx}`;
          if (drawn.has(key)) return;
          drawn.add(key);
          drawEdge(aIdx, bIdx, p.baseOpacity);
        });
      });

      // Base nodes
      grid.nodes.forEach((node) => {
        drawNode(node, p.baseOpacity + node.glow * 0.6);
        node.glow = Math.max(0, node.glow - dt * 3);
      });

      // Spawn
      spawnAccum += dt * p.pulseRate;
      while (spawnAccum >= 1) {
        spawnAccum -= 1;
        spawnPulse();
      }

      // Update & draw pulses
      const travelPerFrame = (p.pulseSpeed * dt) / p.nodeSpacing;

      pulses = pulses.filter((pulse) => {
        pulse.progress += travelPerFrame;

        const from = grid.nodes[pulse.fromIdx];
        const to = grid.nodes[pulse.toIdx];
        const t = Math.min(pulse.progress, 1);
        const px = from.x + (to.x - from.x) * t;
        const py = from.y + (to.y - from.y) * t;

        // Light up edge under pulse
        const edgeAlpha =
          p.baseOpacity +
          pulse.brightness * 0.4 * (1 - Math.abs(t - 0.5) * 1.5);
        drawEdge(
          pulse.fromIdx,
          pulse.toIdx,
          Math.max(p.baseOpacity, edgeAlpha),
        );

        // Tail gradient
        const tailStart = Math.max(0, t - pulse.tailLen);
        const tailX = from.x + (to.x - from.x) * tailStart;
        const tailY = from.y + (to.y - from.y) * tailStart;
        const grad = ctx.createLinearGradient(tailX, tailY, px, py);
        grad.addColorStop(0, `rgba(${pulse.color},0)`);
        grad.addColorStop(1, `rgba(${pulse.color},${pulse.brightness})`);
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(px, py);
        ctx.strokeStyle = grad;
        ctx.lineWidth = pulse.isRed ? 2 : 1.5;
        ctx.stroke();

        // Pulse head glow
        const glowRadius = pulse.isRed ? 6 : 4;
        const grd = ctx.createRadialGradient(px, py, 0, px, py, glowRadius);
        grd.addColorStop(0, `rgba(${pulse.color},${pulse.brightness})`);
        grd.addColorStop(1, `rgba(${pulse.color},0)`);
        ctx.beginPath();
        ctx.arc(px, py, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Reached destination
        if (pulse.progress >= 1) {
          grid.nodes[pulse.toIdx].glow = pulse.brightness * 0.8;

          const neighbors = grid.adj[pulse.toIdx].filter(
            (n) => n !== pulse.fromIdx,
          );
          if (neighbors.length && Math.random() < 0.72) {
            pulse.fromIdx = pulse.toIdx;
            pulse.toIdx = pick(
              neighbors.length ? neighbors : grid.adj[pulse.toIdx],
            );
            pulse.progress = 0;
            pulse.brightness *= rand(0.75, 0.92);
            return pulse.brightness > 0.05;
          }
          return false;
        }

        return true;
      });

      animId = requestAnimationFrame(tick);
    }

    resize();
    animId = requestAnimationFrame(tick);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);

    return () => {
      cancelAnimationFrame(animId);
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
