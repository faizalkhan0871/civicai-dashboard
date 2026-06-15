export default function AnalyticsPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <div className="mx-auto max-w-7xl px-8 py-10">

        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
          CivicAI Dashboard
        </p>

        <h1 className="mt-4 text-5xl font-bold">
          Analytics Dashboard
        </h1>

        <p className="mt-4 max-w-3xl text-lg text-slate-400">
          AI powered analytics and performance insights for civic complaints.
        </p>
        <section className="mt-10 grid gap-6 md:grid-cols-4">

  <div className="rounded-3xl border border-cyan-500/20 bg-slate-900/60 p-6">
    <p className="text-sm text-slate-400">Total Reports</p>
    <h2 className="mt-4 text-5xl font-bold text-cyan-400">12.4K</h2>
    <p className="mt-3 text-emerald-400">+12% this month</p>
  </div>

  <div className="rounded-3xl border border-emerald-500/20 bg-slate-900/60 p-6">
    <p className="text-sm text-slate-400">Resolved Rate</p>
    <h2 className="mt-4 text-5xl font-bold text-emerald-400">91%</h2>
    <p className="mt-3 text-cyan-400">Excellent performance</p>
  </div>

  <div className="rounded-3xl border border-orange-500/20 bg-slate-900/60 p-6">
    <p className="text-sm text-slate-400">Avg Response</p>
    <h2 className="mt-4 text-5xl font-bold text-orange-400">2.4h</h2>
    <p className="mt-3 text-orange-300">AI optimized</p>
  </div>

  <div className="rounded-3xl border border-purple-500/20 bg-slate-900/60 p-6">
    <p className="text-sm text-slate-400">AI Accuracy</p>
    <h2 className="mt-4 text-5xl font-bold text-purple-400">96%</h2>
    <p className="mt-3 text-purple-300">Prediction engine</p>
  </div>

</section>
<section className="mt-10 rounded-3xl border border-slate-800 bg-slate-900/60 p-8">

  <div className="mb-8">

    <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
      Weekly Analytics
    </p>

    <h2 className="mt-2 text-4xl font-bold">
      Complaint Trend
    </h2>

  </div>

  <div className="flex h-80 items-end justify-between gap-4">

    <div className="flex flex-col items-center gap-3">
      <div className="h-24 w-14 rounded-t-2xl bg-cyan-500"></div>
      <span className="text-slate-400">Mon</span>
    </div>

    <div className="flex flex-col items-center gap-3">
      <div className="h-36 w-14 rounded-t-2xl bg-cyan-500"></div>
      <span className="text-slate-400">Tue</span>
    </div>

    <div className="flex flex-col items-center gap-3">
      <div className="h-52 w-14 rounded-t-2xl bg-cyan-500"></div>
      <span className="text-slate-400">Wed</span>
    </div>

    <div className="flex flex-col items-center gap-3">
      <div className="h-32 w-14 rounded-t-2xl bg-cyan-500"></div>
      <span className="text-slate-400">Thu</span>
    </div>

    <div className="flex flex-col items-center gap-3">
      <div className="h-64 w-14 rounded-t-2xl bg-cyan-500"></div>
      <span className="text-slate-400">Fri</span>
    </div>

    <div className="flex flex-col items-center gap-3">
      <div className="h-40 w-14 rounded-t-2xl bg-cyan-500"></div>
      <span className="text-slate-400">Sat</span>
    </div>

    <div className="flex flex-col items-center gap-3">
      <div className="h-72 w-14 rounded-t-2xl bg-cyan-500"></div>
      <span className="text-slate-400">Sun</span>
    </div>

  </div>

</section>
{/* AI Performance Panel Start */}

<section className="mt-10 rounded-3xl border border-emerald-500/20 bg-gradient-to-r from-slate-900 to-slate-950 p-8">

  <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">
    AI PERFORMANCE
  </p>

  <h2 className="mt-4 text-4xl font-bold">
    Smart Analysis
  </h2>

  <div className="mt-8 grid gap-6 md:grid-cols-3">

    <div>
      <p className="text-slate-400">Prediction Accuracy</p>
      <h3 className="mt-2 text-5xl font-bold text-emerald-400">96%</h3>
    </div>

    <div>
      <p className="text-slate-400">Average Resolution</p>
      <h3 className="mt-2 text-5xl font-bold text-cyan-400">2.1h</h3>
    </div>

    <div>
      <p className="text-slate-400">Citizen Satisfaction</p>
      <h3 className="mt-2 text-5xl font-bold text-orange-400">4.8★</h3>
    </div>

  </div>

</section>

{/* AI Performance Panel End */}
<section className="mt-10 rounded-3xl border border-slate-800 bg-slate-900/60 p-8">

  <div className="mb-8">
    <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
      CITY PERFORMANCE
    </p>

    <h2 className="mt-2 text-4xl font-bold text-white">
      Top Performing Wards
    </h2>
  </div>

  <div className="overflow-hidden rounded-2xl border border-slate-800">

    <table className="w-full">

      <thead className="bg-slate-950/60">

        <tr className="text-left text-slate-400">

          <th className="px-6 py-4">Ward</th>
          <th className="px-6 py-4">Complaints</th>
          <th className="px-6 py-4">Resolved</th>
          <th className="px-6 py-4">Efficiency</th>

        </tr>

      </thead>

      <tbody>

        <tr className="border-t border-slate-800 hover:bg-slate-800/30 transition">

          <td className="px-6 py-5 font-semibold">Ward 5</td>
          <td className="px-6 py-5">248</td>
          <td className="px-6 py-5 text-emerald-400">231</td>
          <td className="px-6 py-5">
            <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-sm text-emerald-400">
              93%
            </span>
          </td>

        </tr>

        <tr className="border-t border-slate-800 hover:bg-slate-800/30 transition">

          <td className="px-6 py-5 font-semibold">Ward 11</td>
          <td className="px-6 py-5">196</td>
          <td className="px-6 py-5 text-cyan-400">178</td>
          <td className="px-6 py-5">
            <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-sm text-cyan-400">
              91%
            </span>
          </td>

        </tr>

        <tr className="border-t border-slate-800 hover:bg-slate-800/30 transition">

          <td className="px-6 py-5 font-semibold">Ward 7</td>
          <td className="px-6 py-5">154</td>
          <td className="px-6 py-5 text-orange-400">136</td>
          <td className="px-6 py-5">
            <span className="rounded-full bg-orange-500/20 px-3 py-1 text-sm text-orange-400">
              88%
            </span>
          </td>

        </tr>

      </tbody>

    </table>

  </div>

</section>

      </div>
    </main>
  );
}