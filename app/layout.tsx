import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Guyub — RT Digital yang Tetap Guyub",
  description:
    "Kelola data warga, iuran kas, pengumuman, dan surat pengantar RT dalam satu aplikasi. Dari Purwokerto untuk Indonesia.",
  metadataBase: new URL("https://guyub.app"),
  openGraph: {
    title: "Guyub — RT Digital yang Tetap Guyub",
    description:
      "Tinggalkan buku tulis dan mading. Kelola RT lebih rapih dengan WhatsApp dan QRIS. Gratis untuk RT ≤50 KK.",
    type: "website",
    locale: "id_ID",
  },
  keywords: [
    "aplikasi RT",
    "digitalisasi RT",
    "kelola data warga",
    "iuran RT digital",
    "surat pengantar online",
    "RT RW Indonesia",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
