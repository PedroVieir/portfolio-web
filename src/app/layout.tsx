import "./globals.css";
import Header from "@/components/layout/Header";
import { Inter } from "next/font/google";
import { SITE_TITLE, SITE_DESCRIPTION } from "@/constants";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
};

/**
 * Root Layout
 * Main application layout with header
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} scroll-smooth`}>
      <body className="bg-white dark:bg-black text-gray-900 dark:text-white transition-colors">
        <Header />
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
