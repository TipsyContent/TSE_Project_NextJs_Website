import CreateBlogMDFiles from "@/components/blog/CreateBlogMDFiles";
import ViewBlogMDFiles from "@/components/blog/ViewBlogMDFiles";

//test
export default function Home() {
  return (
    <div className="flex items-center justify-center">
      <CreateBlogMDFiles />
      <ViewBlogMDFiles />
    </div>
  );
}
