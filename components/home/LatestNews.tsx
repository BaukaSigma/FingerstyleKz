import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Post } from "@/lib/types"
import { NewsCard } from "@/components/news/NewsCard"
import { ArrowRight } from "lucide-react"

export async function LatestNews({ locale }: { locale: string }) {
    const supabase = await createClient()

    // Fetch latest 3 published posts
    const { data: posts } = await supabase
        .from('posts')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .limit(3)

    if (!posts?.length) return null

    const t = {
        title: locale === 'ru' ? 'Последние новости' : 'Соңғы жаңалықтар',
        subtitle: locale === 'ru' ? 'Следите за обновлениями проекта' : 'Жобаның жаңалықтарынан хабардар болыңыз',
        viewAll: locale === 'ru' ? 'Все новости' : 'Барлық жаңалықтар',
    }

    return (
        <section className="container mx-auto px-4 md:px-6 py-24 border-t border-white/5">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">{t.title}</h2>
                    <p className="text-muted-foreground">{t.subtitle}</p>
                </div>
                <Link href="/news" className="hidden md:flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                    {t.viewAll} <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                {posts.map(post => (
                    <NewsCard key={post.id} post={post as Post} locale={locale} />
                ))}
            </div>

            <div className="md:hidden text-center">
                <Link href="/news" className="inline-flex items-center justify-center h-12 px-8 text-base font-medium transition-colors border border-input bg-transparent hover:bg-accent hover:text-accent-foreground rounded-full w-full">
                    {t.viewAll}
                </Link>
            </div>
        </section>
    )
}
