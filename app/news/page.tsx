import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"
import { NewsCard } from "@/components/news/NewsCard"
import { Post } from "@/lib/types"

export const revalidate = 0 // No caching for news

export default async function NewsListPage() {
    const supabase = await createClient()
    const cookieStore = await cookies()
    const locale = cookieStore.get('NEXT_LOCALE')?.value || 'kz'

    // Fetch published posts
    const { data: posts, error } = await supabase
        .from('posts')
        .select('*')
        .eq('status', 'published')
        .order('pinned', { ascending: false })
        .order('published_at', { ascending: false })

    const t = {
        title: locale === 'ru' ? 'Новости и Блог' : 'Жаңалықтар мен Блог',
        subtitle: locale === 'ru'
            ? 'Последние обновления, релизы табов и полезные статьи.'
            : 'Соңғы жаңартулар, табтардың шығуы және пайдалы мақалалар.'
    }

    return (
        <div className="min-h-screen pt-24 pb-20">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.title}</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl">
                        {t.subtitle}
                    </p>
                </div>

                {!posts?.length ? (
                    <div className="text-center py-20 border rounded-2xl border-dashed border-white/10">
                        <p className="text-muted-foreground">Empty / Бос</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map(post => (
                            <NewsCard key={post.id} post={post as Post} locale={locale} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
