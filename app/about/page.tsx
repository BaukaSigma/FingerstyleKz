import { cookies } from "next/headers"

export default async function AboutPage() {
    const cookieStore = await cookies()
    const locale = cookieStore.get('NEXT_LOCALE')?.value || 'kz'

    return (
        <div className="container mx-auto px-4 py-16 max-w-3xl min-h-[60vh]">
            <h1 className="text-3xl font-bold mb-8 sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                {locale === 'ru' ? 'О нас' : 'Біз туралы'}
            </h1>
            <div className="prose prose-invert prose-lg text-muted-foreground">
                {locale === 'ru' ? (
                    <>
                        <p>Добро пожаловать в <strong>FingerstyleKz</strong> — платформу для гитаристов, которые хотят играть казахские песни в стиле фингерстайл.</p>
                        <p>Мы создаем качественные, точные и удобные табулатуры (PDF и GPX) для популярных и народных песен.</p>
                        <p>Каждый таб проходит проверку качества, чтобы вы могли легко разучить любимую мелодию.</p>
                    </>
                ) : (
                    <>
                        <p><strong>FingerstyleKz</strong> жобасына қош келдіңіз! Бұл — қазақ әндерін фингерстайл бағытында ойнағысы келетін гитаристерге арналған платформа.</p>
                        <p>Біз танымал және халық әндеріне арналған сапалы, нақты және ыңғайлы табулатураларды (PDF және GPX) жасаймыз.</p>
                        <p>Сіз сүйікті әуеніңізді тез әрі оңай үйренуіңіз үшін әр таб мұқият тексеріледі.</p>
                    </>
                )}
            </div>
        </div>
    )
}
