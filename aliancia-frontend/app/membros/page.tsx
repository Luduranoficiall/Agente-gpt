"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function Membros() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/members/list")
      .then((res) => setMembers(res.data));
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Membros</h1>

      <div className="space-y-4">
        {members.map((m: any) => (
          <div className="p-4 bg-white rounded shadow" key={m.id}>
            {m.name} — {m.email}
          </div>
        ))}
      </div>
    </div>
  );
}
