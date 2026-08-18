export default function LogoMark({ className = 'h-8 w-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#1A1F3C" />
      <path
        d="M5.5 17.5h4.5l2.2-5.5 4 9 2.6-6.2 1.4 2.7h6.3"
        fill="none"
        stroke="#7EA6F4"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
