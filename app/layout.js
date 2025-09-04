import { StoreProvider } from '../context/Store';
import './globals.css';
import { Inter, Playfair_Display } from 'next/font/google'; // Fonts import karein

// Fonts ko configure karein
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter', // CSS variable
});
const playfair_display = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair-display', // CSS variable
});

export const metadata = {
  title: 'MyShop | Premium Quality Products',
  description: 'Discover the latest trends and top quality products.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* Fonts ko body par apply karein */}
      <body className={`${inter.variable} ${playfair_display.variable}`}>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}