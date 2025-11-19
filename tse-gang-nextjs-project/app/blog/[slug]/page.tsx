// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import path from "path";
import fs from "fs";
import { compileMDX } from "next-mdx-remote/rsc";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllSlugs } from "@/lib/blog";

interface BlogPageProps {
  params: {
    slug: string;
  };
}



export const dynamic = "force-dynamic";

export default async function BlogPost(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  console.log("All slugs:", getAllSlugs());

  if (!slug) {
    return notFound();
  }

  const folderPath = path.join(process.cwd(), "data", "blogs", slug);
  const slugMarkdownPath = path.join(folderPath, `${slug}.md`);
  const legacyContentPath = path.join(folderPath, "content.md");
  const contentPath = fs.existsSync(slugMarkdownPath)
    ? slugMarkdownPath
    : legacyContentPath;

  const metaPath = path.join(folderPath, "meta.json");

  if (!fs.existsSync(contentPath) || !fs.existsSync(metaPath)) return notFound();

  const contentRaw = fs.readFileSync(contentPath, "utf-8");
  const metaRaw = fs.readFileSync(metaPath, "utf-8");
  const meta = JSON.parse(metaRaw);

  const { content: ContentElement } = await compileMDX({
    source: contentRaw,
    components: {
      h1: (props) => <h1 className="text-4xl font-bold mt-8 mb-4" {...props} />,
      h2: (props) => <h2 className="text-3xl font-semibold mt-6 mb-3" {...props} />,
      h3: (props) => <h3 className="text-2xl font-semibold mt-4 mb-2" {...props} />,
      h4: (props) => <h4 className="text-xl font-semibold mt-3 mb-1" {...props} />,
      h5: (props) => <h5 className="text-lg font-semibold mt-2 mb-1" {...props} />,
      h6: (props) => <h6 className="text-base font-semibold mt-1 mb-1" {...props} />,
      p: (props) => <p className="mb-4" {...props} />,
      ul: (props) => <ul className="list-disc ml-6 mb-4" {...props} />,
      li: (props) => <li className="mb-2" {...props} />,
      strong: (props) => <strong className="font-bold" {...props} />,
      em: (props) => <em className="italic" {...props} />,
      hr: (props) => <hr className="my-6 border-gray-600" {...props} />,
    },
  });

  return (
    <article className="prose prose-invert max-w-3xl mx-auto py-10">
      <h1>{meta.title}</h1>
      <p className="text-gray-400 text-sm">
        {meta.date} • {meta.category} • by {meta.author}
      </p>
      <div className="mt-6">
        {ContentElement}
      </div>
    </article>
  );
}
