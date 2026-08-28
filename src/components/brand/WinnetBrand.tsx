import { SVGProps } from "react";

/**
 * High-performance, scalable vector brand components for Winnet Construction Ltd.
 */

export function WinnetHorizontalLogo({
  className = "h-12 w-auto",
  variant = "dark",
  showTagline = true,
  ...props
}: SVGProps<SVGSVGElement> & {
  variant?: "dark" | "light" | "transparent";
  showTagline?: boolean;
}) {
  const isLight = variant === "light";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 980 240"
      className={className}
      fill="none"
      aria-label="Winnet Construction Ltd Logo"
      {...props}
    >
      <defs>
        <linearGradient id="winnetBadgeGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#191919" />
          <stop offset="100%" stopColor="#0a0a0a" />
        </linearGradient>
      </defs>

      {/* Badge container */}
      <rect x="10" y="20" width="200" height="200" rx="38" fill="url(#winnetBadgeGrad)" />

      {/* 3D Geometric W Mark */}
      <g transform="translate(10,20)">
        <path
          d="
            M 44 67
            L 64 67
            L 81 120
            L 94 84
            L 103 84
            L 108 96
            L 112 84
            L 121 84
            L 138 120
            L 155 67
            L 175 67
            L 148 143
            L 132 143
            L 108 100
            L 83 143
            L 66 143
            Z
          "
          fill="#F2B23C"
        />
        <path d="M 148 143 L 132 143 L 108 100 L 112 84 L 121 84 L 138 120 Z" fill="#C6871D" />
        <path d="M 83 143 L 66 143 L 81 120 L 94 84 L 103 84 L 108 100 Z" fill="#C6871D" />
        <path d="M 44 67 L 64 67 L 71 87 L 58 76 Z" fill="#FBCD6E" />
        <path d="M 155 67 L 175 67 L 161 76 L 148 87 Z" fill="#FBCD6E" />
        <rect x="44" y="143" width="131" height="7" rx="1.5" fill="#C6871D" />
        <rect x="44" y="143" width="131" height="2.5" rx="1" fill="#F2B23C" />
      </g>

      {/* Typography */}
      <text
        x="240"
        y="108"
        fontFamily="var(--font-display, Arial, Helvetica, sans-serif)"
        fontWeight="900"
        fontSize="66"
        letterSpacing="0.5"
        fill={isLight ? "#FFFFFF" : "#111111"}
      >
        WINNET
      </text>
      <text
        x="243"
        y="148"
        fontFamily="var(--font-display, Arial, Helvetica, sans-serif)"
        fontWeight="700"
        fontSize="24"
        letterSpacing="5"
        fill="#C6871D"
      >
        CONSTRUCTION LTD
      </text>

      {showTagline && (
        <>
          <rect
            x="243"
            y="162"
            width="500"
            height="2"
            fill={isLight ? "#FFFFFF" : "#111111"}
            opacity={isLight ? 0.2 : 0.12}
          />
          <text
            x="243"
            y="194"
            fontFamily="Georgia, 'Times New Roman', serif"
            fontStyle="italic"
            fontSize="21"
            fill={isLight ? "#C5C5C0" : "#5A5A5A"}
          >
            Building Your Vision. Creating Your Future.
          </text>
        </>
      )}
    </svg>
  );
}

export function WinnetIcon({
  className = "size-10",
  withBackground = true,
  ...props
}: SVGProps<SVGSVGElement> & { withBackground?: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className={className}
      fill="none"
      aria-label="Winnet Logo Icon"
      {...props}
    >
      {withBackground && (
        <>
          <defs>
            <linearGradient id="winnetIconBg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#191919" />
              <stop offset="100%" stopColor="#0a0a0a" />
            </linearGradient>
          </defs>
          <rect width="512" height="512" rx="88" fill="url(#winnetIconBg)" />
        </>
      )}

      <g>
        <path
          d="
            M 112 172
            L 164 172
            L 208 308
            L 242 216
            L 264 216
            L 275 248
            L 286 216
            L 308 216
            L 352 308
            L 396 172
            L 448 172
            L 380 368
            L 338 368
            L 275 258
            L 212 368
            L 170 368
            Z
          "
          fill="#F2B23C"
        />
        <path d="M 380 368 L 338 368 L 275 258 L 286 216 L 308 216 L 352 308 Z" fill="#C6871D" />
        <path d="M 212 368 L 170 368 L 208 308 L 242 216 L 264 216 L 275 258 Z" fill="#C6871D" />
        <path d="M 112 172 L 164 172 L 184 224 L 148 196 Z" fill="#FBCD6E" />
        <path d="M 396 172 L 448 172 L 412 196 L 376 224 Z" fill="#FBCD6E" />
      </g>
      <rect x="112" y="368" width="336" height="18" rx="3" fill="#C6871D" />
      <rect x="112" y="368" width="336" height="6" rx="3" fill="#F2B23C" />
    </svg>
  );
}

export function WinnetQualityBadge({ className = "size-24", ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 320"
      className={className}
      fill="none"
      aria-label="Quality Built Seal by Winnet Construction"
      {...props}
    >
      <circle cx="160" cy="160" r="150" fill="#0d0d0d" />
      <circle cx="160" cy="160" r="150" fill="none" stroke="#F2B23C" strokeWidth="3" />
      <circle
        cx="160"
        cy="160"
        r="128"
        fill="none"
        stroke="#F2B23C"
        strokeWidth="1"
        opacity="0.4"
      />

      <g transform="translate(97,120) scale(0.235)">
        <path
          d="
            M 112 172 L 164 172 L 208 308 L 242 216 L 264 216 L 275 248
            L 286 216 L 308 216 L 352 308 L 396 172 L 448 172
            L 380 368 L 338 368 L 275 258 L 212 368 L 170 368 Z
          "
          fill="#F2B23C"
        />
        <path d="M 380 368 L 338 368 L 275 258 L 286 216 L 308 216 L 352 308 Z" fill="#C6871D" />
        <path d="M 212 368 L 170 368 L 208 308 L 242 216 L 264 216 L 275 258 Z" fill="#C6871D" />
        <rect x="112" y="368" width="336" height="18" rx="3" fill="#C6871D" />
      </g>

      <circle cx="222" cy="222" r="26" fill="#F2B23C" />
      <path
        d="M 210 222 L 219 231 L 236 212"
        fill="none"
        stroke="#0d0d0d"
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path id="topcurveBadge" d="M 45 165 A 115 115 0 0 1 275 165" fill="none" />
      <text
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="17"
        fontWeight="700"
        letterSpacing="3.5"
        fill="#F5F5F0"
      >
        <textPath href="#topcurveBadge" startOffset="50%" textAnchor="middle">
          QUALITY BUILT
        </textPath>
      </text>
    </svg>
  );
}

export function WinnetCraneGraphic({
  className = "w-full h-auto",
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 300 220"
      className={className}
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <g fill="none" stroke="#F2B23C" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
        {/* Mast */}
        <line x1="150" y1="210" x2="150" y2="40" />
        {/* Cross bracing on mast */}
        <line x1="150" y1="210" x2="132" y2="192" />
        <line x1="150" y1="192" x2="132" y2="210" />
        <line x1="150" y1="176" x2="132" y2="158" />
        <line x1="150" y1="158" x2="132" y2="176" />
        {/* Jib (long working arm, right) */}
        <line x1="150" y1="40" x2="270" y2="40" />
        {/* Counter-jib (short arm, left) */}
        <line x1="150" y1="40" x2="95" y2="40" />
        {/* Support cables from mast top to jib ends */}
        <line x1="150" y1="14" x2="270" y2="40" />
        <line x1="150" y1="14" x2="95" y2="40" />
        <line x1="150" y1="40" x2="150" y2="14" />
      </g>
      {/* Counterweight */}
      <rect x="80" y="34" width="22" height="18" rx="2" fill="#F2B23C" />
      {/* Trolley + hook cable */}
      <line
        x1="230"
        y1="40"
        x2="230"
        y2="86"
        stroke="#F2B23C"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="230" cy="40" r="5" fill="#F2B23C" />
      <circle cx="230" cy="92" r="5" fill="#F2B23C" />
    </svg>
  );
}
