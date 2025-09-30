import { useEffect, useState } from "react";

/**
 * cacheKey: string identifier
 * fetcher: () => Promise<any[]>         // fetch fresh data (your API later; SAMPLE_* for now)
 * reader:  () => Promise<any[]>         // read from IndexedDB
 * writer:  (items:any[]) => Promise<void> // write to IndexedDB
 */
export default function useCachedResource({
  cacheKey,
  fetcher,
  reader,
  writer,
}) {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("idle"); // 'idle' | 'loading' | 'ready' | 'offline'

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setStatus("loading");

      // 1) Paint fast from cache if available
      const cached = await reader().catch(() => []);
      if (!cancelled && cached?.length) {
        setData(cached);
        setStatus("ready");
      }

      // 2) Try network for fresher data
      try {
        const fresh = await fetcher();
        if (cancelled) return;
        setData(fresh);
        await writer(fresh).catch(() => {});
        setStatus("ready");
      } catch {
        if (!cancelled) {
          setStatus(cached?.length ? "ready" : "offline");
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [cacheKey]); // eslint-disable-line react-hooks/exhaustive-deps

  return { data, status };
}
