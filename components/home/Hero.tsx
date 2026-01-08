import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero({ locale }: { locale: string }) {
    const t = {
        title: locale === 'ru' ? 'Fingerstyle табулатура для казахских песен' : 'Қазақша әндерге fingerstyle табулатура',
        subtitle: locale === 'ru' ? 'Качественные табы (PDF + GPX) и видеоразборы.' : 'Сапалы табтар (PDF + GPX) және видео-сабақтар.',
        cta: locale === 'ru' ? 'Смотреть табы' : 'Табтарды көру',
    }

    return (
        <section className="relative py-20 lg:py-32 overflow-hidden">
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
                <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
            </div>
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-secondary drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                    {t.title}
                </h1>
                <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
                    {t.subtitle}
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Link href="/tabs">
                        <Button size="lg" className="rounded-full shadow-[0_0_20px_rgba(147,51,234,0.5)] animate-pulse hover:animate-none px-8 py-6 text-lg bg-primary hover:bg-primary/90 text-white border-0 ring-0">
                            {t.cta}
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
