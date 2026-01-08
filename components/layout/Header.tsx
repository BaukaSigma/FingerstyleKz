import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher"
import { Music2 } from "lucide-react"

export function Header({ locale }: { locale: string }) {
    const t = {
        tabs: locale === 'ru' ? 'Табы' : 'Табтар',
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-14 max-w-screen-2xl items-center justify-between px-4">
                <Link href="/" className="flex items-center space-x-2 group">
                    <Music2 className="h-5 w-5 text-primary group-hover:text-secondary transition-colors" />
                    <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        FingerstyleKz
                    </span>
                </Link>
                <div className="flex items-center gap-2">
                    <Link href="/tabs">
                        <Button variant="ghost" size="sm" className="hidden sm:inline-flex">{t.tabs}</Button>
                        <Button variant="ghost" size="icon" className="sm:hidden">
                            <Music2 className="h-4 w-4" />
                        </Button>
                    </Link>
                    <LanguageSwitcher current={locale} />
                </div>
            </div>
        </header>
    )
}
