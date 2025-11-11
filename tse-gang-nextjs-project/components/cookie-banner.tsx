'use client';

import Link from "next/link";
import { useEffect, useState, ChangeEvent } from "react";

const STORAGE_KEY = "tse-cookie-consent";
type ConsentChoice = "essential" | "all";

const CookieBanner = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [choice, setChoice] = useState<ConsentChoice>("essential");

  useEffect(() => {
    setIsMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as ConsentChoice | null;
      if (!stored) {
        setIsVisible(true);
        return;
      }
      setChoice(stored);
    } catch {
      setIsVisible(true);
    }
  }, []);

  const saveChoice = (value: ConsentChoice) => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // best-effort only; failure just means the banner may reappear
    }
    setIsVisible(false);
  };

  const onRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChoice(event.target.value as ConsentChoice);
  };

  if (!isMounted || !isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-4">
      <div className="w-full max-w-3xl rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-gray-800 dark:bg-zinc-900">
        <p className="text-sm font-semibold uppercase tracking-wide text-gray-900 dark:text-gray-100">
          Cookies & consent
        </p>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          We only set essential cookies to keep this site running. Optional
          analytics help us improve future tournaments and are switched off
          unless you agree. Read our{" "}
          <Link
            href="/privacy"
            className="text-blue-600 underline-offset-2 hover:underline dark:text-blue-400"
          >
            Privacy Policy
          </Link>{" "}
          for full details.
        </p>

        <fieldset className="mt-4 space-y-3" aria-label="Cookie preference">
          <label
            htmlFor="consent-essential"
            className="flex cursor-pointer gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-3 text-left dark:border-gray-700 dark:bg-zinc-800"
          >
            <input
              id="consent-essential"
              type="radio"
              name="cookie-choice"
              value="essential"
              checked={choice === "essential"}
              onChange={onRadioChange}
              className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Essential only
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Stores preferences needed for security and core functionality.
              </p>
            </div>
          </label>

          <label
            htmlFor="consent-all"
            className="flex cursor-pointer gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-3 text-left dark:border-gray-700 dark:bg-zinc-800"
          >
            <input
              id="consent-all"
              type="radio"
              name="cookie-choice"
              value="all"
              checked={choice === "all"}
              onChange={onRadioChange}
              className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Essential + optional
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Allows anonymous analytics to help us plan events and sponsor
                activations.
              </p>
            </div>
          </label>
        </fieldset>

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => saveChoice(choice)}
            className="flex-1 rounded-full bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
          >
            Save preference
          </button>
          <button
            type="button"
            onClick={() => saveChoice("all")}
            className="flex-1 rounded-full border border-blue-600 px-4 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400/10"
          >
            Accept optional too
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
