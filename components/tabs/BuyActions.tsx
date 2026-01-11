'use client'

import { Button } from "@/components/ui/button"
import { Send, Gift, X } from "lucide-react"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
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
    promo_1plus1?: boolean // New flag
    currentTabId?: string
}

export function BuyActions({
    price,
    title,
    code,
    formats,
    telegram,
    whatsapp,
    locale,
    mobileSticky,
    promo_1plus1,
    currentTabId
}: BuyActionsProps) {
    const [isBonusModalOpen, setIsBonusModalOpen] = useState(false)
    const [bonusTabs, setBonusTabs] = useState<any[]>([])
    const [selectedBonusTab, setSelectedBonusTab] = useState<any | null>(null)
    const [loadingBonus, setLoadingBonus] = useState(false)

    // Translations
    const t = {
        buy: locale === 'ru' ? 'Купить' : 'Сатып алу',
        chooseBonus: locale === 'ru' ? 'Выберите бесплатный таб' : 'Тегін табты таңдаңыз',
        bonusTitle: locale === 'ru' ? 'Акция 1+1: Второй таб в подарок!' : 'Акция 1+1: Екінші таб тегін!',
        cancel: locale === 'ru' ? 'Отмена' : 'Бас тарту',
        confirm: locale === 'ru' ? 'Выбрать и продолжить' : 'Таңдау және жалғастыру',
    }

    const handleBuyClick = () => {
        if (promo_1plus1) {
            setIsBonusModalOpen(true)
            fetchBonusTabs()
        } else {
            // Standard flow
            openMessengerLinks()
        }
    }

    const fetchBonusTabs = async () => {
        setLoadingBonus(true)
        const supabase = createClient()
        // Fetch all published tabs except current one
        const { data } = await supabase
            .from('tabs')
            .select('id, title_ru, title_kz, price_kzt, slug')
            .eq('is_published', true)
            .neq('id', currentTabId || '')
            .order('created_at', { ascending: false })

        if (data) setBonusTabs(data)
        setLoadingBonus(false)
    }

    const handleBonusSelect = (tab: any) => {
        setSelectedBonusTab(tab)
    }

    const handleBonusConfirm = () => {
        if (!selectedBonusTab) return
        openMessengerLinks(selectedBonusTab)
        setIsBonusModalOpen(false)
    }

    const openMessengerLinks = (bonusTab?: any) => {
        let msg = ''
        if (locale === 'ru') {
            msg = `Здравствуйте! Хочу купить таб:\n📌 ${title} (Код: ${code})\n💵 Цена: ${price} тг\n📄 Формат: ${formats}`
            if (bonusTab) {
                const bonusTitle = bonusTab.title_ru || bonusTab.title_kz
                msg += `\n\n🎁 По акции 1+1 также выбираю:\n📌 ${bonusTitle}`
            }
        } else {
            msg = `Сәлеметсіз бе! Таб сатып алғым келеді:\n📌 ${title} (Код: ${code})\n💵 Бағасы: ${price} тг\n📄 Формат: ${formats}`
            if (bonusTab) {
                const bonusTitle = bonusTab.title_kz || bonusTab.title_ru
                msg += `\n\n🎁 1+1 акциясы бойынша таңдауым:\n📌 ${bonusTitle}`
            }
        }

        const encodedMsg = encodeURIComponent(msg)
        // For standard Buy, we usually open a logical choice or both. 
        // Here let's open Telegram by default or show a choice. 
        // For MVP simplicity of this request, let's open Telegram (most popular)
        // OR better: redirect to a "LinkTree" style?
        // Actually the previous implementation just had buttons. Let's keep buttons but wrap the logic.
        // Wait, the UI has separate buttons for TG and WA.
        // We need to know WHICH button was clicked to open the right one.
    }

    // Rewrite to handle specific messenger click
    const handleMessengerClick = (messenger: 'tg' | 'wa') => {
        if (promo_1plus1) {
            // Store intent and open modal
            setPendingMessenger(messenger)
            setIsBonusModalOpen(true)
            fetchBonusTabs()
        } else {
            openLink(messenger)
        }
    }

    const [pendingMessenger, setPendingMessenger] = useState<'tg' | 'wa' | null>(null)

    const openLink = (messenger: 'tg' | 'wa', bonusTab?: any) => {
        let msg = ''
        if (locale === 'ru') {
            msg = `Здравствуйте! Хочу купить таб:\n📌 ${title} (Код: ${code})\n💵 Цена: ${price} тг`
            if (bonusTab) {
                const bonusTitle = bonusTab.title_ru || bonusTab.title_kz
                msg += `\n\n🎁 + Бесплатный таб (1+1):\n📌 ${bonusTitle}`
            }
        } else {
            msg = `Сәлеметсіз бе! Таб сатып алғым келеді:\n📌 ${title} (Код: ${code})\n💵 Бағасы: ${price} тг`
            if (bonusTab) {
                const bonusTitle = bonusTab.title_kz || bonusTab.title_ru
                msg += `\n\n🎁 + Тегін таб (1+1):\n📌 ${bonusTitle}`
            }
        }

        const encodedMsg = encodeURIComponent(msg)
        const url = messenger === 'tg'
            ? `https://t.me/${telegram}?text=${encodedMsg}`
            : `https://wa.me/${whatsapp}?text=${encodedMsg}`

        window.open(url, '_blank')
    }

    return (
        <>
            <div className={`flex flex-col sm:flex-row gap-3 w-full sm:w-auto ${mobileSticky ? 'fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-md border-t border-border z-50 sm:hidden' : ''}`}>
                <Button
                    size="lg"
                    className="w-full sm:w-auto flex-1 bg-[#24A1DE] hover:bg-[#24A1DE]/90 text-white font-bold"
                    onClick={() => handleMessengerClick('tg')}
                >
                    <Send className="w-5 h-5 mr-2" />
                    Telegram
                </Button>
                <Button
                    size="lg"
                    className="w-full sm:w-auto flex-1 bg-[#25D366] hover:bg-[#25D366]/90 text-white font-bold"
                    onClick={() => handleMessengerClick('wa')}
                >
                    <Send className="w-5 h-5 mr-2" />
                    WhatsApp
                </Button>
            </div>

            <Dialog open={isBonusModalOpen} onOpenChange={setIsBonusModalOpen}>
                <DialogContent className="max-w-md max-h-[90vh] overflow-hidden flex flex-col p-0 gap-0">
                    <DialogHeader className="p-6 pb-2">
                        <DialogTitle className="flex items-center gap-2 text-primary">
                            <Gift className="w-5 h-5" />
                            {t.bonusTitle}
                        </DialogTitle>
                    </DialogHeader>

                    <div className="p-6 pt-2 flex-grow overflow-y-auto">
                        <p className="text-sm text-muted-foreground mb-4">{t.chooseBonus}</p>

                        {loadingBonus ? (
                            <div className="flex justify-center py-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>
                        ) : (
                            <div className="space-y-2">
                                {bonusTabs.map(tab => (
                                    <div
                                        key={tab.id}
                                        onClick={() => handleBonusSelect(tab)}
                                        className={`p-3 rounded-lg border cursor-pointer transition-all flex items-center justify-between ${selectedBonusTab?.id === tab.id ? 'border-primary bg-primary/10' : 'border-white/10 hover:bg-white/5'}`}
                                    >
                                        <span className="font-medium text-sm">
                                            {locale === 'ru' ? (tab.title_ru || tab.title_kz) : tab.title_kz}
                                        </span>
                                        <span className="text-xs text-muted-foreground">{formatPrice(tab.price_kzt)}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="p-4 border-t border-white/10 flex gap-3 bg-card/50">
                        <Button variant="outline" className="flex-1" onClick={() => setIsBonusModalOpen(false)}>
                            {t.cancel}
                        </Button>
                        <Button
                            className="flex-1"
                            disabled={!selectedBonusTab}
                            onClick={() => {
                                if (pendingMessenger) openLink(pendingMessenger, selectedBonusTab)
                                setIsBonusModalOpen(false)
                            }}
                        >
                            {t.confirm}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}
