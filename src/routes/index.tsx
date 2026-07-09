import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, MapPin, Sparkles, Compass, Star, Users, Heart } from "lucide-react";
import { STATES } from "@/lib/states-data";
import { StateCard } from "@/components/StateCard";
import { FloatingParticles } from "@/components/BackgroundFx";

export const Route = createFileRoute("/")({ component: Landing });

const typewriterWords = ["Rajasthan", "Kerala", "Himalayas", "Goa", "Ladakh", "Meghalaya"];

function Landing() {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = typewriterWords[wordIndex];
    const speed = deleting ? 60 : 120;
    const t = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, text.length + 1));
        if (text.length + 1 === current.length) setTimeout(() => setDeleting(true), 1500);
      } else {
        setText(current.slice(0, text.length - 1));
        if (text.length - 1 === 0) {
          setDeleting(false);
          setWordIndex((wordIndex + 1) % typewriterWords.length);
        }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, deleting, wordIndex]);

  return (
    <div className="relative">
      {/* HERO */}
      <section className="relative min-h-[92vh] overflow-hidden px-4 pt-8">
        <FloatingParticles count={30} />

        {/* Floating monument silhouettes */}
        <FloatingMonuments />

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center pt-16 text-center md:pt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs uppercase tracking-widest"
          >
            <Sparkles className="h-3 w-3 text-[var(--saffron)]" />
            AI-Powered Travel Companion
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-6 text-5xl font-black leading-[1.05] tracking-tight sm:text-7xl md:text-8xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            <span className="text-gradient-saffron">Know Your</span>
            <br />
            <span className="text-gradient">India</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl"
          >
            Discover India's hidden gems through AI-powered personalized recommendations.
            Your next adventure in{" "}
            <span className="inline-block min-w-[9ch] text-left font-semibold text-[var(--teal-glow)]">
              {text}<span className="animate-pulse">|</span>
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <Link
              to="/recommendation"
              className="group relative overflow-hidden rounded-2xl bg-gradient-primary px-6 py-3.5 font-semibold text-white shadow-2xl glow transition hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-2">
                Start Exploring <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
              <span className="shimmer absolute inset-0" />
            </Link>
            <Link
              to="/states"
              className="glass rounded-2xl px-6 py-3.5 font-semibold transition hover:bg-white/20"
            >
              <span className="flex items-center gap-2">
                <Compass className="h-4 w-4" /> Explore 28 States
              </span>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-16 grid w-full max-w-3xl grid-cols-3 gap-4"
          >
            {[
              { icon: MapPin, num: "28", label: "States" },
              { icon: Star, num: "200+", label: "Destinations" },
              { icon: Users, num: "AI", label: "Powered" },
            ].map((s) => (
              <div key={s.label} className="glass rounded-2xl p-4 text-center">
                <s.icon className="mx-auto mb-1 h-5 w-5 text-[var(--saffron)]" />
                <div className="text-2xl font-bold text-gradient">{s.num}</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Destinations */}
      <SectionBlock
        eyebrow="Featured"
        title="Handpicked Destinations"
        subtitle="Curated experiences from the length and breadth of India"
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {STATES.slice(0, 6).map((s, i) => (
            <StateCard key={s.id} state={s} index={i} />
          ))}
        </div>
      </SectionBlock>

      {/* Categories */}
      <SectionBlock eyebrow="Explore" title="Journeys for every soul" subtitle="Pick a vibe and dive in">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { emoji: "🏔️", label: "Mountains", tag: "mountain", grad: "from-blue-500 to-indigo-600" },
            { emoji: "🏖️", label: "Beaches", tag: "beach", grad: "from-cyan-400 to-teal-500" },
            { emoji: "🕌", label: "Heritage", tag: "history", grad: "from-amber-500 to-orange-600" },
            { emoji: "🐯", label: "Wildlife", tag: "wildlife", grad: "from-green-500 to-emerald-600" },
            { emoji: "🏜️", label: "Desert", tag: "desert", grad: "from-yellow-500 to-red-500" },
            { emoji: "☸️", label: "Spiritual", tag: "pilgrimage", grad: "from-purple-500 to-pink-500" },
            { emoji: "🍛", label: "Foodie Trails", tag: "food", grad: "from-red-500 to-rose-600" },
            { emoji: "🪂", label: "Adventure", tag: "adventure", grad: "from-orange-500 to-fuchsia-600" },
          ].map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -6, scale: 1.03 }}
            >
              <Link to="/explore" search={{ tag: c.tag }} className="glass relative block overflow-hidden rounded-3xl p-6 text-center transition">
                <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${c.grad} opacity-20`} />
                <div className="mb-2 text-5xl">{c.emoji}</div>
                <div className="font-semibold">{c.label}</div>
              </Link>
            </motion.div>
          ))}
        </div>
      </SectionBlock>

      {/* AI Chatbot promo */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="glass animated-border relative overflow-hidden rounded-3xl p-8 md:p-14">
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <div>
                <div className="text-xs uppercase tracking-widest text-[var(--saffron)]">Meet Bharat Guide</div>
                <h2 className="mt-2 text-4xl font-bold md:text-5xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Your <span className="text-gradient">personal</span> travel oracle
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Ask anything about Indian tourism — budget trips, hidden beaches, festivals, UNESCO sites, food trails. Powered by Gemini 2.5 Flash.
                </p>
                <Link to="/assistant" className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-gradient-primary px-5 py-3 font-semibold text-white glow">
                  Chat with Bharat Guide <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="glass rounded-2xl p-4">
                {[
                  { q: "Best places in Kerala?", side: "user" },
                  { q: "🌴 Kerala calls for houseboats in Alleppey, misty Munnar tea slopes, and Varkala's cliff-side sunsets. Want me to plan a 5-day route?", side: "ai" },
                  { q: "Suggest destinations under ₹10,000", side: "user" },
                ].map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: m.side === "user" ? 20 : -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 }}
                    className={`mb-2 max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${m.side === "user" ? "ml-auto bg-gradient-primary text-white" : "bg-white/10"}`}
                  >
                    {m.q}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hidden gems / all remaining */}
      <SectionBlock eyebrow="Hidden Gems" title="Off the beaten path" subtitle="Northeastern wonders & lesser-known escapes">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {STATES.filter((s) => s.region === "Northeast" || ["chhattisgarh", "odisha"].includes(s.id)).slice(0, 6).map((s, i) => (
            <StateCard key={s.id} state={s} index={i} />
          ))}
        </div>
      </SectionBlock>

      {/* Footer */}
      <footer className="border-t border-border/40 px-4 py-10 text-center text-sm text-muted-foreground">
        <div className="mx-auto max-w-7xl">
          <div className="mb-2 flex items-center justify-center gap-2 font-bold text-gradient-saffron">
            <Heart className="h-4 w-4" /> NavYatra
          </div>
          <p>Know Your India — AI-Powered Intelligent Tourism & Travel Companion</p>
          <p className="mt-2 text-xs opacity-70">Built with love for Bharat 🇮🇳</p>
        </div>
      </footer>
    </div>
  );
}

function SectionBlock({ eyebrow, title, subtitle, children }: { eyebrow: string; title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 text-center">
          <div className="text-xs uppercase tracking-widest text-[var(--saffron)]">{eyebrow}</div>
          <h2 className="mt-2 text-4xl font-bold md:text-5xl" style={{ fontFamily: "'Playfair Display', serif" }}>{title}</h2>
          <p className="mt-3 text-muted-foreground">{subtitle}</p>
        </motion.div>
        {children}
      </div>
    </section>
  );
}

function FloatingMonuments() {
  const items = [
    { emoji: "🕌", top: "15%", left: "8%", delay: 0 },
    { emoji: "🏰", top: "22%", right: "10%", delay: 1 },
    { emoji: "🛕", top: "60%", left: "5%", delay: 2 },
    { emoji: "⛩️", top: "70%", right: "8%", delay: 1.5 },
    { emoji: "🪷", top: "40%", left: "45%", delay: 0.5 },
  ];
  return (
    <>
      {items.map((it, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute text-5xl opacity-20 md:text-7xl md:opacity-30"
          style={{ top: it.top, left: it.left as any, right: it.right as any }}
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6 + i, delay: it.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          {it.emoji}
        </motion.div>
      ))}
    </>
  );
}
