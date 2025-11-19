import path from "path";
import { mkdir, writeFile } from "fs/promises";

type CreateMdPayload = {
  filename: string;
  content: string;
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
    const { filename, content } = (await req.json()) as Partial<CreateMdPayload>;
    if (!filename || !content) {
      // Client must send both pieces of data; early exit keeps filesystem clean
      return new Response(JSON.stringify({ error: "filename and content are required" }), {status: 400});
    }

    const slug = slugify(filename);

    const folderPath = path.join(BLOG_DIR, slug) // folder for this blog post

    const mdPath = path.join(folderPath, `${slug}.md`) // markdwon file inside the folder

    const metaPath = path.join(folderPath, "meta.json") // Meta data inside the folder

    await mkdir(BLOG_DIR, {recursive: true}); // Ensure target folder exists

    await mkdir(folderPath, { recursive: true }); // Ensure Blogs folder is there

    //const filePath = path.join(BLOG_DIR, `${slug}.md`);
    await writeFile(mdPath, content, "utf-8"); // Persist markdown so the blog can pick it up later

    //build metadata
    const metadata = {
      title: filename,
      slug,
      createdAt: new Date().toISOString(),
    };

    await writeFile(metaPath, JSON.stringify(metadata, null, 2), "utf-8")

    return new Response(JSON.stringify({ message: "Blog and File created", folder: folderPath, markdownFile: mdPath, metadataFile: metaPath}), {status: 200});
  } catch (error) {
    // Surface a simple error payload to the client; avoid leaking internals
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {status: 500})
  }
}