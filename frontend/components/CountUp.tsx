"use client";

import { useEffect, useState } from "react";

interface CountUpProps {
    from: number;
    to: number;
    separator?: string;
    direction?: "up" | "down";
    duration?: number; // in seconds
    className?: string;
    startCounting?: boolean;
}

export default function CountUp({
    from,
    to,
    separator = ",",
    direction = "up",
    duration = 1,
    className,
    startCounting = true,
}: CountUpProps) {
    const [value, setValue] = useState(from);

    useEffect(() => {
        if (!startCounting) {
            setValue(from);
            return;
        }

        const totalMs = Math.max(0.1, duration) * 1000;
        const stepMs = 30;
        const steps = Math.max(1, Math.floor(totalMs / stepMs));
        const delta = (to - from) / steps;

        let current = from;
        let currentStep = 0;

        const timer = setInterval(() => {
            currentStep += 1;
            current += delta;

            if (currentStep >= steps) {
                setValue(to);
                clearInterval(timer);
            } else {
                setValue(direction === "down" ? Math.round(current) : Math.round(current));
            }
        }, stepMs);

        return () => clearInterval(timer);
    }, [from, to, duration, direction, startCounting]);

    const formatted = separator
        ? Number(value).toLocaleString(undefined, { maximumFractionDigits: 0 })
        : Math.round(value).toString();

    return <span className={className}>{formatted}</span>;
}
