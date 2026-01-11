import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"
import { MarkdownRenderer } from "@/components/news/MarkdownRenderer"
import { Post, Tab } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Calendar, ArrowLeft } from "lucide-react"
import Link from "next/link"

export const revalidate = 0

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const supabase = await createClient()
    // Await params correctly for Next 15
    const { slug } = await params

    // Cookie
    const cookieStore = await cookies()
    const locale = cookieStore.get('NEXT_LOCALE')?.value || 'kz'

    // 1. Fetch Post
    const { data: post } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published') // Public only sees published
        .single()

    if (!post) {
        notFound()
    }

    const typedPost = post as Post
    const content = locale === 'ru' ? typedPost.content_ru_md : typedPost.content_kz_md
    const title = locale === 'ru' ? typedPost.title_ru : typedPost.title_kz
    const date = typedPost.published_at
        ? new Date(typedPost.published_at).toLocaleDateString(locale === 'ru' ? 'ru-RU' : 'kk-KZ', { day: 'numeric', month: 'long', year: 'numeric' })
        : ''

    // 2. Identify embedded tabs in markdown to fetch them server-side
    // Regex matches :::tab slug="xyz" :::
    const tabRegex = /:::tab\s+slug="([^"]+)"\s*:::/g
    const slugsToFetch: string[] = []
    let match
    while ((match = tabRegex.exec(content)) !== null) {
        slugsToFetch.push(match[1])
    }

    let relatedTabs: Tab[] = []
    if (slugsToFetch.length > 0) {
        const { data: tabs } = await supabase
            .from('tabs')
            .select('*')
            .in('slug', slugsToFetch)
            .eq('is_published', true)

        if (tabs) relatedTabs = tabs as Tab[]
    }

    return (
        <article className="min-h-screen pt-24 pb-20">
            {/* Header / Cover */}
            <div className="container px-4 md:px-6 mx-auto mb-12">
                <Link href="/news" className="inline-flex items-center text-sm text-muted-foreground hover:text-white mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    {locale === 'ru' ? 'Назад к новостям' : 'Жаңалықтарға қайту'}
                </Link>

                <div className="space-y-6 max-w-4xl mx-auto text-center">
                    <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                        <Badge variant="outline" className="border-white/10 uppercase tracking-wider px-3">
                            {typedPost.category}
                        </Badge>
                        <div className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            {date}
                        </div>
                    </div>

                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                        {title}
                    </h1>

                    <div className="flex flex-wrap items-center justify-center gap-2">
                        {typedPost.tags?.map(tag => (
                            <span key={tag} className="text-sm text-muted-foreground/60">
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Featured Image */}
            {typedPost.cover_url && (
                <div className="container px-4 md:px-6 mx-auto mb-16">
                    <div className="aspect-[21/9] w-full rounded-2xl overflow-hidden bg-muted/10 border border-white/5 max-w-5xl mx-auto">
                        <img
                            src={typedPost.cover_url}
                            alt={title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            )}

            {/* Content */}
            <div className="container px-4 md:px-6 mx-auto">
                <div className="max-w-3xl mx-auto">
                    <MarkdownRenderer
                        content={content}
                        locale={locale}
                        relatedTabs={relatedTabs}
                    />
                </div>
            </div>

        </article>
    )
}
