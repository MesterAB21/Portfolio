import type { Metadata } from "next";
import { Syne, JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";
import dynamic from "next/dynamic";
import FluidCursor from "@/components/ui/FluidCursor";

const SmoothScrollProvider = dynamic(() => import("@/components/providers/SmoothScrollProvider"), { ssr: false });
const PageIntroProvider = dynamic(() => import("@/components/providers/PageIntroProvider"), { ssr: false });
const ScrollAnimationProvider = dynamic(() => import("@/components/providers/ScrollAnimationProvider"), { ssr: false });
const FloatingOrbs = dynamic(() => import("@/components/ui/FloatingOrbs"), { ssr: false });

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-syne",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hamaidi Abderrahmane — Full-Stack Developer · Data Scientist · AI Engineer",
  description: "Portfolio of Hamaidi Abderrahmane, a full-stack developer, data scientist, and AI automation engineer based in Algeria.",
  openGraph: {
    title: "Hamaidi Abderrahmane — Full-Stack Developer · Data Scientist · AI Engineer",
    description: "Portfolio of Hamaidi Abderrahmane, a full-stack developer, data scientist, and AI automation engineer based in Algeria.",
    type: "website",
    images: ["/og-image.svg"],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${syne.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-base text-text-1 font-syne antialiased">
        <FluidCursor />
        <SmoothScrollProvider>
          <PageIntroProvider>
            <div
              id="page-intro"
              style={{
                position: 'fixed',
                inset: 0,
                background: '#000000',
                zIndex: 9999,
                pointerEvents: 'none',
              }}
            />
            <FloatingOrbs />
            <div className="grain" aria-hidden="true" />
            <ScrollAnimationProvider>
              {children}
            </ScrollAnimationProvider>
          </PageIntroProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
