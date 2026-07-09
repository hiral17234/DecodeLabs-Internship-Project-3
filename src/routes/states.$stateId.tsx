import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Clock, Utensils, Landmark as _L, TreePine, Mountain, Waves, Sparkles, Camera, Award, Flame, Building2, Bookmark, Heart, Check } from "lucide-react";
import { getState, STATES, type State } from "@/lib/states-data";
import { useWishlist } from "@/lib/wishlist-context";
import { toast } from "sonner";

export const Route = createFileRoute("/states/$stateId")({
  component: StateDetail,
  loader: ({ params }) => {
    const state = getState(params.stateId);
    if (!state) throw notFound();
    return { state };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "State — NavYatra" }] };
    return {
      meta: [
        { title: `${loaderData.state.name} — NavYatra` },
        { name: "description", content: `${loaderData.state.tagline} — explore ${loaderData.state.name} on NavYatra.` },
        { property: "og:image", content: loaderData.state.hero },
      ],
    };
  },
});

function StateDetail() {
  const data = Route.useLoaderData() as { state: State };
  const s = data.state;
  const { has, toggle } = useWishlist();
  const liked = has(s.id);

  const share = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (navigator.share) await navigator.share({ title: `${s.name} — NavYatra`, url });
      else { await navigator.clipboard.writeText(url); toast.success("Link copied"); }
    } catch {}
  };

  return (
    <div className="relative">
      {/* HERO */}
      <div className="relative h-[46vh] min-h-[340px] w-full overflow-hidden">
        <motion.img src={s.hero} alt={s.name} initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 1.4 }} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-8">
          <Link to="/states" className="glass mb-4 inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-xs"><ArrowLeft className="h-3 w-3" /> All States</Link>
          <div className="text-sm text-white/80">{s.tagline}</div>
          <div className="mt-1 flex items-end gap-4">
            <span className="text-6xl drop-shadow-2xl md:text-7xl">{s.emoji}</span>
            <h1 className="text-5xl font-black leading-none text-white drop-shadow-2xl md:text-7xl" style={{ fontFamily: "'Playfair Display', serif" }}>{s.name}</h1>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-white/85">
            <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {s.capital}</span>
            <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" /> {s.bestTime}</span>
            <span className="inline-flex items-center gap-1.5">₹ {s.budget}</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Action buttons */}
        <div className="mb-6 flex flex-wrap gap-3">
          <button onClick={() => toggle(s.id)} className="glass inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 font-medium transition hover:bg-white/10">
            <Heart className={`h-4 w-4 ${liked ? "fill-red-500 text-red-500" : ""}`} /> {liked ? "Saved" : "Save"}
          </button>
          <button onClick={share} className="glass inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 font-medium transition hover:bg-white/10">
            <Bookmark className="h-4 w-4" /> Share
          </button>
        </div>

        {/* About */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>About {s.name}</h2>
          <p className="mt-2 max-w-3xl text-muted-foreground">{s.culture}</p>
        </div>

        {/* Section grid */}
        <div className="grid gap-5 md:grid-cols-2">
          <Section icon={Camera} title="Top Attractions" items={s.attractions} />
          {s.cuisine.length > 0 && <Section icon={Utensils} title="Cuisine" items={s.cuisine} />}
          {s.festivals.length > 0 && <Section icon={Sparkles} title="Festivals" items={s.festivals} />}
          {s.unesco.length > 0 && <Section icon={Award} title="UNESCO Sites" items={s.unesco} />}
          {s.hillStations.length > 0 && <Section icon={Mountain} title="Hill Stations" items={s.hillStations} />}
          {s.wildlife.length > 0 && <Section icon={TreePine} title="Wildlife" items={s.wildlife} />}
          {s.beaches.length > 0 && <Section icon={Waves} title="Beaches" items={s.beaches} />}
          {s.adventure.length > 0 && <Section icon={Flame} title="Adventure" items={s.adventure} />}
          {s.cities.length > 0 && <Section icon={Building2} title="Top Cities" items={s.cities} />}
        </div>

        {/* Travel tips */}
        <div className="mt-5 rounded-3xl border border-border/60 bg-card/60 p-6">
          <div className="mb-3 flex items-center gap-2 text-[var(--saffron)]">
            <Sparkles className="h-4 w-4" />
            <h3 className="text-base font-bold">Travel Tips & Fun Facts</h3>
          </div>
          <ul className="space-y-2 text-sm">
            {[...s.tips, ...s.funFacts].map((t, i) => (
              <li key={i} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" /> {t}</li>
            ))}
          </ul>
        </div>

        {/* Stat cards */}
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard emoji="💰" label="Budget" value={`₹${s.budget}`} />
          <StatCard emoji="🗓️" label="Duration" value={s.duration} />
          <StatCard emoji="🗣️" label="Language" value={s.languages.join(", ")} />
          <StatCard emoji="👗" label="Traditional" value={s.dress} />
        </div>

        {/* Gallery */}
        {s.gallery.length > 0 && (
          <div className="mt-8">
            <h3 className="mb-4 text-xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Gallery</h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {s.gallery.map((g, i) => (
                <motion.img key={i} src={g} alt="" loading="lazy" whileHover={{ scale: 1.03 }} className="aspect-square rounded-2xl object-cover" />
              ))}
            </div>
          </div>
        )}

        {/* Nearby */}
        <div className="mt-10">
          <h3 className="mb-4 text-xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Nearby in {s.region}</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {STATES.filter((x) => x.region === s.region && x.id !== s.id).slice(0, 3).map((n) => (
              <Link key={n.id} to="/states/$stateId" params={{ stateId: n.id }} className="group overflow-hidden rounded-2xl border border-border/60 bg-card/50 transition hover:border-white/20">
                <img src={n.hero} className="h-32 w-full object-cover transition group-hover:scale-105" alt="" />
                <div className="p-3">
                  <div className="text-xs text-muted-foreground">{n.tagline}</div>
                  <div className="font-bold">{n.name}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ icon: Icon, title, items }: { icon: React.ComponentType<{ className?: string }>; title: string; items: string[] }) {
  return (
    <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-3xl border border-border/60 bg-card/60 p-5">
      <div className="mb-3 flex items-center gap-2 text-[var(--saffron)]">
        <Icon className="h-4 w-4" />
        <h3 className="text-base font-bold">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((it) => (
          <span key={it} className="rounded-full bg-white/5 px-3.5 py-1.5 text-sm text-foreground/90 ring-1 ring-white/10">{it}</span>
        ))}
      </div>
    </motion.div>
  );
}

function StatCard({ emoji, label, value }: { emoji: string; label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-border/60 bg-card/60 p-5 text-center">
      <div className="mb-1 text-3xl">{emoji}</div>
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 font-bold">{value}</div>
    </div>
  );
}
