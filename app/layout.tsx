import type { Metadata } from "next";
import { Roboto } from 'next/font/google'
import "@/app/globals.css"
const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] })

export const metadata: Metadata = {
  title: {
    template: '%s | Virnika',
    default: 'My Cart | Virnika',
  },
  description: "View items added to My Cart, powered by Virnika",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={roboto.className}>
        <main className="mx-auto p-4">
          {children}
        </main>
      </body>
    </html>
  );
}
