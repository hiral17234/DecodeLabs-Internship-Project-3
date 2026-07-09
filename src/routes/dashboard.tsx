import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Compass, Heart, MapPin, Sparkles, TrendingUp } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useWishlist } from "@/lib/wishlist-context";
import { STATES, getState } from "@/lib/states-data";

export const Route = createFileRoute("/dashboard")({ component: Dashboard });

function Dashboard() {
  const { user, loading } = useAuth();
  const { wishlist } = useWishlist();
  const nav = useNavigate();

  useEffect(() => {
    if (!loading && !user) nav({ to: "/auth" });
  }, [loading, user, nav]);

  if (!user) return null;

  const saved = wishlist.map((id) => getState(id)).filter(Boolean);
  const regionCounts = saved.reduce<Record<string, number>>((acc, s) => {
    if (!s) return acc;
    acc[s.region] = (acc[s.region] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(regionCounts).map(([region, count]) => ({ region, count }));
  const COLORS = ["#f97316", "#06b6d4", "#a855f7", "#22c55e", "#f43f5e", "#eab308"];

  const budgetData = [1, 2, 3, 4].map((tier) => ({
    tier: ["₹5k", "₹10k", "₹20k", "₹50k+"][tier - 1],
    count: saved.filter((s) => s && s.budgetTier === tier).length,
  }));

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass mb-6 flex items-center gap-4 rounded-3xl p-6">
        <img src={user.avatar} alt="" className="h-16 w-16 rounded-2xl" />
        <div className="flex-1">
          <div className="text-xs uppercase tracking-widest text-[var(--saffron)]">Welcome back</div>
          <h1 className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>{user.name}</h1>
        </div>
        <Link to="/recommendation" className="hidden rounded-xl bg-gradient-primary px-4 py-2 text-sm font-semibold text-white sm:inline-flex">
          <Sparkles className="mr-1.5 h-4 w-4" /> Quick Recommend
        </Link>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard icon={Heart} label="Wishlisted" value={String(wishlist.length)} tint="from-rose-500 to-pink-500" />
        <StatCard icon={MapPin} label="States Available" value="28" tint="from-orange-500 to-amber-500" />
        <StatCard icon={Compass} label="Destinations" value="200+" tint="from-teal-500 to-cyan-500" />
        <StatCard icon={TrendingUp} label="Membership" value="Explorer" tint="from-purple-500 to-fuchsia-500" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="glass rounded-3xl p-5">
          <h2 className="mb-4 text-lg font-bold">Wishlist by Region</h2>
          {chartData.length === 0 ? (
            <div className="py-12 text-center text-sm text-muted-foreground">Add destinations to your wishlist to see insights.</div>
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={chartData} dataKey="count" nameKey="region" cx="50%" cy="50%" outerRadius={90} label>
                  {chartData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "rgba(20,20,40,0.9)", border: "none", borderRadius: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="glass rounded-3xl p-5">
          <h2 className="mb-4 text-lg font-bold">Wishlist by Budget</h2>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={budgetData}>
              <XAxis dataKey="tier" stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" allowDecimals={false} />
              <Tooltip contentStyle={{ background: "rgba(20,20,40,0.9)", border: "none", borderRadius: 12 }} />
              <Bar dataKey="count" fill="url(#g1)" radius={[8, 8, 0, 0]} />
              <defs>
                <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-6 glass rounded-3xl p-5">
        <h2 className="mb-4 text-lg font-bold">Your Wishlist</h2>
        {saved.length === 0 ? (
          <div className="py-8 text-center text-muted-foreground">
            <Heart className="mx-auto mb-3 h-8 w-8 opacity-40" />
            <p>Nothing saved yet.</p>
            <Link to="/states" className="mt-3 inline-flex rounded-xl bg-gradient-primary px-4 py-2 text-sm text-white">Browse States</Link>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {saved.map((s) => s && (
              <Link key={s.id} to="/states/$stateId" params={{ stateId: s.id }} className="flex items-center gap-3 rounded-xl bg-white/5 p-3 transition hover:bg-white/10">
                <img src={s.hero} alt="" className="h-14 w-14 rounded-lg object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="truncate font-semibold">{s.emoji} {s.name}</div>
                  <div className="truncate text-xs text-muted-foreground">{s.tagline}</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 glass rounded-3xl p-5">
        <h2 className="mb-4 text-lg font-bold">Trending Now</h2>
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
          {STATES.slice(0, 4).map((s) => (
            <Link key={s.id} to="/states/$stateId" params={{ stateId: s.id }} className="group overflow-hidden rounded-2xl bg-white/5 transition hover:bg-white/10">
              <div className="h-24 overflow-hidden"><img src={s.hero} alt="" className="h-full w-full object-cover transition group-hover:scale-110" /></div>
              <div className="p-2 text-sm font-semibold">{s.name}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, tint }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string; tint: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass relative overflow-hidden rounded-2xl p-5">
      <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${tint} opacity-15`} />
      <Icon className="mb-2 h-5 w-5" />
      <div className="text-3xl font-black text-gradient">{value}</div>
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
    </motion.div>
  );
}
