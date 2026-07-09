import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Award, Heart, LogOut, Sparkles, Trophy } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useWishlist } from "@/lib/wishlist-context";
import { getState } from "@/lib/states-data";

export const Route = createFileRoute("/profile")({ component: Profile });

function Profile() {
  const { user, loading, logout } = useAuth();
  const { wishlist } = useWishlist();
  const nav = useNavigate();

  useEffect(() => {
    if (!loading && !user) nav({ to: "/auth" });
  }, [loading, user, nav]);

  if (!user) return null;

  const badges = [
    { name: "Explorer", earned: wishlist.length >= 1, icon: "🧭" },
    { name: "Collector", earned: wishlist.length >= 5, icon: "🎒" },
    { name: "Wanderer", earned: wishlist.length >= 10, icon: "🌏" },
    { name: "Bharat Master", earned: wishlist.length >= 20, icon: "👑" },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass animated-border relative overflow-hidden rounded-3xl p-8 text-center">
        <img src={user.avatar} alt="" className="mx-auto h-24 w-24 rounded-3xl shadow-xl" />
        <h1 className="mt-4 text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>{user.name}</h1>
        <p className="text-sm text-muted-foreground">{user.email}</p>
        <button onClick={() => { logout(); nav({ to: "/" }); }} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm hover:bg-white/20">
          <LogOut className="h-3.5 w-3.5" /> Logout
        </button>
      </motion.div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="glass rounded-3xl p-5">
          <div className="mb-3 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-[var(--saffron)]" />
            <h2 className="text-lg font-bold">Badges</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {badges.map((b) => (
              <div key={b.name} className={`rounded-2xl p-4 text-center ${b.earned ? "bg-gradient-saffron/30 border border-[var(--saffron)]/40" : "bg-white/5 opacity-40"}`}>
                <div className="text-3xl">{b.icon}</div>
                <div className="mt-1 text-xs font-semibold">{b.name}</div>
                {!b.earned && <div className="text-[10px] text-muted-foreground">Locked</div>}
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-3xl p-5">
          <div className="mb-3 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[var(--teal-glow)]" />
            <h2 className="text-lg font-bold">Travel Stats</h2>
          </div>
          <div className="space-y-3">
            <Stat label="Destinations Wishlisted" value={wishlist.length} />
            <Stat label="States Available to Explore" value={28} />
            <Stat label="AI Recommendations" value="Unlimited" />
          </div>
        </div>
      </div>

      <div className="mt-6 glass rounded-3xl p-5">
        <div className="mb-3 flex items-center gap-2">
          <Heart className="h-5 w-5 text-rose-400" />
          <h2 className="text-lg font-bold">Saved Destinations</h2>
        </div>
        {wishlist.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted-foreground">Your journey begins with a single click 💫</p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {wishlist.map((id) => {
              const s = getState(id);
              if (!s) return null;
              return (
                <Link key={id} to="/states/$stateId" params={{ stateId: id }} className="flex items-center gap-3 rounded-xl bg-white/5 p-2 hover:bg-white/10">
                  <img src={s.hero} className="h-12 w-12 rounded-lg object-cover" alt="" />
                  <div className="text-sm font-semibold">{s.name}</div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-center">
        <Award className="h-5 w-5 text-muted-foreground" />
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-white/5 p-3">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-lg font-bold text-gradient">{value}</span>
    </div>
  );
}
