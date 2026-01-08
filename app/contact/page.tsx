import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { cookies } from "next/headers"

export const revalidate = 0

export default async function ContactPage() {
    const supabase = await createClient()
    const { data: settings } = await supabase.from('settings').select('*').single()
    const cookieStore = await cookies()
    const locale = cookieStore.get('NEXT_LOCALE')?.value || 'kz'

    const tg = settings?.telegram_username || 'fingerstyle_kz'
    const wa = settings?.whatsapp_phone_e164 || '77001234567'

    return (
        <div className="container mx-auto px-4 py-16 max-w-xl text-center min-h-[60vh] flex flex-col justify-center">
            <h1 className="text-3xl font-bold mb-8 sm:text-4xl">{locale === 'ru' ? 'Контакты' : 'Байланыс'}</h1>
            <p className="text-muted-foreground mb-8 text-lg">
                {locale === 'ru'
                    ? 'Если у вас есть вопросы по покупке или предложения, свяжитесь с нами:'
                    : 'Сатып алу бойынша сұрақтарыңыз немесе ұсыныстарыңыз болса, бізге хабарласыңыз:'}
            </p>
            <div className="flex flex-col gap-4 max-w-sm mx-auto w-full">
                <Button asChild size="lg" className="bg-[#229ED9] hover:bg-[#229ED9]/90 text-white shadow-lg shadow-blue-500/20">
                    <a href={`https://t.me/${tg}`} target="_blank" rel="noopener noreferrer">Telegram: @{tg}</a>
                </Button>
                <Button asChild size="lg" className="bg-[#25D366] hover:bg-[#25D366]/90 text-white shadow-lg shadow-green-500/20">
                    <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer">WhatsApp: {wa}</a>
                </Button>
            </div>
        </div>
    )
}
