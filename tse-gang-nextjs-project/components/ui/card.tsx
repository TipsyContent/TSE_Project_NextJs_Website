"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { fetchData } from "@/lib/fetchData";
import { formatTournamentDateTime } from "@/lib/utils/dateAndTimeFormatter";

type Item = {
  match: { id: string; url: string };
  event: { name: string; logo: string; };
  teams: { name: string; tag: string; logo: string }[];
  utc: string;
  date?: string;
  time?: string;
};

export function TournamentCard() {
  const [items, setItems] = React.useState<Item[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setLoading(true);
        const api = await fetchData();
        const list: Item[] = (api.data.upcoming as Item[])?.length
          ? api.data.upcoming
          : (api.data.results as Item[]) ?? [];
        if (!mounted) return;
        setItems(list);
      } catch (e) {
        console.error(e);
        if (mounted) setError("Could not load tournaments.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const topThree = items.slice(0, 3);

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Tournaments</CardTitle>
        <Link
          href="/tournaments"
          className="text-sm text-blue-600 hover:underline"
        >
          See all
        </Link>
      </CardHeader>

      <CardContent>
        <p className="mb-2 text-sm font-medium">Upcoming tournaments:</p>

        {loading ? (
          <p className="text-sm text-muted-foreground">Loading…</p>
        ) : error ? (
          <p className="text-sm text-red-600">{error}</p>
        ) : topThree.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No upcoming tournaments
          </p>
        ) : (
          <ul className="space-y-2">
            {topThree.map((t) => {
              const a = t.teams?.[0];
              const b = t.teams?.[1];
              const when = formatTournamentDateTime(t.utc) ?? null;
              return (
                <li
                  key={t.match.id}
                  className="rounded-md border bg-slate-50 px-3 py-2 dark:bg-zinc-900 dark:border-zinc-800"
                >
                  <div className="flex items-center justify-between">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        {t.event.name}{" "}
                      </p>
                      <p className="text-xs text-slate-500">
                        {a.name ?? "TBD"} vs {b.name ?? "TBD"}
                        {" - "}
                        {when ? `${when.date}  ${when.time}` : "TBD"}
                      </p>
                    </div>
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
