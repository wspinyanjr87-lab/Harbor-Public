"use client";

import { useEffect, useState } from "react";

type BannerVisual = "table" | "notebook" | "books" | "plant" | "groceries";

type HomeBanner = {
  eyebrow: string;
  title: string;
  subtitle: string;
  imagePath?: string;
  hasEmbeddedText?: boolean;
  visual: BannerVisual;
  theme: {
    background: string;
    accent: string;
    glow: string;
  };
};

const banners: HomeBanner[] = [
  {
    eyebrow: "Our Harbor",
    title: "Harbor Family HQ",
    subtitle: "Our people. Our purpose. Our home.",
    imagePath: "/banners/harbor-home-banner.png",
    hasEmbeddedText: true,
    visual: "table",
    theme: {
      background: "from-[#07101f] via-[#0b1424] to-[#121d2f]",
      accent: "#D9B37A",
      glow: "bg-[#d9a35f]",
    },
  },
  {
    eyebrow: "Simple start",
    title: "Let's make today count.",
    subtitle: "Keep the day visible without making the house feel busy.",
    visual: "notebook",
    theme: {
      background: "from-[#fff8ef] via-[#f3ead8] to-[#dfe8d4]",
      accent: "#58745D",
      glow: "bg-[#bdd5ac]",
    },
  },
  {
    eyebrow: "Fresh page",
    title: "New day. New possibilities.",
    subtitle: "Plan enough to feel steady, with room for life to happen.",
    visual: "books",
    theme: {
      background: "from-[#fdf2f2] via-[#f8dfd7] to-[#efe4c7]",
      accent: "#D6A84F",
      glow: "bg-[#f0c66e]",
    },
  },
  {
    eyebrow: "Home base",
    title: "Home is where your story begins.",
    subtitle: "A gentle place for routines, notes, meals, and next steps.",
    visual: "plant",
    theme: {
      background: "from-[#f4f0dd] via-[#e5ead8] to-[#d5e3d1]",
      accent: "#58745D",
      glow: "bg-[#9fc39b]",
    },
  },
  {
    eyebrow: "Weekly flow",
    title: "Good days start at home.",
    subtitle: "Turn meals and errands into a softer plan for the week.",
    visual: "groceries",
    theme: {
      background: "from-[#fff1dd] via-[#f7ddbd] to-[#eac7b8]",
      accent: "#C96B76",
      glow: "bg-[#efa184]",
    },
  },
];

function DecorativeArt({ visual, accent, glow }: { visual: BannerVisual; accent: string; glow: string }) {
  return (
    <div className="relative hidden h-full min-w-[150px] items-center justify-center overflow-hidden rounded-[1.25rem] bg-white/30 sm:flex md:min-w-[200px]">
      <div className={`absolute h-24 w-24 rounded-full ${glow} opacity-45 blur-2xl`} />
      <div className="absolute bottom-4 h-2.5 w-32 rounded-full bg-family-ink/10" />

      {visual === "table" ? (
        <div className="relative h-20 w-32">
          <div className="absolute bottom-7 left-2 h-6 w-28 rounded-xl bg-white/80 shadow-sm" />
          <div className="absolute bottom-3 left-6 h-7 w-2.5 rounded-full bg-family-ink/20" />
          <div className="absolute bottom-3 right-6 h-7 w-2.5 rounded-full bg-family-ink/20" />
          <div className="absolute left-11 top-3 h-9 w-9 rounded-full border-[8px] border-white/85" />
          <div className="absolute right-6 top-2 h-10 w-6 rounded-b-xl rounded-t-sm bg-white/85" />
          <div className="absolute right-8 top-0 h-2.5 w-2.5 rounded-full" style={{ backgroundColor: accent }} />
        </div>
      ) : null}

      {visual === "notebook" ? (
        <div className="relative h-24 w-28 rotate-[-5deg] rounded-2xl bg-white/85 p-4 shadow-sm">
          <div className="mb-2.5 h-2.5 w-14 rounded-full" style={{ backgroundColor: accent }} />
          <div className="mb-2 h-1.5 w-20 rounded-full bg-family-ink/15" />
          <div className="mb-2 h-1.5 w-16 rounded-full bg-family-ink/15" />
          <div className="h-1.5 w-20 rounded-full bg-family-ink/15" />
          <div className="absolute -right-5 bottom-5 h-2.5 w-16 rotate-[-32deg] rounded-full bg-family-honey" />
        </div>
      ) : null}

      {visual === "books" ? (
        <div className="relative flex h-24 items-end gap-2">
          <div className="h-16 w-8 rounded-lg bg-white/85 shadow-sm" />
          <div className="h-24 w-8 rounded-lg shadow-sm" style={{ backgroundColor: accent }} />
          <div className="h-14 w-8 rounded-lg bg-family-leaf/70 shadow-sm" />
          <div className="absolute -right-8 bottom-0 h-10 w-10 rounded-full border-[8px] border-white/80" />
        </div>
      ) : null}

      {visual === "plant" ? (
        <div className="relative h-24 w-28">
          <div className="absolute bottom-0 left-9 h-12 w-14 rounded-b-2xl rounded-t-md bg-white/85 shadow-sm" />
          <div className="absolute bottom-10 left-14 h-14 w-2 rounded-full bg-family-leaf/70" />
          <div className="absolute left-6 top-2 h-10 w-16 rounded-[999px_999px_999px_0] bg-family-leaf/70" />
          <div className="absolute right-2 top-0 h-10 w-14 rounded-[999px_999px_0_999px]" style={{ backgroundColor: accent }} />
          <div className="absolute left-12 top-5 h-8 w-14 rounded-[999px_999px_0_999px] bg-white/60" />
        </div>
      ) : null}

      {visual === "groceries" ? (
        <div className="relative h-24 w-32">
          <div className="absolute bottom-0 left-6 h-16 w-20 rounded-b-2xl rounded-t-lg bg-white/85 shadow-sm" />
          <div className="absolute bottom-14 left-12 h-7 w-10 rounded-t-full border-4 border-white/85 border-b-0" />
          <div className="absolute bottom-8 left-2 h-9 w-9 rounded-full" style={{ backgroundColor: accent }} />
          <div className="absolute bottom-7 right-4 h-10 w-6 rounded-full bg-family-leaf/70" />
          <div className="absolute bottom-11 right-5 h-3.5 w-7 rounded-full bg-family-leaf/50" />
        </div>
      ) : null}
    </div>
  );
}

export default function HomeBannerRotator() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeBanner = banners[activeIndex];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % banners.length);
    }, 6000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section
      className={`relative overflow-hidden rounded-[1.5rem] bg-gradient-to-br ${activeBanner.theme.background} px-5 py-4 shadow-sm md:min-h-[128px] md:px-6 md:py-4`}
    >
      {activeBanner.imagePath ? (
        <>
          <img
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
            src={activeBanner.imagePath}
          />
          {activeBanner.hasEmbeddedText ? null : (
            <div className="absolute inset-0 bg-gradient-to-r from-family-cream/95 via-family-cream/75 to-family-cream/10" />
          )}
        </>
      ) : null}

      {activeBanner.hasEmbeddedText ? (
        <div className="relative min-h-[104px] md:min-h-[112px]" />
      ) : (
        <div className="relative flex min-h-[104px] items-center justify-between gap-5 md:min-h-[112px]">
          <div className="max-w-2xl pb-4 md:pb-3">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] md:text-xs" style={{ color: activeBanner.theme.accent }}>
              {activeBanner.eyebrow}
            </p>
            <h1 className="mt-1.5 text-2xl font-black leading-tight text-family-ink md:text-4xl">{activeBanner.title}</h1>
            <p className="mt-1.5 max-w-xl text-xs font-semibold leading-5 text-family-ink/65 md:text-sm">
              {activeBanner.subtitle}
            </p>
          </div>

          {activeBanner.imagePath ? null : (
            <DecorativeArt visual={activeBanner.visual} accent={activeBanner.theme.accent} glow={activeBanner.theme.glow} />
          )}
        </div>
      )}

      <div className="absolute bottom-3 left-5 flex gap-2 md:left-6">
        {banners.map((banner, index) => (
          <button
            aria-label={`Show ${banner.title} banner`}
            className={`h-2 rounded-full transition-all ${index === activeIndex ? "w-7 bg-family-ink" : "w-2 bg-family-ink/25"}`}
            key={banner.title}
            onClick={() => setActiveIndex(index)}
            type="button"
          />
        ))}
      </div>
    </section>
  );
}
