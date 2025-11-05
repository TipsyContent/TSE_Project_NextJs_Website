"use client";

import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useCallback, useMemo, useState } from "react";
import { Link as LinkIcon } from "lucide-react";

// tiny slug helper so each question can have a friendly anchor in the URL
function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export enum category {
  Category1 = "YES",
  Category2 = "NO",
  Category3 = "MAYBE"
}

export function QuestionAnswer({
  question,
  answer,
  id: providedId,
}: {
  question: string;
  answer: string;
  category: category;
  id?: string;
}) {
  // lock in a stable id so the accordion + hash links agree about which item is open
  const id = useMemo(() => providedId || slugify(question), [providedId, question]);
  // track the little "Copied" callout so folks get feedback after clicking the button
  const [copied, setCopied] = useState(false);

  // build a shareable link to this exact question and push it to the clipboard
  const copyLink = useCallback(async () => {
    try {
      const url = `${window.location.origin}${window.location.pathname}#${id}`;
      await navigator.clipboard?.writeText(url);
      // Reflect hash in URL without scrolling
      window.history.replaceState(null, "", `#${id}`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // noop
    }
  }, [id]);

  return (
    <AccordionItem value={id}>
      {/* tying the trigger id to the slug means we can focus it when someone lands on a hash */}
      <AccordionTrigger id={id}>{question}</AccordionTrigger>
      <AccordionContent>
        <div className="flex items-center justify-between">
          <div>{answer}</div>
          <button
            type="button"
            onClick={copyLink}
            className="text-xs inline-flex items-center gap-1 rounded px-2 py-1 text-muted-foreground hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            aria-label="Copy link to this question"
          >
            {/* quick visual indicator so folks know they grabbed the link */}
            <LinkIcon className="h-3 w-3" /> {copied ? "Copied" : "Copy link"}
          </button>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
