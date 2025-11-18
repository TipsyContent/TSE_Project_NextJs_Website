'use client'
import { useState } from "react";

export default function CreateBlogMDFiles() {
    // Form fields for filename (slug source) and markdown content
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    // Sends the current form data to /api/create-md so the server writes a .md file
    async function createMD() {
      const res = await fetch("/api/md-files/create-md", 
        { 
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({ filename: title, content})
        });
      console.log(await res.json());
    }
    
    return(
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
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="mt-3 bg-neutral-secondary-medium border border-default-medium text-heading text-base rounded-base focus:ring-brand focus:border-brand block w-full px-3.5 py-3 shadow-xs placeholder:text-body"
                placeholder="Markdown-content"
                required
            />    
            </div>
        </div>
    )
};