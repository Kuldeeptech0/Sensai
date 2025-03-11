import {Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Header  from "@/components/ui/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
const inter = Inter({ subsets: ["latin"] });



export const metadata = {
  title: "Sensai - AI Carrer Coach",  
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{
      baseTheme: "dark",
    }}>
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning
        className={`${inter.className} `}
      >
     
           <ThemeProvider 
           attribute="class"
           defaultTheme="dark" 
           enableSystem={false}
           disableTransitionOnChange
          >

            {/* header */}
            <Header />
          <main className="min-h-screen">{children}</main>
         <Toaster richColors/>
            
        </ThemeProvider>
        
        
         <footer className="bg-muted/50 py-12">

          <div className="conatiner mx-auto px-4 text-center text-gray-200">
            <p>made with love by kuldeep</p>
          </div>
          </footer>
      </body>
    </html>
    </ClerkProvider>
  );
}
