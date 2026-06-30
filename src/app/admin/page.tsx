import { getSupabaseAdmin } from '@/lib/supabase';

// ─── Types ────────────────────────────────────────────────────────────────────

type Contact = {
  id: string;
  category: string | null;
  sentiment: string | null;
  lead_quality: string | null;
  lead_score: number | null;
  status: string;
  created_at: string;
  sent_at: string | null;
  approved_at: string | null;
};

// ─── Data helpers ─────────────────────────────────────────────────────────────

function countBy<T>(items: T[], key: (i: T) => string | null): Record<string, number> {
  const out: Record<string, number> = {};
  for (const item of items) {
    const k = key(item) ?? 'Unknown';
    out[k] = (out[k] ?? 0) + 1;
  }
  return out;
}

function monthKey(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

function last6Months(): string[] {
  const months: string[] = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`);
  }
  return months;
}

function monthLabel(key: string) {
  const [y, m] = key.split('-');
  return new Date(Number(y), Number(m) - 1).toLocaleString('default', {
    month: 'short',
    year: '2-digit'
  });
}

function avg(nums: number[]) {
  if (!nums.length) return 0;
  return Math.round(nums.reduce((a, b) => a + b, 0) / nums.length);
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      <p className="text-sm text-black/50">{label}</p>
      <p className="mt-1 text-4xl font-semibold">{value}</p>
      {sub && <p className="mt-1 text-sm text-black/50">{sub}</p>}
    </div>
  );
}

function BarChart({
  data,
  max,
  colorClass = 'bg-black'
}: {
  data: { label: string; value: number }[];
  max: number;
  colorClass?: string;
}) {
  return (
    <div className="space-y-3">
      {data.map(({ label, value }) => (
        <div key={label} className="flex items-center gap-3">
          <span className="w-36 truncate text-right text-sm text-black/60">{label}</span>
          <div className="flex flex-1 items-center gap-2">
            <div className="h-5 flex-1 overflow-hidden rounded-full bg-gray-100">
              <div
                className={`h-full rounded-full ${colorClass} transition-all`}
                style={{ width: max > 0 ? `${(value / max) * 100}%` : '0%' }}
              />
            </div>
            <span className="w-6 text-sm font-medium">{value}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function AdminPage({
  searchParams
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  const { key } = await searchParams;
  const adminKey = process.env.ADMIN_KEY;

  if (adminKey && key !== adminKey) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-black/50">Access denied.</p>
      </div>
    );
  }

  const supabase = getSupabaseAdmin();
  const { data: contacts = [] } = await supabase
    .from('contacts')
    .select('id, category, sentiment, lead_quality, lead_score, status, created_at, sent_at, approved_at')
    .order('created_at', { ascending: false });

  const rows = (contacts ?? []) as Contact[];
  const total = rows.length;
  const sent = rows.filter((r) => r.status === 'sent').length;
  const rejected = rows.filter((r) => r.status === 'rejected').length;
  const pending = rows.filter((r) => r.status === 'new').length;
  const highLeads = rows.filter((r) => r.lead_quality === 'High').length;
  const conversionRate = total > 0 ? Math.round((sent / total) * 100) : 0;
  const avgScore = avg(rows.map((r) => r.lead_score).filter((s): s is number => s !== null));

  // Category breakdown
  const categoryCounts = countBy(rows, (r) => r.category);
  const categoryData = Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([label, value]) => ({ label, value }));
  const maxCategory = Math.max(...categoryData.map((d) => d.value), 1);

  // Sentiment
  const sentimentCounts = countBy(rows, (r) => r.sentiment);
  const sentimentData = ['Positive', 'Neutral', 'Negative'].map((s) => ({
    label: s,
    value: sentimentCounts[s] ?? 0
  }));
  const maxSentiment = Math.max(...sentimentData.map((d) => d.value), 1);

  // Lead quality
  const qualityCounts = countBy(rows, (r) => r.lead_quality);
  const qualityData = ['High', 'Medium', 'Low'].map((q) => ({
    label: q,
    value: qualityCounts[q] ?? 0
  }));
  const maxQuality = Math.max(...qualityData.map((d) => d.value), 1);

  // Monthly trend (last 6 months)
  const months = last6Months();
  const monthlyCounts = countBy(rows, (r) => monthKey(r.created_at));
  const monthlyData = months.map((m) => ({
    label: monthLabel(m),
    value: monthlyCounts[m] ?? 0
  }));
  const maxMonthly = Math.max(...monthlyData.map((d) => d.value), 1);

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <h1 className="mb-2 text-3xl font-semibold">Analytics</h1>
      <p className="mb-10 text-black/50">Contact inquiry overview</p>

      {/* Stat cards */}
      <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        <StatCard label="Total inquiries" value={total} />
        <StatCard label="High-quality leads" value={highLeads} />
        <StatCard label="Replies sent" value={sent} />
        <StatCard label="Pending" value={pending} />
        <StatCard label="Rejected" value={rejected} />
        <StatCard label="Conversion rate" value={`${conversionRate}%`} sub="sent / total" />
        <StatCard label="Avg lead score" value={avgScore} sub="out of 100" />
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Monthly trend */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="mb-6 font-medium">Inquiries per month</h2>
          <BarChart data={monthlyData} max={maxMonthly} colorClass="bg-black" />
        </div>

        {/* Category breakdown */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="mb-6 font-medium">By category</h2>
          {categoryData.length > 0 ? (
            <BarChart data={categoryData} max={maxCategory} colorClass="bg-black" />
          ) : (
            <p className="text-sm text-black/40">No data yet.</p>
          )}
        </div>

        {/* Sentiment */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="mb-6 font-medium">Sentiment</h2>
          <BarChart
            data={sentimentData}
            max={maxSentiment}
            colorClass="bg-black"
          />
        </div>

        {/* Lead quality */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="mb-6 font-medium">Lead quality</h2>
          <BarChart data={qualityData} max={maxQuality} colorClass="bg-black" />
        </div>
      </div>

      {/* Recent inquiries table */}
      <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6">
        <h2 className="mb-6 font-medium">Recent inquiries</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-black/40">
                <th className="pb-3 font-normal">Date</th>
                <th className="pb-3 font-normal">Category</th>
                <th className="pb-3 font-normal">Sentiment</th>
                <th className="pb-3 font-normal">Quality</th>
                <th className="pb-3 font-normal">Score</th>
                <th className="pb-3 font-normal">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.slice(0, 20).map((r) => (
                <tr key={r.id} className="border-b last:border-0">
                  <td className="py-3 text-black/60">
                    {new Date(r.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-3">{r.category ?? '—'}</td>
                  <td className="py-3">{r.sentiment ?? '—'}</td>
                  <td className="py-3">{r.lead_quality ?? '—'}</td>
                  <td className="py-3">{r.lead_score ?? '—'}</td>
                  <td className="py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        r.status === 'sent'
                          ? 'bg-green-100 text-green-700'
                          : r.status === 'rejected'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-black/40">
                    No inquiries yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
