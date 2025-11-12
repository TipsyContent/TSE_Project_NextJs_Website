const POLICY_SECTIONS = [
  {
    title: "What data do we collect?",
    body:
      "When you contact us we store your name, email address and the content of your enquiry so we can respond with the right information.",
  },
  {
    title: "Why do we store it?",
    body:
      "We only use your details to reply to your request, follow up on sponsorship conversations or provide documents you specifically asked for.",
  },
  {
    title: "How long do we keep it?",
    body:
      "Your data is retained only for as long as it takes to resolve your enquiry, unless UK law requires a longer retention period.",
  },
  {
    title: "What are your rights?",
    body:
      "You can request access, correction or deletion of your data at any time by emailing privacy@tse-esports.com. We will respond within 30 days.",
  },
];

export const metadata = {
  title: "Privacy Policy | TSE ESPORTS",
  description:
    "Learn how TSE ESPORTS collects, stores and safeguards personal information in line with UK GDPR.",
};

export default function PrivacyPage() {
  return (
    <section className="w-full px-6 py-16 sm:px-10 lg:px-0">
      <div className="mx-auto max-w-3xl space-y-8">
        <header className="space-y-4 text-center">
          <p className="text-sm uppercase tracking-widest text-gray-500">
            Privacy Policy
          </p>
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
            How we protect your information
          </h1>
          <p className="text-base text-gray-600 dark:text-gray-300">
            TSE ESPORTS operates from the UK and follows the UK GDPR. We only
            gather the details we need to support your enquiry and we keep them
            secure at every step.
          </p>
        </header>

        <div className="space-y-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-zinc-900">
          {POLICY_SECTIONS.map((section) => (
            <article key={section.title} className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {section.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">{section.body}</p>
            </article>
          ))}
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm dark:border-gray-800 dark:bg-zinc-900">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Questions about your data? Email{" "}
            <a
              className="text-blue-600 underline-offset-2 hover:underline dark:text-blue-400"
              href="mailto:privacy@tse-esports.com"
            >
              privacy@tse-esports.com
            </a>{" "}
            and we will get back to you as soon as possible.
          </p>
        </div>
      </div>
    </section>
  );
}
