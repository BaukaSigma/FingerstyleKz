import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatPrice(amount: number) {
    return new Intl.NumberFormat('kk-KZ', {
        style: 'currency',
        currency: 'KZT',
        maximumFractionDigits: 0,
    }).format(amount)
}

export function getYoutubeEmbedUrl(url: string | null): string | null {
    if (!url) return null
    if (url.includes('youtube.com/embed/')) return url

    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)

    return (match && match[2].length === 11)
        ? `https://www.youtube.com/embed/${match[2]}`
        : null
}
