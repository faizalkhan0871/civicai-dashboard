export default function Hero() {
  return (
    <section className="mb-10">

      <p className="text-sm uppercase tracking-[0.35em] text-slate-500">
        CIVIC INTELLIGENCE PLATFORM
      </p>

      <h1 className="mt-4 text-5xl font-bold text-white lg:text-7xl">
        Smart Civic Complaint Management
      </h1>

      <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-400">
        AI-powered monitoring, intelligent prioritization and real-time
        resolution tracking for smarter city operations. Built to help
        administrators monitor, analyze and resolve civic complaints
        efficiently.
      </p>

      <div className="mt-8 flex flex-wrap gap-4">

        <button className="rounded-2xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition hover:scale-105 hover:bg-cyan-400">
          + New Complaint
        </button>

        <button className="rounded-2xl border border-slate-700 bg-slate-900/60 px-6 py-3 font-semibold text-white transition hover:border-cyan-400">
          📊 Export Report
        </button>

        <button className="rounded-2xl border border-slate-700 bg-slate-900/60 px-6 py-3 font-semibold text-white transition hover:border-emerald-400">
          🤖 AI Analysis
        </button>

        <button className="rounded-2xl border border-slate-700 bg-slate-900/60 px-6 py-3 font-semibold text-white transition hover:border-orange-400">
          ⚡ Live Monitor
        </button>

      </div>

    </section>
  );
}