
import { Navbar } from "@/components/Home/Navbar";
import "../globals.css";
import { Footer } from "@/components/Home/Footer";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
       <Navbar/>
      <div>
        {children}
      </div>
        <Footer/>
    </div>
  );
}