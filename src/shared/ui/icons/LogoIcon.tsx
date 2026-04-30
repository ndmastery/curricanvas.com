interface LogoIconProps {
  size?: number;
  class?: string;
}

export const LogoIcon = ({ size = 24, class: className }: LogoIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class={className}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="ccLogoGrad" x1="8" y1="4" x2="56" y2="60" gradientUnits="userSpaceOnUse">
        <stop stop-color="#B85C38" />
        <stop offset="1" stop-color="#C9A96E" />
      </linearGradient>
    </defs>
    <path
      d="M18 4h20l14 14v38a4 4 0 0 1-4 4H18a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4z"
      stroke="url(#ccLogoGrad)"
      stroke-width="3.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      fill="none"
    />
    <path
      d="M38 4v10a4 4 0 0 0 4 4h10"
      stroke="url(#ccLogoGrad)"
      stroke-width="3.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      fill="none"
    />
    <path
      d="M26 50c2-6 6-14 12-20s10-8 14-8c-2 4-6 8-12 14s-14 12-20 16c2-1 4-2 6-2z"
      fill="url(#ccLogoGrad)"
      opacity="0.9"
    />
    <path
      d="M26 50l-4 6 6-4"
      fill="url(#ccLogoGrad)"
      opacity="0.85"
    />
    <path
      d="M40 24c-4 4-8 10-11 17"
      stroke="url(#ccLogoGrad)"
      stroke-width="2"
      stroke-linecap="round"
      opacity="0.5"
    />
  </svg>
);
