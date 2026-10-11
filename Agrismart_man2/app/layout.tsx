import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://agrismartmrt.my.id"),
  title: {
    default: "AgriSmart | MAN 2 Mataram",
    template: "%s | AgriSmart MAN 2 Mataram",
  },
  description:
    "Dashboard pemantauan lahan pertanian cerdas berbasis sensor IoT dan rekomendasi pemupukan berbasis Machine Learning — MAN 2 Mataram.",
  keywords: [
    "AgriSmart",
    "MAN 2 Mataram",
    "Smart Agriculture",
    "IoT Pertanian",
    "Monitoring Tanah",
    "Rekomendasi Pemupukan",
    "Machine Learning Pertanian",
    "Sensor NPK",
    "Pertanian Presisi",
  ],
  authors: [{ name: "MAN 2 Mataram" }],
  creator: "MAN 2 Mataram",
  publisher: "MAN 2 Mataram",
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
    title: "AgriSmart - Smart Agriculture System MAN 2 Mataram",
    description:
      "Dashboard pemantauan lahan pertanian cerdas berbasis sensor IoT dan rekomendasi pemupukan berbasis Machine Learning — MAN 2 Mataram.",
    url: "https://agrismartmrt.my.id",
    siteName: "AgriSmart MAN 2 Mataram",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/sawahA.jpg",
        width: 1200,
        height: 630,
        alt: "AgriSmart MAN 2 Mataram Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AgriSmart | MAN 2 Mataram",
    description:
      "Dashboard pemantauan lahan pertanian cerdas berbasis sensor IoT dan rekomendasi pemupukan berbasis Machine Learning.",
    images: ["/sawahA.jpg"],
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
