import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { formatPrice, getYoutubeEmbedUrl } from "@/lib/utils"
import { BuyActions } from "@/components/tabs/BuyActions"
import { cookies } from "next/headers"

export const revalidate = 0

export default async function TabPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const supabase = await createClient()
    const cookieStore = await cookies()
    const locale = cookieStore.get('NEXT_LOCALE')?.value || 'kz'

    // Fetch tab
    const { data: tab } = await supabase
        .from('tabs')
        .select('*')
        .eq('slug', slug)
        .single()

    if (!tab) notFound()

    // Fetch settings for singleton contact info
    const { data: settings } = await supabase
        .from('settings')
        .select('*')
        .single()

    const telegram = settings?.telegram_username || 'fingerstyle_kz'
    const whatsapp = settings?.whatsapp_phone_e164 || '77001234567'

    const title = locale === 'ru' ? (tab.title_ru || tab.title_kz) : tab.title_kz
    const artist = locale === 'ru' ? (tab.artist_ru || tab.artist_kz) : tab.artist_kz
    const desc = locale === 'ru' ? (tab.description_ru || tab.description_kz) : tab.description_kz

    const embedUrl = getYoutubeEmbedUrl(tab.youtube_embed_url)

    const t = {
        format: locale === 'ru' ? "Формат" : "Формат",
        tuning: locale === 'ru' ? "Строй" : "Бұрау (Tuning)",
        videoMissing: locale === 'ru' ? "Видео нет" : "Видео жоқ",
        deliveryNote: locale === 'ru'
            ? "После оплаты мы отправим табы в Telegram или WhatsApp."
            : "Төлемнен кейін табты Telegram немесе WhatsApp арқылы жібереміз."
    }

    return (
        <div className="pb-32 sm:pb-10 container mx-auto px-4 py-8">
            {/* Video Section */}
            {embedUrl ? (
                <div className="aspect-video w-full max-w-4xl mx-auto rounded-xl overflow-hidden mb-8 border border-border bg-black shadow-2xl">
                    <iframe
                        src={embedUrl}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={title}
                    />
                </div>
            ) : (
                <div className="aspect-video w-full max-w-4xl mx-auto rounded-xl overflow-hidden mb-8 border border-border bg-card/30 flex items-center justify-center text-muted-foreground">
                    {t.videoMissing}
                </div>
            )}

            <div className="max-w-2xl mx-auto space-y-8">
                {/* Header Info */}
                <div className="text-center sm:text-left">
                    <Badge variant="outline" className="mb-3 uppercase tracking-wide px-3 py-1 border-primary/50 text-primary">{tab.difficulty}</Badge>
                    <h1 className="text-3xl font-bold sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary mb-2">
                        {title}
                    </h1>
                    {artist && <p className="text-xl text-muted-foreground">{artist}</p>}
                </div>

                {/* Metadata Grid */}
                <div className="grid grid-cols-2 gap-4 text-sm border border-white/10 p-6 rounded-2xl bg-card/40 backdrop-blur-sm">
                    <div>
                        <span className="text-muted-foreground block mb-1">{t.format}</span>
                        <span className="font-medium text-base">{tab.formats.join(', ')}</span>
                    </div>
                    <div>
                        <span className="text-muted-foreground block mb-1">{t.tuning}</span>
                        <span className="font-medium text-base">{tab.tuning || 'Standard'}</span>
                    </div>
                    <div>
                        <span className="text-muted-foreground block mb-1">Capo</span>
                        <span className="font-medium text-base">{tab.capo || 'No'}</span>
                    </div>
                    <div>
                        <span className="text-muted-foreground block mb-1">BPM</span>
                        <span className="font-medium text-base">{tab.tempo_bpm || '-'}</span>
                    </div>
                </div>

                {/* Description */}
                {desc && (
                    <div className="prose prose-invert prose-p:text-muted-foreground max-w-none bg-card/20 p-6 rounded-2xl border border-white/5">
                        <p className="whitespace-pre-line">{desc}</p>
                    </div>
                )}

                {/* Desktop Buy Block */}
                <div className="hidden sm:block p-8 border border-primary/20 rounded-2xl bg-gradient-to-b from-card to-background shadow-lg text-center">
                    <div className="mb-6">
                        <span className="text-4xl font-bold text-primary">{formatPrice(tab.price_kzt)}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
                        {t.deliveryNote}
                    </p>

                    <div className="flex justify-center">
                        <BuyActions
                            price={tab.price_kzt}
                            title={title}
                            code={tab.code}
                            formats={tab.formats.join(', ')}
                            telegram={telegram}
                            whatsapp={whatsapp}
                            locale={locale}
                            mobileSticky={false}
                        />
                    </div>
                </div>
            </div>

            {/* Sticky Mobile Bar */}
            <BuyActions
                price={tab.price_kzt}
                title={title}
                code={tab.code}
                formats={tab.formats.join(', ')}
                telegram={telegram}
                whatsapp={whatsapp}
                locale={locale}
                mobileSticky={true}
            />
        </div>
    )
}
