'use client'

import { motion } from "framer-motion"

export function AboutStory() {
    return (
        <section className="py-32 relative overflow-hidden border-t border-white/5">
            <div className="container px-4 md:px-6 mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">
                            FingerstyleKz
                        </h2>
                        <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                            <p>
                                Бұл жай ғана табтар жинағы емес. Бұл — <span className="text-white">екі Бауыржанның</span> ортақ идеясы. Біріміз музыкамен, екіншіміз кодпен өмір сүреміз.
                            </p>
                            <div className="pl-6 border-l-2 border-primary/30 space-y-4">
                                <p>
                                    <strong className="text-primary block mb-1">Музыкант</strong>
                                    Әр нотаның орнын, әр аккордтың дұрыс алынуын қадағалайды. "Жай ғана ойнай салу" біз үшін емес.
                                </p>
                                <p>
                                    <strong className="text-secondary block mb-1">Developer</strong>
                                    Сізге сайттың жылдам, ыңғайлы және әдемі болуын қамтамасыз етеді.
                                </p>
                            </div>
                            <p>
                                Біз қазақша әндерді гитарада сапалы ойнауды қолжетімді еткіміз келеді.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        {/* Decorative Quote Block */}
                        <div className="p-10 rounded-3xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/5 backdrop-blur-sm relative">
                            <div className="absolute -top-6 -left-6 text-9xl leading-none text-primary/10 font-serif">"</div>
                            <p className="text-xl md:text-2xl font-medium text-white/90 italic relative z-10">
                                Біздің мақсат — қазақша музыканы fingerstyle арқылы әлемдік деңгейге көтеру. Сапа әрқашан бірінші орында.
                            </p>
                            <div className="mt-8 flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-primary/20" />
                                <div className="text-sm">
                                    <div className="text-white font-bold">Бауыржан & Бауыржан</div>
                                    <div className="text-muted-foreground">Founders</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    )
}
