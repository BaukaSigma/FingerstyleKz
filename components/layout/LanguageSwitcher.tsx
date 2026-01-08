'use client'

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function LanguageSwitcher({ current }: { current: string }) {
    const router = useRouter()

    const toggleLanguage = () => {
        const next = current === 'kz' ? 'ru' : 'kz'
        document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=31536000`
        router.refresh()
    }

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="font-mono text-xs text-muted-foreground hover:text-primary"
        >
            {current.toUpperCase()}
        </Button>
    )
}
