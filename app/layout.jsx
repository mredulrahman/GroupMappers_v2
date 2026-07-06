import Script from "next/script";
import "../src/index.css";
import "../src/App.css";
import "@mantine/core/styles.css";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

export const metadata = {
  title: "GroupMappers",
  description: "GroupMappers company website and CMS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <head>
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/js/all.min.js"
          integrity="sha512-6BTOlkauINO65nLhXhthZMtepgJSghyimIalb+crKRPhvhmsCdnIuGcVbR5/aQY2A+260iC1OPy1oCdB6pSSwQ=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
          strategy="beforeInteractive"
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}