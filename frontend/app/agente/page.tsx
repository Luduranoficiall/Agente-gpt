import AgentChat from "../../components/AgentChat";
import Navbar from "../../components/Navbar";

export default function AgentePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="max-w-3xl mx-auto p-8">
        <h1 className="text-3xl font-bold text-blueenergy">agente.gpt</h1>
        <p className="text-gray-400 mb-6">Converse com sua IA oficial da APP EXTRAORDINÁRI.A</p>
        <AgentChat />
      </div>
    </main>
  );
}
