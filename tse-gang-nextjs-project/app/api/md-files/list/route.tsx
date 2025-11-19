import { Dirent } from "fs";
import path from "path";
import { readdir, readFile } from "fs/promises";

const BLOG_DIR = path.join(process.cwd(), "data", "blogs");

type BlogSummary = { 
    slug: string; 
    title: string, 
    createdAt: string, 
    // Carry richer metadata so blog listings can show teaser/date/category
    date: string; 
    category: string; 
    excerpt: string; 
    id: string
    author: string;
};

export async function GET() {
    try {
        // read each entry (Dirent) inside /data/blogs
        const entries: Dirent[] = await readdir(BLOG_DIR, { withFileTypes: true });
        const items: BlogSummary[] = [];

        for (const entry of entries) {
            // skip files; we only care about folders named after slugs 
            if (!entry.isDirectory()) continue;

            const slug = entry.name;
            let title = slug;
            let createdAt = "1970-01-01T00:00:00.000Z";
            // Defaults for new metadata so list always has meaningful values
            let date = createdAt;
            let category = "General";
            let excerpt = "";
            let id = slug;
            let author = "Unknown";

            // try to read meta.json so we can surface the friendly title
            try {
                const metaPath = path.join(BLOG_DIR, slug, "meta.json");
                const metaRaw = await readFile(metaPath, "utf-8");
                const meta = JSON.parse(metaRaw);
                title = meta.title ?? slug;
                createdAt = meta.createdAt ?? createdAt;
                // Pull extended metadata for teaser display and dynamic routing
                date = meta.date ?? createdAt;
                category = meta.category ?? category;
                excerpt = meta.excerpt ?? excerpt;
                id = meta.id ?? title;
                author = meta.author ?? author;
            } catch {
            // tolerate missing/invalid meta by falling back to slug
            }
            items.push({ slug, title, createdAt, date, category, excerpt, id, author });
        }

        items.sort(
        (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
        )

        return new Response(JSON.stringify({ items }), {
            status: 200,
            headers: { "Content-Type": "application/json"},
        });
    } catch (error) {
        return new Response(
            JSON.stringify({
               error: error instanceof Error ? error.message : "Unknown error",
            }),
            { status : 500 }
        )
    }
}