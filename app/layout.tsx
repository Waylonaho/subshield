import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.subshieldhq.com"),
  title: {
    default: "Subcontractor Bid Calculator & Labor Burden Tool | SubShieldHQ",
    template: "%s | SubShieldHQ",
  },
  description:
    "Free subcontractor estimating tools. Calculate fully burdened labor rates, overhead recovery, markup vs. margin, and target project bids with your own assumptions.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Subcontractor Bid Calculator & Labor Burden Tool | SubShieldHQ",
    description:
      "Estimate burdened labor, job costs, and target bids with transparent contractor math.",
    url: "https://www.subshieldhq.com",
    siteName: "SubShieldHQ",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-950 text-slate-100">
        {children}
      </body>
    </html>
  );
}
