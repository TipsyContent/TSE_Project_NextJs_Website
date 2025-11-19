import path from "path";
import { mkdir, writeFile } from "fs/promises";

type CreateMdPayload = {
  filename: string;
  content: string;
  // Optional metadata supplied by editors so frontmatter/meta.json stay consistent
  id?: string;
  date?: string;
  category?: string;
  excerpt?: string;
  author?: string;
}

// Location where blog markdown files are stored
const BLOG_DIR = path.join(process.cwd(), "data", "blogs"); // -> /tse-gang-nextjs-project/data/blogs

// Normalizes user-provided filenames so we get predictable .md slugs 
const slugify = (value: string) =>
    value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9-_]+/g, "-")
      .replace(/^-+|-+$/g, "") || "post";

export async function POST(req: Request) {
  try {
    // Read payload once so we can reuse metadata for both markdown and meta.json
    const payload = (await req.json()) as Partial<CreateMdPayload>;
    const { filename, content } = payload;
    if (!filename || !content) {
      // Client must send both pieces of data; early exit keeps filesystem clean
      return new Response(JSON.stringify({ error: "filename and content are required" }), {status: 400});
    }

    const slug = slugify(filename);

    const folderPath = path.join(BLOG_DIR, slug) // folder for this blog post

    const mdPath = path.join(folderPath, `${slug}.md`) // markdown file inside the folder

    const metaPath = path.join(folderPath, "meta.json") // Meta data inside the folder

    await mkdir(BLOG_DIR, {recursive: true}); // Ensure target folder exists

    await mkdir(folderPath, { recursive: true }); // Ensure Blogs folder is there
    
    // Normalize metadata so downstream consumers (frontmatter + UI) get predictable values
    const displayTitle = (payload.id?.trim() || filename).trim();
    const publishDate = payload.date?.trim() || new Date().toISOString();
    const category = payload.category?.trim() || "General";
    const excerpt = payload.excerpt?.trim() || "";
    const author = payload.author?.trim() || "Unknown";
    const frontmatter = [
      "---",
      `title: "${displayTitle.replace(/"/g, '\\"')}"`,
      `id: "${displayTitle.replace(/"/g, '\\"')}"`,
      `slug: "${slug}"`,
      `date: "${publishDate}"`,
      `category: "${category.replace(/"/g, '\\"')}"`,
      `excerpt: "${excerpt.replace(/"/g, '\\"')}"`,
      `author: "${author.replace(/"/g, '\\"')}"`,
      "---",
      "",
    ].join("\n");

/*
    //const filePath = path.join(BLOG_DIR, `${slug}.md`);
    const markdownPayload = content.trimStart().startsWith("---")
      ? content
      : `${frontmatter}${content}`;
    await writeFile(mdPath, markdownPayload, "utf-8"); // Persist markdown so the blog can pick it up later
    */
    //build metadata
    // Mirror frontmatter in meta.json so API consumers can list teaser data quickly

       // Write **Markdown content only** (no frontmatter)
       await writeFile(mdPath, content.trim(), "utf-8");
       
    const metadata = {
      id: displayTitle,
      title: displayTitle,
      slug,
      createdAt: new Date().toISOString(),
      date: publishDate,
      category,
      excerpt,
      author,
    };

    await writeFile(metaPath, JSON.stringify(metadata, null, 2), "utf-8")

    return new Response(JSON.stringify({ message: "Blog and File created", folder: folderPath, markdownFile: mdPath, metadataFile: metaPath}), {status: 200});
  } catch (error) {
    // Surface a simple error payload to the client; avoid leaking internals
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {status: 500})
  }
}