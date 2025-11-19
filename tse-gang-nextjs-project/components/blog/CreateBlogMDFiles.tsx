'use client'
import { useState } from "react";
import dynamic from "next/dynamic";

// Dynamically load MDEditor (needed for Next.js)
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });


export default function CreateBlogMDFiles() {
    // Form fields for filename (slug source) and markdown content
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    // Additional metadata that must travel with each blog post
    const [id, setId] = useState("");
    const [publishDate, setPublishDate] = useState(new Date().toISOString().slice(0, 10) // default to today so editors can just submit 
    );
    const [category, setCategory] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [author, setAuthor] = useState("");

    // Sends the current form data to /api/create-md so the server writes a .md file
    async function createMD() {
        const res = await fetch("/api/md-files/create-md",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    filename: title,
                    content,
                    id,
                    date: publishDate,
                    category,
                    excerpt,
                    author,
                })
            });
        const payload = await res.json();
        if (!res.ok) {
            console.error("Blog creation failed", payload);
            return;
        }
        // Notify other components (ViewBlogMDFiles) that new data is available
        window.dispatchEvent(new CustomEvent("blog:created"))
        console.log(await res.json());
    }

    return (
        <div className="flex grid justify-center">
            {/*Wrapper for the "create file" action*/}
            <div className="flex justify-center px-16">
                <button
                    onClick={createMD}
                    type="button"
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                >
                    Create File
                </button>
            </div>

            {/*Raw markdown input area*/}
            {/* Form inputs bound to filename/content state */}
            <div className="box">
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="bg-neutral-secondary-medium border border-default-medium text-heading text-base rounded-base focus:ring-brand focus:border-brand block w-full px-3.5 py-3 shadow-xs placeholder:text-body"
                    placeholder="filename/slug"
                    required
                />
                <input
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    className="mt-3 bg-neutral-secondary-medium border border-default-medium text-heading text-base rounded-base focus:ring-brand focus:border-brand block w-full px-3.5 py-3 shadow-xs placeholder:text-body"
                    placeholder="Display title/ ID"
                    required
                />
                <input
                    type="date"
                    value={publishDate}
                    onChange={(e) => setPublishDate(e.target.value)}
                    className="mt-3 bg-neutral-secondary-medium border border-default-medium text-heading text-base rounded-base focus:ring-brand focus:border-brand block w-full px-3.5 py-3 shadow-xs placeholder:text-body"
                    placeholder="Publish date"
                    required
                />
                <input
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="mt-3 bg-neutral-secondary-medium border border-default-medium text-heading text-base rounded-base focus:ring-brand focus:border-brand block w-full px-3.5 py-3 shadow-xs placeholder:text-body"
                    placeholder="Category (e.g. News)"
                    required
                />
                <input
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="mt-3 bg-neutral-secondary-medium border border-default-medium text-heading text-base rounded-base focus:ring-brand focus:border-brand block w-full px-3.5 py-3 shadow-xs placeholder:text-body"
                    placeholder="Author"
                    required
                />
                <input
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    className="mt-3 bg-neutral-secondary-medium border border-default-medium text-heading text-base rounded-base focus:ring-brand focus:border-brand block w-full px-3.5 py-3 shadow-xs placeholder:text-body"
                    placeholder="Short teaster / excerpt"
                    required
                />
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="mt-3 bg-neutral-secondary-medium border border-default-medium text-heading text-base rounded-base focus:ring-brand focus:border-brand block w-full px-3.5 py-3 shadow-xs placeholder:text-body"
                    placeholder="Markdown-content"
                    required
                />
                <div data-color-mode="light">
                    <MDEditor height={500}
                        value={content}
                        onChange={(value) => setContent(value || "")}
                    />
                </div>
            </div>
        </div>
    )
};