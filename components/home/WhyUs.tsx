'use client'

import { motion } from "framer-motion"
import { Guitar, FileType, Signal, UserCheck } from "lucide-react"

const features = [
    {
        icon: Guitar,
        title: "Шынайы fingerstyle",
        desc: "Әннің рухын сақтайтын, гитараға ыңғайлы етіп жасалған таза аранжировка."
    },
    {
        icon: FileType,
        title: "PDF + GPX",
        desc: "Смартфоннан ашуға PDF, немесе арнайы бағдарламаға (Guitar Pro) арналған GPX файлдары."
    },
    {
        icon: Signal,
        title: "Күрделілік деңгейі",
        desc: "Easy, Medium, Hard — өз деңгейіңе сай келетін табты оңай табасың."
    },
    {
        icon: UserCheck,
        title: "Тікелей байланыс",
        desc: "Робот емес, тірі адам жауап береді. Сұрақтарың болса әрдайым көмектесеміз."
    }
]

export function WhyUs() {
    return (
        <section className="py-24">
            <div className="container px-4 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
                        >
                            <item.icon className="h-8 w-8 text-secondary mb-4" />
                            <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                            <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
