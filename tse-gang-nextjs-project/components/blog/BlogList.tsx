import Link from "next/link";
import { getBlogs } from "@/lib/blogs";

export default async function BlogList() {
  const blogs = await getBlogs();

  if (!blogs.length) {
    return (
      <p className="text-center text-gray-400 mt-8">
        Ingen blogindlæg endnu. Opret det første ovenfor.
      </p>
    );
  }

  return (
    <section className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
      {blogs.map((blog) => (
        <Link
          key={blog.slug}
          href={`/blog/${blog.slug}`}
          className="block rounded-lg border border-gray-700 bg-gray-900/40 p-5 shadow hover:border-brand hover:bg-gray-900/60 transition-colors"
        >
          <p className="text-xs uppercase tracking-wide text-gray-400">
            {new Date(blog.date).toLocaleDateString("da-DK")} · {blog.category}
          </p>
          <h3 className="mt-2 text-xl font-semibold text-white">{blog.title}</h3>
          <p className="mt-2 text-sm text-gray-300 line-clamp-3">{blog.excerpt || "Ingen teaser angivet."}</p>
          <p className="mt-3 text-xs text-gray-500">Af {blog.author}</p>
        </Link>
      ))}
    </section>
  );
}
