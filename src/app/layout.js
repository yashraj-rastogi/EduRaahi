import "./globals.css";

export const metadata = {
  title: "EduRaahi — AI Learning Intelligence Platform",
  description: "Know what you know. Discover what you don't. Learn what matters next. Continuously mapping student skills and empowering teachers.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-grid antialiased selection:bg-[#1867E8] selection:text-white">
        {children}
      </body>
    </html>
  );
}
