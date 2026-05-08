export const metadata = {
  title: "MUAH Oracle",
  description: "The stone oracle of Concrete Protocol",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: "#0b0a08" }}>
        {children}
      </body>
    </html>
  );
    }
