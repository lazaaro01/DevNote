"use client";

import { useEffect, useState, useRef, useCallback } from "react";

export default function Lightbox() {
  const [open, setOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState("");
  const [imgAlt, setImgAlt] = useState("");
  const [svgHtml, setSvgHtml] = useState("");
  const imgRef = useRef<HTMLImageElement>(null);
  const svgRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(".prose [data-no-zoom]")) return;

      const img = target.closest(".prose img") as HTMLImageElement | null;
      if (img && img.src) {
        setImgSrc(img.src);
        setImgAlt(img.alt ?? "");
        setSvgHtml("");
        setOpen(true);
        e.stopPropagation();
        return;
      }

      const svg = target.closest(".prose svg");
      if (svg && !svg.closest("[data-no-zoom]")) {
        const clone = svg.cloneNode(true) as SVGSVGElement;
        clone.setAttribute("width", "100%");
        clone.setAttribute("height", "100%");
        clone.style.maxWidth = "90vw";
        clone.style.maxHeight = "90vh";
        setSvgHtml(clone.outerHTML);
        setImgSrc("");
        setOpen(true);
        e.stopPropagation();
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  useEffect(() => {
    if (open && svgHtml && svgRef.current) {
      svgRef.current.innerHTML = svgHtml;
    }
  }, [open, svgHtml]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm cursor-zoom-out animate-lightbox-fade-in"
      onClick={close}
    >
      <button
        onClick={close}
        className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-black/60 text-white/80 hover:text-white hover:bg-black/80 transition-colors text-xl z-10"
        aria-label="Fechar"
      >
        ✕
      </button>
      {imgSrc && (
        <img
          ref={imgRef}
          src={imgSrc}
          alt={imgAlt}
          className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl cursor-default animate-lightbox-zoom-in"
          onClick={(e) => e.stopPropagation()}
        />
      )}
      {svgHtml && (
        <div
          ref={svgRef}
          className="max-w-[90vw] max-h-[90vh] flex items-center justify-center animate-lightbox-zoom-in cursor-default"
          onClick={(e) => e.stopPropagation()}
        />
      )}
    </div>
  );
}
