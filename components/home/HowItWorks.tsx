'use client'

import { motion } from "framer-motion"
import { Search, MessageCircle, Download } from "lucide-react"

const steps = [
    {
        id: "01",
        icon: Search,
        title: "Таңдау",
        desc: "Каталогтан қажетті әнді табыңыз. Видеосын көріп, қиындығын тексеріңіз."
    },
    {
        id: "02",
        icon: MessageCircle,
        title: "Сұрау",
        desc: "«Сатып алу» батырмасын басыңыз. Біз сізге Telegram/WhatsApp арқылы жауап береміз."
    },
    {
        id: "03",
        icon: Download,
        title: "Алу",
        desc: "Төлемнен кейін файлдар (PDF/GPX) чатқа сол мезетте жіберіледі."
    }
]

export function HowItWorks() {
    return (
        <section className="py-24 border-t border-white/5 bg-black/20">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="mb-16 md:flex md:items-end md:justify-between">
                    <div className="max-w-xl">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Жұмыс процесі</h2>
                        <p className="text-muted-foreground text-lg">Бар болғаны 3 қарапайым қадам.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    {/* Connector Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-[1px] bg-gradient-to-r from-primary/10 via-primary/50 to-primary/10 z-0" />

                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="relative z-10 group"
                        >
                            <div className="bg-background border border-white/10 p-8 rounded-2xl hover:border-primary/20 transition-all duration-300 h-full">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                        <step.icon className="h-6 w-6" />
                                    </div>
                                    <span className="text-4xl font-bold text-white/5 font-mono group-hover:text-primary/10 transition-colors">
                                        {step.id}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold mb-3 tracking-tight">{step.title}</h3>
                                <p className="text-muted-foreground leading-relaxed text-sm">
                                    {step.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
