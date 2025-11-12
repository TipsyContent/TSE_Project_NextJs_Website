"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { fetchData } from "@/lib/fetchData";

type UpcomingItem = {
  match: { id: string; url: string };
  event: { name: string; logo: string };
  teams: { name: string; tag: string; logo: string }[];
};

type ApiResponse = {
  status: string;
  data: {
    upcoming?: UpcomingItem[];
  };
};

async function getUpcomingTop3(): Promise<UpcomingItem[]> {
  const res: ApiResponse = await fetchData();
  const list = res?.data?.upcoming ?? [];
  return list.slice(0, 3);
}

export function TournamentCard() {
  const [upcoming, setUpcoming] = React.useState<UpcomingItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setLoading(true);
        const top3 = await getUpcomingTop3();
        if (!mounted) return;
        setUpcoming(top3);
      } catch (e) {
        console.error(e);
        if (mounted) setError("Kunne ikke hente tournaments.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Tournaments</CardTitle>
        <Link href="/tournaments" className="text-sm text-blue-600 hover:underline">
          See all
        </Link>
      </CardHeader>

      <CardContent>
        <p className="mb-2 text-sm font-medium">Upcoming Matches:</p>

        {loading ? (
          <p className="text-sm text-muted-foreground">Loading…</p>
        ) : error ? (
          <p className="text-sm text-red-600">{error}</p>
        ) : upcoming.length === 0 ? (
          <p className="text-sm text-muted-foreground">No upcoming matches</p>
        ) : (
          <ul className="space-y-2">
            {upcoming.map((u) => {
              const a = u.teams?.[0];
              const b = u.teams?.[1];
              return (
                <li
                  key={u.match.id}
                  className="rounded-md border bg-slate-50 px-3 py-2 dark:bg-zinc-900 dark:border-zinc-800"
                >
                  <div className="flex items-center justify-between">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        {a ? `${a.name} (${a.tag})` : "TBD"}{" "}
                        <span className="text-slate-400">vs</span>{" "}
                        {b ? `${b.name} (${b.tag})` : "TBD"}
                      </p>
                      <p className="text-xs text-slate-500">
                        {u.event?.name ?? "Unknown event"}
                      </p>
                    </div>
                    {u.match?.url ? (
                      <Link
                        href={u.match.url}
                        className="shrink-0 text-xs text-blue-600 hover:underline"
                      >
                        Match
                      </Link>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
