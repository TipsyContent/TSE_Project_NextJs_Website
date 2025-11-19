import BlogList from "@/components/blog/BlogList";
import CreateBlogMDFiles from "@/components/blog/CreateBlogMDFiles";
import ViewBlogMDFiles from "@/components/blog/ViewBlogMDFiles";

//test
export default async function Home() {
  
  return (
    <div className="flex items-center justify-center">
      {/* client-side blog list */}
      <CreateBlogMDFiles />
      <ViewBlogMDFiles />

      {/* Server-side blog list */}
      <BlogList />
    </div>
  );
}
