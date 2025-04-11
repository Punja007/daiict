import { Link } from "wouter";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Product: [
      { label: "Features", href: "#features" },
      { label: "Security", href: "#" },
      { label: "Pricing", href: "#" },
    ],
    Company: [
      { label: "About", href: "#about" },
      { label: "Contact", href: "#contact" },
      { label: "Privacy Policy", href: "#" },
    ],
    Resources: [
      { label: "Blog", href: "#" },
      { label: "Help Center", href: "#" },
      { label: "Community", href: "#" },
    ],
  };

  return (
    <footer className="bg-slate-900 text-slate-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="text-2xl font-bold">
              Prosperify
            </Link>
            <p className="mt-4 text-slate-400 text-sm">
              Your trusted AI financial advisor for a prosperous future.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold mb-4">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-slate-400 hover:text-slate-200 transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-sm text-slate-400">
          <p>© {currentYear} Prosperify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
