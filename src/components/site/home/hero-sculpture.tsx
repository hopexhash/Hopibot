"use client";

import { useEffect, useRef } from "react";

const VERT = "attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}";

/**
 * The sculpture: one liquid body and two satellites that melt into it, ray-marched in a
 * fragment shader. It is lit like polished metal in a studio with strip lights, with the
 * accent colour bouncing up from below. uM is the pointer, uV how fast it moves.
 */
const FRAG = `precision highp float;
uniform vec2 uRes;uniform float uT;uniform vec2 uM;uniform float uV;uniform vec2 uC;uniform float uK;uniform vec3 uA;uniform vec3 uBg;
float smin(float a,float b,float k){float h=clamp(.5+.5*(b-a)/k,0.,1.);return mix(b,a,h)-k*h*(1.-h);}
mat2 rot(float a){float c=cos(a),s=sin(a);return mat2(c,-s,s,c);}
float map(vec3 p){
  float t=uT;vec3 q=p;q.xz*=rot(t*.11);q.xy*=rot(t*.07);
  float d=length(q)-1.;
  float n=sin(q.x*1.9+t*.55)*sin(q.y*2.1+t*.47)*sin(q.z*2.-t*.4);
  n+=.45*sin(q.x*3.7-t*.75+1.7)*sin(q.y*3.9+t*.66)*sin(q.z*3.5+t*.52);
  d+=n*(.2+.26*uV);
  float d2=length(p-vec3(uM,.3))-.3-.07*uV;
  vec3 s=vec3(1.3*cos(t*.31),.95*sin(t*.23),.55*sin(t*.17));
  float d3=length(p-s)-.24;
  return smin(smin(d,d2,.62),d3,.5);
}
vec3 nrm(vec3 p){vec2 e=vec2(.0025,0.);return normalize(vec3(map(p+e.xyy)-map(p-e.xyy),map(p+e.yxy)-map(p-e.yxy),map(p+e.yyx)-map(p-e.yyx)));}
void main(){
  vec2 uv=(gl_FragCoord.xy-.5*uRes)/uRes.y;uv=(uv-uC)/uK;
  vec3 ro=vec3(0.,0.,4.);vec3 rd=normalize(vec3(uv,-2.));
  vec3 col=uBg;
  float b=dot(ro,rd);float h=b*b-(16.-5.3);
  if(h>0.){
    float t=-b-sqrt(h);float md=9.;bool hit=false;vec3 p=ro;
    for(int i=0;i<56;i++){p=ro+rd*t;float d=map(p);md=min(md,d);if(d<.003){hit=true;break;}t+=d*.78;if(t>7.)break;}
    if(hit){
      vec3 n=nrm(p);vec3 r=reflect(rd,n);
      float fr=pow(1.-max(dot(n,-rd),0.),2.4);
      float strips=smoothstep(.46,.58,sin(r.y*8.5+r.x*2.6+uT*.12)*.5+.5);
      float sky=smoothstep(-.15,.95,r.y);
      vec3 env=mix(vec3(.018,.018,.022),vec3(.97,.94,.88),strips*(.12+.88*sky));
      env+=uA*smoothstep(.05,-.85,r.y)*.95;
      col=env*(.3+.7*fr)+uA*fr*.4;
      col*=.82+.18*n.y;
    }else{
      col+=uA*.09*exp(-md*6.5);
    }
  }
  gl_FragColor=vec4(col,1.);
}`;

/**
 * Hero visual of the homepage. Draws at a pixel budget (not at full screen resolution),
 * lowers that budget by itself when frames get slow, pauses when it is off screen or the
 * tab is hidden, and leaves the CSS stand-in in place when WebGL is not available. With
 * "reduce motion" it draws a single still frame. It also lets the headline's letters lean
 * away from the pointer (transform only, no layout).
 */
export function HeroSculpture() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const hero = canvas?.closest<HTMLElement>(".hx");
    if (!canvas || !hero) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const chars = fine && !reduce ? [...hero.querySelectorAll<HTMLElement>(".hx-st .c")] : [];

    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "high-performance" });
    let prog: WebGLProgram | null = null;
    const U: Record<string, WebGLUniformLocation | null> = {};
    if (gl) {
      const make = (type: number, src: string) => {
        const sh = gl.createShader(type)!;
        gl.shaderSource(sh, src);
        gl.compileShader(sh);
        if (gl.getShaderParameter(sh, gl.COMPILE_STATUS)) return sh;
        canvas.dataset.gl = `compile: ${gl.getShaderInfoLog(sh) ?? ""}`.slice(0, 300);
        return null;
      };
      const vs = make(gl.VERTEX_SHADER, VERT);
      const fs = make(gl.FRAGMENT_SHADER, FRAG);
      if (vs && fs) {
        prog = gl.createProgram()!;
        gl.attachShader(prog, vs);
        gl.attachShader(prog, fs);
        gl.linkProgram(prog);
        if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) prog = null;
      }
      if (prog) {
        gl.useProgram(prog);
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
        const loc = gl.getAttribLocation(prog, "a");
        gl.enableVertexAttribArray(loc);
        gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
        for (const n of ["uRes", "uT", "uM", "uV", "uC", "uK", "uA", "uBg"]) U[n] = gl.getUniformLocation(prog, n);
        gl.uniform3f(U.uA, 1, 0.302, 0.137);
        gl.uniform3f(U.uBg, 0.047, 0.047, 0.051);
      }
    }
    const live = Boolean(gl && prog);
    if (!gl) canvas.dataset.gl = "unavailable";
    // No graphics chip (the browser would draw every frame on the processor): show one still
    // frame of the sculpture instead of animating it.
    const info = gl?.getExtension("WEBGL_debug_renderer_info");
    const renderer = gl && info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : "";
    const software = /swiftshader|llvmpipe|software|basic render/i.test(renderer);
    let still = reduce || software;
    if (!live && chars.length === 0) return;

    let budget = still ? 170_000 : fine ? 720_000 : 300_000;
    let w = 1;
    let h = 1;
    let cxo = 0; // where the sculpture sits, in units of the hero's height from the centre
    let cyo = 0;
    let k = 1;
    const resize = () => {
      const r = hero.getBoundingClientRect();
      const wide = r.width >= 900;
      cxo = wide ? 0.2 * (r.width / r.height) : 0.06;
      cyo = wide ? 0.03 : 0.2;
      k = wide ? 0.62 : 0.5;
      if (!live || !gl) return;
      const scale = Math.min(Math.min(window.devicePixelRatio || 1, 1.5), Math.sqrt(budget / Math.max(1, r.width * r.height)));
      w = Math.max(2, Math.round(r.width * scale));
      h = Math.max(2, Math.round(r.height * scale));
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
    };

    let visible = true;
    let pointer = false;
    let tx = 0.9;
    let ty = 0.5;
    let mx = tx;
    let my = ty;
    let energy = 0;
    let lastX = 0;
    let lastY = 0;
    let cpx = -9999;
    let cpy = -9999;
    let charsDirty = false;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const r = hero.getBoundingClientRect();
      if (e.clientY > r.bottom) return;
      pointer = true;
      // Screen position → the sculpture's own space (see the camera in the shader).
      const nx = (e.clientX - r.left - r.width / 2) / r.height;
      const ny = -(e.clientY - r.top - r.height / 2) / r.height;
      tx = ((nx - cxo) / k) * 2;
      ty = ((ny - cyo) / k) * 2;
      const len = Math.hypot(tx, ty);
      if (len > 1.5) {
        tx *= 1.5 / len;
        ty *= 1.5 / len;
      }
      energy = Math.min(1, energy + Math.hypot(e.clientX - lastX, e.clientY - lastY) / 900);
      lastX = e.clientX;
      lastY = e.clientY;
      cpx = e.clientX;
      cpy = e.clientY;
      charsDirty = true;
    };
    const onLeave = () => {
      pointer = false;
      cpx = cpy = -9999;
      charsDirty = true;
    };

    let raf = 0;
    let start = 0;
    let slow = 0;
    let frames = 0;
    let prev = 0;
    let shown = false;
    const draw = (t: number) => {
      if (!gl || !live) return;
      const sy = Math.min(1, Math.max(0, window.scrollY / Math.max(1, hero.offsetHeight)));
      gl.uniform2f(U.uRes, w, h);
      gl.uniform1f(U.uT, t);
      gl.uniform2f(U.uM, mx, my);
      gl.uniform1f(U.uV, energy);
      gl.uniform2f(U.uC, cxo, cyo + sy * 0.22);
      gl.uniform1f(U.uK, k * (1 + sy * 0.35));
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!shown) {
        shown = true;
        canvas.classList.add("is-live");
      }
    };
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible || document.hidden) {
        prev = 0;
        return;
      }
      if (!start) start = now;
      const t = (now - start) / 1000 + 8;
      if (!pointer) {
        tx = 0.95 * Math.cos(t * 0.37);
        ty = 0.75 * Math.sin(t * 0.29);
      }
      mx += (tx - mx) * 0.055;
      my += (ty - my) * 0.055;
      energy *= 0.965;
      if (!still) draw(t);
      if (charsDirty) {
        charsDirty = false;
        for (const c of chars) {
          const r = c.getBoundingClientRect();
          const d = Math.hypot(cpx - (r.left + r.width / 2), cpy - (r.top + r.height / 2));
          const f = Math.max(0, 1 - d / 240);
          c.style.setProperty("--f", f.toFixed(3));
        }
      }
      // Too slow for a few dozen frames in a row: draw fewer pixels.
      if (live && prev && !still) {
        const dt = now - prev;
        if (dt > 26) slow++;
        if (++frames >= 45) {
          if (slow > 20) {
            if (budget > 120_000) {
              budget *= 0.7;
              resize();
            } else still = true; // still too slow at the lowest quality: hold the last frame
          }
          frames = 0;
          slow = 0;
        }
      }
      prev = now;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(hero);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(hero);
    // The page loads and becomes usable first; the sculpture joins a moment later.
    let startTimer = 0;
    const begin = () => {
      startTimer = window.setTimeout(() => {
        if (still) draw(12);
        if (!reduce) raf = requestAnimationFrame(frame); // also drives the letters' reaction to the pointer
      }, 350);
    };
    if (!reduce) {
      window.addEventListener("pointermove", onMove, { passive: true });
      hero.addEventListener("pointerleave", onLeave);
    }
    if (document.readyState === "complete") begin();
    else window.addEventListener("load", begin, { once: true });
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(startTimer);
      window.removeEventListener("load", begin);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", onLeave);
      // The context belongs to the canvas and is reused if this effect runs again; only the loop stops.
    };
  }, []);

  return <canvas ref={ref} className="hx-gl" aria-hidden="true" />;
}
