import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Header from "@/components/ui/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sensai - AI Career Coach",  
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
            <Toaster richColors />
          </ThemeProvider>

          {/* Footer */}
          <footer className="bg-gray-900 text-gray-300 py-12">
            <div className="container mx-auto px-4 text-center">
              <h3 className="text-2xl font-semibold mb-4">Sensai - Empower Your Career with AI</h3>
              <p className="text-gray-400">Your AI-powered career coach, guiding you to success.</p>
              <p className="mt-6 text-gray-500">&copy; 2025 Sensai. All Rights Reserved.</p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
