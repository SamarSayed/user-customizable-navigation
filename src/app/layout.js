import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css"
import "./globals.css"
import Layouts from "../layouts/index";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "IZAM",
  description: "User Customizable Navigation",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <Layouts>
          <main>
            {children}
          </main>
        </Layouts>
      </body>
    </html>
  );
}
