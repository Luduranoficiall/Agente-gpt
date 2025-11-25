import StatsCard from "../../components/StatsCard.tsx";
import Navbar from "../../components/Navbar.tsx";

export default async function Admin() {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/admin/analytics", {
    cache: "no-store",
  });
  const analytics = await res.json();
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-3xl font-bold text-blueenergy mb-6">Dashboard Admin</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard title="Usuários" value={analytics.total_users} />
          <StatsCard title="Mensagens" value={analytics.total_messages} />
          <StatsCard title="Status" value={analytics.status} />
        </div>
      </div>
    </main>
  );
}
