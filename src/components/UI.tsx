import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import * as Icons from "lucide-react";
import type { LucideProps } from "lucide-react";
import type { Language, Text } from "../content/lessons";
const iconSet = {
  FileText: Icons.FileText,
  ListChecks: Icons.ListChecks,
  ArrowDownLeft: Icons.ArrowDownLeft,
  Coins: Icons.Coins,
  Scissors: Icons.Scissors,
  MousePointer2: Icons.MousePointer2,
  ArrowLeft: Icons.ArrowLeft,
  ArrowRight: Icons.ArrowRight,
  ArrowUpRight: Icons.ArrowUpRight,
  ArrowLeftRight: Icons.ArrowLeftRight,
  Award: Icons.Award,
  BadgeCheck: Icons.BadgeCheck,
  BookOpen: Icons.BookOpen,
  Bookmark: Icons.Bookmark,
  BookmarkCheck: Icons.BookmarkCheck,
  BriefcaseBusiness: Icons.BriefcaseBusiness,
  Calculator: Icons.Calculator,
  CalendarDays: Icons.CalendarDays,
  ChartCandlestick: Icons.ChartCandlestick,
  ChartNoAxesCombined: Icons.ChartNoAxesCombined,
  ChartPie: Icons.ChartPie,
  Check: Icons.Check,
  ChevronDown: Icons.ChevronDown,
  ChevronRight: Icons.ChevronRight,
  ChevronUp: Icons.ChevronUp,
  Circle: Icons.Circle,
  CircleCheck: Icons.CircleCheck,
  Clock3: Icons.Clock3,
  Coffee: Icons.Coffee,
  Download: Icons.Download,
  ExternalLink: Icons.ExternalLink,
  Fingerprint: Icons.Fingerprint,
  Flag: Icons.Flag,
  Flame: Icons.Flame,
  FlaskConical: Icons.FlaskConical,
  Footprints: Icons.Footprints,
  Gem: Icons.Gem,
  Globe: Icons.Globe,
  GraduationCap: Icons.GraduationCap,
  Grid2X2: Icons.Grid2X2,
  HardDrive: Icons.HardDrive,
  Heart: Icons.Heart,
  House: Icons.House,
  Info: Icons.Info,
  Landmark: Icons.Landmark,
  Languages: Icons.Languages,
  Layers: Icons.Layers,
  Lightbulb: Icons.Lightbulb,
  LockKeyhole: Icons.LockKeyhole,
  MessageCircle: Icons.MessageCircle,
  Moon: Icons.Moon,
  NotebookPen: Icons.NotebookPen,
  Play: Icons.Play,
  Plus: Icons.Plus,
  Printer: Icons.Printer,
  RotateCcw: Icons.RotateCcw,
  Route: Icons.Route,
  ScanSearch: Icons.ScanSearch,
  Search: Icons.Search,
  Scale: Icons.Scale,
  Settings: Icons.Settings,
  ShieldAlert: Icons.ShieldAlert,
  ShieldCheck: Icons.ShieldCheck,
  SlidersHorizontal: Icons.SlidersHorizontal,
  Sparkles: Icons.Sparkles,
  Sprout: Icons.Sprout,
  Sun: Icons.Sun,
  Target: Icons.Target,
  TrendingDown: Icons.TrendingDown,
  Trophy: Icons.Trophy,
  Upload: Icons.Upload,
  UserRound: Icons.UserRound,
  Volume2: Icons.Volume2,
  Umbrella: Icons.Umbrella,
  Wallet: Icons.Wallet,
  WifiOff: Icons.WifiOff,
  X: Icons.X,
  Zap: Icons.Zap,
};
export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const C =
    (iconSet as Record<string, React.ComponentType<LucideProps>>)[name] ||
    Icons.Circle;
  return <C size={20} strokeWidth={1.8} {...props} />;
}
export function Local({ text, lang }: { text: Text; lang: Language }) {
  return (
    <>
      {text[lang === "both" ? "en" : lang]}
      {lang === "both" && (
        <span className="translation" lang="hi">
          {text.hi}
        </span>
      )}
    </>
  );
}
export function Modal({
  children,
  onClose,
  label,
  wide = false,
  topAligned = false,
}: {
  children: ReactNode;
  onClose: () => void;
  label: string;
  wide?: boolean;
  topAligned?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    const previous = document.activeElement as HTMLElement;
    ref.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeRef.current();
      if (e.key === "Tab") {
        const els = Array.from(
          ref.current?.querySelectorAll<HTMLElement>(
            "button,a[href],input,select,textarea,summary,[tabindex]",
          ) ?? [],
        ).filter(
          (el) =>
            el.tabIndex >= 0 &&
            !el.matches(":disabled") &&
            !el.closest("[inert]") &&
            (!el.closest("details:not([open])") ||
              el
                .closest("details:not([open])")
                ?.querySelector(":scope > summary") === el) &&
            el.getClientRects().length > 0 &&
            getComputedStyle(el).visibility !== "hidden",
        );
        if (!els?.length) return;
        const first = els[0],
          last = els[els.length - 1];
        if (
          e.shiftKey &&
          (document.activeElement === first ||
            document.activeElement === ref.current)
        ) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handler);
      previous?.focus();
    };
  }, []);
  return (
    <div
      className={`modal-backdrop${topAligned ? " modal-top-aligned" : ""}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`modal ${wide ? "wide" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        ref={ref}
      >
        <button
          className="icon-button modal-close"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <Icons.X />
        </button>
        {children}
      </div>
    </div>
  );
}
export function Empty({
  icon,
  title,
  description,
  children,
}: {
  icon: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <div className="empty-state">
      <span className="empty-icon">
        <Icon name={icon} size={30} />
      </span>
      <h2>{title}</h2>
      <p>{description}</p>
      {children}
    </div>
  );
}
