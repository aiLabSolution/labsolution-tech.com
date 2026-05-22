const ILLUSTRATION_VIEWBOX = { viewBox: '0 0 400 240', xmlns: 'http://www.w3.org/2000/svg' }

function Defs() {
  return (
    <defs>
      <linearGradient id="pi-bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#F8FAFC" />
        <stop offset="100%" stopColor="#E6F0F7" />
      </linearGradient>
      <linearGradient id="pi-chassis" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#E2E8F0" />
      </linearGradient>
      <linearGradient id="pi-chassis-dark" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1E293B" />
        <stop offset="100%" stopColor="#0F172A" />
      </linearGradient>
      <linearGradient id="pi-screen" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#0369A1" />
        <stop offset="100%" stopColor="#0F172A" />
      </linearGradient>
      <pattern id="pi-grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(15,23,42,0.05)" strokeWidth="1" />
      </pattern>
      <pattern id="pi-dots" width="12" height="12" patternUnits="userSpaceOnUse">
        <circle cx="1" cy="1" r="0.8" fill="rgba(3,105,161,0.2)" />
      </pattern>
    </defs>
  )
}

function Frame({ children, ariaLabel }) {
  return (
    <svg {...ILLUSTRATION_VIEWBOX} role="img" aria-label={ariaLabel} preserveAspectRatio="xMidYMid meet" className="block w-full h-full">
      <Defs />
      <rect width="400" height="240" fill="url(#pi-bg)" />
      <rect width="400" height="240" fill="url(#pi-grid)" />
      {children}
      <ellipse cx="200" cy="220" rx="140" ry="8" fill="rgba(15,23,42,0.12)" />
    </svg>
  )
}

function ChemistryIllustration({ model }) {
  return (
    <Frame ariaLabel={`${model} chemistry analyzer illustration`}>
      <rect x="60" y="70" width="280" height="130" rx="10" fill="url(#pi-chassis)" stroke="#CBD5E1" strokeWidth="1.5" />
      <rect x="78" y="88" width="140" height="80" rx="4" fill="url(#pi-screen)" />
      <rect x="78" y="88" width="140" height="80" rx="4" fill="url(#pi-dots)" />
      <path d="M 88 158 Q 110 130 130 122 Q 150 114 170 112 Q 190 110 208 108" fill="none" stroke="#E6F0F7" strokeWidth="2.5" />
      {[0, 1, 2, 3].map((i) => (
        <line key={i} x1={88 + i * 30} y1="168" x2={88 + i * 30} y2="158" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
      ))}
      <g transform="translate(238,90)">
        <rect x="0" y="0" width="90" height="78" rx="4" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1" />
        <circle cx="45" cy="39" r="30" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
        <circle cx="45" cy="39" r="6" fill="#0369A1" />
        {Array.from({ length: 8 }).map((_, t) => {
          const n = (t * Math.PI * 2) / 8
          const r = 45 + Math.cos(n) * 18
          const i = 39 + Math.sin(n) * 18
          const colors = ['#0369A1', '#B85C4A', '#0F172A', '#94A3B8']
          return <rect key={t} x={r - 3} y={i - 5} width="6" height="10" rx="1" fill={colors[t % colors.length]} opacity="0.75" />
        })}
      </g>
      <rect x="78" y="176" width="60" height="16" rx="2" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
      <line x1="86" y1="184" x2="130" y2="184" stroke="#94A3B8" strokeWidth="0.5" strokeDasharray="2 2" />
      <circle cx="160" cy="184" r="7" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="1" />
      <circle cx="160" cy="184" r="2" fill="#0F172A" />
      <text x="72" y="82" fontFamily="Inter, sans-serif" fontSize="8" fontWeight="700" fill="#0369A1" letterSpacing="1.5">
        {model.toUpperCase()}
      </text>
    </Frame>
  )
}

function ImmunologyIllustration({ model }) {
  return (
    <Frame ariaLabel={`${model} immunoassay analyzer illustration`}>
      <rect x="50" y="92" width="300" height="108" rx="8" fill="url(#pi-chassis)" stroke="#CBD5E1" strokeWidth="1.5" />
      <rect x="72" y="108" width="196" height="76" rx="4" fill="#0F172A" />
      <g transform="translate(80,114)">
        <rect x="0" y="0" width="180" height="64" rx="3" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="0.5" />
        {Array.from({ length: 8 }).map((_, t) =>
          Array.from({ length: 12 }).map((_, n) => {
            const palette = ['#B85C4A', '#0369A1', '#E6F0F7', '#0F172A']
            const seed = (t * 7 + n * 3) % 17
            const color = palette[seed % palette.length]
            const opacity = 0.3 + ((seed * 13) % 65) / 100
            return (
              <circle
                key={`${t}-${n}`}
                cx={8 + n * 14}
                cy={5 + t * 7.5}
                r="2.6"
                fill={color}
                opacity={opacity}
                stroke="rgba(15,23,42,0.15)"
                strokeWidth="0.3"
              />
            )
          }),
        )}
      </g>
      <rect x="284" y="108" width="52" height="42" rx="3" fill="url(#pi-screen)" />
      <text x="289" y="124" fontFamily="monospace" fontSize="7" fontWeight="700" fill="#E6F0F7" letterSpacing="0.5">
        OD
      </text>
      <text x="289" y="142" fontFamily="monospace" fontSize="11" fontWeight="700" fill="#B85C4A">
        1.84
      </text>
      <g transform="translate(282,158)">
        <rect x="0" y="0" width="56" height="20" rx="3" fill="#F8FAFC" stroke="#CBD5E1" />
        <circle cx="10" cy="10" r="3" fill="#0369A1" />
        <circle cx="22" cy="10" r="3" fill="#B85C4A" />
        <rect x="30" y="7" width="20" height="6" rx="3" fill="#94A3B8" opacity="0.5" />
      </g>
      <text x="58" y="105" fontFamily="Inter, sans-serif" fontSize="7" fontWeight="600" fill="#475569" letterSpacing="1.5">
        450 / 630 nm
      </text>
      <text x="54" y="198" fontFamily="Inter, sans-serif" fontSize="8" fontWeight="700" fill="#0369A1" letterSpacing="1.5">
        {model.toUpperCase()}
      </text>
    </Frame>
  )
}

function RapidTestIllustration({ model }) {
  return (
    <Frame ariaLabel={`${model} rapid test cassette illustration`}>
      <g transform="translate(64,52)">
        <rect x="0" y="0" width="272" height="136" rx="14" fill="url(#pi-chassis)" stroke="#CBD5E1" strokeWidth="1.5" />
        <rect x="0" y="0" width="272" height="136" rx="14" fill="url(#pi-dots)" opacity="0.4" />

        <circle cx="32" cy="68" r="14" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
        <circle cx="32" cy="68" r="6" fill="#B85C4A" opacity="0.85" />
        <text x="14" y="98" fontFamily="Inter, sans-serif" fontSize="6.5" fontWeight="700" fill="#475569" letterSpacing="1.2">
          S
        </text>

        <rect x="56" y="44" width="196" height="48" rx="6" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1" />

        <rect x="56" y="44" width="20" height="48" fill="#E6F0F7" opacity="0.7" />
        <rect x="232" y="44" width="20" height="48" rx="0" fill="#E6F0F7" opacity="0.7" />

        <line x1="118" y1="48" x2="118" y2="88" stroke="#B85C4A" strokeWidth="2.5" opacity="0.92" />
        <line x1="162" y1="48" x2="162" y2="88" stroke="#B85C4A" strokeWidth="2.5" opacity="0.6" />
        <line x1="206" y1="48" x2="206" y2="88" stroke="#0369A1" strokeWidth="2.5" />

        <text x="111" y="106" fontFamily="Inter, sans-serif" fontSize="6.5" fontWeight="700" fill="#475569" letterSpacing="1">
          T1
        </text>
        <text x="155" y="106" fontFamily="Inter, sans-serif" fontSize="6.5" fontWeight="700" fill="#475569" letterSpacing="1">
          T2
        </text>
        <text x="200" y="106" fontFamily="Inter, sans-serif" fontSize="6.5" fontWeight="700" fill="#0369A1" letterSpacing="1">
          C
        </text>

        <rect x="56" y="112" width="196" height="14" rx="3" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
        <rect x="56" y="112" width="118" height="14" rx="3" fill="#0369A1" opacity="0.18" />
        <circle cx="64" cy="119" r="2" fill="#0369A1" />
        <text x="72" y="122" fontFamily="Inter, sans-serif" fontSize="6" fontWeight="700" fill="#475569" letterSpacing="1.2">
          15 MIN · CE
        </text>
      </g>
      <text x="64" y="44" fontFamily="Inter, sans-serif" fontSize="8" fontWeight="700" fill="#0369A1" letterSpacing="1.5">
        {model.toUpperCase()}
      </text>
    </Frame>
  )
}

function PocIllustration({ model }) {
  return (
    <Frame ariaLabel={`${model} handheld point-of-care meter illustration`}>
      <g transform="translate(186,18)">
        <rect x="0" y="0" width="22" height="44" rx="2" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.2" />
        <rect x="3" y="6" width="16" height="3" rx="1" fill="#B85C4A" opacity="0.88" />
        <rect x="3" y="12" width="16" height="2" rx="1" fill="#94A3B8" opacity="0.55" />
        <rect x="3" y="17" width="16" height="2" rx="1" fill="#94A3B8" opacity="0.4" />
        <circle cx="11" cy="2.5" r="2.5" fill="#B85C4A" />
      </g>

      <rect x="150" y="50" width="100" height="150" rx="14" fill="url(#pi-chassis-dark)" stroke="#0F172A" strokeWidth="1.5" />
      <rect x="154" y="54" width="92" height="142" rx="12" fill="url(#pi-chassis)" stroke="#CBD5E1" strokeWidth="0.8" />

      <text x="200" y="70" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="7" fontWeight="700" fill="#0369A1" letterSpacing="1.4">
        {model.toUpperCase()}
      </text>

      <rect x="164" y="78" width="72" height="58" rx="4" fill="url(#pi-screen)" />
      <rect x="164" y="78" width="72" height="58" rx="4" fill="url(#pi-dots)" opacity="0.25" />

      <text x="200" y="108" textAnchor="middle" fontFamily="monospace" fontSize="22" fontWeight="700" fill="#E6F0F7">
        5.4
      </text>
      <text x="200" y="124" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="6.5" fontWeight="600" fill="#94A3B8" letterSpacing="1.2">
        mmol/L
      </text>
      <text x="170" y="89" fontFamily="monospace" fontSize="5.5" fontWeight="700" fill="#B85C4A" letterSpacing="0.5">
        ● mem
      </text>

      <circle cx="200" cy="158" r="14" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1.5" />
      <circle cx="200" cy="158" r="9" fill="url(#pi-chassis)" stroke="#CBD5E1" strokeWidth="1" />
      <circle cx="200" cy="158" r="2.5" fill="#0369A1" />

      <text x="200" y="188" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="6" fontWeight="700" fill="#475569" letterSpacing="1.4">
        5 SEC · 0.75 µL
      </text>
    </Frame>
  )
}

const ILLUSTRATIONS = {
  chemistry: ChemistryIllustration,
  immunology: ImmunologyIllustration,
  rapid: RapidTestIllustration,
  poc: PocIllustration,
}

export default function ProductIllustration({ category, model }) {
  const Component = ILLUSTRATIONS[category] ?? ChemistryIllustration
  return <Component model={model} />
}
