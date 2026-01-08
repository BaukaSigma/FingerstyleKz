'use client'

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function FinalCTA() {
    return (
        <section className="py-24 px-4 relative">
            <div className="container mx-auto max-w-4xl relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-20 blur-3xl rounded-3xl" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative bg-card border border-white/10 rounded-3xl p-12 md:p-20 text-center overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                    <h2 className="text-4xl md:text-5xl font-bold mb-8">
                        Гитараны қазақша сөйлеткің келе ме?
                    </h2>
                    <p className="text-xl text-muted-foreground mb-10 max-w-xl mx-auto">
                        Бүгін баста. Ең сапалы табтар сені күтіп тұр.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/tabs">
                            <Button size="lg" className="h-14 px-10 text-lg rounded-full w-full sm:w-auto">
                                Табтарды көру
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button variant="outline" size="lg" className="h-14 px-10 text-lg rounded-full w-full sm:w-auto">
                                Байланысу
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
