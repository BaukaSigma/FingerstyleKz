'use client'

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function FinalCTA() {
    return (
        <section className="py-12 md:py-24 px-4">
            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative rounded-[2.5rem] overflow-hidden bg-primary px-6 py-16 md:px-20 md:py-24 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-10"
                >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/20 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/3" />

                    <div className="relative z-10 max-w-2xl">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Гитарада ойнауды <br /> жаңа деңгейге көтер.
                        </h2>
                        <p className="text-primary-foreground/80 text-lg md:text-xl">
                            Сапалы табтар, таза дыбыс және қазақ әндерінің қайталанбас атмосферасы.
                        </p>
                    </div>

                    <div className="relative z-10 whitespace-nowrap">
                        <Link href="/tabs">
                            <Button size="lg" className="h-16 px-10 text-lg font-bold rounded-full bg-white text-primary hover:bg-white/90 shadow-xl w-full sm:w-auto">
                                Каталогқа өту <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                    </div>

                </motion.div>
            </div>
        </section>
    )
}
