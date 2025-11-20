import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'HydroManager Pro',
  description: 'Panel moderno para gestión hídrica y análisis geoespacial.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-slate-950 text-slate-50 min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
