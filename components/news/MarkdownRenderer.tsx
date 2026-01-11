'use client'

import ReactMarkdown from 'react-markdown'
import { TabCard } from "@/components/shared/TabCard"
import { Tab } from "@/lib/types"

interface MarkdownRendererProps {
    content: string
    locale: string
    relatedTabs?: Tab[]
}

export function MarkdownRenderer({ content, locale, relatedTabs = [] }: MarkdownRendererProps) {
    // 1. Pre-process custom syntax for Callouts
    // Regex matches :::callout ... :::
    const calloutRegex = /:::callout([\s\S]*?):::/g
    const calloutMap = new Map<string, string>()

    let processedForCallouts = content.replace(calloutRegex, (match, inner) => {
        const id = `__CALLOUT_${Math.random().toString(36).substr(2, 9)}__`
        calloutMap.set(id, inner.trim())
        return id
    })

    // 2. Pre-process custom syntax for Tabs
    // Regex matches :::tab slug="xyz" :::
    const tabRegex = /:::tab\s+slug="([^"]+)"\s*:::/g
    const tabMap = new Map<string, string>()

    let finalContent = processedForCallouts.replace(tabRegex, (match, slug) => {
        const id = `__TAB_${slug}__`
        tabMap.set(id, slug)
        return id
    })

    const components = {
        p: ({ node, children }: any) => {
            if (typeof children[0] === 'string') {
                const text = children[0]

                // Check Callout
                if (calloutMap.has(text)) {
                    return (
                        <div className="my-6 p-4 border-l-4 border-primary bg-primary/5 rounded-r-lg">
                            <ReactMarkdown components={components}>
                                {calloutMap.get(text) || ''}
                            </ReactMarkdown>
                        </div>
                    )
                }

                // Check Tab
                if (text.startsWith('__TAB_')) {
                    const slug = tabMap.get(text)
                    const tab = relatedTabs.find(t => t.slug === slug)

                    if (tab) {
                        return (
                            <div className="my-8 max-w-sm">
                                <TabCard tab={tab} locale={locale} />
                            </div>
                        )
                    }
                    return null // Hide if tab not found
                }
            }
            return <p className="mb-4 leading-relaxed text-slate-300">{children}</p>
        },
        h1: ({ children }: any) => <h1 className="text-3xl font-bold mt-8 mb-4 text-white">{children}</h1>,
        h2: ({ children }: any) => <h2 className="text-2xl font-bold mt-8 mb-4 text-white">{children}</h2>,
        h3: ({ children }: any) => <h3 className="text-xl font-bold mt-6 mb-3 text-white">{children}</h3>,
        ul: ({ children }: any) => <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>,
        ol: ({ children }: any) => <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>,
        li: ({ children }: any) => <li className="text-slate-300">{children}</li>,
        blockquote: ({ children }: any) => <blockquote className="border-l-4 border-white/20 pl-4 italic text-slate-400 my-4">{children}</blockquote>,
        a: ({ href, children }: any) => <a href={href} className="text-primary hover:underline font-medium" target="_blank" rel="noopener noreferrer">{children}</a>,
        img: ({ src, alt }: any) => <img src={src} alt={alt} className="rounded-lg border border-white/10 my-6 w-full" />,
        code: ({ inline, children }: any) => inline
            ? <code className="bg-white/10 px-1.5 py-0.5 rounded text-sm font-mono text-primary-foreground">{children}</code>
            : <code className="block bg-[#0d1117] p-4 rounded-lg overflow-x-auto text-sm font-mono my-4 border border-white/5">{children}</code>
    }

    return (
        <div className="prose prose-invert max-w-none">
            <ReactMarkdown components={components}>
                {finalContent}
            </ReactMarkdown>
        </div>
    )
}
