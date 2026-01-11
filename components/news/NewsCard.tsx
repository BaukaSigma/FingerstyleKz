import Link from "next/link"
import { Post } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Calendar, Pin } from "lucide-react"

interface NewsCardProps {
    post: Post
    locale: string
}

export function NewsCard({ post, locale }: NewsCardProps) {
    const title = locale === 'ru' ? post.title_ru : post.title_kz
    const excerpt = locale === 'ru' ? post.excerpt_ru : post.excerpt_kz
    const date = post.published_at
        ? new Date(post.published_at).toLocaleDateString(locale === 'ru' ? 'ru-RU' : 'kk-KZ', { day: 'numeric', month: 'long', year: 'numeric' })
        : ''

    return (
        <Link href={`/news/${post.slug}`} className="group block">
            <article className="flex flex-col h-full rounded-2xl border border-white/5 bg-card/50 backdrop-blur-sm overflow-hidden hover:border-primary/20 hover:bg-white/[0.02] transition-all duration-300">
                {/* Cover */}
                <div className="aspect-video w-full bg-muted/20 relative overflow-hidden">
                    {post.cover_url ? (
                        <img
                            src={post.cover_url}
                            alt={title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground/20">
                            No Cover
                        </div>
                    )}
                    {post.pinned && (
                        <div className="absolute top-3 right-3 bg-primary text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 font-medium shadow-lg">
                            <Pin className="w-3 h-3 fill-current" />
                            <span>{locale === 'ru' ? 'Закреплено' : 'Бекітілген'}</span>
                        </div>
                    )}
                </div>

                <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground">
                        <Badge variant="outline" className="border-white/10 uppercase tracking-wider text-[10px]">
                            {post.category}
                        </Badge>
                        <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            {date}
                        </div>
                    </div>

                    <h3 className="text-xl font-bold mb-3 leading-tight group-hover:text-primary transition-colors">
                        {title}
                    </h3>

                    {excerpt && (
                        <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                            {excerpt}
                        </p>
                    )}

                    <div className="mt-auto pt-4 flex flex-wrap gap-2">
                        {post.tags?.slice(0, 3).map(tag => (
                            <span key={tag} className="text-xs text-muted-foreground/60 bg-white/5 px-2 py-1 rounded-md">
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>
            </article>
        </Link>
    )
}
