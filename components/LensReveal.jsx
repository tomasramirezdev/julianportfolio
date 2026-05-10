'use client'

import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react'
import gsap from 'gsap'

const vert = `
attribute vec2 a_pos;
varying vec2 vUv;
void main() {
  vUv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`

const frag = `
precision highp float;
uniform sampler2D uLens;
uniform vec2  uMouse;
uniform float uRadius;
uniform float uTime;
uniform float uAspect;
uniform float uLensAspect;
varying vec2 vUv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}
float noise(vec2 p) {
  vec2 i = floor(p); vec2 f = fract(p);
  f = f*f*(3.0-2.0*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),
             mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);
}

vec2 containUv(vec2 uv, float ca, float ia) {
  vec2 s = vec2(1.0);
  if (ia > ca) s.y = ca/ia; else s.x = ia/ca;
  return (uv-0.5)/s+0.5;
}

void main() {
  if (uRadius < 0.002) { gl_FragColor = vec4(0.0); return; }
  vec2 uv = vUv;
  vec2 d = uv - uMouse;
  d.x *= uAspect;
  float a = 1.8; float b = 1.0;
  float dist = length(vec2(d.x/a, d.y/b));
  float em = smoothstep(uRadius*0.6, uRadius, dist);
  float en = noise(uv*8.0+uTime*0.4)*0.018*em;
  float br = uRadius + en;
  float mask = 1.0 - smoothstep(br-0.012, br+0.012, dist);
  vec2 luv = containUv(uv, uAspect, uLensAspect);
  if (luv.x<0.0||luv.x>1.0||luv.y<0.0||luv.y>1.0) { gl_FragColor=vec4(0.0); return; }
  vec4 lens = texture2D(uLens, luv);
  gl_FragColor = vec4(lens.rgb, lens.a * mask);
}
`

function createShader(gl, type, src) {
  const s = gl.createShader(type)
  gl.shaderSource(s, src); gl.compileShader(s)
  return s
}

function createProgram(gl, vs, fs) {
  const p = gl.createProgram()
  gl.attachShader(p, createShader(gl, gl.VERTEX_SHADER, vs))
  gl.attachShader(p, createShader(gl, gl.FRAGMENT_SHADER, fs))
  gl.linkProgram(p)
  return p
}

const LensReveal = forwardRef(function LensReveal({ containerRef }, ref) {
  const canvasRef = useRef(null)
  const stateRef  = useRef(null)

  useImperativeHandle(ref, () => ({
    enter() {
      if (!stateRef.current) return
      gsap.to(stateRef.current, { radius: 0.112, duration: 0.4, ease: 'power2.out' })
    },
    leave() {
      if (!stateRef.current) return
      gsap.to(stateRef.current, { radius: 0.0, duration: 0.35, ease: 'power2.in' })
    },
    setMouse(nx, ny) {
      if (!stateRef.current) return
      stateRef.current.tx = nx
      stateRef.current.ty = 1.0 - ny
    },
    autoReveal(pass) {
      if (!stateRef.current) return
      const s = stateRef.current
      const ltr = pass % 2 === 0
      s.tx = ltr ? 0.12 : 0.88
      s.ty = pass % 2 === 0 ? 0.72 : 0.62
      const tl = gsap.timeline()
      tl.to(s, { radius: 0.112, duration: 0.45, ease: 'power2.out' })
      tl.to(s, { tx: ltr ? 0.88 : 0.12, duration: 1.6, ease: 'power1.inOut' }, 0.3)
      tl.to(s, { radius: 0.0, duration: 0.4, ease: 'power2.in',
        onComplete: () => { s.radius = 0 }
      }, '-=0.35')
    },
  }))

  useEffect(() => {
    const canvas = canvasRef.current
    const parent = containerRef?.current
    if (!canvas || !parent) return

    const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false })
    if (!gl) return

    const W = parent.offsetWidth
    const H = parent.offsetHeight
    canvas.width  = W * Math.min(devicePixelRatio, 2)
    canvas.height = H * Math.min(devicePixelRatio, 2)

    gl.viewport(0, 0, canvas.width, canvas.height)
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
    gl.clearColor(0, 0, 0, 0)

    const prog = createProgram(gl, vert, frag)
    gl.useProgram(prog)

    // Full-screen quad
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'a_pos')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    // Uniforms
    const u = {
      mouse:      gl.getUniformLocation(prog, 'uMouse'),
      radius:     gl.getUniformLocation(prog, 'uRadius'),
      time:       gl.getUniformLocation(prog, 'uTime'),
      aspect:     gl.getUniformLocation(prog, 'uAspect'),
      lensAspect: gl.getUniformLocation(prog, 'uLensAspect'),
      lens:       gl.getUniformLocation(prog, 'uLens'),
    }

    // Texture
    const tex = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, tex)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0,0,0,0]))
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)

    let lensAspect = 1.0
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      lensAspect = img.naturalWidth / img.naturalHeight
      gl.bindTexture(gl.TEXTURE_2D, tex)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img)
    }
    img.src = '/images/lente.png'

    // State
    const state = { tx: 0.5, ty: 0.5, mx: 0.5, my: 0.5, radius: 0 }
    stateRef.current = state

    let raf
    const start = performance.now()
    const tick = () => {
      raf = requestAnimationFrame(tick)
      const t = (performance.now() - start) / 1000

      // Lerp mouse
      state.mx += (state.tx - state.mx) * 0.14
      state.my += (state.ty - state.my) * 0.14

      if (state.radius < 0.001) {
        state.radius = 0
        state.mx = state.tx
        state.my = state.ty
      }

      const ar = canvas.width / canvas.height
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.uniform2f(u.mouse, state.mx, state.my)
      gl.uniform1f(u.radius, state.radius)
      gl.uniform1f(u.time, t)
      gl.uniform1f(u.aspect, ar)
      gl.uniform1f(u.lensAspect, lensAspect)
      gl.uniform1i(u.lens, 0)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }
    tick()

    const ro = new ResizeObserver(() => {
      const w = parent.offsetWidth, h = parent.offsetHeight
      canvas.width  = w * Math.min(devicePixelRatio, 2)
      canvas.height = h * Math.min(devicePixelRatio, 2)
      gl.viewport(0, 0, canvas.width, canvas.height)
    })
    ro.observe(parent)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      gl.deleteProgram(prog)
      gl.deleteTexture(tex)
    }
  }, [containerRef])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 2, pointerEvents: 'none' }}
    />
  )
})

export default LensReveal
