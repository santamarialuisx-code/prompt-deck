import Link from "next/link";
import { Shield, CreditCard, Lock } from "lucide-react";

const footerSections = [
  {
    title: "Product",
    links: [
      { href: "/gallery", label: "Gallery" },
      { href: "/free", label: "Free Samples" },
      { href: "/checkout", label: "Pricing" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/gallery", label: "Browse Prompts" },
      { href: "/free", label: "Try Free" },
    ],
  },
  {
    title: "Account",
    links: [
      { href: "/login", label: "Login" },
      { href: "/register", label: "Register" },
      { href: "/account", label: "Dashboard" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "#", label: "Privacy Policy" },
      { href: "#", label: "Terms of Service" },
      { href: "#", label: "Refund Policy" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Trust badges */}
        <div className="flex items-center justify-center gap-8 mb-12 text-gray-500">
          <div className="flex items-center gap-2 text-sm">
            <Shield className="h-4 w-4 text-[#f97316]" />
            <span>Secure Checkout</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <CreditCard className="h-4 w-4 text-[#f97316]" />
            <span>Pay Once, Own Forever</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Lock className="h-4 w-4 text-[#f97316]" />
            <span>30-Day Guarantee</span>
          </div>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-bold text-white mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="border-t border-white/5 pt-8 text-center text-sm text-gray-600">
          &copy; {new Date().getFullYear()} Prompt Deck. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
