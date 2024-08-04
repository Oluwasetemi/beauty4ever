import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Beauty4ever",
    default: "Beauty4ever Online Store",
  },
  description:
    "Beauty4ever is a beauty store that sells beauty products and cosmetics. We have a wide range of products that cater to all skin types and tones. Our products are cruelty-free and made with natural ingredients. Shop now and get free shipping on orders over $50.",
  metadataBase: new URL("https://next-learn-dashboard.vercel.sh"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
