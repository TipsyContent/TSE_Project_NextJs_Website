"use client";

import { useEffect, useMemo, useState } from "react";
import { QuestionAnswer } from "@/components/faq";
import { Accordion } from "@/components/ui/accordion";

// same slug trick as the component so IDs stay predictable
function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function Faq() {
  // map the raw QA data into accordion-ready objects that already know their id
  const items = useMemo(
    () => [
      { question: "me?", answer: "yes, you" },
      { question: "you?", answer: "yes, me" },
    ].map((q) => ({ ...q, id: slugify(q.question) })),
    []
  );

  // keep a list of open sections so the accordion actually responds to hash changes
  const [open, setOpen] = useState<string[]>([]);

  useEffect(() => {
    // handy helper so we can reuse the focus/scroll dance
    const focusQuestion = (hash: string) => {
      const el = document.getElementById(hash);
      if (el) {
        (el as HTMLElement).focus({ preventScroll: true });
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    if (typeof window === "undefined") {
      return;
    }

    // stash helper so we can reuse it for the initial hash and the event listener
    const openAndFocus = (hash: string) => {
      if (!hash) return;
      if (!items.some((it) => it.id === hash)) return;
      setOpen((prev) => (prev.includes(hash) ? prev : [...prev, hash]));
      focusQuestion(hash);
    };

    // run once so anyone landing directly on a hash gets taken to the right spot, but defer state updates
    let rafId: number | undefined;
    const runInitialHash = () => {
      const hash = window.location.hash.replace(/^#/, "");
      if (!hash) return;
      rafId = window.requestAnimationFrame(() => openAndFocus(hash));
    };
    runInitialHash();

    // if someone lands on /faq#some-question, open that panel and bring it into view
    const onHash = () => {
      const hash = window.location.hash.replace(/^#/, "");
      openAndFocus(hash);
    };

    // run the hash dance on first paint and wire up normal hashchange events
    window.addEventListener("hashchange", onHash);
    return () => {
      window.removeEventListener("hashchange", onHash);
      if (rafId !== undefined) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [items]);

  return (
    <div>
      <h1>Frequently asked questions</h1>
      <div className="w-50">
        <Accordion type="multiple" value={open} onValueChange={setOpen}>
          {items.map((item) => (
            <QuestionAnswer
              key={item.id}
              id={item.id}
              question={item.question}
              answer={item.answer}
            />)
          )}
        </Accordion>
      </div>
    </div>
  );
}
