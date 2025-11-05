'use client'

import Link from "next/link";
import React from "react";

const SOCIAL_LINKS = [
  { href: "https://x.com/TSEOfficials", icon: "fab fa-twitter" },
  { href: "#2", icon: "fab fa-instagram" },
  { href: "#3", icon: "fab fa-youtube" },
  { href: "#4", icon: "fab fa-discord" },
  { href: "#5", icon: "fab fa-twitch" },
  { href: "#6", icon: "fab fa-reddit" },
  { href: "#7", icon: "fa-solid fa-mug-hot" },
  { href: "#8", icon: "fa-brands fa-github" },
];

const FOOTER_LINKS = [
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

const Footer: React.FC = () => {
  return (
    <footer className="outer-footer-container bg-neutral-900 text-white mt-auto">
      <div className="footer-container mx-auto max-w-5xl px-6 py-10 text-center">
        <div className="footer-content">
          <h3 className="text-2xl font-bold mb-4">TSE ESPORTS</h3>

          <section className="footer-links mb-6">
            <div className="flex flex-wrap justify-center gap-4">
              {FOOTER_LINKS.map((link) => (
                <h6 key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-tse-yellow transition-colors"
                  >
                    {link.label}
                  </Link>
                </h6>
              ))}
            </div>
          </section>

          <hr className="footer-hr border-gray-700 my-6" />

          <p className="text-gray-400 mb-6">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam
            quia, eum, voluptatem quidem iusto voluptas, quod autem, maxime
            doloremque quibusdam quae.
          </p>

          <ul className="footer-socials flex justify-center gap-5 flex-wrap">
            {SOCIAL_LINKS.map((social) => (
              <li key={social.href}>
                <a
                  className="socials-icon text-gray-400 hover:text-tse-yellow transition-colors text-xl"
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className={social.icon} aria-hidden="true"></i>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer-bottom bg-black py-4">
        <p className="text-gray-500 text-sm text-center">
          &copy; Something sometthing
        </p>
      </div>
    </footer>
  );
};

export default Footer;
