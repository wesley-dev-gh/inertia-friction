import "./globals.css";
import { nimbusSans } from "../../public/fonts";
import TabTitle from "@/components/TabTitle";
import ScreenBlocker from "@/components/ScreenBlocker";

export const metadata = {
  metadataBase: new URL("https://inertiafrictionrc.vercel.app/"),

  title: {
    default: "Inertia Friction — Interactive Physics Experience",
    template: "%s | Inertia Friction",
  },

  description:
    "Explore an interactive physics experience where motion, friction, and particle interactions come together through a real-time Canvas simulation.",

  applicationName: "Inertia Friction",

  keywords: [
    "Inertia Friction",
    "interactive physics simulation",
    "friction simulation",
    "particle interaction",
    "canvas animation",
    "HTML5 Canvas",
    "React Canvas",
    "interactive experiment",
    "physics visualization",
    "motion design",
  ],

  authors: [{ name: "Wesley Marques" }],

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Inertia Friction",
    title: "Inertia Friction — Interactive Physics Experience",
    description:
      "An interactive exploration of motion, friction, and particle behavior through real-time physics simulation.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Inertia Friction — Interactive Physics Experience",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Inertia Friction — Interactive Physics Experience",
    description:
      "Explore motion, friction, and particle interactions in an interactive Canvas experience.",
    images: ["/images/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${nimbusSans.className} h-full antialiased`}>
      <body className="min-h-dvh flex flex-col">
        <main className="">
          <TabTitle />
          <ScreenBlocker />
          {children}
        </main>
      </body>
    </html>
  );
}
