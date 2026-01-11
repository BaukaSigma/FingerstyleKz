'use client'

import { motion } from "framer-motion"
import { Guitar, FileText, BarChart3, Users } from "lucide-react"

const features = [
    {
        icon: Guitar,
        title: "Fingerstyle",
        desc: "Әннің толық, қанық естілуін қамтамасыз ететін кәсіби аранжировкалар."
    },
    {
        icon: FileText,
        title: "PDF + GPX",
        desc: "Басып шығаруға және Guitar Pro бағдарламасында ойнауға арналған сапалы файлдар."
    },
    {
        icon: BarChart3,
        title: "Деңгей жүйесі",
        desc: "Easy, Medium, Hard. Өз деңгейіңізге сай келетін табты оңай таңдаңыз."
    },
    {
        icon: Users,
        title: "Қолдау қызметі",
        desc: "Біз әрқашан байланыстамыз. Сұрақтарыңыз болса, көмектесуге дайынбыз."
    }
]

export function WhyUs() {
    return (
        <section className="py-24 bg-white/[0.02]">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="text-left mb-12">
                    <h2 className="text-2xl font-bold tracking-tight text-white mb-2">Неге біз?</h2>
                    <div className="h-1 w-20 bg-primary rounded-full" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
                    {features.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group"
                        >
                            <div className="flex items-start gap-4">
                                <div className="shrink-0 p-3 rounded-lg bg-background border border-white/5 group-hover:border-primary/50 transition-colors">
                                    <item.icon className="h-6 w-6 text-white group-hover:text-primary transition-colors" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-white mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
