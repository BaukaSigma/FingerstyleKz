'use client'

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Music, Star } from "lucide-react"

export function LandingHero() {
    return (
        <section className="relative min-h-[85vh] flex items-center pt-20 pb-16 overflow-hidden">
            {/* Abstract Tech Grid Background */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '40px 40px' }}>
            </div>

            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent z-0 pointer-events-none" />

            <div className="container relative z-10 px-4 md:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left: Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="text-left space-y-8"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-sm font-medium tracking-wide">
                            <Star className="w-3.5 h-3.5 fill-current" />
                            <span>Қазақстандық жоба</span>
                        </div>

                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.1] text-white">
                            Қазақша әндер.<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-300 to-secondary">
                                Fingerstyle.
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
                            Шынайы аранжировкалар. Таза ноталар.
                            <span className="text-white font-medium"> PDF + GPX </span>
                            форматында жүкте және кез келген жерде ойна.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-2">
                            <Link href="/tabs">
                                <Button size="lg" className="h-14 px-8 text-base font-semibold rounded-full bg-white text-black hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] w-full sm:w-auto">
                                    Табтарды көру <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                            <Link href="/tabs?level=easy">
                                <Button variant="outline" size="lg" className="h-14 px-8 text-base font-medium rounded-full border-white/10 hover:bg-white/5 w-full sm:w-auto">
                                    Үйренуді бастау
                                </Button>
                            </Link>
                        </div>

                        <div className="pt-8 flex items-center gap-6 text-sm text-muted-foreground border-t border-white/5">
                            <div>
                                <span className="block text-2xl font-bold text-white mb-1">20+</span>
                                <span>дайын әндер</span>
                            </div>
                            <div className="w-[1px] h-8 bg-white/10" />
                            <div>
                                <span className="block text-2xl font-bold text-white mb-1">100%</span>
                                <span>cапа кепілдігі</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Abstract Visual (CSS Composition) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative hidden lg:block"
                    >
                        {/* Decorative Card Stack */}
                        <div className="relative w-full aspect-square max-w-md mx-auto perspective-[2000px]">
                            {/* Back Card */}
                            <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-gradient-to-br from-primary/20 to-purple-900/20 rounded-3xl border border-white/5 transform rotate-[10deg] translate-x-8 translate-y-8 blur-sm pointer-events-none" />

                            {/* Main Card */}
                            <div className="relative w-3/4 h-3/4 bg-[#0a0a0a] rounded-3xl border border-white/10 shadow-2xl p-6 flex flex-col justify-between transform rotate-[-5deg] hover:rotate-0 transition-transform duration-500 group cursor-default">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                                            <Music className="w-6 h-6 text-primary" />
                                        </div>
                                        <div className="px-3 py-1 rounded-full bg-white/5 text-xs font-medium text-white/70">
                                            Premium Tab
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="h-2 w-1/3 bg-white/10 rounded-full" />
                                        <div className="h-8 w-3/4 bg-gradient-to-r from-white/20 to-transparent rounded-lg" />
                                    </div>
                                    {/* Mock Music Lines */}
                                    <div className="space-y-2 pt-4 opacity-50">
                                        {[1, 2, 3, 4].map(i => (
                                            <div key={i} className="h-[1px] w-full bg-white/20 flex items-center gap-4">
                                                <div className="w-2 h-2 rounded-full bg-primary translate-x-8" />
                                                <div className="w-1 h-2 bg-white/50 translate-x-20" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                                    <div className="text-white font-bold">PDF + GPX</div>
                                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                                        <ArrowRight className="w-4 h-4 text-white" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
