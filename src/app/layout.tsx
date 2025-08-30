import type { Metadata } from "next";
import { Inter, Fira_Code, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { TeamSelector } from "@/components/team-selector";
import { Footer } from "@/components/footer";
import Link from "next/link";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Axiom Keeper Client",
  description: "Fantasy football keeper draft arbitration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${inter.className} ${playfairDisplay.variable} ${playfairDisplay.className} ${firaCode.variable} ${firaCode.className} antialiased font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <div className="min-h-screen bg-background text-foreground flex flex-col">
            <header className="border-b border-border/40">
              <div className="container mx-auto px-4 py-6">
                <div className="flex items-center justify-between">
                  <Link href="/setup" className="text-2xl font-bold font-serif hover:opacity-80 transition-opacity cursor-pointer">
                    Axiom Keeper Client
                  </Link>
                  <div className="flex items-center gap-4">
                    <TeamSelector />
                    <ThemeToggle />
                  </div>
                </div>
              </div>
            </header>
            <main className="container mx-auto px-4 py-8 flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
