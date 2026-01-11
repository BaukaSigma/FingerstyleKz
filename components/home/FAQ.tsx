'use client'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const faqData = [
    {
        q: "Табтарды қандай форматта аламын?",
        a: "Көбіне PDF және GPX форматында. PDF файлды кез келген телефоннан ашуға болады. Guitar Pro (GPX) файлын арнайы бағдарламамен ашып, ноталарды тыңдауға болады."
    },
    {
        q: "Төлем қалай жасалады?",
        a: "Қазіргі уақытта Kaspi Gold арқылы. Telegram/WhatsApp-қа өткен соң реквизиттерді жібереміз. Болашақта сайттан тікелей төлеу қосылады."
    },
    {
        q: "Сатып алған соң файл қашан келеді?",
        a: "Төлем расталған соң 5-10 минут ішінде. Біз (админдер) сізге файлдарды жеке чатқа жібереміз."
    },
    {
        q: "Видео-сабақ бар ма?",
        a: "Кейбір табтарда бар, кейбірінде тек нота. Табтың картасында 'Play' белгісі болса, видеосы бар деген сөз. Сондай-ақ сипаттамасын оқыңыз."
    },
    {
        q: "Қиын әнді үйрене аламын ба?",
        a: "Біздің табтарда деңгейлер (Easy, Medium, Hard) көрсетілген. GPX файл арқылы темпті баяулатып үйрену өте оңай."
    }
]

export function FAQ() {
    return (
        <section className="py-24 bg-background">
            <div className="container px-4 md:px-6 mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">

                <div className="md:col-span-1">
                    <h2 className="text-3xl font-bold tracking-tight mb-4">Сұрақ-жауап</h2>
                    <p className="text-muted-foreground mb-6">Жиі қойылатын сұрақтарға жауаптар. Егер таппасаңыз, бізге жазыңыз.</p>
                    <div className="h-[1px] w-12 bg-primary/50" />
                </div>

                <div className="md:col-span-2">
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {faqData.map((item, index) => (
                            <AccordionItem key={index} value={`item-${index}`} className="border border-white/5 rounded-lg px-4 bg-white/[0.02]">
                                <AccordionTrigger className="text-left text-base font-medium hover:text-primary hover:no-underline py-5">
                                    {item.q}
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                                    {item.a}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>

            </div>
        </section>
    )
}
