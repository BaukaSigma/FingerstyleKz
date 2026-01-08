import { createClient } from "@/lib/supabase/server"
import { TabCard } from "@/components/shared/TabCard"
import { Tab } from "@/lib/types"

export async function FeaturedTabs({ locale }: { locale: string }) {
    const supabase = await createClient()

    // Fetch latest 6 published tabs
    const { data: tabs } = await supabase
        .from('tabs')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false })
        .limit(6)

    if (!tabs?.length) {
        // Optionally show empty state or nothing
        return null
    }

    const t = {
        heading: locale === 'ru' ? 'Новые табы' : 'Жаңа табтар',
    }

    return (
        <section className="container mx-auto px-4 py-24">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold">{t.heading}</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {tabs.map((tab) => (
                    <TabCard key={tab.id} tab={tab as Tab} locale={locale} />
                ))}
            </div>

            <div className="text-center">
                <a href="/tabs" className="inline-flex items-center justify-center h-12 px-8 text-base font-medium transition-colors border border-input bg-transparent hover:bg-accent hover:text-accent-foreground rounded-full">
                    Барлық табтарды көру
                </a>
            </div>
        </section>
    )
}
