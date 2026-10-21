import "./globals.css";

export const metadata = {
  title: "Notely – Simple Note App",
  description: "A simple Next.js note application with login validation",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
