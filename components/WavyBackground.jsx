'use client'

export default function WavyBackground({ className = '' }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Blob grande izquierda — animado */}
        <g style={{ animation: 'blobMove 14s ease-in-out infinite', transformOrigin: '300px 450px' }}>
          <ellipse cx="260" cy="430" rx="310" ry="220" fill="none" stroke="#bbb" strokeWidth="0.8" opacity="0.35"/>
          <ellipse cx="260" cy="430" rx="240" ry="165" fill="none" stroke="#bbb" strokeWidth="0.7" opacity="0.28"/>
          <ellipse cx="260" cy="430" rx="170" ry="110" fill="none" stroke="#bbb" strokeWidth="0.6" opacity="0.2"/>
        </g>

        {/* Blob derecha — animado con delay */}
        <g style={{ animation: 'blobMove 18s ease-in-out infinite reverse', transformOrigin: '1150px 500px' }}>
          <ellipse cx="1150" cy="480" rx="270" ry="180" fill="none" stroke="#bbb" strokeWidth="0.8" opacity="0.3"/>
          <ellipse cx="1150" cy="480" rx="200" ry="130" fill="none" stroke="#bbb" strokeWidth="0.6" opacity="0.22"/>
        </g>

        {/* Líneas horizontales onduladas — animadas */}
        <path
          d="M-100,180 C200,160 400,220 700,190 C1000,160 1200,210 1540,180"
          fill="none" stroke="#aaa" strokeWidth="0.9" opacity="0.4"
          style={{ animation: 'wave1 9s ease-in-out infinite' }}
        />
        <path
          d="M-100,240 C180,220 380,280 710,248 C1040,216 1230,262 1540,240"
          fill="none" stroke="#aaa" strokeWidth="0.8" opacity="0.35"
          style={{ animation: 'wave1 11s ease-in-out infinite reverse' }}
        />
        <path
          d="M-100,300 C180,278 380,338 710,305 C1040,272 1230,318 1540,295"
          fill="none" stroke="#aaa" strokeWidth="0.8" opacity="0.3"
          style={{ animation: 'wave2 13s ease-in-out infinite' }}
        />
        <path
          d="M-100,360 C200,338 400,395 740,362 C1080,330 1270,374 1540,355"
          fill="none" stroke="#aaa" strokeWidth="0.7" opacity="0.28"
          style={{ animation: 'wave2 10s ease-in-out infinite reverse' }}
        />
        <path
          d="M-100,420 C200,398 400,452 740,422 C1080,392 1270,432 1540,415"
          fill="none" stroke="#aaa" strokeWidth="0.7" opacity="0.25"
          style={{ animation: 'wave3 12s ease-in-out infinite' }}
        />
        <path
          d="M-100,480 C220,458 440,510 785,482 C1130,454 1310,492 1540,475"
          fill="none" stroke="#aaa" strokeWidth="0.6" opacity="0.22"
          style={{ animation: 'wave3 16s ease-in-out infinite reverse' }}
        />
        <path
          d="M-100,540 C220,518 440,570 785,542 C1130,514 1310,552 1540,535"
          fill="none" stroke="#aaa" strokeWidth="0.6" opacity="0.2"
          style={{ animation: 'wave4 14s ease-in-out infinite' }}
        />
        <path
          d="M-100,600 C240,578 460,628 815,602 C1170,576 1340,612 1540,595"
          fill="none" stroke="#aaa" strokeWidth="0.5" opacity="0.18"
          style={{ animation: 'wave4 11s ease-in-out infinite reverse' }}
        />
        <path
          d="M-100,660 C240,638 460,688 815,662 C1170,636 1340,672 1540,655"
          fill="none" stroke="#aaa" strokeWidth="0.5" opacity="0.15"
          style={{ animation: 'wave1 15s ease-in-out infinite' }}
        />
      </svg>
    </div>
  )
}
