'use client'

import { motion } from "framer-motion"
import { Music2, MessageCircle, Download } from "lucide-react"

const steps = [
    {
        icon: Music2,
        title: "1. Табты таңда",
        desc: "Каталогтан өзіңе ұнайтын әнді таңда. Әр табта видео немесе аудио нұсқасы бар."
    },
    {
        icon: MessageCircle,
        title: "2. Бізге жаз",
        desc: "Telegram немесе WhatsApp арқылы хабарлас. Төлем жасау жолын сол жерде көрсетеміз."
    },
    {
        icon: Download,
        title: "3. Табты ал",
        desc: "Төлемнен кейін бірден PDF + GPX файлдарын аласың. Қажет болса көмектесеміз."
    }
]

export function HowItWorks() {
    return (
        <section id="how-it-works" className="py-24 bg-black/20">
            <div className="container px-4 mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Қалай жұмыс істейді?</h2>
                    <p className="text-muted-foreground">Бар болғаны 3 қадам</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="bg-card/50 backdrop-blur-sm border border-white/5 p-8 rounded-2xl relative overflow-hidden group hover:border-primary/50 transition-colors"
                        >
                            <div className="absolute top-0 right-0 p-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />

                            <div className="relative z-10">
                                <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-primary/20">
                                    <step.icon className="h-7 w-7 text-white" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
