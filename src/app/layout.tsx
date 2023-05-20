import SideBar from "./components/SideBar";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"]});

export const metadata = {
  title: "Clerkie Challenge",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex">
          <div className="bg-[#091928] text-white text-[16px] w-[250px] h-screen overflow-y-auto">
            {/* Sidebar */}
            <SideBar />
          </div>

          <div className="bg-[#343541] flex-1">{children}</div>
        </div>
      </body>
    </html>
  );
}
