import { Button } from "./button"
import React from "react"
import { Mail } from "lucide-react"
import { FaWhatsapp, FaInstagram } from "react-icons/fa"
import { Link } from "react-router-dom"

interface FooterProps {
  logo?: React.ReactNode
  brandName?: string
  socialLinks?: Array<{
    icon: React.ReactNode
    href: string
    label: string
  }>
  mainLinks?: Array<{
    href: string
    label: string
    active?: boolean
  }>
  legalLinks?: Array<{
    href: string
    label: string
  }>
  copyright?: {
    text: string
    license?: string
  }
}

export function Footer({
  logo,
  brandName = "Dity Engine",
  socialLinks = [
    {
      icon: <FaWhatsapp className="h-5 w-5" />,
      href: "https://wa.me/62895634048237",
      label: "WhatsApp",
    },
    {
      icon: <FaInstagram className="h-5 w-5" />,
      href: "https://www.instagram.com/adity_ptra",
      label: "Instagram",
    },
    {
      icon: <Mail className="h-5 w-5" />,
      href: "mailto:dity.store31@gmail.com",
      label: "Email",
    },
  ],
  mainLinks = [
    { href: "#tools", label: "Local Context Packer", active: true },
    { href: "#tools", label: "Smart Boilerplate", active: true },
    { href: "#tools", label: "Token Cost Tracker", active: true },
    { href: "#tools", label: "PRD Architect", active: true },
  ],
  legalLinks = [
    { href: "#", label: "Kebijakan Privasi" },
    { href: "#", label: "Syarat & Ketentuan" },
    { href: "#", label: "Pusat Bantuan" },
  ],
  copyright = {
    text: "© 2026 Dity Engine. Hak cipta dilindungi.",
  },
}: FooterProps = {}) {
  return (
    <footer className="pb-12 pt-24 border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="md:flex md:items-start md:justify-between">
          <Link
            to="/"
            className="flex items-center gap-x-2 hover:opacity-90 transition-opacity"
            aria-label={brandName}
          >
            {logo}
            <span className="font-black text-2xl tracking-tighter text-foreground">{brandName}</span>
          </Link>
          <ul className="flex list-none mt-8 md:mt-0 gap-3">
            {socialLinks.map((link, i) => (
              <li key={i}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-full border border-border flex items-center justify-center p-0 text-foreground hover:text-foreground hover:bg-accent transition-all opacity-80 hover:opacity-100"
                  asChild
                >
                  <a href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label}>
                    {link.icon}
                  </a>
                </Button>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="border-t border-border mt-12 pt-12">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12">
            <div className="flex-1 max-w-3xl">
              <nav aria-label="Main navigation">
                <ul className="list-none grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-8">
                  {mainLinks.map((link: any, i) => (
                    <li key={i} className="shrink-0">
                      {link.active === false ? (
                        <span className="text-sm font-medium text-muted-foreground cursor-default opacity-40 select-none">
                          {link.label}
                        </span>
                      ) : (
                        <a
                          href={link.href}
                          className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className="flex flex-col gap-8 lg:items-end lg:text-right border-t lg:border-t-0 border-border/30 pt-8 lg:pt-0">
              <nav aria-label="Legal navigation">
                <ul className="list-none flex flex-wrap gap-x-8 gap-y-4 lg:justify-end">
                  {legalLinks.map((link, i) => (
                    <li key={i}>
                      <Link
                        to={link.href}
                        className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="text-sm text-muted-foreground opacity-50 font-medium">
                &copy; {new Date().getFullYear()} Dity Engine. Hak cipta dilindungi.
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
