import type { Metadata } from "next";
import localFont from "next/font/local";
import { Poppins, DM_Mono, DM_Sans, Bebas_Neue} from 'next/font/google'
import "./globals.css";
import { cn } from "@/lib/utils";
import { AppHeader } from "@/components/landing";
import AllProviders from "@/contexts/AllProviders";


const FPoppins = Poppins({
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
})
const FDM_Mono = DM_Mono({
  display: "swap",
  weight: ["300", "400", "500"],
  variable: "--font-mono",
  subsets: ["latin"],
})
const FDM_Sans = DM_Sans({
  display: "swap",
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
  subsets: ["latin"],
})
const FBebas_Neue = Bebas_Neue({
  display: "swap",
  weight: ["400"],
  variable: "--font-bebas",
  subsets: ["latin"],
})

const FHeaters = localFont({
  src: "fonts/Heaters.otf",
  display: "swap",
  variable: "--font-heaters",
  weight: "400",
})

export const metadata: Metadata = {
  title: "IM Studioz",
  description: "Located in SE15, we provide top-tier rehearsal, recording, and live-streaming services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(FPoppins.className, FDM_Mono.variable, FDM_Sans.variable, FBebas_Neue.variable, FHeaters.variable, "relative")}
      >
        <AllProviders>
          <AppHeader />
          {children}
        </AllProviders>
      </body>
    </html>
  );
}
