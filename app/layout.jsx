import "./../styles/globals.css";

export const metadata = {
  title: {
    template: "%s — Porta da Lagoa B&B",
    default: "Porta da Lagoa — B&B met zeezicht, wellness & wijn",
  },
  description:
    "Moderne B&B met zeezicht, wellness en selectie van uitstekende rode wijnen.",
  metadataBase: new URL("https://portadalagoa.example"),
  openGraph: {
    title: "Porta da Lagoa — B&B",
    description: "Moderne B&B met zeezicht, wellness (sauna) en rode wijn.",
    type: "website",
    url: "https://portadalagoa.example",
    images: [
      {
        url: "https://images.unsplash.com/photo-1495954484750-af469f2f9be5?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Porta da Lagoa",
      },
    ],
  },
  icons: { icon: "/icon.svg" },
  alternates: { canonical: "/" },
};

import Script from "next/script";

export default function RootLayout({ children }) {
  return (
    <html lang="nl">
      <body>
        {children}

        <Script
          id="grecaptcha-v3"
          strategy="afterInteractive"
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
        />
      </body>
    </html>
  );
}
