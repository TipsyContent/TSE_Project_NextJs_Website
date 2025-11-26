import Link from "next/link";
import { getBlogs } from "@/lib/blogs";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function BlogPage() {
  const blogs = await getBlogs();
  const timelineItems = blogs.slice(0, 6);

  return (
    <div className="w-full px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-6xl rounded-3xl border border-gray-300 bg-white shadow-[0_18px_80px_rgba(15,23,42,0.08)]">
        <header className="flex flex-col items-center gap-4 border-b border-gray-200 px-6 pb-10 pt-12">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-700">
            TSE Blog
          </p>
          <h1 className="text-4xl font-semibold text-slate-900">Insights, updates, and stories</h1>
          <p className="max-w-2xl text-center text-base text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Integer nec
            consequat libero, vitae laoreet lacus. Newest posts appear first with a short snippet and a
            picture placeholder until visuals are provided.
          </p>
        </header>

        <div className="grid gap-6 px-6 pb-14 pt-10 md:grid-cols-[200px_1fr] lg:grid-cols-[220px_1fr] md:items-start">
          <aside className="relative w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-5 shadow-inner md:max-w-[200px] lg:max-w-[220px]">
            <div className="mb-4 text-sm font-semibold uppercase tracking-[0.15em] text-gray-700">
              Latest titles
            </div>
            <div
              className="relative"
              style={{
                maskImage: "linear-gradient(to bottom, black 75%, transparent)",
                WebkitMaskImage: "linear-gradient(to bottom, black 75%, transparent)",
              }}
            >
              <ul className="space-y-4 text-sm text-gray-800">
                {timelineItems.length ? (
                  timelineItems.map((blog) => (
                    <li key={blog.slug} className="py-1">
                      <div className="text-base font-semibold leading-snug text-gray-900">{blog.title}</div>
                      <div className="text-xs text-gray-500">{formatDate(blog.date)}</div>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500">No posts yet — stay tuned.</li>
                )}
              </ul>
            </div>
            <div className="mt-6">
              <Link
                href="/blog/create"
                className="inline-flex w-full items-center justify-center rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700 transition hover:border-blue-300 hover:bg-blue-100"
              >
                Add Blog
              </Link>
            </div>
          </aside>

          <section className="space-y-6">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <h2 className="text-2xl font-semibold text-slate-900">Latest Posts</h2>
              <p className="text-sm text-gray-500">Newest to oldest</p>
            </div>

            <div className="space-y-6">
              {blogs.length ? (
                blogs.map((blog) => (
                  <Link
                    key={blog.slug}
                    href={`/blog/${blog.slug}`}
                    className="block rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-[2px] hover:shadow-xl"
                  >
                    <div className="flex flex-col gap-5 md:flex-row md:items-center">
                      <div className="flex-1 space-y-3">
                        <p className="text-xs uppercase tracking-[0.22em] text-gray-500">
                          {formatDate(blog.date)} · {blog.category}
                        </p>
                        <h3 className="text-2xl font-semibold text-gray-900">{blog.title}</h3>
                        <div className="flex items-center gap-3 text-sm text-gray-700">
                          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                            {(blog.author || "W")[0]?.toUpperCase()}
                          </span>
                          <span className="text-gray-800">{blog.author || "Writer"}</span>
                        </div>
                        <p className="text-base text-gray-700">
                          {blog.excerpt || "No excerpt provided yet."}
                        </p>
                      </div>
                      <div className="w-full max-w-[210px] self-stretch md:w-48">
                        <div className="flex h-full min-h-[150px] items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100 text-center text-sm text-gray-500">
                          Image placeholder
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 space-y-2">
                      <div className="h-[2px] w-full rounded-full bg-gray-200" />
                      <div className="h-[2px] w-11/12 rounded-full bg-gray-200" />
                    </div>
                  </Link>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-10 text-center text-gray-500">
                  No blog posts yet. Check back soon for the first story.
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
