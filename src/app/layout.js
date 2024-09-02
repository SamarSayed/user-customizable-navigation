import "bootstrap/dist/css/bootstrap.min.css"
import "./globals.css"
import Layouts from "../layouts/index";



export const metadata = {
  title: "IZAM",
  description: "User Customizable Navigation",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Layouts>
          <main>
            {children}
          </main>
        </Layouts>
      </body>
    </html>
  );
}
