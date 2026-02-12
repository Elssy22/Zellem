import Link from "next/link";
import SocialIcons from "@/components/ui/SocialIcons";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-8">
      <div className="px-[3vw]">
        {/* Legal Links */}
        <div className="flex flex-wrap justify-center gap-6 mb-6 text-xs text-gray-400">
          <Link href="/cgv" className="hover:text-black transition-colors">
            Conditions Générales de Vente
          </Link>
          <Link href="/mentions-legales" className="hover:text-black transition-colors">
            Mentions Légales
          </Link>
          <Link href="/confidentialite" className="hover:text-black transition-colors">
            Politique de Confidentialité
          </Link>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Social Icons */}
          <SocialIcons size="sm" />

          {/* Credit */}
          <p className="text-xs text-gray-400 tracking-wide">
            © {new Date().getFullYear()} Zellem — Art . Love . Life
          </p>
        </div>
      </div>
    </footer>
  );
}
