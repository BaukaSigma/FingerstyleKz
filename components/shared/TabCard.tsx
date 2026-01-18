import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/lib/utils"
import { PlayCircle } from "lucide-react"
import { Tab } from "@/lib/types"

interface TabCardProps {
    tab: Tab
    locale: string
}

export function TabCard({ tab, locale }: TabCardProps) {
    const title = locale === 'ru' ? (tab.title_ru || tab.title_kz) : tab.title_kz
    const artist = locale === 'ru' ? (tab.artist_ru || tab.artist_kz) : tab.artist_kz

    const difficultyMap: Record<string, { label: string, color: "default" | "secondary" | "destructive" | "neon" }> = {
        easy: { label: 'Easy', color: 'secondary' },
        medium: { label: 'Medium', color: 'default' },
        hard: { label: 'Hard', color: 'destructive' },
    }
    const diff = difficultyMap[tab.difficulty] || { label: tab.difficulty, color: 'default' }

    return (
        <Link href={`/tabs/${tab.slug}`}>
            <Card className="h-full overflow-hidden hover:border-primary/50 transition-colors group bg-card/50 backdrop-blur-sm">
                <CardHeader className="p-4 space-y-2">
                    <div className="flex justify-between items-start">
                        <div className="flex gap-2">
                            <Badge variant={diff.color}>{diff.label}</Badge>
                            {tab.promo_1plus1 && (
                                <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 hover:bg-purple-500/30">1+1</Badge>
                            )}
                        </div>
                        {tab.youtube_embed_url && <PlayCircle className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />}
                    </div>
                    <div>
                        <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors leading-tight">
                            {title}
                        </CardTitle>
                        {artist && <p className="text-sm text-muted-foreground line-clamp-1 mt-1">{artist}</p>}
                    </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                    <div className="flex flex-col">
                        {tab.original_price_kzt && tab.original_price_kzt > tab.price_kzt && (
                            <span className="text-xs text-red-500 line-through decoration-red-500/50">
                                {formatPrice(tab.original_price_kzt)}
                            </span>
                        )}
                        <span className={`text-xl font-bold ${tab.original_price_kzt ? 'text-green-500' : 'text-primary'}`}>
                            {formatPrice(tab.price_kzt)}
                        </span>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}
