"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { fibonacciSphere, keyShape, computerShape, wordShape, spatialOrder, pairWith } from "./shapes";

// Ashima Arts 3D simplex noise (MIT)
const noiseGLSL = /* glsl */ `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}
`;

const coreVertex = /* glsl */ `
uniform float uTime;
uniform float uComputer;
uniform float uKey;
uniform float uWord;
uniform float uWordScale;
uniform float uWordY;
attribute vec3 aComputer;
attribute vec3 aKey;
attribute vec3 aWord;
varying float vNoise;
${noiseGLSL}
void main() {
  vec3 dir = normalize(position);
  // Two slow, low-frequency octaves for a soft, liquid surface
  float n = snoise(dir * 0.9 + vec3(uTime * 0.05)) * 0.75
          + snoise(dir * 1.8 - vec3(uTime * 0.04)) * 0.25;
  vNoise = n;
  vec3 p = position + dir * n * 0.3;
  // The wordmark is stored one unit wide and sized to the heading on screen
  vec3 word = aWord * uWordScale + vec3(0.0, uWordY, 0.0);
  p = mix(p, word + dir * n * 0.04, uWord);
  // Shapes keep a faint shimmer so they never look frozen
  p = mix(p, aComputer + dir * n * 0.015, uComputer);
  p = mix(p, aKey + dir * n * 0.015, uKey);

  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_PointSize = (1.5 + n * 0.8) * (5.0 / -mv.z);
  gl_Position = projectionMatrix * mv;
}
`;

const coreFragment = /* glsl */ `
uniform vec3 uColor;
uniform float uSolid;
varying float vNoise;
void main() {
  vec2 c = gl_PointCoord - 0.5;
  float d = dot(c, c);
  if (d > 0.25) discard;
  float soft = 1.0 - smoothstep(0.1, 0.25, d);
  // Shapes read better evenly lit than with the sphere's noise shading
  float a = mix(0.3 + smoothstep(-0.5, 0.7, vNoise) * 0.7, 1.0, uSolid) * soft;
  vec3 col = mix(uColor * 0.45, mix(uColor, vec3(1.0), 0.35), smoothstep(-0.2, 0.8, vNoise));
  gl_FragColor = vec4(col, a);
}
`;

const POINT_COUNT = 60000;

// TenantTool brand blue, lifted so the key stands out against the blue wash
const TENANTTOOL_BLUE = new THREE.Color("#4a8fe7").lerp(new THREE.Color("#ffffff"), 0.35);

// Mesh colour stops, blended by how far down the page you are
const PALETTE = ["#d6e2ff", "#5eead4", "#a78bfa", "#f5b971"].map((c) => new THREE.Color(c));

function colourAt(progress: number, target: THREE.Color) {
  const scaled = Math.min(Math.max(progress, 0), 1) * (PALETTE.length - 1);
  const i = Math.min(Math.floor(scaled), PALETTE.length - 2);
  return target.lerpColors(PALETTE[i], PALETTE[i + 1], scaled - i);
}

const TAU = Math.PI * 2;

const smoothstep = (x: number) => {
  const c = Math.min(Math.max(x, 0), 1);
  return c * c * (3 - 2 * c);
};

// 1 when a section is centred in the viewport, easing to 0 away from it
function sectionFocus(id: string) {
  const section = document.getElementById(id);
  if (!section) return 0;
  const r = section.getBoundingClientRect();
  const offset = Math.abs(r.top + r.height / 2 - window.innerHeight / 2);
  return smoothstep(1.4 - (offset / window.innerHeight) * 1.8);
}

export default function SignalScene({ className = "" }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      return; // No WebGL: the copy carries the page on its own
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.cssText = "width:100%;height:100%;display:block";
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 6);

    const group = new THREE.Group();
    scene.add(group);

    // Noise-displaced point sphere that morphs into a computer and a key
    const sphere = fibonacciSphere(POINT_COUNT, 1.5);
    const order = spatialOrder(sphere);
    const coreGeo = new THREE.BufferGeometry();
    coreGeo.setAttribute("position", new THREE.BufferAttribute(sphere, 3));
    coreGeo.setAttribute("aComputer", new THREE.BufferAttribute(pairWith(order, computerShape(POINT_COUNT)), 3));
    coreGeo.setAttribute("aKey", new THREE.BufferAttribute(pairWith(order, keyShape(POINT_COUNT)), 3));
    coreGeo.setAttribute("aWord", new THREE.BufferAttribute(new Float32Array(sphere.length), 3));
    const coreUniforms = {
      uTime: { value: 0 },
      uWord: { value: 0 },
      uWordScale: { value: 1 },
      uWordY: { value: 0 },
      uComputer: { value: 0 },
      uKey: { value: 0 },
      uSolid: { value: 0 },
      uColor: { value: PALETTE[0].clone() },
    };
    const core = new THREE.Points(
      coreGeo,
      new THREE.ShaderMaterial({
        vertexShader: coreVertex,
        fragmentShader: coreFragment,
        uniforms: coreUniforms,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
    );
    group.add(core);

    // Outer shell
    const shellMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.14 });
    const shell = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(2.35, 1)), shellMat);
    group.add(shell);

    // Orbiting rings
    const rings: THREE.Line[] = [];
    for (let i = 0; i < 3; i++) {
      const curve = new THREE.EllipseCurve(0, 0, 2.8 + i * 0.35, 2.8 + i * 0.35, 0, Math.PI * (1.2 + i * 0.25));
      const ringGeo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(160));
      const ring = new THREE.Line(
        ringGeo,
        new THREE.LineDashedMaterial({ color: 0xffffff, transparent: true, opacity: 0.22 - i * 0.05, dashSize: 0.06, gapSize: 0.08 })
      );
      ring.computeLineDistances();
      ring.rotation.x = Math.PI / 2.4 + i * 0.4;
      ring.rotation.y = i * 0.7;
      rings.push(ring);
      group.add(ring);
    }

    // Drifting dust field
    const dustCount = 900;
    const dustPos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      const r = 4 + Math.random() * 10;
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      dustPos[i * 3] = r * Math.sin(p) * Math.cos(t);
      dustPos[i * 3 + 1] = r * Math.sin(p) * Math.sin(t);
      // Keep dust well behind the camera so no particle balloons into a square
      dustPos[i * 3 + 2] = Math.min(r * Math.cos(p) - 4, 2);
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
    const dust = new THREE.Points(
      dustGeo,
      new THREE.PointsMaterial({ color: 0xffffff, size: 0.025, transparent: true, opacity: 0.45, depthWrite: false })
    );
    scene.add(dust);

    // The wordmark is sampled from the heading's own font once it has loaded
    const heading = document.getElementById("wordmark");
    let wordReady = false;
    let wordWidthPerEm = 1;
    let cancelled = false;
    if (heading) {
      document.fonts.ready.then(() => {
        if (cancelled) return;
        const style = getComputedStyle(heading);
        const fontSize = parseFloat(style.fontSize);
        const spacing = (parseFloat(style.letterSpacing) || 0) / fontSize;
        const word = wordShape("JOEFERGRAPHY", style.fontWeight, style.fontFamily, spacing, POINT_COUNT);
        if (!word) return;
        coreGeo.setAttribute("aWord", new THREE.BufferAttribute(pairWith(order, word.points), 3));
        wordWidthPerEm = word.widthPerEm;
        wordReady = true;
      });
    }

    const resize = () => {
      const w = Math.max(1, mount.clientWidth);
      const h = Math.max(1, mount.clientHeight);
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      // Pull back on narrow screens so the sphere is not cropped
      camera.position.z = w < 640 ? 10 : 7.5;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);

    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const onPointer = (e: PointerEvent) => {
      pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onPointer);

    let scrollY = window.scrollY;
    const onScroll = () => {
      scrollY = window.scrollY;
      // With reduced motion there is no loop, so redraw on scroll instead
      if (reduceMotion) render();
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const clock = new THREE.Clock();
    const targetColour = new THREE.Color();
    const root = document.documentElement;
    let computer = 0;
    let key = 0;
    let word = 0;
    let frame = 0;

    const render = () => {
      const dt = Math.min(clock.getDelta(), 0.1);
      const t = clock.elapsedTime;
      coreUniforms.uTime.value = t;

      // Time-based easing so morphs take the same time at any frame rate
      const rate = (perSecond: number) => (reduceMotion ? 1 : 1 - Math.exp(-perSecond * dt));
      const ease = rate(2.8);
      computer += (sectionFocus("vision") - computer) * ease;
      key += (sectionFocus("tenanttool") - key) * ease;
      word += ((wordReady ? Math.max(sectionFocus("hero"), sectionFocus("outro")) : 0) - word) * rate(1.8);
      const morph = Math.min(1, computer + key + word);
      coreUniforms.uComputer.value = computer;
      coreUniforms.uKey.value = key;
      coreUniforms.uWord.value = word;

      // Size and place the wordmark to sit just behind the heading at its resting position
      const halfH = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
      const worldPerPx = (halfH * 2) / window.innerHeight;
      if (heading) {
        const rect = heading.getBoundingClientRect();
        const fontSize = parseFloat(getComputedStyle(heading).fontSize);
        coreUniforms.uWordScale.value = wordWidthPerEm * fontSize * worldPerPx * 1.04;
        coreUniforms.uWordY.value = -(rect.top + scrollY + rect.height / 2 - window.innerHeight / 2) * worldPerPx;
      }
      coreUniforms.uSolid.value = morph;
      root.style.setProperty("--tt", key.toFixed(3));

      // Ease the colour towards the scroll position so it never jumps
      const maxScroll = Math.max(1, root.scrollHeight - window.innerHeight);
      colourAt(scrollY / maxScroll, targetColour).lerp(TENANTTOOL_BLUE, key);
      const colour = coreUniforms.uColor.value;
      colour.lerp(targetColour, rate(3));
      shellMat.color.copy(colour);
      shellMat.opacity = 0.14 * (1 - morph);
      rings.forEach((r, i) => {
        const m = r.material as THREE.LineDashedMaterial;
        m.color.copy(colour);
        m.opacity = (0.22 - i * 0.05) * (1 - morph);
      });

      pointer.x += (pointer.tx - pointer.x) * 0.03;
      pointer.y += (pointer.ty - pointer.y) * 0.03;

      // Shapes face the viewer with a gentle turn; the mesh itself stays centred.
      // The wordmark faces straight on so it lines up with the heading.
      // The free spin is matched to the nearest equivalent angle so it never unwinds.
      const total = Math.max(morph, 1e-3);
      const spin = t * 0.05;
      const sway = ((Math.sin(t * 0.3) * 0.15 - 0.2) * (computer + key)) / total;
      const facing = sway + TAU * Math.round((spin - sway) / TAU);
      const parallax = THREE.MathUtils.lerp(0.3, 0.1, word / total);
      group.rotation.y = THREE.MathUtils.lerp(spin, facing, morph) + pointer.x * parallax;
      const tilt = (computer * 0.32 + key * 0.08) / total;
      group.rotation.x = THREE.MathUtils.lerp(pointer.y * 0.2 + scrollY * 0.0002, tilt + pointer.y * parallax * 0.3, morph);
      group.scale.setScalar(1 + computer * 0.12 + key * 0.15);
      shell.rotation.z = -t * 0.03;
      rings.forEach((r, i) => (r.rotation.z = t * (0.04 + i * 0.02) * (i % 2 ? -1 : 1)));
      dust.rotation.y = t * 0.008;

      renderer.render(scene, camera);
      if (!reduceMotion) frame = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", onScroll);
      scene.traverse((obj) => {
        const o = obj as THREE.Mesh;
        o.geometry?.dispose();
        const m = o.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(m)) m.forEach((x) => x.dispose());
        else m?.dispose();
      });
      root.style.removeProperty("--tt");
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className={className} aria-hidden="true" />;
}
