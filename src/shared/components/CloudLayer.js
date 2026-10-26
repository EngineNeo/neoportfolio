import React, { useEffect, useRef, useState } from "react";

// Two cut-paper cloud silhouettes (flat bottom, round bumps)
const SHAPES = [
  {
    viewBox: "0 0 200 100",
    d: "M30,80 a20,20 0 0,1 0,-40 a28,28 0 0,1 50,-15 a32,32 0 0,1 58,8 a22,22 0 0,1 32,22 a17,17 0 0,1 0,25 z",
  },
  {
    viewBox: "0 0 140 85",
    d: "M25,70 a18,18 0 0,1 5,-35 a24,24 0 0,1 45,-5 a20,20 0 0,1 35,15 a15,15 0 0,1 -5,25 z",
  },
];

// Small seeded PRNG so a whole sky can be reproduced from one number
const mulberry32 = (seed) => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

let nextId = 0;

// Phones get smaller clouds so a near one doesn't fill the screen
const viewScale = (vw) => Math.min(1, Math.max(0.5, vw / 1100));

// depth 0.35 (far: small, faint, slow) .. 1.2 (near: big, quick)
const makeCloud = (rand, vw, x) => {
  const depth = 0.35 + rand() * 0.85;
  const width = Math.round((100 + depth * 170 + rand() * 40) * viewScale(vw));
  return {
    id: nextId++,
    depth,
    width,
    x: x === undefined ? -width - rand() * 240 : x,
    top: rand() * 88 - 4,
    shape: rand() < 0.55 ? 0 : 1,
    flip: rand() < 0.5,
    speed: (6 + depth * 14) * viewScale(vw), // px per second
    bobPhase: rand() * Math.PI * 2,
    opacity: Math.min(1, 0.65 + depth * 0.35),
  };
};

const makeSky = (rand) => {
  const vw = window.innerWidth;
  const count = Math.max(5, Math.min(12, Math.round(vw / 150)));
  const clouds = [];
  for (let i = 0; i < count; i++) {
    // Spread the opening sky across the screen instead of all off-left
    clouds.push(makeCloud(rand, vw, -200 + rand() * (vw + 200)));
  }
  return clouds;
};

const css = `
.nm-sky {
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
  background: linear-gradient(180deg, #cfe8fb 0%, #e3f2fd 55%, #f1f8fe 100%);
}
.nm-cloud {
  position: absolute;
  left: 0;
  min-width: 70px;
  will-change: transform;
}
.nm-cloud-inner {
  will-change: transform;
}
.nm-cloud svg {
  display: block;
  width: 100%;
  height: auto;
  overflow: visible;
  filter: drop-shadow(0 3px 0 rgba(120, 165, 205, 0.35))
    drop-shadow(0 12px 16px rgba(50, 95, 145, 0.16));
}
`;

const spring = (pos, vel, target, k = 0.06, damping = 0.82) => {
  const v = (vel + (target - pos) * k) * damping;
  return [pos + v, v];
};

function CloudLayer() {
  const [rand] = useState(() => mulberry32((Date.now() ^ (Math.random() * 0x7fffffff)) >>> 0));
  const [clouds, setClouds] = useState(() => makeSky(rand));
  const cloudsRef = useRef(clouds);
  const cloudRefs = useRef([]);
  const innerRefs = useRef([]);

  cloudsRef.current = clouds;

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: 0, y: 0, active: false };
    const physics = new Map(); // cloud id -> hover spring state
    let frameId;
    let last = performance.now();

    const onMove = (e) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
    };
    const onOut = (e) => {
      if (!e.relatedTarget) pointer.active = false;
    };
    // A lifted finger has no hover, so let the clouds settle back
    const onUp = (e) => {
      if (e.pointerType !== "mouse") pointer.active = false;
    };

    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05); // clamp after tab switches
      last = now;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const list = cloudsRef.current;
      let respawned = null;

      // Read every rect before writing any transform to avoid layout thrash
      const rects = list.map((_, i) => cloudRefs.current[i].getBoundingClientRect());

      list.forEach((cloud, i) => {
        if (!reduceMotion) cloud.x += cloud.speed * dt;
        if (cloud.x > vw + 20) {
          respawned = respawned || list.slice();
          respawned[i] = makeCloud(rand, vw);
          return;
        }
        const bob = reduceMotion ? 0 : Math.sin(now / 4000 + cloud.bobPhase) * 6 * cloud.depth;
        cloudRefs.current[i].style.transform = `translate3d(${cloud.x.toFixed(1)}px, ${bob.toFixed(1)}px, 0)`;

        if (!physics.has(cloud.id)) {
          physics.set(cloud.id, { x: 0, vx: 0, y: 0, vy: 0, r: 0, vr: 0, s: 1 });
        }
        const c = physics.get(cloud.id);
        const rect = rects[i];
        let tx = 0;
        let ty = 0;
        let tr = 0;
        let ts = 1;

        if (pointer.active && !reduceMotion) {
          // Gentle parallax: nearer clouds shift further against the cursor
          tx = (pointer.x / vw - 0.5) * -24 * cloud.depth;
          ty = (pointer.y / vh - 0.5) * -14 * cloud.depth;

          // Hover: cloud is nudged away from the cursor and tilts like paper
          const dx = rect.left + rect.width / 2 - pointer.x;
          const dy = rect.top + rect.height / 2 - pointer.y;
          const dist = Math.max(Math.hypot(dx, dy), 1);
          const reach = Math.max(rect.width, rect.height) * 0.85;
          if (dist < reach) {
            const f = 1 - dist / reach;
            const push = f * rect.width * 0.35;
            tx += (dx / dist) * push;
            ty += (dy / dist) * push * 0.6;
            tr = (dx / dist) * f * 7;
            ts = 1 + 0.05 * f;
          }
        }

        [c.x, c.vx] = spring(c.x, c.vx, tx);
        [c.y, c.vy] = spring(c.y, c.vy, ty);
        [c.r, c.vr] = spring(c.r, c.vr, tr);
        c.s += (ts - c.s) * 0.12;

        innerRefs.current[i].style.transform =
          `translate3d(${c.x.toFixed(2)}px, ${c.y.toFixed(2)}px, 0) ` +
          `rotate(${c.r.toFixed(2)}deg) scale(${c.s.toFixed(3)})`;
      });

      if (respawned) {
        const alive = new Set(respawned.map((cloud) => cloud.id));
        physics.forEach((_, id) => !alive.has(id) && physics.delete(id));
        cloudsRef.current = respawned;
        setClouds(respawned);
      }

      if (!reduceMotion) frameId = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerout", onOut);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerout", onOut);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [rand]);

  return (
    <div className="nm-sky" aria-hidden="true">
      <style>{css}</style>
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          {/* Faint fibre grain so the clouds read as paper, not vector blobs */}
          <filter id="nm-paper-grain" x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" result="noise" />
            <feColorMatrix in="noise" type="saturate" values="0" result="mono" />
            <feComponentTransfer in="mono" result="faint">
              <feFuncA type="linear" slope="0.12" />
            </feComponentTransfer>
            <feComposite in="faint" in2="SourceGraphic" operator="in" result="grain" />
            <feMerge>
              <feMergeNode in="SourceGraphic" />
              <feMergeNode in="grain" />
            </feMerge>
          </filter>
        </defs>
      </svg>
      {clouds.map((cloud, i) => {
        const shape = SHAPES[cloud.shape];
        return (
          <div
            key={cloud.id}
            ref={(el) => (cloudRefs.current[i] = el)}
            className="nm-cloud"
            style={{
              top: `${cloud.top}%`,
              width: cloud.width,
              opacity: cloud.opacity,
              zIndex: Math.round(cloud.depth * 10),
              transform: `translate3d(${cloud.x}px, 0, 0)`,
            }}
          >
            <div ref={(el) => (innerRefs.current[i] = el)} className="nm-cloud-inner">
              <svg viewBox={shape.viewBox} style={cloud.flip ? { transform: "scaleX(-1)" } : undefined}>
                {/* back sheet, offset like a second layer of card stock */}
                <path d={shape.d} fill="#cfe2f3" transform="translate(4 5)" />
                <path
                  d={shape.d}
                  fill="#ffffff"
                  stroke="#e2edf7"
                  strokeWidth="1"
                  filter="url(#nm-paper-grain)"
                />
              </svg>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CloudLayer;
