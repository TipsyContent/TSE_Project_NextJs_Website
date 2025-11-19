import { Dirent } from "fs";
import path from "path";
import { readdir, readFile } from "fs/promises";

const BLOG_DIR = path.join(process.cwd(), "data", "blogs");

type BlogSummary = { slug: string; title: string, createdAt: string };

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

            // try to read meta.json so we can surface the friendly title
            try {
                const metaPath = path.join(BLOG_DIR, slug, "meta.json");
                const metaRaw = await readFile(metaPath, "utf-8");
                const meta = JSON.parse(metaRaw);
                title = meta.title ?? slug;
                createdAt = meta.createdAt ?? createdAt;
            } catch {
            // tolerate missing/invalid meta by falling back to slug
            }
            items.push({ slug, title, createdAt });
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