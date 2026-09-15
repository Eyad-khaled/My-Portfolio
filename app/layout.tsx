import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Sekuya,
  Edu_NSW_ACT_Cursive,
  Archivo_Black
} from "next/font/google";
import "./globals.css";
import ScrollSmootherProvider from "./components/scrollSmoother";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

const sekuya = Sekuya({
  variable: "--font-sekuya",
  subsets: ["latin"],
  weight: "400",
});
const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  subsets: ["latin"],
  weight: "400",
});
const cursive = Edu_NSW_ACT_Cursive({
  variable: "--font-edu-nsw-act-cursive",
  subsets: ["latin"],
  weight: "400",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eyad Elgendy — Creative Developer",
  description:
    "Eyad Elgendy is a creative developer focused on building modern, interactive, and high-performance web experiences.",
  keywords: [
    "Eyad Elgendy",
    "Creative Developer",
    "Frontend Developer",
    "Web Developer",
    "React",
    "Next.js",
    "TypeScript",
  ],
  authors: [{ name: "Eyad Elgendy" }],
  creator: "Eyad Elgendy",
  metadataBase: new URL("https://your-domain.com"),

  openGraph: {
    title: "Eyad Elgendy — Creative Developer",
    description:
      "Creative developer building modern, interactive, and high-performance web experiences.",
    url: "https://your-domain.com",
    siteName: "Eyad Elgendy",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Eyad Elgendy — Creative Developer",
    description:
      "Creative developer building modern, interactive, and high-performance web experiences.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sekuya.variable} ${archivoBlack.variable} ${cursive.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ScrollSmootherProvider>{children}</ScrollSmootherProvider>
      </body>
    </html>
  );
}
