import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Zellem | Art . Love . Life",
  description: "Découvrez l'univers artistique de Zellem, artiste peintre. Galerie d'œuvres originales, portraits et créations uniques.",
  keywords: ["Zellem", "artiste peintre", "art contemporain", "peinture", "galerie", "portraits"],
  authors: [{ name: "Zellem" }],
  openGraph: {
    title: "Zellem | Art . Love . Life",
    description: "Découvrez l'univers artistique de Zellem, artiste peintre.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Providers>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
