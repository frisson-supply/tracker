import Link from 'next/link';
import { cookies } from 'next/headers';
import { logout } from '@/lib/actions';
import { SESSION_COOKIE, verifySession } from '@/lib/auth';
import { TabBar } from '@/components/tab-bar/tab-bar';
import styles from './header.module.css';

export async function Header() {
    const cookie = (await cookies()).get(SESSION_COOKIE)?.value ?? '';
    const loggedIn = (await verifySession(cookie)) !== null;
    return (
        <header className={styles.header}>
            <Link href="/" className={styles.title}>
                tracker
            </Link>
            <div className={styles.right}>
                {loggedIn && (
                    <nav className={styles.nav}>
                        <Link href="/activities/new">log</Link>
                        <Link href="/upload">upload</Link>
                        <Link href="/gear">gear</Link>
                        <Link href="/stats">stats</Link>
                    </nav>
                )}
                {loggedIn && (
                    <form action={logout}>
                        <button type="submit" className={styles.logout}>
                            log out
                        </button>
                    </form>
                )}
                <details className={styles.about}>
                    <summary aria-label="about this app">i</summary>
                    <p className={styles['about-panel']}>
                        A privacy-first health &amp; activity tracker. Your workouts live in your
                        own database — no ads, no tracking, no data shared with anyone. Self-hosted
                        and open by design.
                    </p>
                </details>
            </div>
            {loggedIn && <TabBar />}
        </header>
    );
}
