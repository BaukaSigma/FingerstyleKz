'use client'

import { motion } from "framer-motion"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const faqData = [
    {
        q: "Табтарды қандай форматта аламын?",
        a: "Көбіне PDF және GPX форматында. PDF файлды кез келген телефоннан ашуға болады. Ал GPX файлын Guitar Pro бағдарламасымен ашып, әуенді тыңдап, темпті өзгертуге болады."
    },
    {
        q: "Сатып алғаннан кейін қанша уақытта жібересіздер?",
        a: "Біз автоматты жүйе емеспіз, бірақ өте жылдам жұмыс істейміз. Төлеміңіз расталысымен (әдетте 5-15 минут ішінде) файлдарды Telegram не WhatsApp арқылы жібереміз."
    },
    {
        q: "GPX деген не?",
        a: "Бұл Guitar Pro бағдарламасының файлы. Ол жаңадан үйреніп жүргендерге өте пайдалы: ноталардың қалай естілуі керектігін көрсетеді, және қиын жерлерді баяулатып үйренуге мүмкіндік береді."
    },
    {
        q: "Видео жоқ табтар бар ма?",
        a: "Иә, кейбір ескі немесе қарапайым табтар тек нота форматында болуы мүмкін. Бірақ табтың сипаттамасында видео бар-жоғы міндетті түрде жазылады."
    },
    {
        q: "Маған қиын болып жатса көмектесесіздер ме?",
        a: "Әрине! Егер бір жерін түсінбей жатсаңыз немесе техникалық қиындықтар болса, бізге жазыңыз. Қолдан келгенше түсіндіріп, көмектесуге дайынбыз."
    }
]

export function FAQ() {
    return (
        <section className="py-24 bg-black/40">
            <div className="container px-4 mx-auto max-w-2xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Жиі қойылатын сұрақтар</h2>
                    <p className="text-muted-foreground">Егер басқа сұрағыңыз болса, бізге жазыңыз</p>
                </div>

                <Accordion type="single" collapsible className="w-full">
                    {faqData.map((item, index) => (
                        <AccordionItem key={index} value={`item-${index}`} className="border-white/10">
                            <AccordionTrigger className="text-left text-lg hover:text-primary transition-colors">
                                {item.q}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground leading-relaxed">
                                {item.a}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    )
}
