'use client';

import { useRef, useState } from 'react';
import { paceStr } from '@/lib/format';
import styles from './sparkline.module.css';

export function Sparkline({
    label,
    values,
    unit,
    invert = false,
    pace = false,
}: {
    label: string;
    values: number[];
    unit: string;
    invert?: boolean;
    pace?: boolean;
}) {
    const svgRef = useRef<SVGSVGElement>(null);
    const [active, setActive] = useState<number | null>(null);
    const format = pace ? paceStr : (n: number) => String(Math.round(n * 10) / 10);

    const w = 300;
    const h = 60;
    const min = Math.min(...values);
    const max = Math.max(...values);
    const span = max - min || 1;
    const x = (i: number) => (i / (values.length - 1)) * w;
    const y = (v: number) => {
        const t = (v - min) / span;
        return 4 + (h - 8) * (invert ? t : 1 - t);
    };
    const points = values.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');

    // pointer events cover mouse and touch alike; css touch-action keeps page scroll working
    const onPointerMove = (e: React.PointerEvent) => {
        const rect = svgRef.current!.getBoundingClientRect();
        const frac = (e.clientX - rect.left) / rect.width;
        setActive(Math.min(values.length - 1, Math.max(0, Math.round(frac * (values.length - 1)))));
    };

    return (
        <figure className={styles.sparkline}>
            <figcaption className={styles.caption}>
                <span>{label}</span>
                <span className={styles.range}>
                    {active !== null
                        ? `${format(values[active])} ${unit}`
                        : `${format(min)}–${format(max)} ${unit}`}
                </span>
            </figcaption>
            <svg
                ref={svgRef}
                viewBox={`0 0 ${w} ${h}`}
                role="img"
                aria-label={`${label} chart`}
                onPointerMove={onPointerMove}
                onPointerDown={onPointerMove}
                onPointerLeave={() => setActive(null)}
                onPointerCancel={() => setActive(null)}
            >
                <polyline points={points} fill="none" stroke="currentColor" strokeWidth="1.5" />
                {active !== null && (
                    <>
                        <line
                            x1={x(active)}
                            x2={x(active)}
                            y1="0"
                            y2={h}
                            stroke="currentColor"
                            strokeWidth="0.75"
                            opacity="0.4"
                        />
                        <circle cx={x(active)} cy={y(values[active])} r="3" fill="currentColor" />
                    </>
                )}
            </svg>
        </figure>
    );
}
