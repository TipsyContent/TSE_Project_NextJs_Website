"use client";
import { useCallback, useEffect, useState } from "react";

type BlogSummary = { slug: string; title: string; createdAt: string; date: string; category: string; excerpt: string; id: string; author: string; };

export default function ViewBlogMDFiles() {
    const [blogs, setBlogs] = useState<BlogSummary[]>([]);
    const [latest, setLatest] = useState<BlogSummary | null>(null);
    const [error, setError] = useState<string | null>(null);

    const refreshList = useCallback(async () => {
        const res = await fetch("/api/md-files/list");
        if (!res.ok) throw new Error(`List failed: ${res.status}`);
        const data = (await res.json()) as { items: BlogSummary[] };
        setBlogs(data.items);
        setLatest(data.items[0] ?? null); // newest entry
    }, []);

    // 
    useEffect(() => {
        // Defer the initial refresh so setState runs outside the effect body
        let cancelled = false;
        const timeout = window.setTimeout(() => {
            if (cancelled) {
                return;
            }

            refreshList().catch((err) =>
                setError(err instanceof Error ? err.message : "Unknown error")
            );
        }, 0);

        return () => {
            cancelled = true;
            window.clearTimeout(timeout);
        };
    }, [refreshList]);

    useEffect(() => {
        // listen for the custom event fired after a blog was created
        function handleBlogCreated() {
            refreshList().catch((err) =>
                setError(err instanceof Error ? err.message : "Unknown error")
            );
        }

        window.addEventListener("blog:created", handleBlogCreated);
        return () => window.removeEventListener("blog:created", handleBlogCreated);
    }, [refreshList]);

    async function handleViewLatest() {
        await refreshList();
        if (!latest) {
            console.log("No files yet");
            return;
        }

        await fetch(`/api/md-files/get-md?slug=${encodeURIComponent(latest.slug)}&view=true`);
    }



    async function handleViewAll() {
        await Promise.all(
            blogs.map(({ slug }) =>
                fetch(`/api/md-files/get-md?slug=${encodeURIComponent(slug)}&view=true`)
            )
        )
    }

    return (
        <div className="flex grid justify-center px-16 space-y-2">
            <button
                onClick={handleViewLatest}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            >
                View File
            </button>

            {/* Show teaser, date and category so editors can confirm metadata */}
            <p className="text-center">
                {latest
                    ? `Latest: ${latest.title} (${new Date(latest.date).toLocaleDateString()}) · ${latest.category} · ${latest.excerpt}`
                    : error ?? "No files yet"}
            </p>
            <p>{latest ? `Showing latest slug: ${latest.slug}` : error ?? "No files yet"}</p>

                <p className="text-center text-sm text-gray-600">
                    {latest ? `Author: ${latest.author}` : error ?? "No author data"}
                </p>

            <button
                onClick={handleViewAll}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            >
                View All Files
            </button>
            {/* Quick overview of all stored metadata */}
            <div className="mt-4 space-y-3">
                {blogs.map((blog) => (
                    <div key={blog.slug} className="border border-gray-300 rounded p-3 shadow-sm">
                        <p className="font-semibold">
                            {blog.title} ({blog.category}) — {new Date(blog.date).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-gray-500">Author: {blog.author}</p>
                        <p className="text-sm text-gray-700">{blog.excerpt || "No teaser given.$"}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
