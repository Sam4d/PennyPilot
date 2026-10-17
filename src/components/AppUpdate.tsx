import { useEffect, useRef, useState } from "react";
import { Capacitor } from "@capacitor/core";
import { flushProgress } from "../lib/store";
import type { Language } from "../content/schema";
import { Icon } from "./UI";
export default function AppUpdate({ language }: { language: Language }) {
  const [waiting, setWaiting] = useState<ServiceWorker | null>(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const refreshing = useRef(false);
  const hi = language === "hi";
  useEffect(() => {
    if (Capacitor.isNativePlatform() || !("serviceWorker" in navigator)) return;
    let disposed = false,
      registration: ServiceWorkerRegistration | undefined,
      installing: ServiceWorker | null = null;
    const check = () => {
      if (!disposed && navigator.serviceWorker.controller) {
        const next =
          registration?.waiting ??
          (installing?.state === "installed" ? installing : null);
        if (next) setWaiting(next);
      }
    };
    const found = () => {
      installing?.removeEventListener("statechange", check);
      installing = registration?.installing ?? null;
      installing?.addEventListener("statechange", check);
      check();
    };
    const attach = (reg: ServiceWorkerRegistration) => {
      if (disposed || registration === reg) return;
      registration?.removeEventListener("updatefound", found);
      registration = reg;
      reg.addEventListener("updatefound", found);
      found();
    };
    navigator.serviceWorker
      .getRegistration()
      .then((reg) => {
        if (reg) attach(reg);
      })
      .catch(() => {});
    navigator.serviceWorker.ready.then(attach).catch(() => {});
    const changed = () => {
      if (refreshing.current) window.location.reload();
    };
    navigator.serviceWorker.addEventListener("controllerchange", changed);
    return () => {
      disposed = true;
      registration?.removeEventListener("updatefound", found);
      installing?.removeEventListener("statechange", check);
      navigator.serviceWorker.removeEventListener("controllerchange", changed);
    };
  }, []);
  if (!waiting) return null;
  return (
    <div className="app-update" role="status">
      <Icon name="Download" size={19} />
      <div>
        <strong>
          {hi
            ? "Penny Pilot का नया अपडेट तैयार है।"
            : "A Penny Pilot update is ready."}
        </strong>
        <p>
          {error ||
            (hi
              ? "सेव करके अपडेट करें, ताकि नई सामग्री और भाषा के सुधार मिलें।"
              : "Save and update to get the latest content and language fixes.")}
        </p>
      </div>
      <button
        className="button secondary"
        disabled={saving}
        onClick={async () => {
          setSaving(true);
          setError("");
          try {
            await flushProgress();
            refreshing.current = true;
            waiting.postMessage({ type: "SKIP_WAITING" });
          } catch {
            setSaving(false);
            setError(
              hi
                ? "सेव नहीं हुआ। दोबारा आज़माएं।"
                : "Progress could not be saved. Please retry.",
            );
          }
        }}
      >
        {saving
          ? hi
            ? "अपडेट हो रहा है…"
            : "Updating…"
          : hi
            ? "सेव करके अपडेट करें"
            : "Save and update"}
      </button>
    </div>
  );
}
