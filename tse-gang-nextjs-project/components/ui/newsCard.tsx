'use client'

import * as React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

type BlogSummary = {
    slug: string;
    title: string;
    date: string;
    category: string;
    excerpt: string;

};

export function NewsCard(){
   const [blogs, setBlogs] = React.useState<BlogSummary[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        let mounted = true;

        (async () => {
            try {
                setLoading(true);
                const res = await fetch("/api/md-files/list");
                if (!res.ok) throw new Error("Could not fetch the blogs");
                const data = (await res.json()) as { items: BlogSummary[] };
                if (!mounted) return;
                setBlogs(data.items.slice(0, 3));
            } catch (e) {
                if (mounted) setError("Could not load news.");
                console.error(e);
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
                <CardTitle>News List</CardTitle>
               
            </CardHeader>

            <CardContent>
                {loading ? (
                    <p className="text-sm text-muted-foreground">Loading…</p>
                ) : error ? (
                    <p className="text-sm text-red-600">{error}</p>
                ) : blogs.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                        No blogs
                    </p>
                ) : (
                    <ul className="space-y-2">
                        {blogs.map((blog) => (
                            <li key={blog.slug}>
                                <Link
                                    href={`/blog/${blog.slug}`}
                                    className="text-black hover:underline"
                                >
                                    {blog.title}
                                </Link>
                                <p className="text-sm text-muted-foreground">
                                    {blog.excerpt}
                                </p>
                            </li>
                        ))}
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


function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  );
}
