"use client";

import * as React from "react";
import { fetchData } from "@/lib/fetchData";
import { formatTournamentDateTime } from "@/lib/utils/dateAndTimeFormatter";

type Item = {
  match: { id: string; url: string };
  event: { name: string; logo: string };
  teams: { name: string; tag: string; logo: string; points?: string }[];
  utc: string;
  date?: string;
  time?: string;
};

export default function TournamentsPage() {
  const [upcoming, setUpcoming] = React.useState<Item[]>([]);
  const [recent, setRecent] = React.useState<Item[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        setLoading(true);
        const api = await fetchData();

        const now = new Date();

        const allUpcoming = (api.data.upcoming as Item[]) ?? [];
        const allResults = (api.data.results as Item[]) ?? [];

        const nextThree = allUpcoming
          .slice()
          .filter((m) => new Date(m.utc) > now)
          .sort((a, b) => new Date(a.utc).getTime() - new Date(b.utc).getTime())
          .slice(0, 3);

        const lastThree = allResults
          .slice()
          .sort((a, b) => new Date(b.utc).getTime() - new Date(a.utc).getTime())
          .slice(0, 3);

        if (!isMounted) return;
        setUpcoming(nextThree);
        setRecent(lastThree);
      } catch (e) {
        console.error(e);
        if (isMounted) setError("Could not load tournaments");
      } finally {
        if (isMounted) setLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <main className="p-4">
        <p>Loading…</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="p-4">
        <p className="text-red-600">{error}</p>
      </main>
    );
  }

  return (
    <main className="p-4 space-y-8">
      <section>
        <h1 className="text-2xl mb-4 text-center">Upcoming matches</h1>

        {upcoming.length === 0 ? (
          <p className="text-sm text-muted-foreground">No upcoming matches</p>
        ) : (
          <ul className="space-y-2">
            {upcoming.map((t) => {
              const a = t.teams?.[0];
              const b = t.teams?.[1];
              const when = formatTournamentDateTime(t.utc);

              return (
                <li
                  key={t.match.id}
                  className="rounded-md border bg-slate-50 px-3 py-2 dark:bg-zinc-900 dark:border-zinc-800"
                >
                  <p className="text-sm font-medium truncate text-center">
                    {t.event.name}
                  </p>
                  <p className="text-xs text-slate-500 text-center">
                    {a?.name ?? "TBD"} vs {b?.name ?? "TBD"} {" - "}
                    {when ? `${when.formatted}` : "TBD"}
                  </p>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section>
        <h1 className="text-2xl mb-4 text-center">Recent matches</h1>

        {recent.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center">
            No recent matches
          </p>
        ) : (
          <ul className="space-y-2">
            {recent.map((t) => {
              const a = t.teams?.[0];
              const b = t.teams?.[1];
              const when = formatTournamentDateTime(t.utc);

              const hasPoints =
                a?.points !== undefined &&
                b?.points !== undefined &&
                a.points !== "" &&
                b.points !== "";

              return (
                <li
                  key={t.match.id}
                  className="rounded-md border bg-slate-50 px-3 py-2 dark:bg-zinc-900 dark:border-zinc-800"
                >
                  <p className="text-sm font-medium truncate text-center">
                    {t.event.name}
                  </p>

                  <p className="text-xs text-slate-500 text-center">
                    {a?.name ?? "TBD"}{" "}
                    {hasPoints && (
                      <span className="font-semibold">
                        {a.points} : {b.points}
                      </span>
                    )}{" "}
                    {b?.name ?? "TBD"}
                    {" - "}
                    {when ? `${when.formatted}` : "TBD"}
                  </p>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </main>
  );
}
