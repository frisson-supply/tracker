import type { Metadata } from 'next';
// globals.css must load first: it declares the @layer order the module css relies on
import '@/styles/globals.css';
import { Header } from '@/components/header/header';

export const metadata: Metadata = {
    title: 'tracker',
    description: 'personal fitness log',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Header />
                <main>{children}</main>
            </body>
        </html>
    );
}
