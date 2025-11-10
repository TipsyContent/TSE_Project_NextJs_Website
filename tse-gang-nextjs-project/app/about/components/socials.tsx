export function AboutSocials() {
  return (
    <div className="flex justify-center gap-5 flex-wrap mt-4">
      <a
        href="https://x.com/TSEOfficials"
        className="w-16 h-16 bg-tse-red flex items-center justify-center rounded-full hover:bg-red-700 transition hover:scale-105"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fab fa-twitter text-white fa-2xl"></i>
      </a>
      <a
        href="https://discord.gg/pefQ68BZqm"
        className="w-16 h-16 bg-tse-red flex items-center justify-center rounded-full hover:bg-red-700 transition hover:scale-105"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fab fa-discord text-white fa-2xl"></i>
      </a>
    </div>
  );
}
