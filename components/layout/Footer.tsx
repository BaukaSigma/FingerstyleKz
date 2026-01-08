import Link from "next/link"

export function Footer({ locale }: { locale: string }) {
    const currentYear = new Date().getFullYear()
    const t = {
        rights: locale === 'ru' ? 'Все права защищены.' : 'Барлық құқықтар қорғалған.',
        admin: 'Admin',
    }

    return (
        <footer className="border-t border-border/40 py-6 md:py-0">
            <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row px-4">
                <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                    © {currentYear} FingerstyleKz. {t.rights}
                </p>
                <div className="flex gap-4">
                    <Link href="/admin" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                        {t.admin}
                    </Link>
                </div>
            </div>
        </footer>
    )
}
