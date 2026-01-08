import { LandingHero } from "@/components/home/LandingHero"
import { FeaturedTabs } from "@/components/home/FeaturedTabs"
import { HowItWorks } from "@/components/home/HowItWorks"
import { WhyUs } from "@/components/home/WhyUs"
import { AboutStory } from "@/components/home/AboutStory"
import { FAQ } from "@/components/home/FAQ"
import { FinalCTA } from "@/components/home/FinalCTA"
import { cookies } from "next/headers"

export const revalidate = 0

export default async function Home() {
  const cookieStore = await cookies()
  const locale = cookieStore.get('NEXT_LOCALE')?.value || 'kz'

  return (
    <main className="flex flex-col min-h-screen">
      <LandingHero />
      <HowItWorks />
      <WhyUs />
      <FeaturedTabs locale={locale} />
      <AboutStory />
      <FAQ />
      <FinalCTA />
    </main>
  )
}
