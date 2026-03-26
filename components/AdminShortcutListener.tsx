'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminShortcutListener() {
    const router = useRouter();

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            // Ctrl + Alt + A (case-insensitive)
            if (event.ctrlKey && event.altKey && (event.key === 'a' || event.key === 'A')) {
                event.preventDefault();
                router.push('/admin');
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [router]);

    return null;
}
