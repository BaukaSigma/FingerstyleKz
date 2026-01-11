import { createClient } from "@/lib/supabase/server"
import { HomeTabCard } from "@/components/home/HomeTabCard"
import { Tab } from "@/lib/types"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export async function FeaturedTabs({ locale }: { locale: string }) {
    const supabase = await createClient()

    // Fetch latest 8 published tabs (increased from 6 for better grid density)
    const { data: tabs } = await supabase
        .from('tabs')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false })
        .limit(8)

    if (!tabs?.length) return null

    const t = {
        heading: locale === 'ru' ? 'Свежие табы' : 'Соңғы қосылғандар',
        sub: locale === 'ru' ? 'Качественные аранжировки для гитары' : 'Гитараға арналған сапалы аранжировкалар',
        viewAll: locale === 'ru' ? 'Смотреть все' : 'Барлығын көру',
    }

    return (
        <section className="container mx-auto px-4 md:px-6 py-24">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">{t.heading}</h2>
                    <p className="text-muted-foreground">{t.sub}</p>
                </div>
                <Link href="/tabs" className="hidden md:flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                    {t.viewAll} <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {tabs.map((tab) => (
                    <HomeTabCard key={tab.id} tab={tab as Tab} locale={locale} />
                ))}
            </div>

            <div className="md:hidden text-center">
                <Link href="/tabs" className="inline-flex items-center justify-center h-12 px-8 text-base font-medium transition-colors border border-input bg-background/50 backdrop-blur-sm hover:bg-accent hover:text-accent-foreground rounded-full w-full">
                    {t.viewAll}
                </Link>
            </div>
        </section>
    )
}
