'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './tab-bar.module.css';

const TABS = [
    { href: '/', label: 'activities' },
    { href: '/activities/new', label: 'log' },
    { href: '/upload', label: 'upload' },
    { href: '/gear', label: 'gear' },
    { href: '/stats', label: 'stats' },
];

function isActive(pathname: string, href: string): boolean {
    if (href === '/') return pathname === '/' || /^\/activities\/\d+/.test(pathname);
    return pathname.startsWith(href);
}

export function TabBar() {
    const pathname = usePathname();
    return (
        <nav className={styles['tab-bar']} aria-label="primary">
            {TABS.map((t) => (
                <Link
                    key={t.href}
                    href={t.href}
                    className={isActive(pathname, t.href) ? styles.active : undefined}
                >
                    {t.label}
                </Link>
            ))}
        </nav>
    );
}
