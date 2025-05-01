import type { Metadata } from "next";
import "./globals.css";
import "./frontend.scss";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import Providers from "@/components/Providers";
import { Hind } from "next/font/google";
import dynamic from "next/dynamic";
import Loading from "@/app/loading"; // ✅ Correct import for Next.js 15
import CursorLight from "@/components/cursor-light/CursorLight";

const MarketingModal = dynamic(() => import("@/components/MarketingPopup"), {
  loading: () => <Loading />,
});

const hind = Hind({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  preload: true,
});

export const metadata: Metadata = {
  title: "Western Overseas: Study Visa & Immigration | IELTS-PTE-TOEFL",
  description:
    "Looking for Study abroad. We are the best visa consultants offer counseling to choose top study destinations. Also, trusted Institute for IELTS-PTE-TOEFL.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">       
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head> 
      <body
        suppressHydrationWarning={true}
        className={`${hind.className} antialiased padding-top`}
      >
        {/* cursor effect */}
        <CursorLight/>       
        {/* marketing modal */}         
        <MarketingModal/>
        
        <Header />
        <main>
          <Providers>{children}</Providers>
        </main>
        <Footer />  
      </body>
    </html>
  );
}
