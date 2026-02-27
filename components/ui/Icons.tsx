import type { ComponentProps } from "react";

type SvgProps = Omit<ComponentProps<"svg">, "width" | "height"> & {
  size?: number;
  active?: boolean;
};

// ── helpers ──────────────────────────────────────────────────────────────────

function b(size: number) {
  return { width: size, height: size, viewBox: "0 0 24 24", "aria-hidden": true as const, focusable: false } as const;
}
const S = { fill: "none", stroke: "currentColor" as const, strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
function activeFill(active?: boolean) {
  return active ? { fill: "currentColor", stroke: "none" as const, strokeWidth: 0 } : S;
}

// ── Nav / Sidebar ─────────────────────────────────────────────────────────────

export function HomeIcon({ size = 20, active = false, className, ...props }: SvgProps) {
  return (
    <svg {...b(size)} className={className} {...activeFill(active)} {...props}>
      <path d="M4 10.5 12 4l8 6.5V20a1.5 1.5 0 0 1-1.5 1.5H15v-7h-6v7H5.5A1.5 1.5 0 0 1 4 20v-9.5Z" />
    </svg>
  );
}

export function BookOpenIcon({ size = 20, active = false, className, ...props }: SvgProps) {
  return (
    <svg {...b(size)} className={className} {...activeFill(active)} {...props}>
      <path d="M3.5 5.5h6.25A3.75 3.75 0 0 1 13.5 9.25V20.5a3 3 0 0 0-3-3H3.5V5.5Z" />
      <path d="M20.5 5.5h-6.25A3.75 3.75 0 0 0 10.5 9.25V20.5a3 3 0 0 1 3-3h7V5.5Z" />
    </svg>
  );
}

export function ClipboardIcon({ size = 20, active = false, className, ...props }: SvgProps) {
  return (
    <svg {...b(size)} className={className} {...activeFill(active)} {...props}>
      <path d="M9 4.5h6v2H9v-2Z" />
      <path d="M7.5 6.5h-1A2.5 2.5 0 0 0 4 9v11a2.5 2.5 0 0 0 2.5 2.5h11A2.5 2.5 0 0 0 20 20V9a2.5 2.5 0 0 0-2.5-2.5h-1" />
      <path d="M8 12h8M8 16h6" />
    </svg>
  );
}

export function BarChartIcon({ size = 20, active = false, className, ...props }: SvgProps) {
  return (
    <svg {...b(size)} className={className} {...activeFill(active)} {...props}>
      <path d="M6 20V14M12 20V6M18 20V10" />
    </svg>
  );
}

export function BrainIcon({ size = 20, active = false, className, ...props }: SvgProps) {
  return (
    <svg {...b(size)} className={className} {...activeFill(active)} {...props}>
      <path d="M9.5 3a3 3 0 0 1 3 3v14a3 3 0 0 1-5.85 1.05 3 3 0 0 1-2.75-4.02 3.5 3.5 0 0 1-.2-6.65 3 3 0 0 1 1.55-5.06A3 3 0 0 1 9.5 3Z" />
      <path d="M14.5 3a3 3 0 0 0-3 3v14a3 3 0 0 0 5.85 1.05 3 3 0 0 0 2.75-4.02 3.5 3.5 0 0 0 .2-6.65 3 3 0 0 0-1.55-5.06A3 3 0 0 0 14.5 3Z" />
    </svg>
  );
}

export function BookmarkIcon({ size = 20, active = false, className, ...props }: SvgProps) {
  return (
    <svg {...b(size)} className={className} {...activeFill(active)} {...props}>
      <path d="M7 3.5h10A2 2 0 0 1 19 5.5v17l-7-4.5-7 4.5v-17A2 2 0 0 1 7 3.5Z" />
    </svg>
  );
}

export function VocabularyIcon({ size = 20, active = false, className, ...props }: SvgProps) {
  return (
    <svg {...b(size)} className={className} {...activeFill(active)} {...props}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

// ── Chevron / Arrow ───────────────────────────────────────────────────────────

export function ChevronLeftIcon({ size = 18, className, ...props }: SvgProps) {
  return (
    <svg {...b(size)} className={className} {...S} strokeWidth={2.25} {...props}>
      <path d="M14.5 18.5 8.5 12l6-6.5" />
    </svg>
  );
}

export function ChevronRightIcon({ size = 18, className, ...props }: SvgProps) {
  return (
    <svg {...b(size)} className={className} {...S} strokeWidth={2.25} {...props}>
      <path d="M9.5 5.5 15.5 12l-6 6.5" />
    </svg>
  );
}

export function ChevronDownIcon({ size = 16, className, ...props }: SvgProps) {
  return (
    <svg {...b(size)} className={className} {...S} strokeWidth={2.25} {...props}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function ChevronUpIcon({ size = 16, className, ...props }: SvgProps) {
  return (
    <svg {...b(size)} className={className} {...S} strokeWidth={2.25} {...props}>
      <path d="M18 15l-6-6-6 6" />
    </svg>
  );
}

export function ArrowRightIcon({ size = 18, className, ...props }: SvgProps) {
  return (
    <svg {...b(size)} className={className} {...S} strokeWidth={2.25} {...props}>
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

export function ArrowLeftIcon({ size = 18, className, ...props }: SvgProps) {
  return (
    <svg {...b(size)} className={className} {...S} strokeWidth={2.25} {...props}>
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  );
}

// ── Auth / User ───────────────────────────────────────────────────────────────

export function LogOutIcon({ size = 18, className, ...props }: SvgProps) {
  return (
    <svg {...b(size)} className={className} {...S} {...props}>
      <path d="M10 21H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17 21 12l-5-5M21 12H10" />
    </svg>
  );
}

export function UserIcon({ size = 20, className, ...props }: SvgProps) {
  return (
    <svg {...b(size)} className={className} {...S} {...props}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export function LockIcon({ size = 18, className, ...props }: SvgProps) {
  return (
    <svg {...b(size)} className={className} {...S} {...props}>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

export function MailIcon({ size = 18, className, ...props }: SvgProps) {
  return (
    <svg {...b(size)} className={className} {...S} {...props}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

export function EyeIcon({ size = 18, className, ...props }: SvgProps) {
  return (
    <svg {...b(size)} className={className} {...S} {...props}>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function EyeOffIcon({ size = 18, className, ...props }: SvgProps) {
  return (
    <svg {...b(size)} className={className} {...S} {...props}>
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22" />
    </svg>
  );
}

export function SettingsIcon({ size = 20, className, ...props }: SvgProps) {
  return (
    <svg {...b(size)} className={className} {...S} {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
    </svg>
  );
}

// ── Media / Audio ─────────────────────────────────────────────────────────────

export function PlayIcon({ size = 20, className, ...props }: SvgProps) {
  return (
    <svg {...b(size)} className={className} fill="currentColor" {...props}>
      <path d="M6 4.5 20 12 6 19.5V4.5Z" />
    </svg>
  );
}

export function PauseIcon({ size = 20, className, ...props }: SvgProps) {
  return (
    <svg {...b(size)} className={className} fill="currentColor" {...props}>
      <rect x="5" y="4" width="4" height="16" rx="1" />
      <rect x="15" y="4" width="4" height="16" rx="1" />
    </svg>
  );
}

export function Volume2Icon({ size = 20, className, ...props }: SvgProps) {
  return (
    <svg {...b(size)} className={className} {...S} {...props}>
      <path d="M11 5 6 9H2v6h4l5 4V5ZM19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
    </svg>
  );
}

export function VolumeXIcon({ size = 20, className, ...props }: SvgProps) {
  return (
    <svg {...b(size)} className={className} {...S} {...props}>
      <path d="M11 5 6 9H2v6h4l5 4V5ZM23 9l-6 6M17 9l6 6" />
    </svg>
  );
}

export function HeadphonesIcon({ size = 20, className, ...props }: SvgProps) {
  return (
    <svg {...b(size)} className={className} {...S} {...props}>
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
    </svg>
  );
}

export function MicIcon({ size = 18, className, ...props }: SvgProps) {
  return (
    <svg {...b(size)} className={className} {...S} {...props}>
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" />
    </svg>
  );
}

export function LoaderIcon({ size = 18, className, ...props }: SvgProps) {
  return (
    <svg {...b(size)} className={className} {...S} style={{ animation: "spin 800ms linear infinite", display: "inline-block" }} {...props}>
      <path d="M21 12a9 9 0 1 1-6.2-8.56" />
    </svg>
  );
}

// ── Status / Feedback ─────────────────────────────────────────────────────────

export function CheckIcon({ size = 18, className, ...props }: SvgProps) {
  return (
    <svg {...b(size)} className={className} {...S} strokeWidth={2.5} {...props}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function CheckCircleIcon({ size = 20, className, ...props }: SvgProps) {
  return (
    <svg {...b(size)} className={className} {...S} {...props}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

export function XIcon({ size = 18, className, ...props }: SvgProps) {
  return (
    <svg {...b(size)} className={className} {...S} strokeWidth={2.5} {...props}>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

export function XCircleIcon({ size = 20, className, ...props }: SvgProps) {
  return (
    <svg {...b(size)} className={className} {...S} {...props}>
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  );
}

export function AlertTriangleIcon({ size = 18, className, ...props }: SvgProps) {
  return (
    <svg {...b(size)} className={className} {...S} {...props}>
      <path d="m10.29 3.86-8.77 15.2A1 1 0 0 0 2.38 21h19.24a1 1 0 0 0 .86-1.5L13.71 3.86a1 1 0 0 0-1.72 0ZM12 9v4M12 17h.01" />
    </svg>
  );
}

export function InfoIcon({ size = 18, className, ...props }: SvgProps) {
  return (
    <svg {...b(size)} className={className} {...S} {...props}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}

// ── Misc ──────────────────────────────────────────────────────────────────────

export function FlameIcon({ size = 16, className, ...props }: SvgProps) {
  return (
    <svg {...b(size)} className={className} {...S} {...props}>
      <path d="M12 22a7 7 0 0 0 7-7c0-2.5-1.2-4.6-3.2-6.2-1.4-1.1-2.5-2.8-2.8-4.8-2 1.6-3.2 3.7-2.3 5.6.4.9 1 1.7 1 2.9a2.7 2.7 0 0 1-5.4 0c-1 1.2-1.3 2.7-1.3 3.5a7 7 0 0 0 7 7Z" />
    </svg>
  );
}

export function BellIcon({ size = 18, className, ...props }: SvgProps) {
  return (
    <svg {...b(size)} className={className} {...S} {...props}>
      <path d="M18 9a6 6 0 0 0-12 0c0 6-2.5 7.5-2.5 7.5h17S18 15 18 9Z" />
      <path d="M14 21a2 2 0 0 1-4 0" />
    </svg>
  );
}

export function TargetIcon({ size = 16, className, ...props }: SvgProps) {
  return (
    <svg {...b(size)} className={className} {...S} {...props}>
      <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
    </svg>
  );
}

export function SearchIcon({ size = 18, className, ...props }: SvgProps) {
  return (
    <svg {...b(size)} className={className} {...S} {...props}>
      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
    </svg>
  );
}

export function RefreshIcon({ size = 18, className, ...props }: SvgProps) {
  return (
    <svg {...b(size)} className={className} {...S} {...props}>
      <path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5" />
    </svg>
  );
}

export function RotateCcwIcon({ size = 18, className, ...props }: SvgProps) {
  return (
    <svg {...b(size)} className={className} {...S} {...props}>
      <polyline points="1 4 1 10 7 10" />
      <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
    </svg>
  );
}

export function ExternalLinkIcon({ size = 16, className, ...props }: SvgProps) {
  return (
    <svg {...b(size)} className={className} {...S} {...props}>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" />
    </svg>
  );
}

export function MenuIcon({ size = 22, className, ...props }: SvgProps) {
  return (
    <svg {...b(size)} className={className} {...S} {...props}>
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

export function PlusIcon({ size = 18, className, ...props }: SvgProps) {
  return (
    <svg {...b(size)} className={className} {...S} strokeWidth={2.5} {...props}>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

export function CopyIcon({ size = 18, className, ...props }: SvgProps) {
  return (
    <svg {...b(size)} className={className} {...S} {...props}>
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

export function SendIcon({ size = 18, className, ...props }: SvgProps) {
  return (
    <svg {...b(size)} className={className} fill="currentColor" {...props}>
      <path d="M2 21 23 12 2 3v7l15 2-15 2z" />
    </svg>
  );
}

export function ClockIcon({ size = 18, className, ...props }: SvgProps) {
  return (
    <svg {...b(size)} className={className} {...S} {...props}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

export function CalendarIcon({ size = 18, className, ...props }: SvgProps) {
  return (
    <svg {...b(size)} className={className} {...S} {...props}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

export function TrendingUpIcon({ size = 18, className, ...props }: SvgProps) {
  return (
    <svg {...b(size)} className={className} {...S} {...props}>
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}

// ── Content / Sections ────────────────────────────────────────────────────────

export function SparklesIcon({ size = 20, className, ...props }: SvgProps) {
  return (
    <svg {...b(size)} className={className} fill="currentColor" {...props}>
      <path d="M12 2 9.9 8.6 3 9.3l5 4.4-1.5 6.8L12 17l5.5 3.5L16 13.7l5-4.4-6.9-.7Z" />
    </svg>
  );
}

export function ZapIcon({ size = 20, className, ...props }: SvgProps) {
  return (
    <svg {...b(size)} className={className} fill="currentColor" {...props}>
      <path d="M13 2 3 14h9l-1 8 10-12h-9z" />
    </svg>
  );
}

export function TrophyIcon({ size = 20, className, ...props }: SvgProps) {
  return (
    <svg {...b(size)} className={className} {...S} {...props}>
      <path d="M7 3h10v9a5 5 0 0 1-10 0ZM4 3h3M17 3h3M4 3a2 2 0 0 0 0 4h3M20 3a2 2 0 0 1 0 4h-3M12 17v4M8 21h8" />
    </svg>
  );
}

export function AwardIcon({ size = 20, className, ...props }: SvgProps) {
  return (
    <svg {...b(size)} className={className} {...S} {...props}>
      <circle cx="12" cy="8" r="7" />
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
    </svg>
  );
}

export function StarIcon({ size = 18, className, ...props }: SvgProps) {
  return (
    <svg {...b(size)} className={className} fill="currentColor" {...props}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

export function GraduationCapIcon({ size = 20, className, ...props }: SvgProps) {
  return (
    <svg {...b(size)} className={className} {...S} {...props}>
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}

export function BookIcon({ size = 20, className, ...props }: SvgProps) {
  return (
    <svg {...b(size)} className={className} {...S} {...props}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15Z" />
    </svg>
  );
}

export function FileTextIcon({ size = 20, className, ...props }: SvgProps) {
  return (
    <svg {...b(size)} className={className} {...S} {...props}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
    </svg>
  );
}

export function GridIcon({ size = 20, className, ...props }: SvgProps) {
  return (
    <svg {...b(size)} className={className} {...S} {...props}>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

export function ListIcon({ size = 20, className, ...props }: SvgProps) {
  return (
    <svg {...b(size)} className={className} {...S} {...props}>
      <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
    </svg>
  );
}

export function LayersIcon({ size = 20, className, ...props }: SvgProps) {
  return (
    <svg {...b(size)} className={className} {...S} {...props}>
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

export function PencilIcon({ size = 18, className, ...props }: SvgProps) {
  return (
    <svg {...b(size)} className={className} {...S} {...props}>
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z" />
    </svg>
  );
}

export function GlobeIcon({ size = 20, className, ...props }: SvgProps) {
  return (
    <svg {...b(size)} className={className} {...S} {...props}>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

export function MessagesIcon({ size = 20, className, ...props }: SvgProps) {
  return (
    <svg {...b(size)} className={className} {...S} {...props}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

export function LayerStructureIcon({ size = 20, className, ...props }: SvgProps) {
  return (
    <svg {...b(size)} className={className} {...S} {...props}>
      <rect x="2" y="3" width="20" height="4" rx="1" />
      <rect x="2" y="10" width="20" height="4" rx="1" />
      <rect x="2" y="17" width="20" height="4" rx="1" />
    </svg>
  );
}

export function FlagIcon({ size = 18, active = false, className, ...props }: SvgProps) {
  return (
    <svg {...b(size)} className={className} fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" y1="22" x2="4" y2="15" />
    </svg>
  );
}

export function SmileIcon({ size = 20, className, ...props }: SvgProps) {
  return (
    <svg {...b(size)} className={className} {...S} {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M8 13s1.5 2 4 2 4-2 4-2" />
      <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth={3} strokeLinecap="round" />
      <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth={3} strokeLinecap="round" />
    </svg>
  );
}

export function PartyIcon({ size = 20, className, ...props }: SvgProps) {
  return (
    <svg {...b(size)} className={className} {...S} {...props}>
      <path d="M5.8 11.3 2 22l10.7-3.79" />
      <path d="M4 3h.01" />
      <path d="M22 8h.01" />
      <path d="M15 2h.01" />
      <path d="M22 20h.01" />
      <path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12v0c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10" />
      <path d="m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11v0c-.11.7-.72 1.22-1.43 1.22H17" />
      <path d="m11 2 .33.82c.34.86-.2 1.82-1.11 1.98v0C9.52 4.9 9 5.52 9 6.23V7" />
      <path d="M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2z" />
    </svg>
  );
}

