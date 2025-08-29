import type { Metadata } from "next";
import { Special_Elite, Courier_Prime, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { Footer } from "@/components/footer";

const specialElite = Special_Elite({
  variable: "--font-special-elite",
  subsets: ["latin"],
  weight: "400",
});

const courierPrime = Courier_Prime({
  variable: "--font-courier-prime",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
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
        className={`${specialElite.variable} ${courierPrime.variable} ${jetbrainsMono.variable} antialiased font-sans`}
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
                  <h1 className="text-2xl font-bold font-serif">Axiom Keeper Client</h1>
                  <div className="flex items-center gap-4">
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
