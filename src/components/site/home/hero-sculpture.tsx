"use client";

import { useEffect, useRef } from "react";

const VERT = "attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}";

/**
 * The sculpture: one liquid body and two satellites that melt into it, ray-marched in a
 * fragment shader. It is lit like polished metal in a studio with strip lights, with the
 * accent colour bouncing up from below. uM is the pointer, uV how fast it moves.
 */
const FRAG = `precision highp float;
uniform vec2 uRes;uniform float uT;uniform vec2 uM;uniform float uV;uniform vec2 uC;uniform float uK;uniform vec3 uA;uniform vec3 uBg;uniform float uE;
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
    float t=-b-sqrt(h);float md=9.;float tm=t;bool hit=false;vec3 p=ro;
    for(int i=0;i<56;i++){p=ro+rd*t;float d=map(p);if(d<md){md=d;tm=t;}if(d<.003){hit=true;break;}t+=d*.78;if(t>7.)break;}
    col+=uA*.09*exp(-max(md,0.)*6.5);
    // Edge smoothing: a ray that only just misses still gets part of the surface's colour,
    // by how far it passed (measured against uE pixels at that distance).
    float aa=uE*.5*tm/(uRes.y*uK);
    float cov=hit?1.:clamp(1.-md/aa,0.,1.);
    if(cov>0.){
      if(!hit)p=ro+rd*tm;
      vec3 n=nrm(p);vec3 r=reflect(rd,n);
      float fr=pow(1.-max(dot(n,-rd),0.),2.4);
      float strips=smoothstep(.46,.58,sin(r.y*8.5+r.x*2.6+uT*.12)*.5+.5);
      float sky=smoothstep(-.15,.95,r.y);
      vec3 env=mix(vec3(.018,.018,.022),vec3(.97,.94,.88),strips*(.12+.88*sky));
      env+=uA*smoothstep(.05,-.85,r.y)*.95;
      vec3 sc=env*(.3+.7*fr)+uA*fr*.4;
      sc*=.82+.18*n.y;
      col=mix(col,sc,cov);
    }
  }
  gl_FragColor=vec4(col,1.);
}`;

/**
 * Second pass: the sculpture is first drawn into a texture, then copied to the screen through
 * FXAA (fast approximate anti-aliasing, after Timothy Lottes). It finds contrast edges and
 * blends along them, which removes the stair-steps on the silhouette and on the reflections
 * at any drawing resolution, for a few texture reads per pixel.
 */
const SMOOTH = `precision mediump float;
uniform sampler2D uTex;uniform vec2 uRes;
void main(){
  vec2 px=1./uRes;vec2 uv=gl_FragCoord.xy*px;
  vec3 L=vec3(.299,.587,.114);
  vec3 m=texture2D(uTex,uv).rgb;
  float nw=dot(texture2D(uTex,uv+vec2(-1.,-1.)*px).rgb,L),ne=dot(texture2D(uTex,uv+vec2(1.,-1.)*px).rgb,L);
  float sw=dot(texture2D(uTex,uv+vec2(-1.,1.)*px).rgb,L),se=dot(texture2D(uTex,uv+vec2(1.,1.)*px).rgb,L);
  float lm=dot(m,L);
  float lo=min(lm,min(min(nw,ne),min(sw,se))),hi=max(lm,max(max(nw,ne),max(sw,se)));
  vec2 dir=vec2(-((nw+ne)-(sw+se)),(nw+sw)-(ne+se));
  float red=max((nw+ne+sw+se)*.03125,.0078125);
  dir=clamp(dir/(min(abs(dir.x),abs(dir.y))+red),-8.,8.)*px;
  vec3 a=.5*(texture2D(uTex,uv+dir*(1./3.-.5)).rgb+texture2D(uTex,uv+dir*(2./3.-.5)).rgb);
  vec3 b=a*.5+.25*(texture2D(uTex,uv-dir*.5).rgb+texture2D(uTex,uv+dir*.5).rgb);
  float lb=dot(b,L);
  gl_FragColor=vec4((lb<lo||lb>hi)?a:b,1.);
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
    let post: WebGLProgram | null = null;
    let target: WebGLFramebuffer | null = null;
    let texture: WebGLTexture | null = null;
    const U: Record<string, WebGLUniformLocation | null> = {};
    const P: Record<string, WebGLUniformLocation | null> = {};
    if (gl) {
      const make = (type: number, src: string) => {
        const sh = gl.createShader(type)!;
        gl.shaderSource(sh, src);
        gl.compileShader(sh);
        if (gl.getShaderParameter(sh, gl.COMPILE_STATUS)) return sh;
        canvas.dataset.gl = `compile: ${gl.getShaderInfoLog(sh) ?? ""}`.slice(0, 300);
        return null;
      };
      const link = (frag: string) => {
        const vs = make(gl.VERTEX_SHADER, VERT);
        const fs = make(gl.FRAGMENT_SHADER, frag);
        if (!vs || !fs) return null;
        const pr = gl.createProgram()!;
        gl.attachShader(pr, vs);
        gl.attachShader(pr, fs);
        gl.bindAttribLocation(pr, 0, "a"); // both programs draw the same triangle
        gl.linkProgram(pr);
        return gl.getProgramParameter(pr, gl.LINK_STATUS) ? pr : null;
      };
      prog = link(FRAG);
      if (prog) {
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(0);
        gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
        gl.useProgram(prog);
        for (const n of ["uRes", "uT", "uM", "uV", "uC", "uK", "uA", "uBg", "uE"]) U[n] = gl.getUniformLocation(prog, n);
        gl.uniform3f(U.uA, 1, 0.302, 0.137);
        gl.uniform3f(U.uBg, 0.047, 0.047, 0.051);
        // The smoothing pass is an extra: without it the sculpture is drawn straight to the screen.
        post = link(SMOOTH);
        texture = post ? gl.createTexture() : null;
        target = post ? gl.createFramebuffer() : null;
        if (post && texture && target) {
          gl.useProgram(post);
          P.uTex = gl.getUniformLocation(post, "uTex");
          P.uRes = gl.getUniformLocation(post, "uRes");
          gl.uniform1i(P.uTex, 0);
          gl.bindTexture(gl.TEXTURE_2D, texture);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        } else post = null;
      }
    }
    const live = Boolean(gl && prog);
    if (!gl) canvas.dataset.gl = "unavailable";
    // No graphics chip (the browser would draw every frame on the processor): show one still
    // frame of the sculpture instead of animating it.
    const info = gl?.getExtension("WEBGL_debug_renderer_info");
    const renderer = gl && info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : "";
    // (In development, ?gl=live animates anyway, to judge the picture on a machine without a chip.)
    const forced = process.env.NODE_ENV !== "production" && window.location.search.includes("gl=live");
    const software = !forced && /swiftshader|llvmpipe|software|basic render/i.test(renderer);
    let still = reduce || software;
    if (!live && chars.length === 0) return;

    // Pixels drawn per frame. Enough for crisp edges on a phone's dense screen; it is lowered
    // automatically when a device cannot keep up.
    let budget = still ? 200_000 : fine ? 1_600_000 : 1_300_000;
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
      const scale = Math.min(Math.min(window.devicePixelRatio || 1, 2), Math.sqrt(budget / Math.max(1, r.width * r.height)));
      const nw = Math.max(2, Math.round(r.width * scale));
      const nh = Math.max(2, Math.round(r.height * scale));
      if (nw === w && nh === h) return; // resizing a canvas clears it: only when the size really changed
      w = nw;
      h = nh;
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      if (post && texture && target) {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        gl.bindFramebuffer(gl.FRAMEBUFFER, target);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
        if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) post = null;
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      }
      if (shown) draw(lastT); // never leave the freshly cleared canvas empty for a frame
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
    let stalls = 0;
    let frames = 0;
    let prev = 0;
    let shown = false;
    let lastT = 12;
    let lastScroll = -1;
    let restUntil = 0;
    const draw = (t: number) => {
      if (!gl || !live) return;
      lastT = t;
      // With a mouse the sculpture grows and rises as you scroll past; on touch screens it
      // rests during scrolling (see the frame loop), so it does not follow the scroll either.
      const sy = fine ? Math.min(1, Math.max(0, window.scrollY / Math.max(1, hero.offsetHeight))) : 0;
      gl.useProgram(prog);
      gl.bindFramebuffer(gl.FRAMEBUFFER, post ? target : null);
      gl.uniform2f(U.uRes, w, h);
      gl.uniform1f(U.uT, t);
      gl.uniform2f(U.uM, mx, my);
      gl.uniform1f(U.uV, energy);
      gl.uniform2f(U.uC, cxo, cyo + sy * 0.22);
      gl.uniform1f(U.uK, k * (1 + sy * 0.35));
      gl.uniform1f(U.uE, still ? 2.6 : 1.5); // a still frame is drawn smaller, so its edge is softened more
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (post) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.useProgram(post);
        gl.uniform2f(P.uRes, w, h);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      }
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
      // Touch screens: while a finger is scrolling, the graphics chip belongs to the scroll.
      // The sculpture holds its last frame and carries on a moment after the page stops.
      if (!fine) {
        const y = window.scrollY;
        if (y !== lastScroll) {
          lastScroll = y;
          restUntil = now + 160;
        }
        if (now < restUntil) {
          prev = 0;
          return;
        }
      }
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
        // A frame that takes this long means the device is far out of its depth: halve at once
        // instead of waiting for the average.
        if (dt > 110 && ++stalls >= 2) {
          stalls = 0;
          if (budget > 240_000) {
            budget *= 0.5;
            resize();
          } else still = true;
        }
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
