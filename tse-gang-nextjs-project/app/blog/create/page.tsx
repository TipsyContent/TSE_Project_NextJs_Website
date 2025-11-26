import CreateBlogMDFiles from "@/components/blog/CreateBlogMDFiles";
import ViewBlogMDFiles from "@/components/blog/ViewBlogMDFiles";

export default function CreateBlogPage() {
  return (
    <div className="w-full px-4 py-10 sm:py-14">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 rounded-3xl border border-gray-200 bg-white p-8 shadow-[0_18px_80px_rgba(15,23,42,0.08)]">
        <header className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-700">TSE Blog</p>
          <h1 className="text-3xl font-semibold text-slate-900">Create a new blog post</h1>
          <p className="max-w-3xl text-sm text-gray-600">
            Use the form below to add a new entry. The preview list updates after creation so you can
            confirm metadata and excerpts.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-gray-200 bg-gray-50/60 p-4 shadow-inner">
            <CreateBlogMDFiles />
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <ViewBlogMDFiles />
          </div>
        </div>
      </div>
    </div>
  );
}
