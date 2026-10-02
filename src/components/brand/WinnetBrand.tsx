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
      <rect x="10" y="20" width="200" height="200" rx="42" fill="#121212" />

      {/* Clean Architectural W Mark */}
      <g transform="translate(10,20) scale(0.390625)">
        <polygon
          points="76,128 132,128 204,324 238,204 274,204 308,324 380,128 436,128 354,384 298,384 256,268 214,384 158,384"
          fill="#F2B23C"
        />
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
      {withBackground && <rect width="512" height="512" rx="108" fill="#121212" />}

      <polygon
        points="76,128 132,128 204,324 238,204 274,204 308,324 380,128 436,128 354,384 298,384 256,268 214,384 158,384"
        fill="#F2B23C"
      />
    </svg>
  );
}
