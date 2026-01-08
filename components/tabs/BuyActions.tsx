'use client'

import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/utils"

interface BuyActionsProps {
    price: number
    title: string
    code: string
    formats: string
    telegram: string
    whatsapp: string
    locale: string
    mobileSticky?: boolean
}

export function BuyActions({
    price, title, code, formats, telegram, whatsapp, locale, mobileSticky
}: BuyActionsProps) {

    const messageKv = `Сәлем! Мен «${title}» табын сатып алғым келеді.\nБағасы: ${price}₸\nКод: ${code}\nФормат: ${formats}`
    const messageRu = `Привет! Я хочу купить таб «${title}».\nЦена: ${price}₸\nКод: ${code}\nФормат: ${formats}`

    const finalMessage = locale === 'ru' ? messageRu : messageKv

    // Strip @ or + from username/phone if needed, but usually config has clean values or we clean them.
    // Telegram username usually no @ in URL.
    const tgUsername = telegram.replace('@', '')
    const waPhone = whatsapp.replace('+', '')

    const tgUrl = `https://t.me/${tgUsername}?text=${encodeURIComponent(finalMessage)}`
    const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(finalMessage)}`

    if (mobileSticky) {
        return (
            <div className="fixed bottom-0 left-0 right-0 p-4 py-3 bg-background/95 backdrop-blur-md border-t border-border flex items-center justify-between gap-4 z-50 sm:hidden shadow-[0_-5px_20px_rgba(0,0,0,0.3)]">
                <div>
                    <p className="text-xs text-muted-foreground">{locale === 'ru' ? 'Цена' : 'Бағасы'}</p>
                    <p className="text-xl font-bold text-primary">{formatPrice(price)}</p>
                </div>
                <div className="flex gap-3">
                    <Button asChild className="bg-[#229ED9] hover:bg-[#229ED9]/90 text-white font-bold rounded-full">
                        <a href={tgUrl} target="_blank" rel="noopener noreferrer">Telegram</a>
                    </Button>
                    <Button asChild className="bg-[#25D366] hover:bg-[#25D366]/90 text-white font-bold rounded-full">
                        <a href={waUrl} target="_blank" rel="noopener noreferrer">WhatsApp</a>
                    </Button>
                </div>
            </div>
        )
    }

    // Desktop / Inline version
    return (
        <div className="flex gap-4 mt-6">
            <Button asChild className="bg-[#229ED9] hover:bg-[#229ED9]/90 text-white font-bold px-8 rounded-full shadow-lg hover:shadow-xl transition-all">
                <a href={tgUrl} target="_blank" rel="noopener noreferrer">Telegram</a>
            </Button>
            <Button asChild className="bg-[#25D366] hover:bg-[#25D366]/90 text-white font-bold px-8 rounded-full shadow-lg hover:shadow-xl transition-all">
                <a href={waUrl} target="_blank" rel="noopener noreferrer">WhatsApp</a>
            </Button>
        </div>
    )
}
