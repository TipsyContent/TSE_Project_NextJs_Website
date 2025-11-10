import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-zinc-50 px-6 text-center font-sans dark:bg-black">
      <p className="text-gray-700 dark:text-gray-200">
        Before you reach out, feel free to review how we look after your data:
      </p>
      <Link
        href="/privacy"
        className="text-base font-medium text-blue-600 underline-offset-4 hover:underline dark:text-blue-400"
      >
        Privacy Policy
      </Link>
    </div>
  );
}

