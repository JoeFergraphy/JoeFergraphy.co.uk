// Point-cloud shapes the background mesh morphs between.
// Each shape is built from simple parts; points are spread across parts by surface area.

type Vec3 = [number, number, number];

interface Part {
  area: number;
  sample: () => Vec3;
}

const TAU = Math.PI * 2;
const rand = (min: number, max: number) => min + Math.random() * (max - min);

function box(c: Vec3, s: Vec3, weight = 1): Part {
  const [sx, sy, sz] = s;
  const faces = [sx * sy, sy * sz, sx * sz];
  const total = faces[0] + faces[1] + faces[2];
  return {
    area: 2 * total * weight,
    sample: () => {
      const r = Math.random() * total;
      const side = Math.random() < 0.5 ? -0.5 : 0.5;
      let x = rand(-0.5, 0.5) * sx;
      let y = rand(-0.5, 0.5) * sy;
      let z = rand(-0.5, 0.5) * sz;
      if (r < faces[0]) z = side * sz;
      else if (r < faces[0] + faces[1]) x = side * sx;
      else y = side * sy;
      return [c[0] + x, c[1] + y, c[2] + z];
    },
  };
}

// Torus around an axis; `arc` limits it to part of a circle
function torus(c: Vec3, R: number, r: number, axis: "x" | "y" | "z", weight = 1, arc: [number, number] = [0, TAU]): Part {
  return {
    area: (arc[1] - arc[0]) * R * TAU * r * weight,
    sample: () => {
      const u = rand(arc[0], arc[1]);
      const v = Math.random() * TAU;
      const radial = R + r * Math.cos(v);
      const a = radial * Math.cos(u);
      const b = radial * Math.sin(u);
      const h = r * Math.sin(v);
      if (axis === "z") return [c[0] + a, c[1] + b, c[2] + h];
      if (axis === "x") return [c[0] + h, c[1] + a, c[2] + b];
      return [c[0] + a, c[1] + h, c[2] + b];
    },
  };
}

// Open cylinder along the x axis
function rod(x0: number, x1: number, y: number, z: number, radius: number, weight = 1): Part {
  return {
    area: TAU * radius * (x1 - x0) * weight,
    sample: () => {
      const a = Math.random() * TAU;
      return [rand(x0, x1), y + radius * Math.cos(a), z + radius * Math.sin(a)];
    },
  };
}

function build(parts: Part[], count: number, offset: Vec3 = [0, 0, 0], scale = 1) {
  const total = parts.reduce((sum, p) => sum + p.area, 0);
  const out = new Float32Array(count * 3);
  let k = 0;
  parts.forEach((part, i) => {
    const n = i === parts.length - 1 ? count - k : Math.round((part.area / total) * count);
    for (let j = 0; j < n && k < count; j++, k++) {
      const [x, y, z] = part.sample();
      out[k * 3] = (x + offset[0]) * scale;
      out[k * 3 + 1] = (y + offset[1]) * scale;
      out[k * 3 + 2] = (z + offset[2]) * scale;
    }
  });
  return out;
}

// Evenly spread points on a sphere
export function fibonacciSphere(count: number, radius: number) {
  const out = new Float32Array(count * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    out[i * 3] = Math.cos(theta) * r * radius;
    out[i * 3 + 1] = y * radius;
    out[i * 3 + 2] = Math.sin(theta) * r * radius;
  }
  return out;
}

// Ornate skeleton key: filigree bow, collared shaft and a stepped bit
export function keyShape(count: number) {
  const bow: Vec3 = [-1.25, 0, 0];
  const parts: Part[] = [
    torus(bow, 0.62, 0.07, "z", 1.4),
    torus(bow, 0.44, 0.035, "z"),
    torus(bow, 0.08, 0.03, "z"),
  ];
  // Four-leaf filigree inside the bow
  for (let i = 0; i < 4; i++) {
    const a = Math.PI / 4 + (i * Math.PI) / 2;
    parts.push(torus([bow[0] + Math.cos(a) * 0.25, Math.sin(a) * 0.25, 0], 0.16, 0.03, "z"));
  }
  // Crown of beads around the outside of the bow
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * TAU;
    if (Math.abs(Math.cos(a) - 1) < 0.2) continue; // leave room where the shaft joins
    parts.push(torus([bow[0] + Math.cos(a) * 0.76, Math.sin(a) * 0.76, 0], 0.05, 0.025, "z"));
  }
  // Shaft and collars
  parts.push(rod(-0.62, 1.55, 0, 0, 0.07, 1.2));
  [-0.52, -0.43, -0.34, 0.72, 0.8].forEach((x) => parts.push(torus([x, 0, 0], 0.11, 0.025, "x")));
  parts.push(torus([1.56, 0, 0], 0.07, 0.03, "x"));
  // Stepped bit
  const teeth = [0.42, 0.26, 0.5, 0.2, 0.36];
  teeth.forEach((h, i) => parts.push(box([0.95 + i * 0.13, -0.04 - h / 2, 0], [0.11, h, 0.08], 1.6)));
  parts.push(box([1.21, -0.06, 0], [0.66, 0.04, 0.09]));
  return build(parts, count, [0.17, 0, 0], 0.95);
}

// Monitor showing code, on a stand, with a keyboard and mouse in front
export function computerShape(count: number) {
  const parts: Part[] = [];
  const my = 0.35; // monitor centre
  const W = 2.6;
  const H = 1.7;
  // Bezel
  parts.push(box([0, my + H / 2 - 0.06, 0], [W, 0.12, 0.14], 1.2));
  parts.push(box([0, my - H / 2 + 0.06, 0], [W, 0.12, 0.14], 1.2));
  parts.push(box([-W / 2 + 0.06, my, 0], [0.12, H - 0.24, 0.14], 1.2));
  parts.push(box([W / 2 - 0.06, my, 0], [0.12, H - 0.24, 0.14], 1.2));
  // Rear casing, kept faint
  parts.push(box([0, my, -0.13], [W - 0.2, H - 0.2, 0.1], 0.25));

  // Screen contents sit just in front of the glass
  const z = 0.03;
  const top = my + H / 2 - 0.2;
  const left = -W / 2 + 0.22;
  parts.push(box([0, top, z], [W - 0.36, 0.05, 0], 3));
  [0, 1, 2].forEach((i) => parts.push(torus([left + 0.04 + i * 0.08, top + 0.07, z], 0.022, 0.008, "z", 3)));
  // Sidebar
  parts.push(box([left + 0.22, my - 0.08, z], [0.42, 0.012, 0], 3));
  for (let i = 0; i < 7; i++) parts.push(box([left + 0.2, top - 0.17 - i * 0.12, z], [rand(0.18, 0.34), 0.03, 0], 4));
  // Code lines with indentation
  const indents = [0, 1, 1, 2, 2, 2, 1, 2, 3, 3, 2, 1, 0];
  indents.forEach((indent, i) => {
    let x = left + 0.56 + indent * 0.12;
    const y = top - 0.15 - i * 0.085;
    const tokens = 1 + Math.floor(Math.random() * 4);
    for (let t = 0; t < tokens && x < 0.75; t++) {
      const w = rand(0.08, 0.32);
      parts.push(box([x + w / 2, y, z], [w, 0.026, 0], 4));
      x += w + 0.05;
    }
  });
  // Small bar chart in the corner
  [0.18, 0.32, 0.24, 0.44, 0.38].forEach((h, i) =>
    parts.push(box([0.86 + i * 0.07, my - H / 2 + 0.3 + h / 2, z], [0.045, h, 0], 4))
  );
  parts.push(box([1.0, my - H / 2 + 0.28, z], [0.4, 0.01, 0], 4));

  // Stand
  parts.push(box([0, my - H / 2 - 0.22, -0.15], [0.2, 0.44, 0.1]));
  parts.push(box([0, -0.97, -0.15], [0.9, 0.04, 0.45]));

  // Keyboard
  const ky = -1.0;
  const kz = 0.85;
  parts.push(box([0, ky, kz], [2.3, 0.06, 0.72], 0.7));
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 14; col++) {
      parts.push(box([-1.04 + col * 0.16, ky + 0.06, kz - 0.25 + row * 0.15], [0.12, 0.04, 0.11], 1.3));
    }
  }
  parts.push(box([0, ky + 0.06, kz + 0.33], [0.9, 0.04, 0.1], 1.3));
  // Mouse
  parts.push(box([1.5, ky + 0.01, kz + 0.05], [0.18, 0.07, 0.28]));

  return build(parts, count, [0, 0.05, -0.3], 0.92);
}

// Order points into vertical bands, then by height, so two clouds can be paired up
// and points travel short, coherent paths when morphing between them.
export function spatialOrder(points: Float32Array) {
  const n = points.length / 3;
  const byX = Array.from({ length: n }, (_, i) => i).sort((a, b) => points[a * 3] - points[b * 3]);
  const bands = Math.round(Math.sqrt(n) / 2);
  const size = Math.ceil(n / bands);
  const out: number[] = [];
  for (let b = 0; b < bands; b++) {
    const band = byX.slice(b * size, (b + 1) * size);
    band.sort((i, j) => points[i * 3 + 1] - points[j * 3 + 1]);
    out.push(...band);
  }
  return out;
}

// Reorder `target` so that its k-th point in spatial order lines up with the source's
export function pairWith(sourceOrder: number[], target: Float32Array) {
  const targetOrder = spatialOrder(target);
  const out = new Float32Array(target.length);
  for (let k = 0; k < sourceOrder.length; k++) {
    const s = sourceOrder[k] * 3;
    const t = targetOrder[k] * 3;
    out[s] = target[t];
    out[s + 1] = target[t + 1];
    out[s + 2] = target[t + 2];
  }
  return out;
}

// A word drawn in the given font, as a shallow extruded cloud one unit wide.
// A share of points drifts loose around the letters so the edges read as dissolving.
// `widthPerEm` is the inked width divided by the font size, for matching it to real text.
export function wordShape(text: string, weight: string, family: string, letterSpacingEm: number, count: number) {
  const size = 200;
  const canvas = document.createElement("canvas");
  canvas.width = 2400;
  canvas.height = 400;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;
  ctx.font = `${weight} ${size}px ${family}`;
  if ("letterSpacing" in ctx) (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = `${letterSpacingEm * size}px`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#fff";
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);

  const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const filled: number[] = [];
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      if (data[(y * canvas.width + x) * 4 + 3] > 128) {
        filled.push(x, y);
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  if (!filled.length) return null;

  const width = maxX - minX;
  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;
  const depth = 0.03;
  const out = new Float32Array(count * 3);
  const pixels = filled.length / 2;
  for (let i = 0; i < count; i++) {
    const p = Math.floor(Math.random() * pixels) * 2;
    let x = (filled[p] + Math.random() - cx) / width;
    let y = -(filled[p + 1] + Math.random() - cy) / width;
    let z = rand(-depth, depth);
    if (i % 9 === 0) {
      // Loose particles around the glyphs
      const spread = 0.02 + Math.random() * 0.05;
      const a = Math.random() * TAU;
      x += Math.cos(a) * spread;
      y += Math.sin(a) * spread * 0.7;
      z = rand(-0.12, 0.12);
    }
    out[i * 3] = x;
    out[i * 3 + 1] = y;
    out[i * 3 + 2] = z;
  }
  return { points: out, widthPerEm: width / size };
}
