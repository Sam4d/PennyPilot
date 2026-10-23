import { Copy, useUICopy } from "../lib/ui-copy";
import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { Icon } from "./UI";
/** Keep the selected story stable when a phone rotates, text scales or fonts load. */
export default function ConceptScroller({
  items,
  onChange,
}: {
  items: ReactNode[];
  onChange: (index: number) => void;
}) {
  const ui = useUICopy();

  const viewport = useRef<HTMLDivElement>(null);
  const controls = useRef<HTMLDivElement>(null);
  const selected = useRef(0);
  const pending = useRef<number | null>(null);
  const measuredWidth = useRef(0);
  const [card, setCard] = useState(0);
  const fitHeight = () => {
    const el = viewport.current;
    const slide = el?.children[selected.current] as HTMLElement | undefined;
    if (el && slide)
      el.style.height = `${slide.offsetHeight + 2 * el.clientTop}px`;
  };
  const select = (index: number) => {
    selected.current = index;
    setCard(index);
    onChange(index);
    const strip = controls.current;
    const button = strip?.children[index] as HTMLElement | undefined;
    if (strip && button && items.length > 4) {
      // Scroll only the local control strip; never jump the lesson dialog.
      strip.scrollTo({
        left: Math.max(
          0,
          button.offsetLeft - strip.clientWidth / 2 + button.clientWidth / 2,
        ),
        behavior: "instant",
      });
    }
    fitHeight();
  };
  const move = (index: number) => {
    const el = viewport.current;
    if (!el) return;
    const next = Math.max(0, Math.min(items.length - 1, index));
    pending.current = next;
    select(next);
    el.scrollTo({
      left: next * el.clientWidth,
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  };
  useLayoutEffect(() => {
    const el = viewport.current;
    if (!el) return;
    const resize = () => {
      const width = el.clientWidth;
      if (width !== measuredWidth.current) {
        measuredWidth.current = width;
        pending.current = selected.current;
        el.scrollTo({ left: selected.current * width, behavior: "instant" });
      }
      fitHeight();
    };
    const observer = new ResizeObserver(resize);
    for (const slide of el.children) observer.observe(slide);
    resize();
    return () => observer.disconnect();
  }, []);
  const settle = () => {
    const el = viewport.current;
    if (!el || el.clientWidth !== measuredWidth.current) return;
    const actual = Math.max(
      0,
      Math.min(items.length - 1, Math.round(el.scrollLeft / el.clientWidth)),
    );
    if (pending.current !== null) {
      if (Math.abs(el.scrollLeft - pending.current * el.clientWidth) > 2)
        return;
      pending.current = null;
    }
    if (actual !== selected.current) select(actual);
  };
  return (
    <div
      className="concept-scroller"
      onKeyDown={(e) => {
        if (
          e.target instanceof HTMLElement &&
          e.target.closest("input,textarea,select")
        )
          return;
        if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
          e.preventDefault();
          move(selected.current + (e.key === "ArrowRight" ? 1 : -1));
        }
      }}
    >
      <div className="carousel-controls">
        <button
          className="icon-button"
          aria-label={ui("Previous concept")}
          disabled={card === 0}
          onClick={() => move(selected.current - 1)}
        >
          <Icon name="ArrowLeft" size={18} />
        </button>
        <div
          ref={controls}
          className={items.length > 4 ? "extended-concepts" : undefined}
        >
          {items.map((_, i) => (
            <button
              key={i}
              aria-label={ui(`Concept ${i + 1}`)}
              aria-current={card === i ? "step" : undefined}
              className={card === i ? "active" : ""}
              onClick={() => move(i)}
            />
          ))}
        </div>
        <button
          className="icon-button"
          aria-label={ui("Next concept")}
          disabled={card === items.length - 1}
          onClick={() => move(selected.current + 1)}
        >
          <Icon name="ArrowRight" size={18} />
        </button>
      </div>
      <div
        className="concept-carousel"
        ref={viewport}
        onScroll={settle}
        onPointerDown={() => {
          pending.current = null;
        }}
        onWheel={() => {
          pending.current = null;
        }}
      >
        {items.map((content, i) => (
          <article
            className="concept-card"
            key={i}
            inert={card !== i}
            aria-hidden={card !== i}
          >
            <Copy>{content}</Copy>
          </article>
        ))}
      </div>
    </div>
  );
}
