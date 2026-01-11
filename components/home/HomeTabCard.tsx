'use client'

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/lib/utils"
import { PlayCircle, FileText, Music2 } from "lucide-react"
import { Tab } from "@/lib/types"

interface HomeTabCardProps {
    tab: Tab
    locale: string
}

export function HomeTabCard({ tab, locale }: HomeTabCardProps) {
    const title = locale === 'ru' ? (tab.title_ru || tab.title_kz) : tab.title_kz
    const artist = locale === 'ru' ? (tab.artist_ru || tab.artist_kz) : tab.artist_kz

    const difficultyMap: Record<string, { label: string, color: string }> = {
        easy: { label: 'Easy', color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' },
        medium: { label: 'Medium', color: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' },
        hard: { label: 'Hard', color: 'bg-red-500/10 text-red-500 border-red-500/20' },
    }
    const diff = difficultyMap[tab.difficulty] || { label: tab.difficulty, color: 'bg-primary/10 text-primary border-primary/20' }

    return (
        <Link href={`/tabs/${tab.slug}`} className="group block">
            <div className="relative rounded-2xl border border-white/5 bg-card hover:bg-white/[0.02] transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 overflow-hidden h-full flex flex-col">
                {/* Top Shine */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-primary/30 transition-all" />

                <div className="p-6 flex flex-col h-full">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex gap-2">
                            <div className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${diff.color}`}>
                                {diff.label}
                            </div>
                            {tab.promo_1plus1 && (
                                <div className="px-2.5 py-0.5 rounded-full text-xs font-bold border bg-purple-500/10 text-purple-400 border-purple-500/20 animate-pulse">
                                    1+1
                                </div>
                            )}
                        </div>
                        {tab.youtube_embed_url && (
                            <div className="p-1.5 rounded-full bg-white/5 group-hover:bg-primary/20 transition-colors">
                                <PlayCircle className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="flex-grow">
                        <h3 className="text-xl font-bold tracking-tight mb-2 group-hover:text-primary transition-colors leading-snug">
                            {title}
                        </h3>
                        {artist && (
                            <p className="text-sm text-muted-foreground font-medium mb-4 flex items-center gap-2">
                                <Music2 className="w-3.5 h-3.5" />
                                {artist}
                            </p>
                        )}
                    </div>

                    {/* Footer / Specs */}
                    <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between">
                        <div className="flex gap-3 text-xs text-muted-foreground">
                            {tab.formats?.includes('PDF') && (
                                <span className="flex items-center gap-1"><FileText className="w-3 h-3" /> PDF</span>
                            )}
                            {tab.formats?.includes('GPX') && (
                                <span className="flex items-center gap-1"><Music2 className="w-3 h-3" /> GPX</span>
                            )}
                        </div>
                        <div className="text-lg font-bold text-white group-hover:text-primary transition-colors">
                            {formatPrice(tab.price_kzt)}
                        </div>
                    </div>
                </div>

                {/* Bottom Shine */}
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-black/50 to-transparent" />
            </div>
        </Link>
    )
}
