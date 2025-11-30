export default function StatsCard({ title, value }: any) {
  return (
    <div className="bg-black/30 p-6 rounded-xl border border-white/10 shadow-lg">
      <p className="text-gray-400 text-sm">{title}</p>
      <h2 className="text-3xl font-bold text-blueenergy mt-1">{value}</h2>
    </div>
  );
}
