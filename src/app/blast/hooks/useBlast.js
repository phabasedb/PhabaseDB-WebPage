import { useState } from "react";

export function useBlast({ sequence, dbs, params, uri }) {
  const [xml, setXml] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const run = async () => {
    setLoading(true);
    setError(null);
    setXml("");

    try {
      const res = await fetch(uri, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sequence, db: dbs, params }),
      });
      if (!res.ok) {
        let msg = `Error HTTP ${res.status}`;
        try {
          msg = (await res.json()).message || msg;
        } catch {}
        throw new Error(msg);
      }
      const ctype = res.headers.get("content-type") || "";
      if (!ctype.includes("xml")) {
        throw new Error("Se esperaba XML, llegó: " + ctype);
      }
      setXml(await res.text());
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return { xml, loading, error, run };
}
