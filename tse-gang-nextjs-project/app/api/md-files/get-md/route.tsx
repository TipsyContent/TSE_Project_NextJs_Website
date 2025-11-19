import path from "path";
import { readFile} from "fs/promises";


const BLOG_DIR = path.join(process.cwd(), "data", "blogs");

export async function GET(req : Request){
    try{
        const { searchParams } = new URL(req.url);
        const slug = searchParams.get("slug");
        const view = searchParams.get("view");

       if (!slug){
        return new Response(
            JSON.stringify({error: "Slug is required"}),
        { status: 400});

        }
       
        const mdPath = path.join(BLOG_DIR, slug, `${slug}.md`);

        const content = await readFile(mdPath, "utf-8");

        if (view === "true"){
            console.log(`File content of ${slug} :`, content)
        }

        return new Response(JSON.stringify({slug, content}), 

        { status: 200, headers: {"Content-Type": "application/json"},
    }
    );

    } catch (error) {
    // Surface a simple error payload to the client; avoid leaking internals
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {status: 500})
  }
}