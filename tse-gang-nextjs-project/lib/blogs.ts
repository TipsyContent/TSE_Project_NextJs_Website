import path from "path";
import { readdir, readFile } from "fs/promises";

export type BlogSummary = {
  slug: string;
  title: string;
  createdAt: string;
  date: string;
  category: string;
  excerpt: string;
  author: string;
};

const BLOG_DIR = path.join(process.cwd(), "data", "blogs");

export async function getBlogs(): Promise<BlogSummary[]> {
  try {
    const entries = await readdir(BLOG_DIR, { withFileTypes: true });
    const blogs: BlogSummary[] = [];

    const folderNames = entries
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name.toString());

    for (const folderName of folderNames) {
      const metaPath = path.join(BLOG_DIR, folderName, "meta.json");

      try {
        const raw = await readFile(metaPath, "utf-8");
        const meta = JSON.parse(raw);
        blogs.push({
          slug: folderName,
          title: meta.title ?? folderName,
          createdAt: meta.createdAt ?? meta.date ?? "1970-01-01T00:00:00.000Z",
          date: meta.date ?? meta.createdAt ?? "1970-01-01T00:00:00.000Z",
          category: meta.category ?? "General",
          excerpt: meta.excerpt ?? "",
          author: meta.author ?? "Unknown",
        });
      } catch {
        // Ignore folders without metadata
      }
    }

    return blogs.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
  } catch {
    return [];
  }
}
