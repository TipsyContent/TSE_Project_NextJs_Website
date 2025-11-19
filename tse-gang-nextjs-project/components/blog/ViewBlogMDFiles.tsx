"use client";
import { useEffect, useState } from "react";

type BlogSummary = { slug: string; title: string; createdAt: string };

export default function ViewBlogMDFiles() {
    const [blogs, setBlogs] = useState<BlogSummary[]>([]);
    const [latest, setLatest] = useState<BlogSummary | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadList() {
            try {
                const res = await fetch("/api/md-files/list");
                if (!res.ok) throw new Error(`List failed: ${res.status}`);
                const data = (await res.json()) as { items: BlogSummary[] };
                setBlogs(data.items);
                setLatest(data.items[0] ?? null); // newest entry
            } catch (err) {
                setError(err instanceof Error ? err.message : "Unknown error");
            }
        }
        loadList();
    }, []);

    async function refreshList() {
        const res = await fetch("/api/md-files/list");
        if (!res.ok)
        throw new Error(`List failed: ${res.status}`);
        const data = (await res.json()) as { items: BlogSummary[] };
        setBlogs(data.items);
        setLatest(data.items[0] ?? null);
    }

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

            <p>{latest ? `Viser seneste slug: ${latest.slug}` : error ?? "Ingen filer endnu"}</p>

            <button
                onClick={handleViewAll}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            >
                View All Files
            </button>
        </div>
    );
}
