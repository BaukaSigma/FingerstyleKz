import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { cookies } from "next/headers";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: {
    template: '%s | FingerstyleKz',
    default: 'FingerstyleKz - Қазақша fingerstyle табулатура',
  },
  description: "Қазақ әндеріне арналған сапалы гитара табтары. PDF, GPX форматтары.",
  openGraph: {
    title: 'FingerstyleKz',
    description: 'Қазақ әндеріне арналған сапалы гитара табтары.',
    url: 'https://fingerstyle.kz',
    siteName: 'FingerstyleKz',
    locale: 'kk_KZ',
    type: 'website',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "kz";

  return (
    <html lang={locale} className="dark">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <Header locale={locale} />
          <main className="flex-1">{children}</main>
          <Footer locale={locale} />
        </div>
      </body>
    </html>
  );
}
