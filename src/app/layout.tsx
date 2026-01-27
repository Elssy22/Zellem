import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import JsonLd, { organizationJsonLd, artistJsonLd } from "@/components/JsonLd";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zellem.art"),
  title: {
    default: "Zellem | Art . Love . Life - Artiste Peintre",
    template: "%s | Zellem Art",
  },
  description: "Découvrez l'univers artistique de Zellem, artiste peintre française. Galerie d'œuvres originales, portraits et créations uniques. Achat d'art en ligne avec certificat d'authenticité.",
  keywords: ["Zellem", "artiste peintre", "art contemporain", "peinture", "galerie d'art", "portraits", "œuvres originales", "art français", "acheter art en ligne", "tableau original", "artiste française"],
  authors: [{ name: "Zellem", url: "https://zellem.art" }],
  creator: "Zellem",
  publisher: "Zellem",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Zellem | Art . Love . Life - Artiste Peintre",
    description: "Découvrez l'univers artistique de Zellem, artiste peintre française. Galerie d'œuvres originales et créations uniques.",
    type: "website",
    locale: "fr_FR",
    url: "https://zellem.art",
    siteName: "Zellem Art",
    images: [
      {
        url: "/images/LOGO.png",
        width: 800,
        height: 600,
        alt: "Zellem - Artiste Peintre",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zellem | Art . Love . Life",
    description: "Découvrez l'univers artistique de Zellem, artiste peintre française.",
    images: ["/images/LOGO.png"],
  },
  alternates: {
    canonical: "https://zellem.art",
  },
  category: "art",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={artistJsonLd} />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/images/LOGO.png" />
        <meta name="theme-color" content="#000000" />
      </head>
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
