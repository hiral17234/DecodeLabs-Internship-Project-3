import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Sparkles, Globe, Utensils, Camera, TreePine, Landmark } from "lucide-react";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "About India — NavYatra" },
      { name: "description", content: "Learn about India's rich culture, heritage, festivals, wildlife and tourism landscape." },
    ],
  }),
});

const facts = [
  { icon: Globe, title: "28 States", desc: "A subcontinent of unmatched diversity — from Kashmir's snowscapes to Kanyakumari's shores." },
  { icon: Landmark, title: "40+ UNESCO Sites", desc: "Ancient temples, Mughal masterpieces, national parks and living traditions." },
  { icon: Utensils, title: "1000+ Cuisines", desc: "Every state, every city, every home carries a distinct culinary heritage." },
  { icon: TreePine, title: "100+ National Parks", desc: "Home to Bengal tigers, one-horned rhinos, Asiatic lions, and endless biodiversity." },
  { icon: Camera, title: "5000+ Years of History", desc: "One of the world's oldest civilizations — vibrant, evolving, eternal." },
  { icon: Sparkles, title: "30+ Major Festivals", desc: "From Diwali to Onam, Holi to Bihu — India lives to celebrate." },
];

function About() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
        <div className="text-xs uppercase tracking-widest text-[var(--saffron)]">About India</div>
        <h1 className="mt-2 text-5xl font-bold md:text-6xl" style={{ fontFamily: "'Playfair Display', serif" }}>
          A land of <span className="text-gradient-saffron">a billion stories</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          NavYatra is your intelligent guide to Bharat — powered by AI, curated for every kind of traveler.
          Explore the world's most diverse country, one state at a time.
        </p>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {facts.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -6 }}
            className="glass rounded-3xl p-6"
          >
            <div className="mb-3 grid h-11 w-11 place-items-center rounded-xl bg-gradient-primary text-white">
              <f.icon className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold">{f.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 glass animated-border relative overflow-hidden rounded-3xl p-8 text-center">
        <h2 className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Why NavYatra?</h2>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Named after the Sanskrit word for "navigation" and "journey," NavYatra fuses AI intelligence with local wisdom.
          Whether you seek Himalayan silence or Goa's sunsets, our engine matches you with the India you'll fall in love with.
        </p>
      </div>
    </div>
  );
}
