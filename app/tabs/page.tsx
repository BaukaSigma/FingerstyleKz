import { createClient } from "@/lib/supabase/server"
import { TabCard } from "@/components/shared/TabCard"
import { Tab } from "@/lib/types"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { cookies } from "next/headers"

export const revalidate = 0

export default async function CatalogPage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string; difficulty?: string }>
}) {
    const { q, difficulty } = await searchParams
    const cookieStore = await cookies()
    const locale = cookieStore.get('NEXT_LOCALE')?.value || 'kz'
    const supabase = await createClient()

    let query = supabase
        .from('tabs')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false })

    if (q) {
        // Search both KZ and RU titles
        query = query.or(`title_kz.ilike.%${q}%,title_ru.ilike.%${q}%`)
    }
    if (difficulty && difficulty !== 'all') {
        query = query.eq('difficulty', difficulty)
    }

    const { data: tabs } = await query

    const t = {
        searchPlaceholder: locale === 'ru' ? "Поиск по названию..." : "Атауы бойынша іздеу...",
        searchBtn: locale === 'ru' ? "Найти" : "Іздеу",
        notFound: locale === 'ru' ? "Ничего не найдено" : "Ештеңе табылмады",
        all: locale === 'ru' ? "Все" : "Барлығы",
        easy: locale === 'ru' ? "Легкие" : "Оңай",
        medium: locale === 'ru' ? "Средние" : "Орташа",
        hard: locale === 'ru' ? "Сложные" : "Қиын",
    }

    return (
        <div className="container mx-auto px-4 py-8 min-h-[60vh]">
            {/* Search UI Form */}
            <form className="flex flex-col sm:flex-row gap-4 mb-8 max-w-2xl mx-auto">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        name="q"
                        defaultValue={q}
                        placeholder={t.searchPlaceholder}
                        className="pl-8"
                    />
                </div>
                <select
                    name="difficulty"
                    defaultValue={difficulty || 'all'}
                    className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                    <option value="all">{t.all}</option>
                    <option value="easy">{t.easy}</option>
                    <option value="medium">{t.medium}</option>
                    <option value="hard">{t.hard}</option>
                </select>
                <Button type="submit">
                    {t.searchBtn}
                </Button>
            </form>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {tabs?.map((tab) => (
                    <TabCard key={tab.id} tab={tab as Tab} locale={locale} />
                ))}
                {tabs?.length === 0 && (
                    <p className="col-span-full text-center text-muted-foreground py-10">
                        {t.notFound}
                    </p>
                )}
            </div>
        </div>
    )
}
