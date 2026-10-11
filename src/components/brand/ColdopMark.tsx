type ColdopMarkProps = {
  className?: string
}

export function ColdopMark({ className }: ColdopMarkProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      width="64"
      height="64"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M20 4h24a16 16 0 0 1 16 16v24a16 16 0 0 1-16 16H20A16 16 0 0 1 4 44V20A16 16 0 0 1 20 4zm6 12h4v32h-4zm4 16h12v4h-12z"
      />
    </svg>
  )
}
