'use client'

import { motion } from "framer-motion"

export function AboutStory() {
    return (
        <section className="py-32 relative overflow-hidden">
            {/* Bg Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

            <div className="container px-4 mx-auto max-w-4xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center space-y-8"
                >
                    <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                        FingerstyleKz — екі Бауыржанның идеясы.
                    </h2>

                    <div className="space-y-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
                        <p>
                            Иә, есіміміз бірдей. Бірақ жолымыз да, қабілетіміз де бір нүктеде түйісті.
                        </p>
                        <p>
                            <strong className="text-primary font-medium">Біріміз — гитарада сөйлейтін адам.</strong><br />
                            Әр нотаға мән беретін, fingerstyle-ды жанымен сезетін музыкант.
                        </p>
                        <p>
                            <strong className="text-secondary font-medium">Екіншіміз — кодпен ойлайтын адам.</strong><br />
                            Платформаны, ыңғайлылықты, дизайн мен жылдамдықты ойлайтын developer.
                        </p>
                        <p className="pt-4">
                            Біз қазақша әндерге арналған сапалы tab табу қиын екенін білдік.
                            Сол себепті өзіміз жасауды шештік.
                        </p>
                        <p>
                            FingerstyleKz — бұл жай сайт емес.
                            Бұл — қазақша музыканы гитарада жаңа деңгейде ойнауға арналған орта.
                        </p>
                    </div>

                    <div className="pt-8">
                        <div className="inline-block p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-white/10 backdrop-blur-sm">
                            <p className="text-lg font-medium text-white">
                                ✨ Біздің мақсат — қазақша әндерді fingerstyle арқылы қолжетімді әрі түсінікті ету.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
