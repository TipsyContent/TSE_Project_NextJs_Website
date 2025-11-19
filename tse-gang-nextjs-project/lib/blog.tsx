import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";

const BLOG_PATH = path.join(process.cwd(), "data", "blogs");

export interface BlogMeta {
  title: string;
  date: string;
  excerpt?: string;
}

export interface BlogPost {
  slug: string;
  meta: BlogMeta;
  content: string;
}

// Get all slugs (folder names)
export function getAllSlugs(): string[] {
  return fs.readdirSync(BLOG_PATH).filter((f) => {
    return fs.statSync(path.join(BLOG_PATH, f)).isDirectory();
  });
}

// Get metadata for all blogs
export function getAllPostsMeta(): BlogMeta & { slug: string }[] {
  const slugs = getAllSlugs();

  return slugs.map((slug) => {
    const metaPath = path.join(BLOG_PATH, slug, "meta.json");
    const rawMeta = fs.readFileSync(metaPath, "utf-8");
    const meta: BlogMeta = JSON.parse(rawMeta);
    return { ...meta, slug };
  });
}

// Get single blog post
export async function getPostBySlug(slug: string): Promise<BlogPost> {
  const contentPath = path.join(BLOG_PATH, slug, "content.md");
  const metaPath = path.join(BLOG_PATH, slug, "meta.json");

  if (!fs.existsSync(contentPath) || !fs.existsSync(metaPath)) {
    throw new Error(`Blog post ${slug} not found`);
  }

  const rawContent = fs.readFileSync(contentPath, "utf-8");
  const rawMeta = fs.readFileSync(metaPath, "utf-8");
  const meta: BlogMeta = JSON.parse(rawMeta);

  const { content } = await compileMDX({
    source: rawContent,
    components: {},
  });

  return {
    slug,
    meta,
    content,
  };
}
